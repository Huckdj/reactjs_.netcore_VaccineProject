import React from "react";
import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Footer } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
const ThankYouComponent = () => {
    const navigate = useNavigate
  return (
    <>
        <HeaderComponent/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-teal-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-3xl font-semibold text-teal-600 mt-4">Cảm ơn bạn!</h2>
          <p className="text-xl text-gray-600 mt-2">
            Bạn đã đặt lịch thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </p>
          <div className="mt-6">
            <Link to="/"
              className="px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition duration-300"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent/>
    </>
  );
};

export default ThankYouComponent;
