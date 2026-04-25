import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, List, Button, Space, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Project } from '@/types';

import styles from './ProjectListView.module.less';

const { Title, Text } = Typography;

/**
 * 项目列表视图组件
 * 展示所有项目的列表视图
 */
const ProjectListView: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateProject = () => {
    navigate('/project/new');
  };

  const handleEditProject = (project: Project) => {
    navigate(`/project/${project.id}/edit`);
  };

  const handleDeleteProject = (project: Project) => {
    message.info(`删除项目: ${project.name}`);
    // 实现删除逻辑
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2}>我的项目</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateProject}>
          新建项目
        </Button>
      </div>

      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        dataSource={projects}
        renderItem={(project) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <EditOutlined key="edit" onClick={() => handleEditProject(project)} />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteProject(project)} />
              ]}
            >
              <Card.Meta
                title={project.name}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">{project.description}</Text>
                    <Text type="secondary" className={styles.date}>
                      创建于: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : '-'}
                    </Text>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      {projects.length === 0 && !loading && (
        <div className={styles.empty}>
          <Text type="secondary">暂无项目，点击"新建项目"开始创作</Text>
        </div>
      )}
    </div>
  );
};

export default ProjectListView;