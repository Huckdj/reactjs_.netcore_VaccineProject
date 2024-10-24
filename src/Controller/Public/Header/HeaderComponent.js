/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../../../Asset/Css/Header.css";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";
// const img = (filename) => {
//   const img = require(`../../Asset/Img/Logo/${filename}`);
//   return img;
// };



function HeaderComponent() {


  
  return (
    <div className="font-sans">
      {/* Top Header */}
      <div className="container mx-auto mb-3">
        <TopHeader/>
      </div>
      <hr className="hidden md:block mr-0 ml-0" />

      {/* Bottom header */}
      <div className="hidden md:block md:mx-auto container mt-3">
        <BottomHeader />
      </div>
    </div>
  );
}

export default HeaderComponent;
