import axios from 'axios';
import Spinner from '@/app/_components/Spinner';
import React, { createContext, useEffect, useState } from 'react';
const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = "채용"

  const fetchNewsData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/api/news?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <NewsContext.Provider value={{
      news,
      loading,
      error
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext };
