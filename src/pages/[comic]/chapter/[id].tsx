import { SingleChapter, URL, fetchDataComicDetail } from "@/src/apiServices";
import { IChapters, IComicDetail } from "@/src/model/type";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "@mui/icons-material/Home";
import RocketIcon from "@mui/icons-material/Rocket";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ChapterPage = () => {
  const router = useRouter();
  const { comic, id } = router.query;
  const [chapter, setChapter] = useState<IChapters | null>(null);
  const [comics, setComic] = useState<IComicDetail | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [espisodes, setEspisodes] = useState(false);

  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        if (id && comic) {
          const chapterData = await SingleChapter(`${comic}`, `${id}`);
          const comicData = await fetchDataComicDetail(`${comic}`);

          setChapter(chapterData);
          setComic(comicData);
          console.log(chapter);
        }
      } catch (error) {
        console.error("Error fetching comic detail:", error);
      }
    };

    fetchComic();
  }, [id, comic]);

  const count = () => {
    return chapter?.images?.length || 0;
  };

  const handleScroll = () => {
    if (!imagesRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = imagesRef.current;
    const totalPages = count();
    const page =
      Math.floor(((scrollTop + clientHeight) / scrollHeight) * totalPages) + 1;
    setCurrentChapter(page);
  };

  useEffect(() => {
    if (!chapter || !imagesRef.current) return;
    imagesRef.current.addEventListener("scroll", handleScroll);
    return () => {
      imagesRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [chapter]);

  // useEffect(() => {
  //   if (chapter && chapter.chapters && id && comic) {
  //     const currentIndex = chapter.chapters.findIndex((item: any) => item?.id === id);
  //     const totalChapters = chapter.chapters.length;

  //     // Hiển thị nút chương tiếp nếu không phải là chương cuối cùng
  //     setShowNextButton(currentIndex < totalChapters - 1);

  //     // Hiển thị nút chương trước nếu không phải là chương đầu tiên
  //     setShowPrevButton(currentIndex > 0);
  //   }
  // }, [comic, id, chapter]);

  // const scrollToTop = () => {
  //   window.scrollTo({ top:0, behavior: 'smooth' });
  // };

  const PrevChapter = () => {
    if (id && comic && chapter) {
      const currentIndex = chapter.chapters.findIndex(
        (item: any) => item?.id == id
      );
      if (currentIndex < chapter.chapters.length - 1) {
        const PrevChapter: any = chapter.chapters[currentIndex + 1];
        const PrevChapterId = PrevChapter?.id;
        console.log("PrevChapterId:", PrevChapterId);
        router.push(`/${comic}/chapter/${PrevChapterId}`);
      }
    }
  };

  const NextChapter = () => {
    if (id && comic && chapter) {
      const currentIndex = chapter.chapters.findIndex(
        (item: any) => item?.id == id
      );
      if (currentIndex > 0) {
        const NextChapter: any = chapter.chapters[currentIndex - 1];
        const NextChapterId = NextChapter?.id;
        console.log("NextChapterId:", NextChapterId);
        router.push(`/${comic}/chapter/${NextChapterId}`);
      } else {
      }
    }
  };

  const handleDownload = async () => {
    try {
      if (comic && id) {
        const href = `${URL}/download?comicId=${comic}&chapterId=${id}`;
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
      }
    } catch (err) {
      console.error('Error downloading chapter:', err);
    }
  };
  

  return (
    <div className="relative h-screen bg-[#111114]">
      <div className="absolute flex h-[60px] w-[100%] gap-4 bg-black/60 justify-between items-center text-white z-10 px-12">
        <Link href={"/"} className="flex items-end">
          <HomeIcon />
        </Link>
        <div>
          <Link href={`/comic/${comic}`}>{chapter?.comic_name}</Link>
          <NavigateNextIcon />
          {chapter?.chapter_name}
        </div>
        <div
          onClick={() => setEspisodes(!espisodes)}
          className="relative text-pink-400 font-semibold hover:text-pink-700 cursor-pointer"
        >
          Espisodes
          {espisodes && (
            <div className="absolute bg-white rounded-sm border border-[#07ba82] text-black top-12 right-[-40px] w-[350px] h-[630px] overflow-y-scroll scrollbar-hide shadow-lg grid grid-cols-2 place-items-center gap-2 p-1">
              {chapter?.chapters?.map((chapter: any) => (
                <Link
                  href={`/${comic}/chapter/${chapter?.id}`}
                  key={chapter?.id}
                  className="w-[80%] py-1 px-3 border hover:bg-[#07ba82] hover:text-white"
                >
                  {chapter?.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        ref={imagesRef}
        className="flex flex-col items-center overflow-hidden h-[100%] overflow-y-scroll scrollbar-hide"
      >
        {chapter?.images?.map((chap) => (
          <Image
            key={chap?.page}
            height={500}
            width={700}
            src={chap?.src || chap?.backup_src}
            loading="lazy"
            alt="image"
          />
        ))}
      </div>
      {/* <button
        onClick={scrollToTop}
        className="absolute z-auto bottom-20 right-10 bg-white h-10 w-10 rounded-full flex items-center justify-center"
      >
        <RocketIcon className="text-[#07ba82]" />
      </button> */}
      <div className="absolute flex h-[60px] bottom-0 w-[100%] gap-4 bg-black/40 justify-center items-center text-white z-10">
        <div>
          {currentChapter}/{chapter?.images?.length}
        </div>
        <button
          onClick={PrevChapter}
          className="w-20 h-8 rounded-full bg-[#07ba82] text-white px-2"
        >
          <KeyboardBackspaceIcon />
          Prev
        </button>
        <button
          onClick={NextChapter}
          className="w-20 h-8 rounded-full bg-[#07ba82] text-white px-2"
        >
          Next
          <ArrowRightAltIcon />
        </button>
        <button onClick={handleDownload}>
          <FileDownloadIcon/>
        </button>
      </div>
    </div>
  );
};

export default ChapterPage;
