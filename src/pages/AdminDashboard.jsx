import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Timeline, Typography, Alert } from 'antd';
import { 
  UserOutlined, 
  UploadOutlined, 
  MonitorOutlined, 
  CheckCircleOutlined,
  SyncOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    adminCount: 0,
    contentItems: 0,
    activeDevices: 0,
    syncedDevices: 0,
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        adminCount: 9,
        contentItems: 24,
        activeDevices: 6,
        syncedDevices: 4,
      });
    }, 500);
  }, []);

  return (
    <div>
      <Title level={2}>Admin Dashboard</Title>
      
      <Alert
        message="Welcome to Admin Panel"
        description="Manage your content, users, and monitoring tools from this dashboard."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Admins"
              value={stats.adminCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Content Items"
              value={stats.contentItems}
              prefix={<UploadOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Devices"
              value={stats.activeDevices}
              prefix={<MonitorOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Synced Devices"
              value={stats.syncedDevices}
              prefix={<SyncOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Card title="System Status" bordered={false}>
            <div style={{ marginBottom: 16 }}>
              <div>Storage Usage</div>
              <Progress percent={70} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div>Memory Usage</div>
              <Progress percent={50} status="active" />
            </div>
            <div>
              <div>CPU Usage</div>
              <Progress percent={30} status="active" />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Activities" bordered={false}>
            <Timeline>
              <Timeline.Item color="green">Admin05 updated content 2024-03-15</Timeline.Item>
              <Timeline.Item color="green">Device03 synced successfully 2024-03-15</Timeline.Item>
              <Timeline.Item color="red">Device07 connection lost 2024-03-14</Timeline.Item>
              <Timeline.Item color="blue">New admin account created 2024-03-14</Timeline.Item>
              <Timeline.Item color="gray">System backup completed 2024-03-13</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;