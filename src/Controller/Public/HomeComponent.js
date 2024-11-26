/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import HeaderComponent from './Header/HeaderComponent'
import BannerFirstComponent from './Home/BannerFirstComponent.js'
import BannerSecondComponent from './Home/BannerSecondComponent.js'
import IntroduceComponent from './Home/IntroduceComponent.js'
import PostVaccineComponent from './Home/PostVaccineComponent.js'
import PostServiceComponent from './Home/PostServiceComponent.js'
import VaccineProcessComponent from './Home/VaccineProcessComponent.js'
import FooterComponent from './FooterComponent.js'
import PostEverythingComponent from './Home/PostEverythingComponent.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'
function HomeComponent() {
  return (
    <div>
        <HeaderComponent/>
        <div>
          <BannerFirstComponent/>
          <BannerSecondComponent/>
          <IntroduceComponent/>
          <PostVaccineComponent />
          <PostServiceComponent />
          <VaccineProcessComponent/>
          <PostEverythingComponent/>
        </div>
        <div className={`lg:hidden grid grid-cols-2 fixed bottom-0 right-0 left-0 z-10 bg-white`}>
            <a href='#' className='bg-[#1250dc] text-white text-center uppercase font-bold py-1 rounded-full mx-2 my-2'><FontAwesomeIcon icon={faLocationDot} className='px-1'/>Tìm Trung tâm</a>
            <a href='#' className='bg-[#1250dc] text-white text-center uppercase font-bold py-1 rounded-full mx-2 my-2'><FontAwesomeIcon icon={faCalendar} className='px-1'/> Đặt lịch tiêm</a>
        </div>
        <FooterComponent/>
    </div>
  )
}

export default HomeComponent
