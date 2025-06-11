"use client";

import { Card } from "antd";
import Image from "next/image";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";

import { getAllBooks } from "../../lib/fake-data";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";

export type BookType = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

interface BookListProps {
  owner_id?: string | null;
  is_wishlist?: boolean | null;
}

const BookList: React.FC<BookListProps> = ({ owner_id, is_wishlist }) => {
  const [books, setBooks] = useState<BookType[]>([]);

  // const books = getAllBooks();

  const fetchBooks = async () => {
    console.log("owner_id : ", owner_id);
    let url = "/api/books/";

    if (owner_id) {
      url += `?owner_id=${owner_id}`;
    } else if (is_wishlist) {
      url += "?is_wishlist=True";
    }

    const tempBooks = await apiService.get(url);

    setBooks(tempBooks.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [owner_id]);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.id}`}>
          <li className="">
            <Card
              hoverable
              cover={
                <Image
                  className="h-56 w-40 object-center"
                  width={400}
                  height={400}
                  alt={`${book.title}`}
                  src={book.image_url}
                ></Image>
              }
            >
              <Meta title={`${book.title}`} />
            </Card>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default BookList;
