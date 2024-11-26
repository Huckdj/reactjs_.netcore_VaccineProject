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

  // Calculate the current data to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to generate pagination buttons
  const getPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Add the page numbers to the list
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add "..." button if there are more pages on the left or right
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
      <div className="container mx-auto">
        <div className="font-bold text-2xl border-b-2 border-green-500 mt-2 mb-4">Danh Mục Vắc Xin</div>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-2">
          {currentItems.map((e, index) => (
            <Link key={index} to={`/post/${e.LinkRoute}`} className="border m-2">
              <div className="justify-center flex items-center overflow-hidden">
                <img
                  src={e.LinkImages}
                  alt={e.Title || 'Image'}
                  className="justify-center transition-all delay-100 ease-in-out flex items-center hover:scale-110"
                />
              </div>
              <p className="justify-center flex mt-2 mb-1 hover:text-green-500 text-ellipsis overflow-hidden whitespace-nowrap">{e.Title}</p>
              <div className="line-clamp-2 text-sm text-gray-500 p-1 pb-0 mb-2 text-justify">{e.ShortContent}</div>
            </Link>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-end mt-4">
          {/* Previous Page Button */}
          {currentPage > 1 ? (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1 px-3 py-1 border text-blue-500"
            >
              <FontAwesomeIcon icon={faChevronLeft} className='text-green-500'/>
            </button>
          ):(
            
          <div
              className="mx-1 px-3 py-1 border text-blue-500"
            >
              <FontAwesomeIcon icon={faChevronLeft} className='text-gray-500'/>
        </div>
          )}

          {getPaginationButtons().map((item, index) => (
            <div>
                <button
                key={index}
                onClick={() => {
                    if (item === '...') return;
                    handlePageChange(item);
                }}
                className={`mx-1 px-3 py-1 border mr-2 ml-2 ${
                    currentPage === item ? 'bg-green-500 rounded-full text-white' : 'bg-white rounded-full -blue-500'
                }`}
                disabled={item === '...'}
                >
                {item}
                </button>
            </div>
          ))}

          {/* Next Page Button */}
          {currentPage < totalPages ? (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 px-3 py-1 border text-blue-500"
            >
              <FontAwesomeIcon icon={faChevronRight} className='text-green-500'/>
            </button>
          ):
          <div
              className="mx-1 px-3 py-1 border text-blue-500"
            >
              <FontAwesomeIcon icon={faChevronRight} className='text-gray-500'/>
        </div>}
        </div>
      </div>
      {isLoading && <LoadingComponent/>}
    </>
  );
}

export default PostVaccineEverything;
