import React from "react";
import BookIcon from "@mui/icons-material/Book";
import InfoIcon from "@mui/icons-material/Info";

const NavbarGenres = ({ data, onFilter, description }: any) => {
  return (
    <div className="py-20">
      <div className="flex items-center text-3xl font-semibold">
        <BookIcon className="text-[#07ba82] h-10 w-10" />
        Genres
      </div>
      <div className="flex py-5 w-[100%] overflow-hidden overflow-x-scroll scrollbar-hide">
        {
          data.map((genre: any) => (
            <div
              onClick={() => onFilter(genre.id, genre.description)}
              className="p-4 px-6 whitespace-nowrap border cursor-pointer"
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
      </div>
      {description && (
        <div className="flex gap-4 items-center h-14 text-white px-4 rounded-md bg-blue-400">
          <InfoIcon />
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
export default NavbarGenres;
