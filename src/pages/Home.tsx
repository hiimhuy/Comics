import React from "react";
import { Trending } from "../model/type";
import Header from "../components/Header";
import Container from "../components/Container";
import {
  TopAll,
  fetchDataTrending,
} from "../apiServices";
import SlideComics from "../components/SlideComics";
import Comic from "../components/Comic";
import HeaderComic from "../components/HeaderComic";
import Footer from "../components/Footer";

export default async function HomePage() {
  const trending: Trending = await fetchDataTrending(1);
  const all:Trending = await TopAll(1, "completed");

  console.log(all)

  return (
    <>
      <Header />
      <Container>
        <div className="my-10 grid grid-cols-6 gap-4 overflow-hidden">
          {trending?.comics?.slice(0,6).map((comic: any) => (
            <SlideComics data={comic} />
          ))}
        </div>
        <HeaderComic data={all} />
        <div className=" my-10 grid grid-cols-5 gap-4 ">
          {all?.comics?.slice(0, 5).map((comic: any) => (
            <Comic data={comic} />
          ))}
        </div>
      </Container>
      <Footer/>
    </>
  );
}
