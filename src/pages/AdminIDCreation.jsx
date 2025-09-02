// pages/AdminIDCreation.jsx
import { useState } from 'react'
import { Card, Form, Input, Button, Table, Space, Tag, message } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import Title from 'antd/es/typography/Title'

const AdminIDCreation = () => {
  const [loading, setLoading] = useState(false)
  const [admins, setAdmins] = useState([
    { id: 1, name: 'admin01', email: 'admin01@example.com' },
    { id: 2, name: 'admin02', email: 'admin02@example.com' },
    { id: 3, name: 'admin03', email: 'admin03@example.com' },
  ])

  const onFinish = (values) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newAdmin = {
        id: admins.length + 1,
        name: values.name,
        email: values.email,
      }
      setAdmins([...admins, newAdmin])
      message.success('Admin added successfully!')
      setLoading(false)
    }, 1000)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>Admin ID Creation</Title>
      
      <Card title="Create New Admin" style={{ marginBottom: 24 }}>
        <Form
          name="admin-creation"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input admin name!' }]}
          >
            <Input placeholder="e.g., admin01" />
          </Form.Item>

          <Form.Item
            label="ID"
            name="email"
            rules={[
              { required: true, message: 'Please input admin email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="e.g., admin01@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password!' }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<PlusOutlined />}
            >
              Add Admin
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Admin IDs">
        <Table 
          columns={columns} 
          dataSource={admins} 
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default AdminIDCreation