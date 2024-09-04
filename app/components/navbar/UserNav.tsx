"use client";

import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "@/app/lib/actions";
import Link from "next/link";

interface UserNavProps {
  userId?: string | null;
  onUserStateChange: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ userId, onUserStateChange }) => {
  const router = useRouter();
  console.log(userId);

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  const items: MenuProps["items"] = userId
    ? [
        {
          key: "my books",
          label: <Link href={"/mybooks/"}>my books</Link>,
        },
        {
          key: "logout",
          label: <span onClick={() => submitLogout()}>Logout</span>,
        },
      ]
    : [
        {
          key: "login",
          label: <span onClick={() => handleMenuClick("login")}>Login</span>,
        },
        {
          key: "signup",
          label: <span onClick={() => handleMenuClick("signup")}>Signup</span>,
        },
      ];

  const submitLogout = async () => {
    await resetAuthCookies();
    await onUserStateChange();
    router.refresh();
  };

  const handleMenuClick = (action: "login" | "signup") => {
    if (action === "login") {
      setIsLoginModalVisible(true);
    } else if (action === "signup") {
      setIsSignupModalVisible(true);
    }
  };

  const closeLoginModal = async () => {
    setIsLoginModalVisible(false);
    await onUserStateChange();
  };

  const closeSignupModal = async () => {
    setIsSignupModalVisible(false);
    await onUserStateChange();
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
      <></>
    </>
  );
};

export default UserNav;
