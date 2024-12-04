/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import HeaderComponent from './Header/HeaderComponent';
import BannerFirstComponent from './Home/BannerFirstComponent.js';
import BannerSecondComponent from './Home/BannerSecondComponent.js';
import IntroduceComponent from './Home/IntroduceComponent.js';
import PostVaccineComponent from './Home/PostVaccineComponent.js';
import PostServiceComponent from './Home/PostServiceComponent.js';
import VaccineProcessComponent from './Home/VaccineProcessComponent.js';
import FooterComponent from './FooterComponent.js';
import PostEverythingComponent from './Home/PostEverythingComponent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ChatComponent from './ChatComponent.js';

function HomeComponent() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div>
      <HeaderComponent />
      <div>
        <BannerFirstComponent />
        <BannerSecondComponent />
        <IntroduceComponent />
        <PostVaccineComponent />
        <PostServiceComponent />
        <VaccineProcessComponent />
        <PostEverythingComponent />
      </div>

      {/* Thanh điều hướng bên dưới cho mobile */}
      <div className="lg:hidden grid grid-cols-2 fixed bottom-0 right-0 left-0 z-10 bg-white">
        <Link
          to="/tim-kiem-trung-tam"
          className="bg-[#1250dc] text-white text-center uppercase font-bold py-1 rounded-full mx-2 my-2"
        >
          <FontAwesomeIcon icon={faLocationDot} className="px-1" />
          Tìm Trung tâm
        </Link>
        <Link
          to="/dat-lich-tiem-chung"
          className="bg-[#1250dc] text-white text-center uppercase font-bold py-1 rounded-full mx-2 my-2"
        >
          <FontAwesomeIcon icon={faCalendar} className="px-1" />
          Đặt lịch tiêm
        </Link>
      </div>

      {/* Nút chat */}
        <button
          className="fixed bottom-20 md:bottom-10 right-5 bg-blue-500 rounded-full p-2 z-10 hover:animate-shake"
          onClick={() => setOpenChat(!openChat)}
        >
          {openChat ? 
            <img
            src="https://res.cloudinary.com/dumx42hqq/image/upload/v1733296625/10d49ef8-090a-4da5-80c3-02f628c57a69.png"
            className="w-[40px] md:w-[50px]"
            alt="Chat"/>
             : 
            <img
            src="https://res.cloudinary.com/dumx42hqq/image/upload/v1733294093/8e24d749-614d-4b64-b5d5-f4e6b5147b0e.png"
            className="w-[40px] md:w-[50px]"
            alt="Chat"/>
          }
          
        </button>
        {openChat && <ChatComponent/>}

      <FooterComponent />
    </div>
  );
}

export default HomeComponent;
