import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Movie } from "../models/Movie";
const TMDB_AUTH_TOKEN = process.env.TMDB_AUTH_TOKEN;

interface useFetchProps {
  query?: string | null;
  sortBy?: string | null;
  genre?: number | null;
  page?: number | null;
}

const axiosHeaders = {
  accept: "application/json",
  Authorization: TMDB_AUTH_TOKEN,
};

export default function useMovieFetch(
  url: string,
  { query, sortBy, genre, page }: useFetchProps
) {
  const [data, setData] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset data if query or genre changes
  useEffect(() => {
    setData([]);
  }, [query, genre]);

  /* console.log("url: ", url, " query: ", query, " sortBy: ", sortBy, " genre: ", genre, " page: ", page); */

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: url,
      baseURL: "https://api.themoviedb.org/3/",
      params: {
        query: query,
        sort_by: sortBy,
        with_genres: genre,
        page: page,
      },
      headers: axiosHeaders,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prevResults) => {
          return [...prevResults, ...res.data.results];
        });
        setHasMore(res.data.page < res.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => cancel();
  }, [url, genre, query, page]);

  return { data, hasMore, loading, error };
}
