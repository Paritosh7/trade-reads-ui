// import React, { useState } from "react";
// import {
//   AutoComplete,
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Menu,
//   Modal,
//   Tooltip,
//   Upload,
//   message, // Ant Design message component for notifications
// } from "antd";

// import { PlusOutlined, PlusCircleTwoTone } from "@ant-design/icons";
// const { TextArea } = Input;

// import { useRouter } from "next/navigation";
// import apiService from "@/app/services/apiService";

// interface AddBookProps {
//   userId?: string | null;
//   showModal: () => void;
//   isModalOpen: boolean;
//   handleOk: () => void;
//   handleCancel: () => void;
// }

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const AddBookModal: React.FC<AddBookProps> = ({
//   userId,
//   showModal,
//   isModalOpen,
//   handleOk,
//   handleCancel,
// }) => {
//   const router = useRouter();
//   const [form] = Form.useForm();

//   const onFinish = async (values: any) => {
//     // Example API URL, replace with your actual backend endpoint

//     // Prepare the form data, including the file upload
//     const formData = new FormData();
//     formData.append("title", values.title);
//     formData.append("description", values.description);
//     formData.append("author", values.author);
//     formData.append("publisher", values.publisher);
//     formData.append(
//       "published_date",
//       values.publishedDate?.format("YYYY-MM-DD")
//     );
//     formData.append("pages", values.pages);
//     formData.append("language", values.language);

//     if (values.image && values.image.length > 0) {
//       formData.append("image", values.image[0].originFileObj);
//     }

//     try {
//       const response = await apiService.post("/api/books/create/", formData);

//       if (response.success) {
//         // Display success message
//         message.success("Book added successfully!");

//         // Reset the form fields
//         form.resetFields();

//         // Close the modal
//         handleOk();

//         // Optionally, redirect or reload the page
//         router.refresh();
//       } else {
//         // Handle any errors from the API
//         message.error("Failed to add the book. Please try again.");
//       }
//     } catch (error) {
//       // Handle network or unexpected errors
//       message.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Tooltip title="Add your book" placement="right">
//         <PlusCircleTwoTone
//           style={{ fontSize: 32 }}
//           className="text-white cursor-pointer"
//           onClick={showModal}
//         >
//           Add your book
//         </PlusCircleTwoTone>
//       </Tooltip>
//       <Modal
//         title="Add your book"
//         open={isModalOpen}
//         onOk={form.submit}
//         onCancel={handleCancel}
//       >
//         <Form
//           form={form}
//           onFinish={onFinish}
//           name="wrap"
//           labelCol={{ flex: "110px" }}
//           labelAlign="left"
//           labelWrap
//           wrapperCol={{ flex: 1 }}
//           colon={false}
//           style={{ maxWidth: 600 }}
//         >
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[
//               { required: true, message: "Please input the book title!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               { required: true, message: "Please input the book description!" },
//             ]}
//           >
//             <TextArea rows={4} />
//           </Form.Item>
//           <Form.Item
//             name="author"
//             label="Author"
//             rules={[{ required: true, message: "Please input the author!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name="publisher" label="Publisher">
//             <Input />
//           </Form.Item>
//           <Form.Item name="publishedDate" label="Published date">
//             <DatePicker />
//           </Form.Item>
//           <Form.Item name="pages" label="Total pages">
//             <InputNumber />
//           </Form.Item>
//           <Form.Item name="language" label="Language">
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="image"
//             label="Upload Cover"
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//           >
//             <Upload listType="picture-card">
//               <button style={{ border: 0, background: "none" }} type="button">
//                 <PlusOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default AddBookModal;

import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Tooltip,
  Upload,
  message,
} from "antd";
import { PlusOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import dayjs from "dayjs";
const { TextArea } = Input;

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
  const [options, setOptions] = useState<any[]>([]);

  const onSearch = async (value: string) => {
    if (value.length === 0) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${value}`
      );
      const data = await response.json();
      const books = data.items;

      const searchOptions = books.map((book: any) => ({
        value: book.volumeInfo.title,
        label: (
          <div>
            <strong>{book.volumeInfo.title}</strong> by{" "}
            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </div>
        ),
        bookInfo: book.volumeInfo,
      }));

      setOptions(searchOptions);
    } catch (error) {
      console.error("Error fetching books from Google API", error);
    }
  };

  const onSelect = (value: string, option: any) => {
    const { bookInfo } = option;

    const title = bookInfo.title || "Untitled";
    const description = bookInfo?.description || "No description available.";
    const authors = bookInfo?.authors?.join(", ") || "Unknown Author";
    const publisher = bookInfo?.publisher || "Unknown Publisher";
    const publishedDate = bookInfo?.publishedDate
      ? dayjs(bookInfo?.publishedDate, "YYYY-MM-DD").isValid()
        ? dayjs(bookInfo?.publishedDate)
        : null
      : null;
    const pages = bookInfo?.pageCount || 0;
    const language = bookInfo?.language || "Unknown";

    form.setFieldsValue({
      title,
      description,
      author: authors,
      publisher,
      publishedDate,
      pages,
      language,
    });
  };

  const onFinish = async (values: any) => {
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
        message.success("Book added successfully!");
        form.resetFields();
        handleOk();
        router.refresh();
      } else {
        message.error("Failed to add the book. Please try again.");
      }
    } catch (error) {
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
        />
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
            name="bookSearch"
            label="Search Books"
            rules={[
              { required: false, message: "Search for a book to auto-fill!" },
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              onSelect={onSelect}
              placeholder="Search Google Books"
            />
          </Form.Item>
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
          <Form.Item name="author" label="Author">
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
            rules={[{ required: true, message: "Please add a cover pic" }]}
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
