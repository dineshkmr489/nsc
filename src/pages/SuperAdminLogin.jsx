import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, CrownOutlined, LoginOutlined } from '@ant-design/icons';
import './AuthPages.css';

const { Title, Text } = Typography;

const SuperAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (values.username === 'superadmin' && values.password === 'password') {
        message.success('Super Admin login successful!');
        localStorage.setItem('superAdminToken', 'super-demo-token');
        navigate('/admin');
      } else {
        message.error('Invalid super admin credentials');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2} className="auth-title">
            <CrownOutlined /> Super Admin Login
          </Title>
          <Text type="secondary">Elevated privileges for system administration</Text>
        </div>
        
        <Divider />
        
        <Form
          name="super-admin-login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          className="auth-form"
        >
          <Form.Item
            label="Super Admin ID"
            name="username"
            rules={[{ required: true, message: 'Please input your super admin ID!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="superadmin" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="********" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
              icon={<LoginOutlined />}
            >
              Login as Super Admin
            </Button>
          </Form.Item>
        </Form>
        
        <Divider>Or</Divider>
        
        <div className="auth-footer">
          <Button 
            type="default" 
            size="large" 
            block 
            onClick={() => navigate('/admin-login')}
          >
            Regular Admin Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;