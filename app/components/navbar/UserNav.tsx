"use client";

import React from "react";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Avatar } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="">Login</Link>,
  },
  {
    key: "2",
    label: <Link href="">Logout</Link>,
  },
  {
    key: "3",
    label: <Link href="">Another one</Link>,
  },
];

const App: React.FC = () => (
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
);

export default App;
