/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../FooterComponent';
import axios from 'axios';
import LoadingComponent from '../../Additional/LoadingComponent.js';

function FindCenterComponent() {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const urlapi = process.env.REACT_APP_API_BASE_URL;

  // Gọi API để lấy dữ liệu trung tâm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${urlapi}/api/VaccineCenter/GetDataPublic`);
        if (response.data.status === '0') {
          setCenters(response.data.data);
          setFilteredCenters(response.data.data);
          setIsLoading(false);
        } else {
          setError('Không thể tải dữ liệu: ' + response.data.message);
        }
      } catch (error) {
        setError('Không thể kết nối tới API. Vui lòng thử lại sau.');
        console.error('Không thể kết nối tới API:', error);
      }
    };

    fetchData();
  }, [urlapi]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredCenters(centers);
      return;
    }

    const filtered = centers.filter((center) =>
      center.Name.toLowerCase().includes(term) ||
      center.Address.toLowerCase().includes(term) ||
      center.City.toLowerCase().includes(term) ||
      center.District.toLowerCase().includes(term) ||
      center.Ward.toLowerCase().includes(term)
    );
    setFilteredCenters(filtered);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 place-content-center grid">
          Tìm kiếm Trung tâm tiêm chủng
          <div className='justify-center flex'>
            <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1730629436/newlogo_qgob6z.png' className='w-[100px]' />
          </div>
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Nhập tên trung tâm, địa chỉ, thành phố..."
          className="w-full p-2 border border-gray-300 rounded mb-4 outline-none focus:border-[#1255ff] hover:border-[#1255ff]"
        />
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <div>
          <div className='font-medium py-4'>Hiện tại có {centers.length} trung tâm đang hoạt động: </div>
          {filteredCenters.length > 0 ? (
            <ul className="space-y-4">
              {filteredCenters.map((center) => (
                <li
                  key={center.ID}
                  className="border p-4 rounded shadow-sm space-y-4 hover:border-[#1255ff] flex"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold uppercase">{center.Name}</h2>
                    <p className='font-semibold'>
                      <strong className='font-bold'>Địa chỉ:</strong> {center.Address}, {center.Ward}, {center.District}, {center.City}
                    </p>
                    <div className="flex justify-center items-center my-4">
                      <a
                        href={center.LinkGoogle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 font-semibold text-white bg-[#1255ff] rounded-full transform transition-all duration-300 ease-in-out hover:bg-[#0c3e8c] hover:scale-105 hover:shadow-lg focus:outline-none"
                      >
                        Xem trên Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="w-2/3 ml-4">
                    <iframe
                      width="100%"
                      height="250"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBBJ36MVuoji-vjgt5drx9EpaUpwNg9--o&q=${encodeURIComponent(center.Address)}+${encodeURIComponent(center.City)}`}
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='place-content-center grid'>
              <p className='font-semibold text-lg'>MADU hiện tại chưa có ở khu vực này </p>
              <div className='justify-center flex'>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732959316/2411830_emoji_emoticon_man_sad_smiley_icon_pyt6su.png' className='w-10' />
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading && <LoadingComponent />}
      <FooterComponent />
    </>
  );
}

export default FindCenterComponent;
