import { useState } from 'react';
import { Card, Form, Input, Button, Alert, Typography, Space, Tag, message } from 'antd';
import { 
  IdcardOutlined, 
  CopyOutlined, 
  CheckOutlined,
  ReloadOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const UniqueIDCreation = () => {
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [form] = Form.useForm();

  // Function to generate a random 6-digit code
  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const code = generateRandomCode();
      setGeneratedCode(code);
      message.success('Unique ID created successfully!');
      setLoading(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      message.success('Code copied to clipboard!');
      
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleGenerateNewCode = () => {
    const newCode = generateRandomCode();
    setGeneratedCode(newCode);
    message.info('New code generated!');
  };

  return (
    <div>
      <Title level={2}>Unique ID Creation</Title>
      
      <Alert
        message="6-Digit Code Generation"
        description="Create unique 6-digit codes for device registration or user identification."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Card title="Create New Unique ID">
        <Form
          form={form}
          name="unique-id-creation"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Purpose (Optional)"
            name="purpose"
            help="Describe what this code will be used for (e.g., Device Registration, User Invite)"
          >
            <Input 
              placeholder="e.g., Device Registration for Conference Room" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Expiration (Optional)"
            name="expiration"
            help="Set expiration in days (0 for no expiration)"
          >
            <Input 
              type="number" 
              min="0"
              max="365"
              placeholder="e.g., 7 (for 7 days)" 
              size="large"
              addonAfter="days"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              icon={<IdcardOutlined />}
              block
            >
              Create 6-Digit Code
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {generatedCode && (
        <Card 
          title="Generated Code" 
          style={{ marginTop: 24 }}
          extra={
            <Space>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleGenerateNewCode}
              >
                Generate New
              </Button>
              <Button 
                type="primary" 
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                onClick={handleCopyCode}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </Space>
          }
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Text strong style={{ fontSize: '18px', marginRight: '10px' }}>
              Your 6-Digit Code:
            </Text>
            <Tag color="blue" style={{ 
              fontSize: '24px', 
              padding: '10px 20px',
              letterSpacing: '5px'
            }}>
              {generatedCode}
            </Tag>
            
            <div style={{ marginTop: '20px' }}>
              <Text type="secondary">
                This code will expire in: {form.getFieldValue('expiration') || '30'} days
              </Text>
            </div>
            
            {form.getFieldValue('purpose') && (
              <div style={{ marginTop: '10px' }}>
                <Text type="secondary">
                  Purpose: {form.getFieldValue('purpose')}
                </Text>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card title="Recent Codes" style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Text>238492 - Device Registration</Text>
            <Tag color="green">Active</Tag>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Text>756321 - User Invite</Text>
            <Tag color="green">Active</Tag>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Text>984512 - Conference Setup</Text>
            <Tag color="red">Expired</Tag>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0'
          }}>
            <Text>671203 - Training Session</Text>
            <Tag color="orange">Expiring Soon</Tag>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default UniqueIDCreation;