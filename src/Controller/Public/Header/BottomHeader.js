/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DataHeaderNoAuth from "../../../Data/DataHeaderNoAuth.json";
import DataHeaderAuth from "../../../Data/DataHeaderAuth.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../Asset/Css/Header.css";
import SearchtabHeader from "./SearchtabHeader";
import axios from "axios";

function BottomHeader() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [dropdownsm, setDropdown] = useState(false);
  const [NameHeader, setNameHeader] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [Arraydropdownsm, setArraydropdownsm] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setNameHeader(DataHeaderAuth.Header);
      axios
        .get(`${urlapi}/api/AuthUser/GetUserInfo`, {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
            setNameHeader(DataHeaderAuth.Header);
        })
        .catch(err =>{
          setNameHeader(DataHeaderNoAuth.Header)
        })
    } else {
      setNameHeader(DataHeaderNoAuth.Header);
    }
  }, []);

  const handlecheckdropdown = (ex) => {
    const found = NameHeader.find((e) => e.Name === ex);
    const Children = found ? found.Children : null;

    if (dropdownsm === ex) {
      setDropdown(null);
    } else {
      setDropdown(ex);
      setArraydropdownsm(Children);
    }
  };

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
    <div className="bottom-header">
      <ul className="justify-center items-center hidden md:flex md:mr-3 md:ml-3">
        {NameHeader.map((e) => (
          <Link
            to={e.Link}
            key={e.Name}
            className="mdrerelative group md:p-2 md:pt-3 md:pb-3 hover:text-white hover:bg-[#1250dc]  opacity-100 hover:rounded-md cursor-pointer"
          >
            <div className="flex justify-center items-center hover:text-white">
              <div className="mr-2 md:text-[10px] md: whitespace-nowrap lg:text-[14px]">
                {e.Name}
              </div>
              {e.Children && e.Children.length > 0 && (
                <div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="md:text-[12px]"
                  />
                </div>
              )}
            </div>
            {/* Dropdown */}
            {e.Children && (
              <ul className="dropdown-content">
                {e.Children.map((child) => (
                  <Link key={child.Link} to={child.Link}>
                    <li
                      className={` border-b flex items-center  justify-center hover:bg-gray-200 text-black hover:rounded-md hover:text-black whitespace-nowrap text-[14px] ${
                        isFixed && `text-black`
                      }`}
                    >
                      {child.icon && (
                        <div dangerouslySetInnerHTML={{ __html: child.icon }} className="w-4 mx-2"/>
                      )}

                      {child.Name}
                      
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </Link>
        ))}

        <li className="mdrerelative group p-4">
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="items-center justify-center grid relative"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="p-2 pl-4 pr-4 md:text-[14px] lg:text-[18px]"
            />
          </button>
        </li>
      </ul>

      {/* Hamburger tab */}
      <ul className="absolute block md:hidden right-0 left-0 h-screen top-2 bg-[#06a4ff] z-50">
        {NameHeader.map((e) => (
          <li className="p-4 bg-white m-1 rounded-md" key={e.ID}>
            <div className="justify-between flex">
              <Link to={e.Link}>{e.Name}</Link>
              {e.Children && (
                <button onClick={() => handlecheckdropdown(e.Name)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </div>

            {/* Hiển thị Children khi dropdownsm === e.Name */}
            {dropdownsm === e.Name &&
              Arraydropdownsm &&
              Arraydropdownsm.length > 0 && (
                <div className="ml-3 border rounded-md mt-4 dropdownsm">
                  {Arraydropdownsm.map((r, index) => (
                    <Link
                      key={index}
                      to={r.Link}
                      className={`justify-center items-center p-4 whitespace-nowrap text-[14px] border flex`}
                    >
                      {r.icon && (
                        <div dangerouslySetInnerHTML={{ __html: r.icon }} className="w-4 mx-2"/>
                      )}
                      {r.Name}
                    </Link>
                  ))}
                </div>
              )}
          </li>
        ))}
      </ul>

      {/* Md */}
      <div
        className={`transition-all duration-500 absolute z-20 right-0 left-0 ease-in-out transform ${
          openSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <SearchtabHeader openSearch={openSearch} />
      </div>
    </div>
  );
}

export default BottomHeader;
