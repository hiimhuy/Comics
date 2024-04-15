import React from "react";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Link from "next/link";

const Comic = ({ data }: any) => {

  function formatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    }
    return num;
  }

  console.log(data.id)

  return (
    <Link href={`/comic/${data.id}`} key={data.id} className="h-[290px]">
      <div className="hover:duration-300 shadow-xl  hover:shadow-xl hover:rounded-md hover:scale-105">
        <div className="relative w-[210px]">
          <Image
            src={data.thumbnail}
            height={230}
            width={200}
            alt="image"
            loading="lazy"
            className="absolute h-[260px]  object-cover rounded-sm opacity-90"
          />
          {data?.isTrending === true ? <div className="absolute text-sm p-1 bg-red-500 rounded-tl-sm text-white">
            Hot
          </div>:''}
          <div
            className="absolute w-[200px] flex flex-col bottom-[-260px] pb-[5px] items-center  text-white"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0,0,0, 0))",
            }}
          >
            <h2 className="text-lg px-2 text-shadow font-semibold overflow-hidden line-clamp-1">
              {data.title}
            </h2>
            <span className="border-b-[1px] w-[90%] px-4"></span>
            <div className="text-xs">
              {data.authors ? (
                data.authors
              ) : (
                <div className="">
                  <AutorenewIcon className="text-[#07ba82] w-4 h-4" />
                  Updating
                </div>
              )}
            </div>
            <div className="flex gap-2 text-xs">
              <div className="flex p-[2px] items-center justify-center bg-[#454546] text-[#07ba82] rounded-sm">
                <VisibilityIcon className="h-3 w-3" />
                <p>{formatNumber(data?.total_views)}</p>
              </div>
              <div className="flex p-[2px] items-center justify-center bg-[#454546] text-[#07ba82] rounded-sm">
                <FavoriteBorderIcon className="h-3 w-3" />
                <p>{formatNumber(data?.followers)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Comic;
