import BookList from "../components/books/BookList";
import { getUserId } from "../lib/actions";

const WishlistPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return <p>You need to be authenticated</p>;
  }

  return (
    <>
      <p> Wishlist</p>
      <BookList is_wishlist={true} />
    </>
  );
};

export default WishlistPage;
