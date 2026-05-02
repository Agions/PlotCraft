/**
 * KeyframePipeline - 关键帧驱动生成流程
 * 
 * 参考 deep-printfilm 的关键帧驱动方法：
 * 1. 生成首帧 (start frame)
 * 2. 生成尾帧 (end frame)
 * 3. 分析运动类型
 * 4. 帧间插值生成
 * 5. 合成视频
 */

import { StepInput, StepOutput } from '@/core/pipeline/step.interface';

import { BasePipelineController } from '../../base/BasePipelineController';

export enum MotionType {
  FADE = 'fade',           // 淡入淡出
  SLIDE = 'slide',         // 滑动
  ZOOM = 'zoom',           // 缩放
  PAN = 'pan',             // 平移
  ROTATE = 'rotate',       // 旋转
  CROSSFADE = 'crossfade', // 交叉淡入淡出
}

export enum CameraMovement {
  STATIC = 'static',
  TRACKING = 'tracking',
  DOLLY = 'dolly',
  PAN = 'pan',
  TILT = 'tilt',
  ZOOM_IN = 'zoom_in',
  ZOOM_OUT = 'zoom_out',
}

export interface GeneratedFrame {
  id: string;
  imageUrl: string;
  prompt: string;
  seed?: number;
  model?: string;
  width: number;
  height: number;
  duration?: number; // 帧持续时间（秒）
}

export interface KeyframePair {
  startFrame: GeneratedFrame;
  endFrame: GeneratedFrame;
  motionType: MotionType;
  cameraMovement?: CameraMovement;
  duration: number; // 秒
}

export interface KeyframeScene {
  sceneId: string;
  sceneNumber: number;
  description: string;
  location: string;
  keyframes: KeyframePair[];
  cameraMovement?: CameraMovement;
  totalDuration: number;
}

export interface KeyframePipelineInput {
  scenes: Array<{
    sceneId: string;
    sceneNumber: number;
    description: string;
    location: string;
    emotion?: string;
  }>;
  style?: 'anime' | 'comic' | 'realistic';
  aspectRatio?: '16:9' | '9:16' | '4:3' | '1:1';
}

export interface KeyframePipelineResult {
  keyframeScenes: KeyframeScene[];
  totalDuration: number;
  metadata: {
    totalFrames: number;
    totalKeyframes: number;
    estimatedVideoDuration: number;
    style: string;
    generatedAt: number;
  };
}

// 相机运动指南
export const CAMERA_MOVEMENT_GUIDES: Record<CameraMovement, string[]> = {
  [CameraMovement.STATIC]: ['固定镜头', '保持画面稳定'],
  [CameraMovement.TRACKING]: ['跟拍', '跟随角色移动'],
  [CameraMovement.DOLLY]: ['推拉镜头', '向前或向后移动'],
  [CameraMovement.PAN]: ['水平摇镜', '左或右横扫'],
  [CameraMovement.TILT]: ['垂直摇镜', '上或下移动'],
  [CameraMovement.ZOOM_IN]: ['推进', '放大主体'],
  [CameraMovement.ZOOM_OUT]: ['拉远', '缩小主体'],
};

// 运动类型建议
export const MOTION_TYPE_SUGGESTIONS: Record<MotionType, string[]> = {
  [MotionType.FADE]: ['场景切换', '时间流逝', '回忆'],
  [MotionType.SLIDE]: ['角色入场', '场景过渡'],
  [MotionType.ZOOM]: ['强调', '聚焦'],
  [MotionType.PAN]: ['环境展示', '跟随动作'],
  [MotionType.ROTATE]: ['旋转效果', '眩晕感'],
  [MotionType.CROSSFADE]: ['场景融合', '梦境效果'],
};

/**
 * 分析场景特征，推荐合适的运动类型
 */
export function suggestMotionType(
  sceneDescription: string,
  emotion?: string
): MotionType {
  const desc = sceneDescription.toLowerCase();
  
  if (desc.includes('淡') || desc.includes('fade') || desc.includes('回忆')) {
    return MotionType.FADE;
  }
  if (desc.includes('入场') || desc.includes('enter') || desc.includes('进来')) {
    return MotionType.SLIDE;
  }
  if (desc.includes('放大') || desc.includes('zoom') || desc.includes('聚焦')) {
    return MotionType.ZOOM;
  }
  if (desc.includes('跟') || desc.includes('跟踪') || desc.includes('track')) {
    return MotionType.PAN;
  }
  if (desc.includes('旋转') || desc.includes('rotate') || desc.includes('spin')) {
    return MotionType.ROTATE;
  }
  if (desc.includes('融合') || desc.includes('梦幻') || desc.includes('dream')) {
    return MotionType.CROSSFADE;
  }
  
  // 根据情绪默认选择
  if (emotion === 'tense' || emotion === 'angry') {
    return MotionType.ZOOM;
  }
  if (emotion === 'sad') {
    return MotionType.FADE;
  }
  
  return MotionType.CROSSFADE;
}

