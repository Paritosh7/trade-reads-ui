"use client";
import { useState, useEffect } from "react";
import BookList from "../components/books/BookList";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";

const MyBooksPage = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserId();

      if (response) {
        setUserId(response);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      My Books
      <BookList owner_id={userId} />
    </>
  );
};

export default MyBooksPage;
