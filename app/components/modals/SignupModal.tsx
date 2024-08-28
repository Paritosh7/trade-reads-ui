import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSignup = () => {
    form.validateFields().then((values) => {
      console.log("Signup values:", values);
      // Handle signup logic here
      onClose();
    });
  };

  return (
    <Modal title="Signup" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSignup}>
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
            Signup
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupModal;
