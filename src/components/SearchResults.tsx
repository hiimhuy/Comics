import { memo } from "react";
import { IComicDetail } from "../model/type";
import Link from "next/link";
import Image from "next/image";

export const SearchResults = memo(({ results }:any) => {
  return (
    <div className="absolute top-12 z-10 bg-white mt-2 w-[352px] border border-gray-300 shadow-lg">
      {results.slice(0, 8).map((comic: IComicDetail) => (
        <div key={comic.id} className="py-2 px-4 hover:bg-[#07ba82] hover:text-white">
          <Link href={`/comic/${comic.id}`} className="flex gap-2">
            <Image src={comic?.thumbnail || ''} height={10} width={10} loading="lazy" className="object-cover h-10 w-10" alt="" />
            <p>{comic.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
});