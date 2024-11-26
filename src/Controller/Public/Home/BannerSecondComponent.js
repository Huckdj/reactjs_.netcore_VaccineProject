/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../Additional/LoadingComponent.js'

function BannerSecondComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [bannerdatamd, setBannerDatamd] = useState([])
  const [bannerdatasm, setBannerDatasm] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const PosText = 'second-home-banner-md';
    
    // get banner display md
    axios
      .post(`${urlapi}/api/BannerPublics/GetByPosText`, { PosText })
      .then((res) => {
        setBannerDatamd(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    const PosText = 'second-home-banner-sm';
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
  return (
    <div>
      <div className='hidden md:block'>
      {bannerdatamd[0]?.LinkImages ? (
        <img src={bannerdatamd[0].LinkImages} alt="Banner lớn" />
      ) : null}
    </div>
    <div className='block md:hidden'>
      {bannerdatasm[0]?.LinkImages ? (
        <img src={bannerdatasm[0].LinkImages} alt="Banner nhỏ" />
      ) : null}
    </div>


      {isLoading === true && <LoadingComponent />}
    </div>
  )
}

export default BannerSecondComponent
