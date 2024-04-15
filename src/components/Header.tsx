import Link from "next/link";
import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div className="px-24 py-2 border-b-2 flex justify-between">
      <div className="flex items-center gap-16">
        <h1 className="text-[#07ba82] text-4xl font-bold">Ncomics</h1>
        <div className="flex text-2xl gap-7 text-gray-700 font-bold">
          <Link href={"/"}>Home</Link>
          <Link href={"/genres/"}>Genres</Link>
          <Link href={"/"}>New</Link>
          <Link href={"/"}>Top</Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <HistoryIcon />
        <div className="relative border rounded-3xl focus:border-black">
          <input
            className="py-1 px-6 w-80  rounded-3xl focus:outline-none focus:border-black"
            type="text"
            placeholder="Search"
          />
          <SearchIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Header;
