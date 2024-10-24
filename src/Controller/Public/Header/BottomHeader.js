/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DataHeader from "../../../Data/DataHeader.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../Asset/Css/Header.css";
import SearchtabHeader from "./SearchtabHeader";

function BottomHeader() {
  const [dropdownsm, setDropdown] = useState(false);
  const [NameHeader, setNameHeader] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  useEffect(() => {
    setNameHeader(DataHeader.Header);
  }, []);

  const handlecheckdropdown = () => {
    if (dropdownsm === false) {
      setDropdown(true)
    }
    else{
      setDropdown(false)
    }
  }
  return (
    <div className="bottom-header">
      <ul className="justify-center items-center hidden md:flex md:mr-3 md:ml-3">
        {NameHeader.map((e) => (
          <li key={e.Name} className="mdrerelative group p-4">
            <div className="flex justify-center items-center">
              <Link to={e.Link} className="mr-2 md:text-[14px]">
                {e.Name}
              </Link>
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
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-md hover:text-black whitespace-nowrap text-[14px]">
                      {child.Name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
        
        <li className="mdrerelative group p-4">
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="items-center justify-center grid"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="p-2 pl-4 pr-4 md:text-[14px] lg:text-[18px]"
            />
          </button>
        </li>
      </ul>

      {/* Hamburger tab */}
      <ul className=" absolute block md:hidden right-0 left-0 bg-white">
        {NameHeader.map((e) => (
          <li className="p-4" >
            <div className="justify-between flex">
              <Link to={e.Link}>
                {e.Name}
              </Link>
              {e.Children &&
              <button onClick={() => setDropdown(!dropdownsm)}><FontAwesomeIcon icon={faPlus}/> </button>}
              {console.log(dropdownsm)}
            </div>

                {e.Children && e.Children.length > 0 && dropdownsm === true &&
                  <div className=" ml-3">
                    {e.Children.map((r) => (
                      <Link className="block">{r.Name}</Link>
                    ))}
                    </div>
                }
          </li>
        ))}
      </ul>

      <div
        className={`transition-all duration-500 ease-in-out transform relative ${
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

export default BottomHeader;
