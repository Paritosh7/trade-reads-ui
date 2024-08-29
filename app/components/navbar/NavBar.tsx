"use client";

import { BookOpenIcon } from "@heroicons/react/16/solid";
import UserNav from "./UserNav";
import AddBook from "./AddBook";
import SearchReads from "./SearchReads";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getUserId } from "@/app/lib/actions";

const Navbar = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUserId = useCallback(async () => {
    console.log("Am I being called");
    const user = await getUserId();
    setUserId(user);
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return (
    <>
      <Link className="flex" href={"/"}>
        <BookOpenIcon className="text-white size-6 self-center"></BookOpenIcon>
        <p className="text-white">TradeReads</p>
      </Link>
      <SearchReads />

      <div className="flex gap-4">
        <AddBook userId={userId} />
        <UserNav userId={userId} onUserStateChange={fetchUserId} />
      </div>
    </>
  );
};

export default Navbar;
