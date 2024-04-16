import React, { useState, useEffect } from "react";
import Container from "@/src/components/Container";
import { fetchDataComicsByGenres, fetchDataGenres } from "@/src/apiServices";
import { Genres, Trending } from "@/src/model/type";
import NavbarGenres from "./components/NavbarGenres";
import Comic from "@/src/components/Comic";
import Loading from "@/src/components/Loading";
import Header from "@/src/components/Header";

export default function GenresPage() {
  const [genres, setGenres] = useState<Genres[] | []>([]);
  const [comics, setComics] = useState<Trending[] | []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState("all");
  const [selectedGenreDescription, setSelectedGenreDescription] = useState(
    "Tất cả thể loại truyện tranh"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchComicsByGenre(selectedGenreId);
  }, [selectedGenreId]);

  const fetchData = async () => {
    try {
      const genresData = await fetchDataGenres();
      setGenres(genresData);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchComicsByGenre = async (genreId: string) => {
    try {
      const comicsData = await fetchDataComicsByGenres(genreId);
      setComics(comicsData.comics);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  const handleGenreClick = async (genreId: string, description: string) => {
    setSelectedGenreId(genreId);
    setSelectedGenreDescription(description);
  };

  return (
    <>
      <Header />
      {genres && comics ? (
        <Container>
          <NavbarGenres
            data={genres}
            onFilter={handleGenreClick}
            description={selectedGenreDescription}
          />
          <div className="grid grid-cols-5">
            {comics?.map((comic: any) => (
              <Comic key={comic.id} data={comic} />
            ))}
          </div>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}
