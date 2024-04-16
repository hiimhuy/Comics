"use client";
import React, { useEffect, useState } from "react";
import { Trending } from "../model/type";
import Header from "../components/Header";
import Container from "../components/Container";
import { Top, fetchDataTrending } from "../apiServices";
import SlideComics from "../components/SlideComics";
import Comic from "../components/Comic";
import HeaderComic from "../components/HeaderComic";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export default function HomePage() {
  const [trending, setTrending] = useState<Trending | null>(null);
  const [all, setAll] = useState<Trending | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const trendingData: Trending = await fetchDataTrending(1);
      const allData: Trending = await Top('',1, "completed");
      setTrending(trendingData);
      setAll(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {all && trending ? (
        <>
           <Header />
          <Container>
            {trending && (
              <div className="my-10 grid grid-cols-6 gap-4 overflow-hidden">
                {trending.comics?.slice(0, 6).map((comic: any) => (
                  <SlideComics key={comic.id} data={comic} />
                ))}
              </div>
            )}
            {all && <HeaderComic data={all} />}
            {all && (
              <div className=" my-10 grid grid-cols-5 gap-4 ">
                {all.comics?.slice(0, 5).map((comic: any) => (
                  <Comic key={comic.id} data={comic} />
                ))}
              </div>
            )}
          </Container>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
