import { Card } from "antd";
import Image from "next/image";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";

import { getAllBooks } from "../../lib/fake-data";

const BookList = () => {
  const books = getAllBooks();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {books.map((book: any) => (
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
                  src={book.cover}
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
