"use client";

import { FC, useEffect, useState } from "react";
import { getBookById } from "../../lib/fake-data";
import { Card, Col, Divider, Row, Space, message, Rate } from "antd";
import Image from "next/image";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import apiService from "@/app/services/apiService";
import Link from "next/link";
import FavouriteButton from "@/app/components/FavouriteButton";
import checkInterest from "@/app/lib/util-functions";
import { getUserId } from "@/app/lib/actions";

const { Grid, Meta } = Card;

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  language: string;
  pages: number | null; // Pages can be null
  interested: Array<string>;
  publisher: string;
  published_date: string | null; // Published date can be null
  image_url: string; // Assuming the image field is serialized as a URL
  owner: User; // This is the nested user information
}

interface BookDetailsPageProps {
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

function editReview() {
  message.info("Book review added");
}

function addToWishlist() {
  message.info("Book added to wishlist");
}

const BookDetailsPage: FC<BookDetailsPageProps> = ({ params: { id } }) => {
  // Fetch the book data based on the id
  const [book, setBook] = useState<Book | null>(null);
  const [userId, setUserId] = useState("");
  const [favourite, setFavourite] = useState(() => false);

  const [ellipsis, setEllipsis] = useState(true);

  const is_wishlisted = checkInterest(book, userId);

  const refetchBook = (fav: boolean) => {
    console.log("favourite : ", fav);

    setFavourite(fav);
  };

  const actions: React.ReactNode[] = [
    <FavouriteButton
      id={id}
      is_interested={is_wishlisted}
      update_favourite={refetchBook}
    />,
  ];

  useEffect(() => {
    const fetchBook = async () => {
      const response = await apiService.get(`/api/books/${id}`);

      if (response) {
        setBook(response);
      }
    };

    fetchBook();
  }, [favourite]);

  useEffect(() => {
    const fetchUser = async () => {
      const id = await getUserId();

      if (id) {
        setUserId(id);
      }
    };
    fetchUser();
  }, []);

  if (!book) {
    return <></>;
  } else {
    return (
      <Row>
        <Col span={6}>
          <Card
            className=""
            cover={
              <Image
                width={400}
                height={400}
                alt={book?.title || "Not provided"}
                src={book?.image_url || ""}
              ></Image>
            }
            actions={actions}
            styles={{
              body: {
                display: "none",
              },
              actions: {
                transition: "background-color 0.3s ease",
              },
            }}
          >
            <Grid hoverable></Grid>
          </Card>
        </Col>
        <Col span={2} className="flex justify-center">
          <Divider type="vertical" className="h-full" />
        </Col>
        <Col span={16}>
          <div>
            <Title>{book?.title}</Title>
            <Title level={4} className="italic">
              - {book?.author}
            </Title>
            <Rate disabled defaultValue={2} />
            <Link href={`/owners/${book.owner.id}`}>
              <Title
                className="italic underline"
                level={5}
              >{`owner @${book.owner.name}`}</Title>
            </Link>
          </div>
          <Paragraph
            ellipsis={
              ellipsis ? { rows: 4, expandable: true, symbol: "more" } : false
            }
          >
            {book?.description}
          </Paragraph>
          <Divider />

          <div className="flex flex-wrap text-center">
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
              <Card title="Publisher" bordered={true}>
                <p>{book?.publisher}</p>
              </Card>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
              <Card title="Published Date" bordered={true}>
                <p>{book?.published_date}</p>
              </Card>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
              <Card title="Language" bordered={true}>
                <p>{book?.language}</p>
              </Card>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
              <Card title="Pages" bordered={true}>
                <p>{book?.pages}</p>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
};

export default BookDetailsPage;
