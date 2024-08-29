import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password: password1, confirm: password2 } = values;

    const formData = { email, password1, password2 };

    const response = await apiService.postWithoutToken(
      "/api/auth/register/",
      JSON.stringify(formData)
    );

    console.log(response);

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      onClose();
      message.success("Welcome user!");

      router.refresh();
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return `${error} `;
      });

      message.error(tmpErrors);
    }
  };

  return (
    <Modal title="Signup" open={visible} onCancel={onClose} footer={null}>
      <Form
        layout="vertical"
        form={form}
        name="register"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupModal;
