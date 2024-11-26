/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import LoadingComponent from '../../Additional/LoadingComponent.js'
import '../../../Asset/Css/Banner.css'



function BannerFirstComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [bannerdatamd, setBannerDatamd] = useState([])
  const [bannerdatasm, setBannerDatasm] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const PosText = 'first-home-banner-md';
    
    // get banner display md
    axios
      .post(`${urlapi}/api/BannerPublics/GetByPosText`, { PosText })
      .then((res) => {
        setBannerDatamd(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const PosText = 'first-home-banner-sm';
    //get banner display sm
    axios
      .post(`${urlapi}/api/BannerPublics/GetByPosText`, { PosText })
      .then((res) => {
        setBannerDatasm(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="" id="first-home-banner">
      <div className="hidden lg:block">
        <Slider {...settings} className="max-h-[500px] min-w-[500px]">
          {bannerdatamd.map((e) => (
            <div>
              <img src={e.LinkImages} className="w-screen min-h-[450px] h-auto max-h-[500px] min-w-[500px]"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className=" lg:hidden block sm-slider">
        <Slider {...settings}>
          {bannerdatasm.map((e) => (
            <div>
              <img src={e.LinkImages} className="sm:w-screen object-fill sm:min-h-[100px] sm:h-auto w-auto"/>
            </div>
          ))}
        </Slider>
      </div>
      {isLoading === true && <LoadingComponent />}
    </div>
  );
}

export default BannerFirstComponent;
