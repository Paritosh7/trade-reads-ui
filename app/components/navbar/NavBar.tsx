"use client";

import { BookOpenIcon } from "@heroicons/react/16/solid";
import UserNav from "./UserNav";
import AddBook from "./AddBook";
import SearchReads from "./SearchReads";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getUserId } from "@/app/lib/actions";
import { Popover } from "antd";
import apiService from "@/app/services/apiService";
import Title from "antd/es/typography/Title";

interface UserDetails {
  avatar_url: string;
  email: string;
  id: string;
  name: string;
}

const Navbar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<UserDetails | null>();

  const fetchUserId = async () => {
    console.log("Am I being called");
    const user = await getUserId();
    setUserId(user);
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchOwner = async () => {
      if (userId) {
        const response = await apiService.get(`/api/auth/${userId}`);

        if (response) {
          setOwnerDetails(response);
        }
      }
    };

    fetchOwner();
  }, [userId]);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link className="flex items-center" href={"/"}>
          <BookOpenIcon className="text-white size-6 self-center" />
          <p className="text-white">TradeReads</p>
        </Link>

        <AddBook userId={userId} />
      </div>

      <SearchReads />

      <div className="flex gap-4">
        {ownerDetails && (
          <label className="text-white">{`Welcome, ${ownerDetails.name}`}</label>
        )}
        <UserNav userId={userId} onUserStateChange={fetchUserId} />
      </div>
    </>
  );
};

export default Navbar;