/**
 * 估算关键帧场景总时长
 */
export function estimateSceneDuration(scene: KeyframeScene): number {
  return scene.keyframes.reduce((sum, kf) => sum + kf.duration, 0);
}

/**
 * 创建关键帧场景
 */
export function createKeyframeScene(
  scene: KeyframePipelineInput['scenes'][0],
  options: {
    frameCount?: number;
    defaultDuration?: number;
    style: string;
    aspectRatio: string;
  }
): KeyframeScene {
  const { frameCount = 2, defaultDuration = 3, style, aspectRatio } = options;
  
  // 生成关键帧对
  const keyframes: KeyframePair[] = [];
  for (let i = 0; i < frameCount; i += 2) {
    if (i + 1 < frameCount) {
      keyframes.push({
        startFrame: createPlaceholderFrame(`${scene.sceneId}-kf-${i}`, style, aspectRatio),
        endFrame: createPlaceholderFrame(`${scene.sceneId}-kf-${i + 1}`, style, aspectRatio),
        motionType: suggestMotionType(scene.description, scene.emotion),
        duration: defaultDuration,
      });
    }
  }
  
  return {
    sceneId: scene.sceneId,
    sceneNumber: scene.sceneNumber,
    description: scene.description,
    location: scene.location,
    keyframes,
    totalDuration: keyframes.reduce((sum, kf) => sum + kf.duration, 0),
  };
}

/**
 * 创建占位帧（实际生成时替换）
 */
function createPlaceholderFrame(
  id: string,
  style: string,
  aspectRatio: string
): GeneratedFrame {
  const [w, h] = aspectRatio.split(':').map(Number);
  const width = 1024;
  const height = Math.round(1024 * h / w);
  
  return {
    id,
    imageUrl: '', // 实际生成时填充
    prompt: '',
    width,
    height,
    duration: 3,
  };
}

/**
 * KeyframePipeline - 关键帧驱动流水线
 */
export class KeyframePipeline extends BasePipelineController {
  id = 'keyframe-pipeline';
  name = 'Keyframe-Driven Generation';

  protected subSteps = [
    '分析场景',
    '生成首帧',
    '生成尾帧',
    '分析运动',
    '插值计算',
    '合成视频',
  ];

  protected async processStep(input: StepInput): Promise<StepOutput> {
    const { scenes, style = 'anime', aspectRatio = '16:9' } = input as StepInput & KeyframePipelineInput;

    this.updateProgress(0, '分析场景');

    // 创建关键帧场景
    const keyframeScenes: KeyframeScene[] = scenes.map((scene, index) => {
      this.updateProgress(
        (index / scenes.length) * 80,
        '生成首帧'
      );
      
      const keyframeScene = createKeyframeScene(scene, {
        frameCount: 2,
        defaultDuration: 3,
        style,
        aspectRatio,
      });
      
      this.updateProgress(
        ((index + 0.5) / scenes.length) * 80,
        '生成尾帧'
      );
      
      return keyframeScene;
    });

    this.updateProgress(85, '分析运动');
    
    // 分析运动类型
    keyframeScenes.forEach(scene => {
      scene.keyframes.forEach(kf => {
        kf.motionType = suggestMotionType(scene.description, undefined);
        kf.cameraMovement = CameraMovement.STATIC;
      });
    });

    this.updateProgress(95, '插值计算');
    
    const totalDuration = keyframeScenes.reduce(
      (sum, scene) => sum + scene.totalDuration,
      0
    );

    this.updateProgress(100, '合成视频');

    const result: KeyframePipelineResult = {
      keyframeScenes,
      totalDuration,
      metadata: {
        totalFrames: keyframeScenes.reduce((sum, s) => sum + s.keyframes.length * 2, 0),
        totalKeyframes: keyframeScenes.reduce((sum, s) => sum + s.keyframes.length, 0),
        estimatedVideoDuration: totalDuration,
        style,
        generatedAt: Date.now(),
      },
    };

    return { keyframePipeline: result } as StepOutput;
  }
}
