/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import BottomHeader from "./BottomHeader";
import SearchtabHeader from "./SearchtabHeader";
function TopHeader() {
  const [HamburgerMenu, setHamburgerMenu] = useState('none');
  const [openSearch, setSearch] = useState(false)
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
                className="text-[25px]"
              />
            }
            {HamburgerMenu === 'openmenu' &&
              <FontAwesomeIcon
                icon={faX}
                onClick={() => setHamburgerMenu('none')}
                className="text-[25px]"
              />
            }   
          </div>
          <img
            src={require(`../../../Asset/Img/Logo/newlogo.png`)}
            className=" h-auto w-[130px] sm:min-w-[30px] md:min-w-40 lg:min-w-47 md:w-16 lg:w-20"
            alt="Logo"
          />
            
          <button
            className="md:hidden mr-2 mt-4"
            onClick={() => setSearch(!openSearch)}
          > 
            <FontAwesomeIcon icon={faSearch} className="text-[25px]"/>
          </button>
        </div>

        {/* Icon SVG bên phải */}
        <div className="md:flex hidden">
          <a href="#" className="flex items-center md:mr-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="p-1 mr-1 md:block hidden lg:w-[30px]"
            >
              <path
                fill="#0cb2a4"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>

            <p className="uppercase font-bold text-[#0cb2a4] md:block hidden md:text-[6px] lg:text-[13px] whitespace-nowrap">
              Tìm Trung Tâm MADU
            </p>
          </a>

          <a href="#" className="flex items-center md:mr-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="25px"
              className="p-1 mr-1 md:block hidden"
            >
              <path
                fill="#0cb2a4"
                d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              />
            </svg>

            <p className="uppercase font-bold text-[#0cb2a4] md:block hidden md:text-[6px] lg:text-[13px] whitespace-nowrap">
              Đặt mua Vaccine
            </p>
          </a>

          <a href="#" className="flex items-center mr-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="p-1 mr-1 md:block hidden md:w-[25px]"
            >
              <path
                fill="#0cb2a4"
                d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z"
              />
            </svg>

            <p className="uppercase font-bold text-[#0cb2a4] md:block hidden md:text-[6px] lg:text-[13px] whitespace-nowrap">
              Đặt Lịch Tiêm
            </p>
          </a>
          <div className="items-center mr-[30px] text-[#FF7000] font-bold max-w-13 hidden md:block">
            <h1 className="lg:text-[15px] md:text-[8px] whitespace-nowrap">
              Hotline: 0349999999
            </h1>
            <p className="md:text-[6px] text-[#0cb2a4] ">
              Giờ làm việc: 09h00 - 17h00 Từ thứ 2 - thứ 7
            </p>
          </div>
        </div>
      </div>

      <div className="md:hidden grid relative">{HamburgerMenu === 'openmenu' && <BottomHeader />}</div>
      <div
        className={`md:hidden transition-all duration-500 ease-in-out transform ${
          openSearch
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1"
        }`}
      >
        <SearchtabHeader openSearch={openSearch}/>
      </div>
    </div>
  );
}

export default TopHeader;
