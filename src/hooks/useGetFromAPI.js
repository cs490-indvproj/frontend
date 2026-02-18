import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config.js";

function useGetFromAPI(requestURI) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getFunction = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${requestURI}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getFunction();
    return () => controller.abort();
  }, [requestURI]);
  return { data, loading, error };
}
export default useGetFromAPI;
