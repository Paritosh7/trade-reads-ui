"use client";
import { useState, useEffect } from "react";
import BookList from "../components/books/BookList";
import { getUserId } from "../lib/actions";
import { Spin } from "antd"; // Importing Ant Design's loading spinner
import apiService from "../services/apiService";

const MyBooksPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      const response = await getUserId();

      if (response) {
        setUserId(response);
      } else {
        setUserId(null);
      }
      setLoading(false); // End loading
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h1>My Books</h1>
      {userId ? <BookList owner_id={userId} /> : <p>Please login or signup</p>}
    </>
  );
};

export default MyBooksPage;
