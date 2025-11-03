import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchHook = (
  endpoint,
  dependencies = [],
  query,
  queryIncluded = false
) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = queryIncluded
          ? await axios.get(`${baseURL}/${endpoint}?api_key=${apiKey}&${query}`)
          : await axios.get(`${baseURL}/${endpoint}?api_key=${apiKey}`);
        const data = res.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    getData();
  }, [endpoint, ...dependencies]);

  return { data, isLoading, error };
};
