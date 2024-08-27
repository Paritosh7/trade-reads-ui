"use client";

import { BookOpenIcon } from "@heroicons/react/16/solid";
import UserNav from "./UserNav";
import AddBook from "./AddBook";
import SearchReads from "./SearchReads";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Link className="flex" href={"/"}>
        <BookOpenIcon className="text-white size-6 self-center"></BookOpenIcon>
        <p className="text-white">TradeReads</p>
      </Link>
      <SearchReads />

      <div className="flex gap-4">
        <AddBook />
        <UserNav />
      </div>
    </>
  );
};

export default Navbar;
