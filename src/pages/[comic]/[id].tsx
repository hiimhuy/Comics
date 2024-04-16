import React, { useState, useEffect } from "react";
import {
  SingleChapters,
  URL,
  fetchDataComicChapters,
  fetchDataComicDetail,
} from "@/src/apiServices";
import { useRouter } from "next/router";
import { IComicDetail } from "@/src/model/type";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import Container from "@/src/components/Container";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Favorite, Forum, MenuBook } from "@mui/icons-material";
import Header from "@/src/components/Header";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Loading from "@/src/components/Loading";

const ComicDetail = () => {
  const [comic, setComic] = useState<IComicDetail | null>(null);
  // const [chapterChunks, setChapterChunks] = useState<any[]>([]);
  // const [displayedChunks, setDisplayedChunks] = useState<any[]>([]);
  // const [active, setActive] = useState<number>(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchComic = async () => {
      try {
        if (id) {
          const comicData = await fetchDataComicDetail(`${id}`);
          // const dataC = await SingleChapters(`${id}`);
          // console.log(dataC);
          setComic(comicData);
          // formatChapter(comicData);
          console.log(comicData);
        }
      } catch (error) {
        console.error("Error fetching comic detail:", error);
      }
    };

    fetchComic();

    return () => {
      setComic(null);
    };
  }, [id]);

  const formatNumber = (num: any) => {
    if (num > 1000) {
      const strNum = num.toString();
      let result = "";
      let count = 0;
      for (let i = strNum.length - 1; i >= 0; i--) {
        result = strNum[i] + result;
        count++;
        if (count % 3 === 0 && i !== 0) {
          result = "," + result;
        }
      }
      return result;
    }
    return num;
  };

  const comicId = comic?.id;
  const handleDownload = async () => {
    try {
      if (comicId) {
        const href = `${URL}/download?comicId=${comicId}`;
        const a = document.createElement("a");
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
      }
    } catch (err) {
      console.error("Error downloading:", err);
    }
  };
  const FirstChapterId = comic?.chapters && comic.chapters.length > 0
  ? comic.chapters[comic.chapters.length - 1].id
  : null;

  return (
    <>
    {comic ? <>
        <Header />
        <div className="relative pt-12 px-4 min-h-screen">
          <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-emerald-100 z-10">
            <Container>
              <div className="flex gap-10 border-4 border-white rounded-lg p-8 my-10">
                <Image
                  src={comic?.thumbnail || ""}
                  height={300}
                  width={200}
                  loading="lazy"
                  alt="Image"
                  className="w-[200px] h-[300px] object-cover rounded-md border-2 border-[#07ba82]"
                />
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-3xl py-2">{comic?.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {comic?.genres?.map((genre) => (
                      <p
                        key={genre.id}
                        className="border-2 border-[#07ba82] rounded-md px-2 py-1 font-semibold "
                      >
                        {genre.name}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-3 font-semibold">
                    Creator:<p className="text-[#df89f1]">{comic?.authors}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <VisibilityIcon className="text-blue-400" />
                      <p className="font-semibold">
                        {formatNumber(comic?.total_views)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Favorite className="text-red-400" />
                      <p className="font-semibold">
                        {formatNumber(comic?.followers)}
                      </p>
                    </div>
                  </div>
                  <div>{comic?.description}</div>
                  <Link
                    href={`/${comicId}/chapter/${FirstChapterId}`}
                    className="flex gap-2 px-4 py-2 font-semibold w-[150px] text-xl bg-[#07ba82] text-white rounded-md"
                  >
                    <AutoStoriesIcon className="w-6 h-6" />
                    <p>Read now</p>
                  </Link>
                  {/* <button onClick={handleDownload}>
                    <FileDownloadIcon />
                  </button> */}
                </div>
              </div>
              <div className="">
                <div className="flex border-b-2 pb-2 gap-5 text-xl font-semibold">
                  <div className="flex gap-1 items-center">
                    <MenuBook className="text-[#07ba82] w-6 h-6" />
                    <p>Chapters</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Forum className="text-[#07ba82] w-6 h-6" />
                    <p>Comments</p>
                  </div>
                </div>
  
                <div
                  className="grid grid-cols-5 gap-6 py-10 place-items-center h-[550px] overflow-y-scroll scrollbar-hide"
                  style={{}}
                >
                  {comic?.chapters?.map((chapter) => (
                    <Link
                      href={`/${comicId}/chapter/${chapter?.id}`}
                      key={chapter?.id}
                      className="w-[80%] py-1 px-3 border"
                    >
                      {chapter?.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>
     </> : <Loading/>}
    </>
  );
};

export default ComicDetail;
