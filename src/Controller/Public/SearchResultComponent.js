/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './FooterComponent';
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';

function SearchResultComponent() {
    const urlapi = process.env.REACT_APP_API_BASE_URL;
    const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const queryKeyword = getQueryParam('keyword');
  useEffect(() => {
    if (queryKeyword) {
      axios.post(`${urlapi}/api/PostPublics/SearchPost`, { SearchKeyword: queryKeyword })
        .then((response) => {
          if (response.data.status === '0') {
            setSearchResults(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [queryKeyword]);

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{queryKeyword}"</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg">
                <Link to={`/post/${item.LinkRoute}`} className="block mb-4">
                  <img src={item.LinkImages} alt={item.Title} className="w-full h-40 object-cover rounded-md" />
                </Link>
                <Link to={`/post/${item.LinkRoute}`} className="font-semibold text-lg text-blue-600 hover:underline">
                  {item.Title}
                </Link>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.ShortContent}</p>
              </div>
            ))
          ) : (
            <p>Không có kết quả tìm kiếm.</p>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default SearchResultComponent
