"use client";
import { Card, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import BookList from "@/app/components/books/BookList";

const { Meta } = Card;

function contactOwner() {
  message.info("Contacting owner");
}

const actions: React.ReactNode[] = [
  <MessageOutlined
    title="Message me"
    style={{ fontSize: 16, color: "#fff" }}
    key="editReview"
    onClick={contactOwner}
  ></MessageOutlined>,
];

const BookOwnerDetailPage: React.FC = () => (
  <>
    <Card
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
      actions={actions}
      styles={{
        body: {
          display: "none",
        },
        actions: {
          backgroundColor: "#1777FF",
        },
      }}
    ></Card>
    <BookList></BookList>
  </>
);

export default BookOwnerDetailPage;
