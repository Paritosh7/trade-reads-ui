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
  pages: number | null;
  interested: Array<string>;
  publisher: string;
  published_date: string | null;
  image_url: string;
  owner: User;
}

export default function checkInterest(
  book: Book | null,
  userId: string | ""
): boolean {
  if (book && book.interested && userId) {
    return book.interested.includes(userId);
  } else {
    return false;
  }
}
