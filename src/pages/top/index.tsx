import Header from "@/src/components/Header";
import React, { useEffect, useState } from "react";
import Container from "@/src/components/Container";
import { Top } from "@/src/apiServices";
import { IComics } from "@/src/model/type";
import Comic from "@/src/components/Comic";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loading from "@/src/components/Loading";

const TopPage = () => {
  const [data, setData] = useState<IComics | null>(null);
  const [status, setStatus] = useState<string>("all");
  const [option, setOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [status, option]);

  const fetchData = async () => {
    try {
      const daily = await Top(option, 1, status);
      setData(daily);
      setTotalPages(Math.ceil(daily?.total_pages));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const numDisplayedPages = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(numDisplayedPages / 2)
    );
    let endPage = Math.min(totalPages, startPage + numDisplayedPages - 1);
    startPage = Math.max(1, endPage - numDisplayedPages + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 ${
            currentPage === i
              ? "bg-white text-[#07ba82]"
              : "bg-white text-gray-300"
          } rounded-full`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  console.log(data);
  return (
    <div>
      <Header />
      {data ? (
        <Container>
          <div>
            <div className="flex pt-10 gap-3">
              <div
                onClick={() => setOption("")}
                className={`${
                  option === ""
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Comics
              </div>
              <div
                onClick={() => setOption("daily")}
                className={`${
                  option === "daily"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Daily
              </div>
              <div
                onClick={() => setOption("weekly")}
                className={`${
                  option === "weekly"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Weekly
              </div>
              <div
                onClick={() => setOption("monthly")}
                className={`${
                  option === "monthly"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Monthly
              </div>
              <div
                onClick={() => setOption("chapter")}
                className={`${
                  option === "chapter"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Chapter
              </div>
              <div
                onClick={() => setOption("follow")}
                className={`${
                  option === "follow"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Follow
              </div>
              <div
                onClick={() => setOption("comment")}
                className={`${
                  option === "comment"
                    ? "bg-[#07ba82] text-white text-xl border rounded-md"
                    : " "
                } text-xl font-semibold px-2 py-1 cursor-pointer`}
              >
                Top Comment
              </div>
            </div>
            <div className="flex my-4 gap-3">
              <div
                onClick={() => setStatus("all")}
                className={`${
                  status === "all"
                    ? "border border-[#07ba82] rounded-md text-[#07ba82]"
                    : " "
                } text-xl font-semibold px-3 cursor-pointer`}
              >
                All
              </div>
              <div
                onClick={() => setStatus("completed")}
                className={`${
                  status === "completed"
                    ? "border border-[#07ba82] rounded-md text-[#07ba82]"
                    : " "
                } text-xl font-semibold px-3 cursor-pointer`}
              >
                Completed
              </div>
              <div
                onClick={() => setStatus("ongoing")}
                className={`${
                  status === "ongoing"
                    ? "border border-[#07ba82] rounded-md text-[#07ba82]"
                    : " "
                } text-xl font-semibold px-3 cursor-pointer`}
              >
                Updating
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {data?.comics?.map((comic: any) => (
              <Comic key={comic?.id} data={comic} />
            ))}
          </div>
          <div className="flex justify-end p-2 w-full">
            {currentPage === 1 ? (
              <div></div>
            ) : (
              <button
                className="px-2 py-1 mx-1 bg-white rounded-full"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <KeyboardBackspaceIcon className="text-gray-300" />
              </button>
            )}
            <div className="grid grid-flow-col">{renderPageButtons()}</div>
            {currentPage === totalPages ? (
              <div></div>
            ) : (
              <button
                className="px-2 py-1 mx-1 bg-white rounded-full"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ArrowRightAltIcon className="text-gray-300" />
              </button>
            )}
            <p className="flex items-center">
              {" "}
              {currentPage} trong tổng số {totalPages} trang
            </p>
          </div>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TopPage;
