import React, { useState } from "react";
import { Button, Modal } from "antd";
import LoginModal from "../modals/LoginModal";
import { useRouter } from "next/navigation";

interface AddBookProps {
  userId?: string | null;
}

const AddBook: React.FC<AddBookProps> = ({ userId }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showModal = () => {
    if (userId) {
      setIsModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="text-white cursor-pointer" onClick={showModal}>
        Add your book
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {/* Add Book Modal */}
      <Modal
        title="Add a New Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      {/* Login Modal */}
      <LoginModal visible={isLoginModalOpen} onClose={handleLoginClose} />
    </>
  );
};

export default AddBook;
