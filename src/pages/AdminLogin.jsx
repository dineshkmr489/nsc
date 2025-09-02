import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    dispatch(loginStart());
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (values.username && values.password) {
        dispatch(loginSuccess({
          user: { username: values.username },
          token: 'demo-token'
        }));
        message.success('Login successful!');
        navigate('/admin');
      } else {
        dispatch(loginFailure('Please enter both username and password'));
        message.error('Please enter both username and password');
      }
    } catch (error) {
      dispatch(loginFailure('Login failed. Please try again.'));
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          borderRadius: 12
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            margin: '0 auto 16px auto',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#1890ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserOutlined style={{ fontSize: 24, color: 'white' }} />
          </div>
          <Title level={2} style={{ margin: 0 }}>Admin Login</Title>
          <Text type="secondary">Enter your credentials to access the admin panel</Text>
        </div>

        <Form
          form={form}
          name="admin-login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
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
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>

        <div style={{ textAlign: 'center' }}>
          <Button
            type="default"
            icon={<SafetyCertificateOutlined />}
            onClick={() => navigate('/super-admin-login')}
            block
          >
            Super Admin Login
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Demo: Use any username and password
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;