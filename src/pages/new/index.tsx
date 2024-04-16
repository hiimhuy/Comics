import Container from "@/src/components/Container";
import Header from "@/src/components/Header";
import React, { useEffect, useState } from "react";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { fetchDataNewComics } from "@/src/apiServices";
import { IComics } from "@/src/model/type";
import Comic from "@/src/components/Comic";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loading from "@/src/components/Loading";

const NewPage = () => {
  const [data, setData] = useState<IComics | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [!data, currentPage]);

  const fetchData = async () => {
    try {
      const data: any = await fetchDataNewComics(currentPage, "all");
      setData(data);
      setTotalPages(Math.ceil(data?.total_pages));
    } catch (e) {
      console.error("Error", e);
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

  return (
    <div>
      <Header />
      {data ? (
          <Container>
            <div className="flex mt-10 gap-2 items-center">
              <NewReleasesIcon className="text-[#07ba82]" />
              <h1 className="text-2xl font-semibold">
                New Comics - Page {data?.current_page}{" "}
              </h1>
            </div>
            <div className="my-10 grid grid-cols-5 gap-4">
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

export default NewPage;
