/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faChevronLeft,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import DataHeaderAdmin from "../../Data/DataHeaderAdmin.json";
import DashBoardAdmin from "./DashBoardAdmin.js";
import AccountAdmin from "./AccountAdmin.js";
import AddPositionBanner from "./BannerTab/AddPositionBanner.js";
import BannerComponent from "./BannerTab/BannerComponent.js"
import PostType from "./PostTab/PostTypeComponent.js"
import PostComponent from "./PostTab/PostComponent.js"
import CountryItemComponent from "./Item/CountryItemComponent.js";
import "../../Asset/Css/Admin.css"
import AgeItemComponent from "./Item/AgeItemComponent.js";
import PackageItemComponent from "./Item/PackageItemComponent.js";
import SingleItemComponent from "./Item/SingleItemComponent.js"
import VaccineCenterComponent from "./Item/VaccineCenterComponent.js";
import BookingPrivateComponent from "./BookingPrivateComponent.js";
import ChatPrivateComponent from "./ChatPrivateComponent.js";
function AdminComponent() {
  const [Barstab, setBarstab] = useState(true);
  const [TabActive, SetTabActive] = useState("dashboard");
  const [DataNameAdmin, SetDataNameAdmin] = useState([]);
  const [dropdownsm, setDropdown] = useState(false);
  const [Arraydropdownsm, setArraydropdownsm] = useState([]);

  useEffect(() => {
    SetDataNameAdmin(DataHeaderAdmin.DataNameAdmin);
  }, []);

  const handlecheckdropdown = (ex) => {
    const found = DataNameAdmin.find((e) => e.Name === ex);
    const Children = found ? found.Childrend : null;

    if (dropdownsm === ex) {
      setDropdown(null);
    } else {
      setDropdown(ex);
      setArraydropdownsm(Children);
    }
  };
  const handleActive = (e) => {
    SetTabActive(e);
  };

  return (
    <div className="">
      {/* TabMenu */}
      <div className="flex">
        <div className={`relative shadow-xl p-3 h-full w-full`}>
          {/* nút mở menu admin */}
          {Barstab ? (
            <button>
              <FontAwesomeIcon
                icon={faBars}
                className="text-[20px] transition-all delay-700 ease-in-out transform"
                onClick={() => setBarstab(!Barstab)}
              />
            </button>
          ) : (
            <button>
              <FontAwesomeIcon
                icon={faX}
                className="text-[20px] transition-all delay-700 ease-in-out transform"
                onClick={() => setBarstab(!Barstab)}
              />
            </button>
          )}

          <div
            className={`absolute z-50 right-0 left-0 top-full transition-all duration-200 ease-in-out transform p-2
            ${
              Barstab === true
                ? `opacity-100 -translate-x-full`
                : "shadow-2xl bg-white z-20 h-screen w-[300px] translate-x-0"
            }`}
          >
            <div
              className={`min-w-100 ${Barstab === true ? `hidden` : `block`}`}
            >
              <img
                src="https://res.cloudinary.com/dumx42hqq/image/upload/v1730629436/newlogo_qgob6z.png"
                className="mt-2"
              />
              <hr />
            </div>

            <div
              className={`mt-[40px] pt-1 none ${Barstab === true ? `hidden` : `block bg-white rounded-lg pb-2`}`}
            >

              {/* Tab Menu khi mở */}
              {DataNameAdmin.map((Tab) => (
                <div
                  key={Tab.CodeTab}
                  className={`p-3 border-b rounded-md mt-2 whitespace-nowrap font-semibold w-full ${
                    Tab.CodeTab && TabActive === Tab.CodeTab ? "bg-[#6a99fff3] text-white" : ""
                  }`}
                >
                  {!Tab.CodeTab ? (
                    <div
                      className="w-full flex items-center cursor-pointer"
                      onClick={() => handlecheckdropdown(Tab.Name)}
                    >
                      <img src={Tab.icon} id="icon-tab" alt={Tab.Name} className="w-6 mr-2" />
                      {Tab.Name}
                      <div className="ml-auto">
                        {" "}
                        {/* Sử dụng ml-auto để đẩy icon sang bên phải */}
                        <FontAwesomeIcon
                          icon={
                            dropdownsm === Tab.Name
                              ? faChevronDown
                              : faChevronLeft
                          }
                          className="delay-200 transition-transform duration-200"
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      className="flex items-center justify-center"
                      onClick={() => handleActive(Tab.CodeTab)}
                    >
                      <img src={Tab.icon} alt={Tab.Name} id="tab-icon-parent" className="w-6 mr-2" />
                      {Tab.Name}
                    </button>
                  )}

                  {dropdownsm === Tab.Name && Arraydropdownsm?.length > 0 && (
                    <div className="ml-3 rounded-md mt-4 bg-white shadow-md">
                      {Arraydropdownsm.map((r, index) => (
                        <button
                          key={index}
                          className="block p-4 w-full border-b whitespace-nowrap text-[14px] text-black hover:bg-gray-200"
                          onClick={() => handleActive(r.CodeTab)}
                        >
                          {r.Name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>{TabActive === "dashboard" && <DashBoardAdmin />}</div>
      <div>{TabActive === "Account" && <AccountAdmin />}</div>
      <div>{TabActive === "PositionId" && <AddPositionBanner />}</div>
      <div>{TabActive === "EditBannerImg" && <BannerComponent/>}</div>
      <div>{TabActive === "Posttype" && <PostType/>}</div>
      <div>{TabActive === "Post" && <PostComponent/>}</div>
      <div>{TabActive === "Countryitem" && <CountryItemComponent/>}</div>
      <div>{TabActive === "yeaholditem" && <AgeItemComponent/>}</div>
      <div>{TabActive === "packagevaccine" && <PackageItemComponent/>}</div>
      <div>{TabActive === "singlevaccine" && <SingleItemComponent/>}</div>
      <div>{TabActive === "AddressCenter" && <VaccineCenterComponent/>}</div>
      <div>{TabActive === "BookingVaccine" && <BookingPrivateComponent/>}</div>
      <div>{TabActive === "support" && <ChatPrivateComponent/>}</div>
    </div>
  );
}

export default AdminComponent;
