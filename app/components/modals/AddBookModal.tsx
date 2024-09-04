import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Tooltip,
  Upload,
  message, // Ant Design message component for notifications
} from "antd";

import { PlusOutlined, PlusCircleTwoTone } from "@ant-design/icons";
const { TextArea } = Input;

import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";

interface AddBookProps {
  userId?: string | null;
  showModal: () => void;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddBookModal: React.FC<AddBookProps> = ({
  userId,
  showModal,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // Example API URL, replace with your actual backend endpoint

    // Prepare the form data, including the file upload
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("publisher", values.publisher);
    formData.append(
      "published_date",
      values.publishedDate?.format("YYYY-MM-DD")
    );
    formData.append("pages", values.pages);
    formData.append("language", values.language);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].originFileObj);
    }

    try {
      const response = await apiService.post("/api/books/create/", formData);

      if (response.success) {
        // Display success message
        message.success("Book added successfully!");

        // Reset the form fields
        form.resetFields();

        // Close the modal
        handleOk();

        // Optionally, redirect or reload the page
        router.refresh();
      } else {
        // Handle any errors from the API
        message.error("Failed to add the book. Please try again.");
      }
    } catch (error) {
      // Handle network or unexpected errors
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Tooltip title="Add your book" placement="right">
        <PlusCircleTwoTone
          style={{ fontSize: 32 }}
          className="text-white cursor-pointer"
          onClick={showModal}
        >
          Add your book
        </PlusCircleTwoTone>
      </Tooltip>
      <Modal
        title="Add your book"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the book title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the book description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="publisher" label="Publisher">
            <Input />
          </Form.Item>
          <Form.Item name="publishedDate" label="Published date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="pages" label="Total pages">
            <InputNumber />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Cover"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBookModal;
