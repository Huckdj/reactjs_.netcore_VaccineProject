import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './FooterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function NewsComponent() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const [postsPerPage] = useState(8);  // Số bài mỗi trang
    const urlapi = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.post(`${urlapi}/api/PostPublics/RandomAllPost`);
                const data = response.data;
                if (data.status === '0') {
                    setNews(data.data);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [urlapi]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(news.length / postsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const getPaginationButtons = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        const buttons = [];
        if (pageNumbers.length > 5) {
            buttons.push(pageNumbers[0]);
            buttons.push('...');
            buttons.push(pageNumbers[pageNumbers.length - 1]);
        } else {
            buttons.push(...pageNumbers);
        }
        return buttons;
    };

    return (
        <div>
            <HeaderComponent />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Tin Tức Mới Nhất</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentPosts.length > 0 ? (
                        currentPosts.map((item, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow-lg">
                                <Link to={`/post/${item.LinkRoute}`} className="block mb-4">
                                    <img
                                        src={item.LinkImages}
                                        alt={item.Title}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                </Link>
                                <Link
                                    to={`/post/${item.LinkRoute}`}
                                    className="font-semibold text-lg text-blue-600 hover:underline"
                                >
                                    {item.Title}
                                </Link>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.ShortContent}</p>
                            </div>
                        ))
                    ) : (
                        <p>Không có kết quả tìm kiếm.</p>
                    )}
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
            <FooterComponent />
        </div>
    );
}

export default NewsComponent;
