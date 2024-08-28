import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.validateFields().then((values) => {
      console.log("Login values:", values);
      // Handle login logic here
      onClose();
    });
  };

  return (
    <Modal title="Login" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
