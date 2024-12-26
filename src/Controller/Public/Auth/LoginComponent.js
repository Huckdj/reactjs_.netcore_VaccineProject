/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "../../../Asset/Css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import LoadingLoginForm from "../../Additional/LoadingLoginForm";
function LoginComponent() {
  const logo = process.env.REACT_APP_LOGO_IMG;
  const [openclouse, setOpenclouse] = useState(false);
  const [formlogin, setFormlogin] = useState({
    UserAuth:"",
    Password:""
  })
  const [agreeclouse, setAgreeclouse] = useState(true)
  const [notifications, setNotifications] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleLogin = () =>{
    setIsLoading(true)
    const id = Date.now();
    if(agreeclouse){
      axios.post(
        `${urlapi}/api/AuthUser/LoginAuthUs`,
        formlogin
      )
      .then(res => {
        if(res.data.user.ErrorCode === 0){
          const newNotification = {
            id,
            msg: `${res.data.user.ErrorMessage} chúng tôi đang chuyển hướng`,
            open: true,
            type: true,
          };
          setNotifications((prev) => [...prev, newNotification]);
          localStorage.setItem('token',res.data.user.token)
          setIsLoading(false)
          setTimeout(() => {
            setNotifications((prev) =>
              prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
            );
            navigate('/')
          }, 2000);
        }
        else{
          const newNotification = {
            id,
            msg: `${res.data.user.ErrorMessage}`,
            open: true,
            type: false,
          };
          setNotifications((prev) => [...prev, newNotification]);
          setIsLoading(false)
        }
      })
    }else{
      const newNotification = {
        id,
        msg: "Vui lòng đồng ý với điều khoản của chúng tôi",
        open: true,
        type: false,
      };
      setNotifications((prev) => [...prev, newNotification]);
      setIsLoading(false)
    }
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
      );
    }, 2000);
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      
      const googleLoginData = {
        Email: decoded.email,
        GoogleId: decoded.sub
      };

      const response = await axios.post(`${urlapi}/api/AuthUser/GoogleLogin`, googleLoginData);

      if (response.data.user.ErrorCode === 0) {
        const id = Date.now();
        const newNotification = {
          id,
          msg: `Đăng nhập thành công! Chúng tôi đang chuyển hướng`,
          open: true,
          type: true,
        };
        
        setNotifications((prev) => [...prev, newNotification]);
        localStorage.setItem('token', response.data.user.token);
        
        setTimeout(() => {
          setNotifications((prev) =>
            prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
          );
          navigate('/');
        }, 2000);
      } else {
        throw new Error(response.data.user.ErrorMessage);
      }
    } catch (error) {
      const id = Date.now();
      const newNotification = {
        id,
        msg: error.message || 'Đăng nhập Google không thành công',
        open: true,
        type: false,
      };
      
      setNotifications((prev) => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
        );
        navigate('/');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    const id = Date.now();
    const newNotification = {
      id,
      msg: 'Đăng nhập Google không thành công',
      open: true,
      type: false,
    };
    
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
      );
      navigate('/');
    }, 2000);
  };
  return (
    <div className="bg-[#fffbf1] h-screen ">
      <div
        className={`bg-[url("https://res.cloudinary.com/dumx42hqq/image/upload/v1732230517/Untitled_Project_1_hqaor0.jpg")] bg-animations `}
      >
        <div className="lg:block hidden">
          <div className="flex items-center p-10 relative container mx-auto my-auto">
            <Link to='/'><img src={logo} className="w-[200px]" /></Link>
            <span className="font-semibold absolute bottom-0 whitespace-nowrap ">
              Đăng nhập vào dịch vụ của chúng tôi
            </span>
          </div>
          <div className="grid grid-cols-2 mt-6 container mx-auto">
            <div className="flex animation-login">
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
                <div className={`${openclouse ? `hidden` : ``}`}>
                  <div className={`justify-center flex`}>
                    <img src={logo} className="w-[300px]" />
                  </div>
                  <h2 className="font-semibold my-3 text-[20px] whitespace-nowrap">
                    Chào mừng trở lại thành viên của chúng tôi
                  </h2>
                  <div className="justify-center grid">
                    <h2 className="font-semibold my-2">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="text"
                      className="border focus:font-semibold placeholder:text-gray-500 placeholder:text-[13px] placeholder:font-medium border-gray-400 focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Nhập email hoặc số điện thoại"
                      value={formlogin.UserAuth}
                      onChange={(e)=>setFormlogin({...formlogin, UserAuth:e.target.value,})}
                    />
                    <h2 className="font-semibold my-2">
                      Mật khẩu <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="password"
                      className="border placeholder:text-gray-500 focus:font-semibold placeholder:text-[13px] placeholder:font-medium border-gray-400 focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Mật khẩu"
                      value={formlogin.Password}
                      onChange={(e)=>setFormlogin({...formlogin, Password:e.target.value,})}
                    />

                    <div className="items-center flex my-2">
                      <input
                        type="checkbox"
                        className=" mx-2 w-5 h-5 appearance-none border-2 border-gray-300 rounded-md cursor-pointer transition duration-300 focus:ring-2 focus:ring-blue-500 checked:bg-[#1250dc] "
                        checked={agreeclouse}
                        onChange={()=> setAgreeclouse(!agreeclouse)}
                      />
                      <span className="font-medium">
                        Bạn đồng ý với{" "}
                        <span
                          onClick={() => setOpenclouse(true)}
                          className="cursor-pointer text-[#1250dc]"
                        >
                          Điều khoản
                        </span>{" "}
                        của chúng tôi
                      </span>
                    </div>

                    <button className="my-4 border py-2 rounded-lg bg-[#1250dc] text-white" onClick={()=> handleLogin()}>
                      Đăng nhập
                    </button>
                  </div>
                  <div className="grid place-content-center font-medium py-2">
                    Hoặc đăng nhập nhanh với
                  </div>
                  <div className="place-content-center grid ">
                    <div className="  gap-6">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        size="large"
                        shape="rectangular"
                        logo_alignment="center"
                      />
                    </div>
                  </div>

                  <div className="font-medium py-6 justify-end flex text-[12px]">
                    <span>
                      Bạn chưa có tài khoản{" "}
                      <Link
                        to="/dang-ky-tai-khoan"
                        className="text-[#1250dc] font-semibold"
                      >
                        Đăng ký
                      </Link>{" "}
                      hoặc{" "}
                      <Link to='/quen-mat-khau' className="text-[#1250dc] font-semibold">
                        Quên mật khẩu
                      </Link>
                    </span>
                  </div>
                </div>
                <div
                  className={`article-clouse ${
                    openclouse ? `grid ` : `hidden`
                  }`}
                >
                  <div className="justify-start flex">
                    <button onClick={() => setOpenclouse(false)}>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="border p-2 rounded-full bg-[#1250dc] text-white"
                      />
                    </button>
                  </div>
                  <div>
                    <div className="place-content-center grid">
                      <img src={logo} className="w-[300px]" />
                      <h2 className="font-semibold text-[25px] py-2">
                        Điều khoản và chính sách
                      </h2>
                    </div>
                    <div className="w-[500px]">
                      <h2 className="font-semibold text-[20px] py-2">
                        1. Phạm vi thu nhập thông tin
                      </h2>
                      <p className="font-medium text-[12px] px-2 text-justify">
                        Việc thu thập dữ liệu chủ yếu bao gồm nhưng không giới
                        hạn: email, điện thoại, tên đăng nhập, mật khẩu đăng
                        nhập, địa chỉ, số CMND, passport, quốc tịch, giấy chứng
                        nhận đăng ký kinh doanh và các thông tin khác liên quan
                        đến việc cung cấp dịch vụ, sản phẩm MADU. Đây là các
                        thông tin mà MADU cần khách hàng cung cấp bắt buộc khi
                        đăng ký sử dụng dịch vụ và để MADU liên hệ xác nhận nhằm
                        đảm bảo quyền lợi cho cho chính khách hàng.
                      </p>
                      <h2 className="font-semibold text-[20px] py-2">
                        2. Phạm vi sử dụng thông tin
                      </h2>
                      <p className="font-medium text-[12px] px-2 text-justify">
                        Chúng tôi rất coi trọng việc bảo mật thông tin khách
                        hàng, chúng tôi cam kết tuyệt đối không tự ý sử dụng
                        thông tin khách hàng với mục đích không mang lại lợi ích
                        cho khách hàng, chúng tôi cam kết không buôn bán, trao
                        đổi thông tin bảo mật của khách hàng cho bất cứ bên thứ
                        ba nào.
                      </p>
                    </div>
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


        {/* Mobile */}
        <div className="lg:hidden block ">
          <div className="container mx-auto">
            <div className={`place-content-center grid login-form-animations`}>
              <div>
                <div className={`mt-12 ${openclouse ? `hidden` : ``}`}>
                  <div className={`justify-center flex`}>
                    <img src={logo} className="w-[300px]" />
                  </div>
                  <h2 className="font-semibold my-3 text-[20px] text-center">
                    Chào mừng trở lại thành viên của chúng tôi
                  </h2>
                  <div className="justify-center grid">
                    <h2 className="font-semibold my-2">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="text"
                      className="border focus:font-semibold placeholder:text-gray-500 placeholder:text-[13px] placeholder:font-medium border-gray-400 focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Nhập email hoặc số điện thoại"
                      value={formlogin.UserAuth}
                      onChange={(e)=>setFormlogin({...formlogin, UserAuth:e.target.value,})}
                    />
                    <h2 className="font-semibold my-2">
                      Mật khẩu <span className="text-red-500">*</span>
                    </h2>
                    <input
                      type="password"
                      className="border placeholder:text-gray-500 focus:font-semibold placeholder:text-[13px] placeholder:font-medium border-gray-400 focus:border-blue-600 focus:outline-none h-[40px] rounded-lg px-4"
                      placeholder="Mật khẩu"
                      value={formlogin.Password}
                      onChange={(e)=>setFormlogin({...formlogin, Password:e.target.value,})}
                    />

                    <div className="items-center flex my-2">
                      <input
                        type="checkbox"
                        className=" mx-2 w-5 h-5 appearance-none border-2 border-gray-300 rounded-md cursor-pointer transition duration-300 focus:ring-2 focus:ring-blue-500 checked:bg-[#1250dc] "
                        checked={agreeclouse}
                        onChange={()=> setAgreeclouse(!agreeclouse)}
                      />
                      <span className="font-medium">
                        Bạn đồng ý với{" "}
                        <span
                          onClick={() => setOpenclouse(true)}
                          className="cursor-pointer text-[#1250dc]"
                        >
                          Điều khoản
                        </span>{" "}
                        của chúng tôi
                      </span>
                    </div>

                    <button className="my-4 border py-2 rounded-lg bg-[#1250dc] text-white" onClick={() => handleLogin()}>
                      Đăng nhập
                    </button>
                  </div>
                  <div className="grid place-content-center font-medium py-2">
                    Hoặc đăng nhập nhanh với
                  </div>
                  <div className="place-content-center grid ">
                    <div className="  gap-6">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          size="large"
                          shape="rectangular"
                          logo_alignment="center"
                        />
                      </div>
                  </div>

                  <div className="font-medium py-6 justify-end mr-2 flex text-[12px]">
                    <span>
                      Bạn chưa có tài khoản{" "}
                      <Link
                        to="/dang-ky-tai-khoan"
                        className="text-[#1250dc] font-semibold"
                      >
                        Đăng ký
                      </Link>{" "}
                      hoặc{" "}
                      <Link to='/quen-mat-khau' className="text-[#1250dc] font-semibold">
                        Quên mật khẩu
                      </Link>
                    </span>
                  </div>
                </div>
                <div
                  className={`article-clouse ${
                    openclouse ? `grid ` : `hidden`
                  }`}
                >
                  <div className="justify-start flex py-6">
                    <button onClick={() => setOpenclouse(false)}>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="border p-2 rounded-full bg-[#1250dc] text-white"
                      />
                    </button>
                  </div>
                  <div className="container mx-auto">
                    <div className="place-content-center grid">
                      <img src={logo} className="w-[300px]" />
                      <h2 className="font-semibold text-[25px] py-2">
                        Điều khoản và chính sách
                      </h2>
                    </div>
                    <div className="">
                      <h2 className="font-semibold text-[20px] py-2">
                        1. Phạm vi thu nhập thông tin
                      </h2>
                      <p className="font-medium text-[12px] px-2 text-justify">
                        Việc thu thập dữ liệu chủ yếu bao gồm nhưng không giới
                        hạn: email, điện thoại, tên đăng nhập, mật khẩu đăng
                        nhập, địa chỉ, số CMND, passport, quốc tịch, giấy chứng
                        nhận đăng ký kinh doanh và các thông tin khác liên quan
                        đến việc cung cấp dịch vụ, sản phẩm MADU. Đây là các
                        thông tin mà MADU cần khách hàng cung cấp bắt buộc khi
                        đăng ký sử dụng dịch vụ và để MADU liên hệ xác nhận nhằm
                        đảm bảo quyền lợi cho cho chính khách hàng.
                      </p>
                      <h2 className="font-semibold text-[20px] py-2">
                        2. Phạm vi sử dụng thông tin
                      </h2>
                      <p className="font-medium text-[12px] px-2 text-justify">
                        Chúng tôi rất coi trọng việc bảo mật thông tin khách
                        hàng, chúng tôi cam kết tuyệt đối không tự ý sử dụng
                        thông tin khách hàng với mục đích không mang lại lợi ích
                        cho khách hàng, chúng tôi cam kết không buôn bán, trao
                        đổi thông tin bảo mật của khách hàng cho bất cứ bên thứ
                        ba nào.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {isLoading && <LoadingLoginForm/>}
    </div>
  );
}

export default LoginComponent;
