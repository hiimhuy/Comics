import Image from "next/image";
import Link from "next/link";
import React from "react";

const ComicCard = ({ data }: any) => {
  return (
    <Link href={`/comics/${data.id}`} className="hover:duration-300 hover:shadow-xl hover:rounded-md hover:scale-110">
      <div
        key={data?.id}
        className="h-[220px] relative mx-2 my-4 rounded-md shadow-md"
      >
        <Image
          className="absolute object-fill h-[220px] w-[170px] rounded-md"
          loading="lazy"
          src={data?.thumbnail}
          height={220}
          width={170}
          alt="Image"
        />
      </div>
      <div className="flex flex-col item-center text-sm px-3 text-gray-600 font-semibold mb-4 overflow-hidden pb-4 ">
        <div className="line-clamp-1 h-6">{data?.title}</div>
        <div key={data?.last_chapter.id}>{data?.last_chapter.name}</div>
      </div>
    </Link>
  );
};

export default ComicCard;
