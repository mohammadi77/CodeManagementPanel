import { useState, useEffect } from 'react';

function useFetch(url, options = {}, delay = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 15000);

        const fetchPromise = fetch(url, {
          ...options,
          signal: controller.signal,
        });

        let result;

        if (delay > 0) {
          const [response] = await Promise.all([
            fetchPromise,
            new Promise((resolve) => setTimeout(resolve, delay)),
          ]);

          result = response;
        } else {
          result = await fetchPromise;
        }

        clearTimeout(timeoutId);

        if (!result.ok) {
          switch (result.status) {
            case 400:
              throw new Error('درخواست نامعتبر است');
            case 401:
              throw new Error('برای دسترسی باید وارد شوید');
            case 403:
              throw new Error('دسترسی مجاز نیست');
            case 404:
              throw new Error('اطلاعات مورد نظر پیدا نشد');
            case 500:
              throw new Error('خطای داخلی سرور');
            case 502:
              throw new Error('سرور در دسترس نیست');
            case 503:
              throw new Error('سرویس موقتاً در دسترس نیست');
            default:
              throw new Error('خطا در دریافت اطلاعات');
          }
        }

        const json = await result.json();

        setData(json);
        setError(null);
      } catch (err) {
        console.error('Fetch Error:', err);

        if (err.name === 'AbortError') {
          setError('زمان انتظار برای پاسخ سرور به پایان رسید');
        } else if (
          err.message === 'Failed to fetch' ||
          err.message === 'NetworkError when attempting to fetch resource.'
        ) {
          setError('اتصال به سرور برقرار نشد');
        } else {
          setError(err.message || 'خطای ناشناخته‌ای رخ داد');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, delay]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;
