import { memo } from "react";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export const SearchInput = memo(({ query, onChange, onSubmit }: any) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={'/search/'}><HistoryIcon /></Link>
      <div className="relative border rounded-3xl focus:border-black">
        <input
          className="py-1 px-6 w-80 rounded-3xl focus:outline-none focus:border-black"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          onClick={onSubmit}
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});
