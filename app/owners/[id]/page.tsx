"use client";
import { Card, Col, Divider, message, Row } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import BookList from "@/app/components/books/BookList";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { getUserId } from "@/app/lib/actions";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

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

const BookOwnerDetailPage: React.FC<UserDetailsPageProps> = ({
  params: { id },
}) => {
  const [ownerDetails, setOwnerDetails] = useState<UserDetails | null>();
  const [userId, setUserId] = useState("");
  const router = useRouter();

  async function contactOwner() {
    message.info("Contacting owner");
    if (userId) {
      const conversation = await apiService.get(
        `/api/chat/start/${ownerDetails?.id}`
      );

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    }
  }

  useEffect(() => {
    const fetchOwner = async () => {
      const response = await apiService.get(`/api/auth/${id}`);

      if (response) {
        setOwnerDetails(response);
      }
    };

    const fetchUser = async () => {
      const response = await getUserId();

      if (response) {
        setUserId(response);
      }
    };
    fetchUser();
    fetchOwner();
  }, []);

  const actions: React.ReactNode[] = [];

  if (userId && userId !== id) {
    actions.push(
      <MessageOutlined
        title="message me"
        style={{ fontSize: 16, color: "#fff" }}
        key="editReview"
        onClick={contactOwner}
      />
    );
  }

  return (
    <>
      <Row>
        <Col span={6}>
          <Card
            cover={
              <Image
                width={400}
                height={400}
                alt={ownerDetails?.name || ""}
                src={ownerDetails?.avatar_url || ""}
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
            <Title>{ownerDetails?.name}</Title>
            <Title level={4} className="italic">
              - {ownerDetails?.email}
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
