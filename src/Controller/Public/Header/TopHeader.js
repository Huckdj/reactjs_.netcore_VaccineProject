/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import BottomHeader from "./BottomHeader";
import SearchtabHeader from "./SearchtabHeader";
function TopHeader() {
  const [HamburgerMenu, setHamburgerMenu] = useState('none');
  const [openSearch, setSearch] = useState(false)
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="md:ml-[100px] mt-[4px] flex justify-center md:justify-between items-center md:mr-[150px]">
        {/* Logo bên trái */}
        <div className="justify-between w-screen items-center flex sm:ml-[10px] sm:mr-[10px] md:mr-[60px]">
          <div className="md:hidden ml-2 mt-4">
            {HamburgerMenu === 'none'&& 
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => setHamburgerMenu('openmenu')}
                className={`text-[25px] ${isFixed && `text-white`}`}
              />
            }
            {HamburgerMenu === 'openmenu' &&
              <FontAwesomeIcon
                icon={faX}
                onClick={() => setHamburgerMenu('none')}
                className={`text-[25px] ${isFixed && `text-white`}`}
              />
            }   
          </div>
          <a href="/">
            <img
              src={require(`../../../Asset/Img/Logo/newlogo.png`)}
              className=" h-auto w-[130px] sm:min-w-[30px] md:min-w-40 lg:min-w-47 md:w-16 lg:w-20"
              alt="Logo"
            />
          </a>
            
            {/* nút search màn nhỏ */}
          <button
            className="md:hidden mr-2 mt-4 relative"
            onClick={() => setSearch(!openSearch)}
          > 
            <FontAwesomeIcon icon={faSearch} className={`text-[25px] ${isFixed ? `text-white`:``}`}/>
          </button>
          
        </div>

        {/* Icon tìm kiếm bên phải */}
        <div className="md:flex hidden">
          <a href="#" className="flex items-center md:mr-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="p-1 mr-1 md:block hidden lg:w-[30px]"
            >
              <path
                fill="#086ec5"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>

            <p className="uppercase font-bold text-[#086ec5] md:block hidden md:text-[6px] lg:text-[13px] whitespace-nowrap">
              Tìm Trung Tâm MADU
            </p>
          </a>

          <a href="#" className="flex items-center mr-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="p-1 mr-1 md:block hidden md:w-[25px]"
            >
              <path
                fill="#086ec5"
                d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z"
              />
            </svg>

            <p className="uppercase font-bold text-[#086ec5] md:block hidden md:text-[6px] lg:text-[13px] whitespace-nowrap">
              Đặt Lịch Tiêm
            </p>
          </a>
          <div className="items-center mr-[30px] text-[#FF7000] font-bold max-w-13 hidden md:block">
            <a className="lg:text-[10px] md:text-[8px] xl:text-[13px] whitespace-nowrap">
              Hotline: 0349999999
            </a>
            <p className="md:text-[9px] text-[#086ec5] text-center ">
              Giờ làm việc: 09h00 - 17h00<br/>
              <span>Từ thứ 2 - thứ 7</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden absolute right-0 left-0 z-10 transition-all duration-500 ease-in-out ${
          openSearch
            ? "opacity-100 translate-y-0 "
            : "opacity-0 -translate-y-20"
        }`}
      >
        <SearchtabHeader openSearch={openSearch}/>
      </div>  
      <div className="md:hidden grid relative">{HamburgerMenu === 'openmenu' && <BottomHeader />}</div>
    </div>
  );
}

export default TopHeader;
