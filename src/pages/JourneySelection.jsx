import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Divider,
  Tag,
  Avatar,
  List,
  Modal,
  message,
  Alert,
  Space,
  Radio,
  Checkbox
} from 'antd';
import { 
  RocketOutlined, 
  CompassOutlined,
  EyeOutlined,
  SelectOutlined,
  TeamOutlined,
  UserOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { selectJourney } from '../store/slices/adminSlice';

const { Title, Text } = Typography;

const JourneySelection = () => {
  const dispatch = useDispatch();
  const { journeys, monitoringDevices, selectedJourney } = useSelector(state => state.admin);
  const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [currentJourney, setCurrentJourney] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectionMode, setSelectionMode] = useState('single'); // 'single' or 'multiple'

  useEffect(() => {
    // Initialize with already active devices for the selected journey
    if (selectedJourney) {
      const activeDevices = monitoringDevices
        .filter(device => device.status === 'active')
        .map(device => device.id);
      setSelectedDevices(activeDevices);
    }
  }, [selectedJourney, monitoringDevices]);

  const handleJourneySelect = (journey) => {
    setCurrentJourney(journey);
    setIsSelectionModalVisible(true);
  };

  const handleJourneyPreview = (journey) => {
    setCurrentJourney(journey);
    setIsPreviewModalVisible(true);
  };

  const handleConfirmSelection = () => {
    if (selectedDevices.length === 0) {
      message.warning('Please select at least one device');
      return;
    }

    dispatch(selectJourney({
      journey: currentJourney,
      devices: selectedDevices,
      mode: selectionMode
    }));

    message.success(`"${currentJourney.name}" journey started on ${selectedDevices.length} device(s)`);
    setIsSelectionModalVisible(false);
    setSelectedDevices([]);
  };

  const handleDeviceSelection = (deviceId) => {
    if (selectionMode === 'single') {
      setSelectedDevices([deviceId]);
    } else {
      if (selectedDevices.includes(deviceId)) {
        setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
      } else {
        setSelectedDevices([...selectedDevices, deviceId]);
      }
    }
  };

  const getJourneyIcon = (journeyName) => {
    switch (journeyName) {
      case 'Incredible India':
        return '🇮🇳';
      case 'Hidden Gems':
        return '💎';
      case 'Human Body':
        return '👤';
      case 'Life in 2050':
        return '🚀';
      default:
        return <RocketOutlined />;
    }
  };

  const getDeviceIcon = (type) => {
    return type === 'sync' ? <SyncOutlined /> : <UserOutlined />;
  };

  const getDeviceStatusColor = (status) => {
    return status === 'active' ? 'green' : 'red';
  };

  return (
    <div>
      <Title level={2}>Choose Journey</Title>
      
      <Alert
        message="Journey Selection"
        description="Select an immersive experience to deploy to your devices. Each journey offers unique content and interactions."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {selectedJourney && (
        <Card 
          title="Currently Active Journey" 
          style={{ marginBottom: 24 }}
          extra={
            <Button 
              type="primary" 
              danger
              onClick={() => dispatch(selectJourney(null))}
            >
              Stop Journey
            </Button>
          }
        >
          <Space>
            <Avatar 
              size={48} 
              style={{ backgroundColor: '#1890ff' }}
              icon={getJourneyIcon(selectedJourney.name)}
            />
            <div>
              <Title level={4}>{selectedJourney.name}</Title>
              <Text>Running on {monitoringDevices.filter(d => d.status === 'active').length} devices</Text>
            </div>
          </Space>
        </Card>
      )}

      <Row gutter={[16, 16]}>
        {journeys.map(journey => (
          <Col xs={24} sm={12} md={8} lg={6} key={journey.id}>
            <Card
              hoverable
              cover={
                <div 
                  style={{ 
                    height: 140, 
                    background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')} 0%, #${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48
                  }}
                >
                  {getJourneyIcon(journey.name)}
                </div>
              }
              actions={[
                <EyeOutlined 
                  key="preview" 
                  onClick={() => handleJourneyPreview(journey)}
                />,
                <SelectOutlined 
                  key="select" 
                  onClick={() => handleJourneySelect(journey)}
                />
              ]}
            >
              <Card.Meta
                title={journey.name}
                description={
                  <Text type="secondary">
                    Interactive experience with immersive content
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={`Select Devices for "${currentJourney?.name}"`}
        visible={isSelectionModalVisible}
        onOk={handleConfirmSelection}
        onCancel={() => {
          setIsSelectionModalVisible(false);
          setSelectedDevices([]);
        }}
        okText="Start Journey"
        cancelText="Cancel"
        width={700}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Selection Mode: </Text>
            <Radio.Group 
              value={selectionMode} 
              onChange={(e) => setSelectionMode(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <Radio.Button value="single">
                <UserOutlined /> Single Device
              </Radio.Button>
              <Radio.Button value="multiple">
                <TeamOutlined /> Multiple Devices
              </Radio.Button>
            </Radio.Group>
          </div>

          <Divider />

          <Text strong>Available Devices:</Text>
          <List
            itemLayout="horizontal"
            dataSource={monitoringDevices}
            renderItem={device => (
              <List.Item
                actions={[
                  <Checkbox
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => handleDeviceSelection(device.id)}
                    disabled={device.status === 'inactive' && !selectedDevices.includes(device.id)}
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar icon={getDeviceIcon(device.type)} />
                  }
                  title={
                    <Space>
                      {device.name}
                      <Tag color={getDeviceStatusColor(device.status)}>
                        {device.status.toUpperCase()}
                      </Tag>
                      <Tag color={device.type === 'sync' ? 'blue' : 'purple'}>
                        {device.type.toUpperCase()}
                      </Tag>
                    </Space>
                  }
                  description={device.status === 'inactive' ? 
                    "Device offline - cannot be selected" : 
                    "Click to select for this journey"
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Modal>

      <Modal
        title={`Preview: ${currentJourney?.name}`}
        visible={isPreviewModalVisible}
        onCancel={() => setIsPreviewModalVisible(false)}
        footer={[
          <Button 
            key="select" 
            type="primary" 
            onClick={() => {
              setIsPreviewModalVisible(false);
              handleJourneySelect(currentJourney);
            }}
          >
            Select This Journey
          </Button>,
          <Button 
            key="close" 
            onClick={() => setIsPreviewModalVisible(false)}
          >
            Close
          </Button>
        ]}
        width={800}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Avatar 
            size={64} 
            style={{ backgroundColor: '#1890ff', marginBottom: 16 }}
            icon={getJourneyIcon(currentJourney?.name)}
          />
          <Title level={3}>{currentJourney?.name}</Title>
          <Text>
            This is a preview of the {currentJourney?.name} journey. 
            The actual experience includes interactive elements, multimedia content, 
            and immersive environments tailored to the theme.
          </Text>
          
          <Divider />
          
          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={12}>
              <Card size="small" title="Features">
                <Space direction="vertical">
                  <Text>• Interactive 3D elements</Text>
                  <Text>• Multi-sensory experience</Text>
                  <Text>• Educational content</Text>
                  <Text>• Real-time feedback</Text>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Requirements">
                <Space direction="vertical">
                  <Text>• Internet connection</Text>
                  <Text>• VR headset compatible</Text>
                  <Text>• 2GB storage space</Text>
                  <Text>• 30+ minutes duration</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default JourneySelection;