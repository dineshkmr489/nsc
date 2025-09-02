import { useState } from 'react';
import { Card, Tabs, Upload, Button, message, Form, Input, Space, Typography } from 'antd';
import { UploadOutlined, PlaySquareOutlined, SoundOutlined, CodeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;

const ContentUpload = () => {
  const [videoUploading, setVideoUploading] = useState(false);
  const [audioUploading, setAudioUploading] = useState(false);
  const [jsonSubmitting, setJsonSubmitting] = useState(false);

  const handleVideoUpload = (info) => {
    setVideoUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setVideoUploading(false);
      if (info.file.status !== 'uploading') {
        message.success(`${info.file.name} video uploaded successfully`);
      }
    }, 2000);
  };

  const handleAudioUpload = (info) => {
    setAudioUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setAudioUploading(false);
      if (info.file.status !== 'uploading') {
        message.success(`${info.file.name} audio uploaded successfully`);
      }
    }, 2000);
  };

  const handleJsonSubmit = (values) => {
    setJsonSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setJsonSubmitting(false);
      message.success('JSON content uploaded successfully');
      console.log('JSON Data:', values.jsonData);
    }, 1500);
  };

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Title level={2}>Content Upload</Title>
      
      <Card>
        <Tabs defaultActiveKey="videos">
          <TabPane
            key="videos"
            tab={
              <span>
                <PlaySquareOutlined />
                Videos
              </span>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Upload 
                {...uploadProps} 
                onChange={handleVideoUpload}
                accept="video/*"
              >
                <Button 
                  icon={<UploadOutlined />} 
                  loading={videoUploading}
                  size="large"
                >
                  Click to Upload Video
                </Button>
              </Upload>
              <div style={{ marginTop: 16, color: '#999' }}>
                Supported formats: MP4, AVI, MOV, WMV. Max size: 500MB
              </div>
            </Space>
          </TabPane>
          
          <TabPane
            key="audios"
            tab={
              <span>
                <SoundOutlined />
                Audios
              </span>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Upload 
                {...uploadProps} 
                onChange={handleAudioUpload}
                accept="audio/*"
              >
                <Button 
                  icon={<UploadOutlined />} 
                  loading={audioUploading}
                  size="large"
                >
                  Click to Upload Audio
                </Button>
              </Upload>
              <div style={{ marginTop: 16, color: '#999' }}>
                Supported formats: MP3, WAV, AAC, FLAC. Max size: 100MB
              </div>
            </Space>
          </TabPane>
          
          <TabPane
            key="json"
            tab={
              <span>
                <CodeOutlined />
                JSON
              </span>
            }
          >
            <Form
              layout="vertical"
              onFinish={handleJsonSubmit}
            >
              <Form.Item
                name="jsonData"
                label="JSON Content"
                rules={[{ required: true, message: 'Please input JSON data!' }]}
              >
                <Input.TextArea 
                  rows={10} 
                  placeholder='{"key": "value"}' 
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={jsonSubmitting}
                  icon={<UploadOutlined />}
                >
                  Upload JSON
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ContentUpload;