import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Switch,
  Typography,
  theme
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserAddOutlined,
  UploadOutlined,
  IdcardOutlined,
  MonitorOutlined,
  CompassOutlined,
  LogoutOutlined,
  UserOutlined,
  BulbOutlined,
  MoonOutlined
} from '@ant-design/icons';
import ProtectedRoute from '../components/ProtectedRoute';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme: currentTheme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin')
    },
    {
      key: '2',
      icon: <UserAddOutlined />,
      label: 'Admin ID Creation',
      onClick: () => navigate('/admin/admin-id-creation')
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Content Upload',
      onClick: () => navigate('/admin/content-upload')
    },
    {
      key: '4',
      icon: <IdcardOutlined />,
      label: 'Unique ID Creation',
      onClick: () => navigate('/admin/unique-id-creation')
    },
    {
      key: '5',
      icon: <MonitorOutlined />,
      label: 'Monitoring Tool',
      onClick: () => navigate('/admin/monitoring-tool')
    },
    {
      key: '6',
      icon: <CompassOutlined />,
      label: 'Journey Selection',
      onClick: () => navigate('/admin/journey-selection')
    }
  ];

  const userMenuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Profile'
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        dispatch(logout());
        navigate('/admin-login');
      }
    }
  ];

  return (
    <ProtectedRoute>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: colorBgContainer,
            boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)'
          }}
        >
          <div style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#001529',
            margin: 16,
            borderRadius: 6
          }}>
            <Title level={4} style={{ color: 'white', margin: 0 }}>
              {collapsed ? 'A' : 'Admin'}
            </Title>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[menuItems.findIndex(item => location.pathname === item.onClick?.toString().split(' ')[1].replace(/['"]/g, '')).toString()]}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>

        <Layout>
          <Header style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
              <Title level={3} style={{ margin: 0, marginLeft: 16 }}>Admin Dashboard</Title>
            </div>

            <Space>
              <Switch
                checked={currentTheme === 'dark'}
                onChange={toggleTheme}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<BulbOutlined />}
              />
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
              </Dropdown>
            </Space>
          </Header>

          <Content style={{
            margin: '24px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: 8,
            minHeight: 280
          }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminLayout;