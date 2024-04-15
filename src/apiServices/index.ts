export const URL = "https://comics-api.vercel.app";

export async function fetchDataGenres() {
  const res = await fetch(`${URL}/genres`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataComicsByGenres(
  genre_id: string,
  page?: number,
  status?: string
) {
  const res = await fetch(`${URL}/genres/${genre_id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataTrending(page: number) {
  const res = await fetch(`${URL}/trending-comics?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataSearch(query: string, page: number) {
  const res = await fetch(`${URL}/search?q=${query}&page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataSearchSuggest(query: string) {
  const res = await fetch(`${URL}/search-suggest?q=${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function fetchDataRecommendComics() {
  const res = await fetch(`${URL}/recommend-comics`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function fetchDataNewComics(page: number, status: string) {
  const res = await fetch(`${URL}/new-comics?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataRecentUpdateComics(
  page: number,
  status: string
) {
  const res = await fetch(
    `${URL}/recent-update-comics?page=${page}&status=${status}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataBoyComics(page: number) {
  const res = await fetch(`${URL}/boy-comics?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function fetchDataGirlComics(page: number) {
  const res = await fetch(`${URL}/girl-comics?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataCompletedComics(page: number) {
  const res = await fetch(`${URL}/completed-comics?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataComicDetail(comic_id: string) {
  const res = await fetch(`${URL}/comics/${comic_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function fetchDataComicChapters(comic_id: string) {
  const res = await fetch(`${URL}/comics/${comic_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function SingleChapters(comic_id: string) {
  const res = await fetch(`${URL}/comics/${comic_id}/chapters`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function SingleChapter(comic_id: string, chapter_id: string) {
  const res = await fetch(`${URL}/comics/${comic_id}/chapters/${chapter_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopAll(page: number, status: string) {
  const res = await fetch(`${URL}/top?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopDaily(page: number, status: string) {
  const res = await fetch(`${URL}/top/daily?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopWeekly(page: number, status: string) {
  const res = await fetch(`${URL}/top/weekly?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopMonthly(page: number, status: string) {
  const res = await fetch(`${URL}/top/monthly?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopChapter(page: number, status: string) {
  const res = await fetch(`${URL}/top/chapter?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopFollow(page: number, status: string) {
  const res = await fetch(`${URL}/top/follow?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function TopComment(page: number, status: string) {
  const res = await fetch(`${URL}/top/comment?page=${page}&status=${status}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
