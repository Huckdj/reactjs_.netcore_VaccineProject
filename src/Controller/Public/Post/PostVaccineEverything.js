/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderComponent from '../Header/HeaderComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../../Additional/LoadingComponent';

function PostVaccineEverything() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const id = 1;
    axios
      .post(`${urlapi}/api/PostPublics/GetFullPostByIdType`, { id })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift('...');
    }
    if (endPage < totalPages) {
      pageNumbers.push('...');
    }

    return pageNumbers;
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto px-4">
        <div className="font-bold text-2xl border-b-2 border-green-500 mt-2 mb-4">Danh Mục Vắc Xin</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
          {currentItems.map((e, index) => (
            <Link key={index} to={`/post/${e.LinkRoute}`} className="border rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
              <div className="relative">
                <img
                  src={e.LinkImages}
                  alt={e.Title || 'Image'}
                  className="w-full h-56 object-cover transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-lg truncate text-blue-500">{e.Title}</p>
                <div className="text-sm text-gray-500 mt-2 line-clamp-2">{e.ShortContent}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          {/* Previous Page Button */}
          {currentPage > 1 ? (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-green-500" />
            </button>
          ) : (
            <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
              <FontAwesomeIcon icon={faChevronLeft} className="text-gray-500" />
            </div>
          )}

          {getPaginationButtons().map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item === '...') return;
                handlePageChange(item);
              }}
              className={`mx-1 px-3 py-1 border rounded-full ${currentPage === item ? 'bg-green-500 text-white' : 'bg-white text-blue-500 hover:bg-gray-100'}`}
              disabled={item === '...'}
            >
              {item}
            </button>
          ))}

          {/* Next Page Button */}
          {currentPage < totalPages ? (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-green-500" />
            </button>
          ) : (
            <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>

      {isLoading && <LoadingComponent />}
    </>
  );
}

export default PostVaccineEverything;
