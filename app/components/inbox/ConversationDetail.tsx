"use client";
import { Card, Col, Grid, Input, Row } from "antd";
import { Radio, Typography } from "antd";
import CustomButton from "../forms/CustomButton";

const { Paragraph } = Typography;

const ConversationDetail = () => {
  return (
    <>
      <Row>
        <Col className="bg-[#00000]" span={8}>
          <Card className="text-black flex flex-col">
            <Typography.Title level={5}>John Doe</Typography.Title>
            <p>Hello! How are you?</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={16}>
          <Card className="bg-[#1777FF] text-white">
            <Typography.Title level={5}>Elon</Typography.Title>
            <p>I am good. How about ?</p>
          </Card>
        </Col>
      </Row>
      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <Input placeholder="Input your message" />

        <CustomButton
          label="Send"
          onClick={() => console.log("Send message was clicked")}
          className="w-[100px] self-center"
        />
      </div>
    </>
  );
};

export default ConversationDetail;
