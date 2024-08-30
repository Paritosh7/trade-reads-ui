"use client";
import { Card, Col, Divider, message, Row } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import BookList from "@/app/components/books/BookList";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { getUserId } from "@/app/lib/actions";
import Image from "next/image";
import Title from "antd/es/typography/Title";

const { Meta } = Card;

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

interface UserDetails {
  avatar_url: string;
  email: string;
  id: string;
  name: string;
}

function contactOwner() {
  message.info("Contacting owner");
}

const actions: React.ReactNode[] = [
  <MessageOutlined
    title={`message me`}
    style={{ fontSize: 16, color: "#fff" }}
    key="editReview"
    onClick={contactOwner}
  ></MessageOutlined>,
];

const BookOwnerDetailPage: React.FC<UserDetailsPageProps> = ({
  params: { id },
}) => {
  const [user, setUserDetails] = useState<UserDetails | null>();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const response = await apiService.get(`/api/auth/${id}`);

      if (response) {
        setUserDetails(response);
      }
    };

    const fetchUser = async () => {
      const response = await getUserId();

      if (response) {
        setUserId(response);
      }
    };
    fetchUser();
    fetchBook();
  }, []);

  return (
    <>
      <Row>
        <Col span={6}>
          <Card
            cover={
              <Image
                width={400}
                height={400}
                alt={user?.name || ""}
                src={user?.avatar_url || ""}
              ></Image>
            }
            actions={actions}
            styles={{
              body: {
                display: "none",
              },
              actions: {
                backgroundColor: "#1777FF",
                border: "none",
              },
            }}
          ></Card>
        </Col>
        <Col span={2} className="flex justify-center">
          <Divider type="vertical" className="h-full" />
        </Col>
        <Col span={16}>
          <Row className="flex-col">
            <Title>{user?.name}</Title>
            <Title level={4} className="italic">
              - {user?.email}
            </Title>
          </Row>
          <Divider type="horizontal" className="w-full" />
          <Row>
            <Title className="w-full text-center" level={4}>{`Books`}</Title>
            <BookList owner_id={id}></BookList>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BookOwnerDetailPage;
