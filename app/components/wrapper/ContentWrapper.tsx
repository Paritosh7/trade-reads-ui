"use client";

import { theme } from "antd";
import React from "react";

const ContentWrapper = ({ children }: any) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorBgContainer,
        minHeight: 280,
        padding: 24,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
