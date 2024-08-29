import React, { useState } from "react";
import { Button, Modal } from "antd";
import LoginModal from "../modals/LoginModal";
import { useRouter } from "next/navigation";
import AddBookModal from "../modals/AddBookModal";

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
      <AddBookModal
        showModal={showModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      {/* Login Modal */}
      <LoginModal visible={isLoginModalOpen} onClose={handleLoginClose} />
    </>
  );
};

export default AddBook;
