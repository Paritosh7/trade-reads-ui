import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./components/navbar/NavBar";
import ContentWrapper from "./components/wrapper/ContentWrapper";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeReads",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Layout>
            <Header className="flex items-center justify-between gap-2">
              <Navbar />
            </Header>
            <Content className="mt-8 min-h-svh" style={{ padding: "0 48px" }}>
              <ContentWrapper>{children}</ContentWrapper>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              TradeReads ©{new Date().getFullYear()} Build by Paritosh Sahni
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
