import { useState, useEffect } from "react";

function useFetch(url, options = {}, delay = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 ثانیه تایم‌اوت

        const fetchPromise = fetch(url, {
          ...options,
          signal: controller.signal,
        });
        let result;
        if (delay > 0) {
          const [res] = await Promise.all([
            fetchPromise,
            new Promise((resolve) => setTimeout(resolve, delay)),
          ]);
          result = res;
        } else {
          result = await fetchPromise;
        }
        clearTimeout(timeoutId);
        if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);
        const json = await result.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") setError("درخواست لغو شد (تایم‌اوت)");
        else setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, delay]); // وابستگی‌ها – توجه: options نباید object literal باشد

  return { data, loading, error };
}

export default useFetch;
