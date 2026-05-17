/**
 * 导出面板
 * 包含质量闸门状态展示 + 跳转编辑页按钮
 */

import React from 'react';

import { Card, Alert, Button } from '@/components/ui/ui-components';

export interface ExportPanelProps {
  projectId: string;
  /** 质量闸门评估结果 */
  qualityGate: {
    passed: boolean;
    issues: Array<{
      code: string;
      level: string;
      title: string;
      detail: string;
      frameIndex?: number;
      field?: string;
      frameId?: string;
    }>;
  };
  onNavigateToEdit: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  projectId: _projectId,
  qualityGate,
  onNavigateToEdit,
}) => {
  return (
    <Card>
      <Alert
        type={qualityGate.passed ? 'success' : 'warning'}
        showIcon
        message={qualityGate.passed ? '质量闸门通过，可进入导出流程' : '质量闸门未完全通过'}
        description={
          <ul style={{ paddingLeft: 20 }}>
            {qualityGate.issues.length > 0 ? (
              qualityGate.issues.map((issue) => (
                <li key={issue.code}>
                  [{issue.level === 'error' ? '阻断' : '建议'}] {issue.title}：{issue.detail}
                  {typeof issue.frameIndex === 'number' ? `（第 ${issue.frameIndex + 1} 镜）` : ''}
                  {issue.field ? ` 字段: ${issue.field}` : ''}
                  {issue.frameId ? (
                    <Button type="link" size="small" onClick={onNavigateToEdit}>
                      去修复
                    </Button>
                  ) : null}
                </li>
              ))
            ) : (
              <li>当前分镜与评测摘要均达到默认阈值。</li>
            )}
          </ul>
        }
      />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Button type="primary" onClick={onNavigateToEdit}>
          前往编辑页导出视频
        </Button>
      </div>
    </Card>
  );
};
