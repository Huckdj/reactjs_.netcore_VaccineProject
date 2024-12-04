/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import '../../../Asset/Css/Header.css';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';

function SearchtabHeader({ openSearch }) {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const [openSearchnoew,setopensearch] = useState()
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchKeyword) {
      
      navigate(`/search?keyword=${searchKeyword}`);
      if(openSearch){
      setopensearch(!openSearch)
      }
    }
  };
  useEffect(() => {
    if (searchKeyword.length > 0) {
      axios.post(`${urlapi}/api/PostPublics/SearchPost`, { SearchKeyword: searchKeyword })
        .then((response) => {
          if (response.data.status === "0") {
            setSearchResults(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchKeyword]);

  return (
    <div className={`bg-[#e9e9e9] min-h-[200px] ${openSearch ? 'block' : 'hidden'}`}>
      <div className="justify-center z-20 search-tab md:grid h-auto rounded-md right-0 left-0">
        <input
          type="text"
          placeholder="Tìm Kiếm"
          value={searchKeyword}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          className="p-2 w-full text-black md:w-[50vh] md:ml-4 md:mr-4 border-2 h-[40px] rounded-md mt-4 input-search-tab outline-none"
        />
      </div>
      <div className="justify-center grid mt-4 text-black">
        {/* Hiển thị gợi ý tìm kiếm */}
        {searchResults.length > 0 ? (
          <ul className='md:min-w-[50vh] grid'>
            Kết quả tìm kiếm:
            {searchResults.map((item, index) => (
              <li key={index} className='mb-2 ml-4'>
                <Link to={`/search?keyword=${item.Title}`} className="text-blue-600 text-justify ">{item.Title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className='grid md:min-w-[50vh]'>
            <p>Gợi ý tìm kiếm</p>
            <button className='text-blue-600 mb-2' onClick={()=>setSearchKeyword('TRUNG TÂM TIÊM CHỦNG MADU')}>TRUNG TÂM TIÊM CHỦNG MADU</button>
            <button className='text-blue-600 mb-2' onClick={()=>setSearchKeyword('Tầm ảnh hưởng tiêm chủng cho bé')}>Tầm ảnh hưởng tiêm chủng cho bé</button>
            <button className='text-blue-600 mb-2' onClick={()=>setSearchKeyword('Tiêm chủng cho người mang thai')}>Tiêm chủng cho người mang thai</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchtabHeader;
