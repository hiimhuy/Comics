import Link from "next/link";
import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchDataSearch } from "../apiServices";
import { IComicDetail } from "../model/type";
import { SearchResults } from "./SearchResults";

const Header = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IComicDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const throttle = (func: any, delay: number) => {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
      const now = Date.now();
      if (now - lastCall < delay) return;
      lastCall = now;
      func.apply(this, args);
    };
  };

  const handleSearch = async (q: string) => {
    try {
      const data: any = await fetchDataSearch(q, 1);
      setSearchResult(data.comics);
      setError(null);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Error fetching search results. Please try again later.");
    }
  };

  const debouncedSearch = throttle(handleSearch, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    if (newQuery === '') {
      setShow(false);
    } else {
      setShow(true);
    }
    debouncedSearch(newQuery);
    setQuery(newQuery);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-24 py-2 border-b-2 flex justify-between">
      <div className="flex items-center gap-16">
        <Link href={'/'} className="text-[#07ba82] text-4xl font-bold">
          Ncomics
        </Link>
        <div className="flex text-2xl gap-7 text-gray-700 font-bold">
          <Link href={"/"}>Home</Link>
          <Link href={"/genres/"}>Genres</Link>
          <Link href={"/new/"}>New</Link>
          <Link href={"/top/"}>Top</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} onClick={()=>setShow(true)}>
        <div className="flex items-center gap-2" ref={inputRef}>
          <div className="relative border rounded-3xl focus:border-black">
            <input
              className="py-1 px-6 w-80  rounded-3xl focus:outline-none focus:border-black"
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
          {searchResult.length > 0 && show && <SearchResults results={searchResult} />}
          {/* {error && <div className="text-red-500">{error}</div>} */}
        </div>
      </form>
    </div>
  );
};

export default Header;
