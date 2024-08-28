import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const UserNav: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "login-1",
      label: <span onClick={() => handleMenuClick("login")}>Login</span>,
    },
    {
      key: "logout-2",
      label: <span onClick={() => handleMenuClick("signup")}>Signup</span>,
    },
  ];

  const handleMenuClick = (action: "login" | "signup") => {
    if (action === "login") {
      setIsLoginModalVisible(true);
    } else if (action === "signup") {
      setIsSignupModalVisible(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalVisible(false);
  };

  return (
    <>
      <Dropdown menu={{ items }}>
        <Space wrap size={16}>
          <Avatar
            className="bg-[#1777FF] cursor-pointer"
            shape="square"
            size="default"
            icon={<UserOutlined />}
          />
        </Space>
      </Dropdown>
      <LoginModal visible={isLoginModalVisible} onClose={closeLoginModal} />
      <SignupModal visible={isSignupModalVisible} onClose={closeSignupModal} />
    </>
  );
};

export default UserNav;
