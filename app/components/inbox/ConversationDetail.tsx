"use client";
import { Card, Col, Row, Input, Typography, Button, List } from "antd";
import CustomButton from "../forms/CustomButton";
import React, { useEffect, useState, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { ConversationType, UserType } from "@/app/inbox/page";
import { MessageType } from "@/app/inbox/[id]/page";

const { Title } = Typography;

interface ConversationDetailProps {
  userId: string;
  token: string;
  conversation: ConversationType;
  messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userId,
  token,
  messages,
  conversation,
}) => {
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([]);

  const myUser = conversation.users?.find((user) => user.id == userId);
  const otherUser = conversation.users?.find((user) => user.id != userId);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `ws://${process.env.NEXT_PUBLIC_API_HOST}/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id,
      },
    });
    setNewMessage("");
    setTimeout(scrollToBottom, 50);
  };

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        conversation_id: conversation.id,
      };

      setRealTimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }
    scrollToBottom();
  }, [lastJsonMessage]);

  if (!messages.length && !realTimeMessages.length) {
    return (
      <>
        <List></List>
        <Row className="mt-4" style={{ marginTop: "20px" }}>
          <Col span={20} offset={1}>
            <Input
              size="large"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onPressEnter={sendMessage}
            />
          </Col>
          <Col span={3}>
            <Button
              size="large"
              // style={{ width: 100 }}
              type="primary"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Col>
        </Row>
        ;
      </>
    );
  }

  return (
    <>
      {/* Chat Messages */}
      <div
        ref={messagesDiv}
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => (
          <Row key={index}>
            <Col
              span={8}
              offset={message.created_by.name === myUser?.name ? 15 : 1}
              style={{
                maxWidth: "60%", // Limit bubble width for larger screens
                wordWrap: "break-word", // Allow long words to break
              }}
            >
              <div
                style={{
                  backgroundColor:
                    message.created_by.name === myUser?.name
                      ? "#1777FF"
                      : "#f0f0f0",
                  color:
                    message.created_by.name === myUser?.name ? "#fff" : "#000",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <Title level={5} style={{ marginBottom: "2px" }}>
                  {message.created_by.name}
                </Title>
                <p
                  style={{
                    maxWidth: "100%",
                    marginBottom: "0",
                  }}
                >
                  {message.body}
                </p>
              </div>
            </Col>
          </Row>
        ))}

        {realTimeMessages.map((message, index) => (
          <Row key={index}>
            <Col
              span={8}
              offset={message.name === myUser?.name ? 15 : 1}
              style={{
                maxWidth: "60%",
                wordWrap: "break-word",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    message.name === myUser?.name ? "#1777FF" : "#f0f0f0",
                  color: message.name === myUser?.name ? "#fff" : "#000",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <Title level={5} style={{ marginBottom: "2px" }}>
                  {message.name}
                </Title>
                <p
                  style={{
                    maxWidth: "100%",
                    marginBottom: "0",
                  }}
                >
                  {message.body}
                </p>
              </div>
            </Col>
          </Row>
        ))}
      </div>

      <Row className="mt-4" style={{ marginTop: "20px" }}>
        <Col span={20} offset={1}>
          <Input
            size="large"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={sendMessage}
          />
        </Col>
        <Col span={3}>
          <Button
            size="large"
            // style={{ width: 100 }}
            type="primary"
            onClick={sendMessage}
          >
            Send
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ConversationDetail;
