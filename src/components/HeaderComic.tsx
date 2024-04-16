import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Link from "next/link";

const HeaderComic = ({ data }: any) => {
  return (
    <div className="pt-4">
      <div key={data?.id} className="flex justify-between">
        <div className="flex text-3xl font-semibold items-center gap-2">
          <WhatshotIcon className="text-[#07ba82] h-8 w-8" />
          <h1>Populars Comics</h1>
        </div>
        <Link
          href={"/"}
          className="border border-[#07ba82] font-medium text-[#07ba82] hover:text-black transform duration-300 ease-out px-4 py-1 items-center rounded-2xl"
        >
          More
        </Link>
      </div>
    </div>
  );
};

export default HeaderComic;
