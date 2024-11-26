import React, { useState, useEffect } from "react";
import "../../../Asset/Css/Header.css";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

function HeaderComponent() {
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
    <div className={`font-sans border-b border-white bg-white top-0 right-0 left-0 h-[65px] md:h-[150px] z-20`}>
      {/* Top Header */}
      <div className={`md:transition-none md:duration-0 transition-all duration-500 ease-in-out ${isFixed ? 'md:static fixed top-[-1px] left-0 right-0 w-full bg-[#1250dc] z-50 shadow-md md:shadow-none' : ''}`}>
        <div className="container mx-auto mb-3">
          <TopHeader/>
        </div>
      </div>
      <hr className="hidden md:block" />
      <div className={`transition-all duration-500 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0 w-full bg-[#1250dc] text-white z-50 shadow-md' : ''}`}>
        {/* Bottom header */}
        <div className={`hidden md:block container mx-auto`}>
          <BottomHeader />
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
