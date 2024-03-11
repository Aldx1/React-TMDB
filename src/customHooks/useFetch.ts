import { useEffect, useState } from "react";
const TMDB_AUTH_TOKEN = process.env.TMDB_AUTH_TOKEN ?? "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_AUTH_TOKEN,
  },
};

export const useFetch = <T>(
  url: string
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData as T);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { data, loading, error };
};
