/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "../../../Asset/Css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingLoginForm from "../../Additional/LoadingLoginForm";

function ForgotPasswordComponent() {
  const logo = process.env.REACT_APP_LOGO_IMG;
  const [agreeclouse, setAgreeclouse] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    Email:"",
    SDT:""
  })
  const handleForgotPassword = () => {
    setIsLoading(true);
    const id = Date.now();
    if (payload.Email !== '' && payload.SDT !== '') {
      axios.post(`${urlapi}/api/AuthUser/ForgetPassword`,payload).then((res) => {
        if (res.data.data[0].errorCode === "0") {
          const newNotification = {
            id,
            msg: `chúng tôi sẽ gửi password qua Email`,
            open: true,
            type: true,
          };
          setNotifications((prev) => [...prev, newNotification]);
          setIsLoading(false);
          setTimeout(() => {
            setNotifications((prev) =>
              prev.map((noti) =>
                noti.id === id ? { ...noti, open: false } : noti
              )
            );
          }, 2000);
        } else {
          const newNotification = {
            id,
            msg: `${res.data.data[0].ErrorMessage}`,
            open: true,
            type: false,
          };
          setNotifications((prev) => [...prev, newNotification]);
          setIsLoading(false);
          setTimeout(() => {
            setNotifications((prev) =>
              prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
            );
          }, 2000);
        }
      });
    } else {
      const newNotification = {
        id,
        msg: "Vui lòng nhập đầy đủ dữ liệu",
        open: true,
        type: false,
      };
      setNotifications((prev) => [...prev, newNotification]);
      setIsLoading(false);
      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
        );
      }, 2000);
    }
  };

  return (
    <div className="bg-[#fffbf1] h-screen ">
      <div
        className={`bg-[url("https://res.cloudinary.com/dumx42hqq/image/upload/v1732230517/Untitled_Project_1_hqaor0.jpg")] bg-animations`}
      >
        <div className="lg:block hidden">
          <div className="flex items-center p-10 relative container mx-auto">
            <Link to="/">
              <img src={logo} className="w-[200px]" />
            </Link>
            <span className="font-semibold absolute bottom-0 whitespace-nowrap ">
              Quên mật khẩu
            </span>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 mt-6 container mx-auto">
            <div className=" animation-login hidden lg:flex">
              <div className="grid grid-cols-1 gap-3 mx-3 mt-10 my-10">
                <img
                  src="https://i.pinimg.com/236x/d6/8a/86/d68a86464f1ef5c10942c02f8f673317.jpg"
                  className=" rounded-xl object-cover w-[200px] h-[300px]"
                />
                <img
                  src="https://i.pinimg.com/236x/02/39/6b/02396b40448b2ad86a8a05498f75115a.jpg"
                  className=" rounded-xl object-cover w-[200px] h-[300px]"
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732202264/b5933439-4669-44aa-8d47-a6a890a68ddd.png"
                  className=" rounded-xl object-cover w-[200px] h-[200px]"
                />
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732202301/943cfb06-c3b8-45c0-bd36-83e976b715d1.png"
                  className=" rounded-xl object-cover w-[200px] h-[200px]"
                />
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732202316/e52c54da-faca-4c9b-a1c1-6387dd8e6c5c.png"
                  className=" rounded-xl object-cover w-[200px] h-[200px]"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 mx-3 mt-10 my-10">
                <img
                  src="https://i.pinimg.com/236x/37/86/a0/3786a034cd5fb71c2b23554302ee8260.jpg"
                  className=" rounded-xl object-cover w-[200px] h-[300px]"
                />
                <img
                  src="https://i.pinimg.com/736x/da/b4/c2/dab4c205aeff609e63614d09e77d498c.jpg"
                  className=" rounded-xl object-cover w-[200px] h-[300px]"
                />
              </div>
            </div>

            <div className={`place-content-center grid login-form-animations`}>
              <div>
                <div>
                  <div className={`justify-center flex`}>
                    <img src={logo} className="w-[300px]" />
                  </div>
                  <h2 className="font-semibold my-3 text-[20px] whitespace-nowrap">
                    Quên mật khẩu
                  </h2>
                  <div className="justify-center grid">
                    <h2 className="font-semibold my-2">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="text"
                      className="border focus:font-semibold placeholder:text-gray-500 placeholder:text-[13px] placeholder:font-medium border-gray-400 min-w-[500px] focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Nhập email hoặc số điện thoại"
                      value={payload.Email!=='' ? payload.Email : payload.SDT}
                      onChange={(e)=>setPayload({...payload,Email:e.target.value,SDT:e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                    />
                    <button
                      onClick={handleForgotPassword}
                      className="my-5 w-full bg-blue-600 text-white p-2 rounded-lg"
                      onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                      
                    >
                      Gửi yêu cầu
                    </button>
                    <Link to='/dang-nhap-hoac-dang-ky' className="justify-end flex text-[#1250dc] text-[15px]">
                        Trở về đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden block  ">
            <div className={`place-content-center items-center grid login-form-animations pt-[100px]`}>
              <div>
                <div>
                  <div className={`justify-center flex`}>
                    <img src={logo} className="w-[300px]" />
                  </div>
                  <h2 className="font-semibold text-center my-3 text-[20px] whitespace-nowrap">
                    Quên mật khẩu
                  </h2>
                  <div className="justify-center grid">
                    <h2 className="font-semibold my-2 ml-4">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="text"
                      className="border focus:font-semibold min-w-[350px] placeholder:text-gray-500 placeholder:text-[13px] placeholder:font-medium border-gray-400 w-full focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Nhập email hoặc số điện thoại"
                      value={payload.Email!=='' ? payload.Email : payload.SDT}
                      onChange={(e)=>setPayload({...payload,Email:e.target.value,SDT:e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                    />
                    <button
                      onClick={handleForgotPassword}
                      className="my-5 w-full bg-blue-600 text-white p-2 rounded-lg"
                      onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                    >
                      Gửi yêu cầu
                    </button>
                    <Link to='/dang-nhap-hoac-dang-ky' className="justify-end flex text-[#1250dc] text-[13px]">
                        Trở về đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
      <div className="">
          {notifications.map(({ id, msg, open, type }) => (
            <div
              className={`whitespace-nowrap absolute ${
                type ? "bg-[#1255ff]" : "bg-red-600"
              } text-white px-2 my-2 rounded-lg p-4  transition-all duration-500 ease-in-out top-0 left-1/2 transform top-${
                id % 5
              } -translate-x-1/2 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
    </div>
  );
}

export default ForgotPasswordComponent;
