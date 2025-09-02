import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Switch, 
  Button, 
  Divider,
  Tag,
  Badge,
  List,
  Avatar,
  Space,
  Modal,
  Select,
  message,
  theme
} from 'antd';
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined,
  SyncOutlined,
  UserOutlined,
  TeamOutlined,
  RadarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { updateDeviceStatus, updateDeviceType } from '../store/slices/adminSlice';

const { Title, Text } = Typography;
const { Option } = Select;

const MonitoringTool = () => {
  const dispatch = useDispatch();
  const { monitoringDevices, journeys } = useSelector(state => state?.admin);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [syncSelection, setSyncSelection] = useState([]);
  const [singleSelection, setSingleSelection] = useState([]);
  const {
    token: { colorBgContainer, colorTextBase }
  } = theme.useToken();

  useEffect(() => {
    // Initialize selections based on device types
    const syncDevices = monitoringDevices
      .filter(device => device.type === 'sync')
      .map(device => device.id);
    
    const singleDevices = monitoringDevices
      .filter(device => device.type === 'single')
      .map(device => device.id);
    
    setSyncSelection(syncDevices);
    setSingleSelection(singleDevices);
  }, [monitoringDevices]);

  const handleDeviceStatusChange = (deviceId, status) => {
    dispatch(updateDeviceStatus({ deviceId, status }));
    message.success(`Device ${status === 'active' ? 'activated' : 'deactivated'}`);
  };

  const handleDeviceTypeChange = (deviceId, type) => {
    dispatch(updateDeviceType({ deviceId, type }));
    message.success(`Device set to ${type} mode`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Update device types based on selections
    syncSelection.forEach(deviceId => {
      dispatch(updateDeviceType({ deviceId, type: 'sync' }));
    });
    
    singleSelection.forEach(deviceId => {
      dispatch(updateDeviceType({ deviceId, type: 'single' }));
    });
    
    setIsModalVisible(false);
    message.success('Device configuration updated successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSyncSelection = (value) => {
    setSyncSelection(value);
  };

  const handleSingleSelection = (value) => {
    setSingleSelection(value);
  };

  const startAllDevices = () => {
    monitoringDevices.forEach(device => {
      dispatch(updateDeviceStatus({ deviceId: device.id, status: 'active' }));
    });
    message.success('All devices started');
  };

  const stopAllDevices = () => {
    monitoringDevices.forEach(device => {
      dispatch(updateDeviceStatus({ deviceId: device.id, status: 'inactive' }));
    });
    message.success('All devices stopped');
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'red';
  };

  const getTypeColor = (type) => {
    return type === 'sync' ? 'blue' : 'purple';
  };

  return (
    <div style={{ background: colorBgContainer, color: colorTextBase, minHeight: '100%', padding: 24 }}>
      <Title level={2} style={{ color: colorTextBase }}>Monitoring Tool</Title>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card style={{ background: colorBgContainer }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={4} style={{ color: colorTextBase }}>Device Controls</Title>
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />}
                  onClick={startAllDevices}
                >
                  Start All
                </Button>
                <Button 
                  danger 
                  icon={<PauseCircleOutlined />}
                  onClick={stopAllDevices}
                >
                  Stop All
                </Button>
                <Button 
                  icon={<SettingOutlined />}
                  onClick={showModal}
                >
                  Configure Devices
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ background: colorBgContainer }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={4} style={{ color: colorTextBase }}>Statistics</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Space direction="vertical" align="center">
                    <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <Text strong style={{ color: colorTextBase }}>Single Users</Text>
                    <Text style={{ color: colorTextBase }}>
                      {monitoringDevices.filter(d => d.type === 'single').length}
                    </Text>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" align="center">
                    <TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    <Text strong style={{ color: colorTextBase }}>Synced Users</Text>
                    <Text style={{ color: colorTextBase }}>
                      {monitoringDevices.filter(d => d.type === 'sync').length}
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Available Journeys" style={{ marginBottom: 24, background: colorBgContainer }}>
        <Row gutter={16}>
          {journeys.map(journey => (
            <Col span={6} key={journey.id} style={{ marginBottom: 16 }}>
              <Card 
                size="small" 
                hoverable
                actions={[
                  <Button type="link">Select</Button>
                ]}
                style={{ background: colorBgContainer }}
              >
                <Card.Meta
                  avatar={<RadarChartOutlined />}
                  title={journey.name}
                  description="Interactive experience"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Divider>Device Monitoring</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Single User Devices" bordered={false} style={{ background: colorBgContainer }}>
            <List
              itemLayout="horizontal"
              dataSource={monitoringDevices.filter(device => device.type === 'single')}
              renderItem={device => (
                <List.Item
                  actions={[
                    <Switch
                      checked={device.status === 'active'}
                      onChange={(checked) => handleDeviceStatusChange(
                        device.id, 
                        checked ? 'active' : 'inactive'
                      )}
                    />,
                    <Button 
                      type="link"
                      onClick={() => handleDeviceTypeChange(device.id, 'sync')}
                    >
                      Set Sync
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        status={device.status === 'active' ? 'success' : 'default'} 
                        dot
                      >
                        <Avatar icon={<UserOutlined />} />
                      </Badge>
                    }
                    title={device.name}
                    description={
                      <Space>
                        <Tag color={getStatusColor(device.status)}>
                          {device.status.toUpperCase()}
                        </Tag>
                        <Tag color={getTypeColor(device.type)}>
                          {device.type.toUpperCase()}
                        </Tag>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="Synced User Devices" bordered={false} style={{ background: colorBgContainer }}>
            <List
              itemLayout="horizontal"
              dataSource={monitoringDevices.filter(device => device.type === 'sync')}
              renderItem={device => (
                <List.Item
                  actions={[
                    <Switch
                      checked={device.status === 'active'}
                      onChange={(checked) => handleDeviceStatusChange(
                        device.id, 
                        checked ? 'active' : 'inactive'
                      )}
                    />,
                    <Button 
                      type="link"
                      onClick={() => handleDeviceTypeChange(device.id, 'single')}
                    >
                      Set Single
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        status={device.status === 'active' ? 'success' : 'default'} 
                        dot
                      >
                        <Avatar icon={<SyncOutlined />} />
                      </Badge>
                    }
                    title={device.name}
                    description={
                      <Space>
                        <Tag color={getStatusColor(device.status)}>
                          {device.status.toUpperCase()}
                        </Tag>
                        <Tag color={getTypeColor(device.type)}>
                          {device.type.toUpperCase()}
                        </Tag>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Configure Device Types"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Configuration"
        cancelText="Cancel"
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Title level={5}>Single User Devices</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select devices for Single User mode"
              value={singleSelection}
              onChange={handleSingleSelection}
            >
              {monitoringDevices.map(device => (
                <Option key={device.id} value={device.id}>
                  {device.name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Title level={5}>Synced User Devices</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select devices for Synced User mode"
              value={syncSelection}
              onChange={handleSyncSelection}
            >
              {monitoringDevices.map(device => (
                <Option key={device.id} value={device.id}>
                  {device.name}
                </Option>
              ))}
            </Select>
          </div>

          <Text type="secondary">
            Note: Devices can only be in one mode at a time. Selecting a device 
            in one list will automatically remove it from the other.
          </Text>
        </Space>
      </Modal>
    </div>
  );
};

export default MonitoringTool;