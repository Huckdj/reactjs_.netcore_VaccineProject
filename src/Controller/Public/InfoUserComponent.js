/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function formatDate(inputDate) {
  const date = new Date(inputDate); // Chuyển đổi chuỗi thành đối tượng Date
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng và đảm bảo có 2 chữ số
  const year = date.getFullYear(); // Lấy năm

  // Trả về định dạng "dd-mm-yyyy"
  return `${day}-${month}-${year}`;
}

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
}


const InfoUserComponent = () => {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [userinfo, setUserinfo] = useState("");
  const [payload, setPayload] = useState({
    ID: "",
    Password: "",
    NewPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${urlapi}/api/AuthUser/GetUserInfo`, {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          const id = res.data.userId;
          axios.post(`${urlapi}/api/AuthUser/GetByID`, { id }).then((res) => {
            setUserinfo(res.data);
            setPayload({
              ID: res.data.user.ID,
            });
            const IDUser = id;

            axios
              .post(`${urlapi}/api/Booking/GetDataByID`, { IDUser })
              .then((res) => {
                setBookingHistory(res.data.data);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [urlapi]);

  const [bookingHistory, setBookingHistory] = useState([]);

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = () => {
    setLoading(true);
    if (!payload.NewPassword || payload.NewPassword.length < 8) {
      setError("Mật khẩu yếu kiểm tra lại");
      setLoading(false);
      return;
    }
    if (payload.NewPassword !== newPassword) {
      setError("Hai Mật khẩu mới không khớp");
      setLoading(false);
      return;
    } else {
      axios
        .post(`${urlapi}/api/AuthUser/RechargePassword`, payload)
        .then((res) => {
          if (res.data.data[0].ErrorCode === 0) {
            alert(res.data.data[0].ErrorMessage);
            setPayload({
              Password: "",
              NewPassword: "",
            });
            setTimeout(() => {
              setLoading(false);
              setNewPassword("");
            }, 2000);
          } else {
            setError(res.data.data[0].ErrorMessage);
            setTimeout(() => {
              setLoading(false);
              setNewPassword("");
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bookingHistory.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(bookingHistory.length / itemsPerPage);

  // Get pagination buttons
  const getPaginationButtons = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(i);
    }
    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <HeaderComponent />

      <div className="container mx-auto">
        <Tabs>
          <div className="flex flex-col md:flex-row">
            <TabList className="w-full md:w-1/5 bg-[#1255ff] text-white rounded-lg shadow-lg p-6 space-y-4">
              <Tab className="text-md py-3 px-2 cursor-pointer hover:bg-[#0f4fa5] rounded-md transition-all duration-300 font-semibold flex items-center whitespace-nowrap">
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1733258014/628297_avatar_grandmother_mature_old_person_icon_dh9bkr.png"
                  className="w-10 mr-4"
                />
                Thông tin người dùng
              </Tab>
              <Tab className="text-md py-3 px-2 cursor-pointer hover:bg-[#0f4fa5] rounded-md transition-all duration-300 font-semibold flex items-center whitespace-nowrap">
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1733258325/2d235fe2-2972-44a9-a17b-1daf0393b760.png"
                  className="w-10 mr-2"
                />
                Đổi mật khẩu
              </Tab>
              <Tab className="text-md py-3 px-2 cursor-pointer hover:bg-[#0f4fa5] rounded-md transition-all duration-300 font-semibold flex items-center whitespace-nowrap">
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1733258484/4c3132b2-2224-4b7c-99db-0f23967ccee0.png"
                  className="w-10 mr-2"
                />
                Lịch sử đặt trước
              </Tab>
            </TabList>
            <div className="w-full md:w-4/5">
              <TabPanel className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-[#1255ff]">
                  Thông tin cá nhân
                </h2>
                {userinfo && (
                  <div className="space-y-4">
                    <p className="text-lg">
                      <strong className="text-[#1255ff]">UID: </strong>
                      {userinfo.user.ID}
                    </p>
                    <p className="text-lg">
                      <strong className="text-[#1255ff]">Email: </strong>
                      {userinfo.user.Email}
                    </p>
                    {typeof userinfo.user.SDT !== 'object' ?
                      <p className="text-lg">
                      <strong className="text-[#1255ff]">
                        Số điện thoại:{" "}
                      </strong>
                      {userinfo.user.SDT}
                      </p>
                      :
                      <p className="text-lg">
                        <strong className="text-[#1255ff]">
                          Số điện thoại:{" "}
                        </strong>
                        Chưa có liên hệ admin để cập nhật
                      </p>
                    }
                    <p className="text-lg">
                      <strong className="text-[#1255ff]">Địa chỉ: </strong>
                      {userinfo.user.Address || "Hãy đợi chúng tôi Update"}
                    </p>
                  </div>
                )}
              </TabPanel>

              <TabPanel className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-[#1255ff]">
                  Đổi mật khẩu
                </h2>
                <div className="space-y-6">
                  <div>
                    <input
                      type="password"
                      placeholder="Mật khẩu cũ"
                      value={payload.Password}
                      onChange={(e) =>
                        setPayload({ ...payload, Password: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1255ff] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={payload.NewPassword}
                      onChange={(e) =>
                        setPayload({ ...payload, NewPassword: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1255ff] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1255ff] transition-all"
                    />
                  </div>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                  <button
                    onClick={handleChangePassword}
                    className={`w-full py-4 text-white font-semibold rounded-md ${
                      loading ? "bg-gray-400" : "bg-[#1255ff]"
                    } transition-all duration-300`}
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                  </button>
                </div>
              </TabPanel>

              <TabPanel className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-[#1255ff]">
                  Lịch sử đã đặt lịch của bạn
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-[#f0f8ff]">
                      <tr>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Mã lịch
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Tên người tiêm
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          SDT Người tiêm
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Ngày sinh
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Địa chỉ tiêm
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Ngày tiêm chủng
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Tên liên hệ
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Số điện thoại liên hệ
                        </th>
                        <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPaginatedData().map((booking) => (
                        <tr
                          key={booking.bookingID}
                          className="hover:bg-gray-50 transition-all"
                        >
                          <td className="p-6 whitespace-nowrap">
                            {booking.ID}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {booking.Name}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {booking.SDTInject === "" ? (
                              <p className="text-red-500">Không có</p>
                            ) : (
                              <p>{formatPhoneNumber(booking.SDTInject)}</p>
                            )}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {formatDate(booking.Birthday)}
                          </td>
                          <td className="p-4 text-green-600 whitespace-nowrap">
                            <p className="font-semibold">
                              {booking.NameCenter}
                            </p>
                            <p>{booking.Address}</p>
                          </td>
                          <td className="p-4 text-green-600 whitespace-nowrap">
                            {formatDate(booking.DateInject)}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {booking.NameContact}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {formatPhoneNumber(booking.SDT)}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {booking.status === "PROCESSING" && (
                              <p className="border px-2 py-1 rounded-lg bg-orange-500 text-white text-center">
                                Chờ xác nhận
                              </p>
                            )}
                            {booking.status === "CONFIRMED" && (
                              <p className="border px-2 py-1 rounded-lg bg-blue-500 text-white text-center">
                                Đã xác nhận
                              </p>
                            )}
                            {booking.status === "INJECTED" && (
                              <p className="border px-2 py-1 rounded-lg bg-green-500 text-white text-center">
                                Đã tiêm
                              </p>
                            )}
                            {booking.status === "CANCELED" && (
                              <p className="border px-2 py-1 rounded-lg bg-red-500 text-white text-center">
                                Đã hủy
                              </p>
                            )}
                            {booking.status === "EXPIRED" && (
                              <p className="border px-2 py-1 rounded-lg bg-red-800 text-white text-center">
                                Quá hạn
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center mt-6">
                  {/* Previous Page Button */}
                  {currentPage > 1 ? (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-green-500"
                      />
                    </button>
                  ) : (
                    <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-gray-500"
                      />
                    </div>
                  )}

                  {/* Page Number Buttons */}
                  {getPaginationButtons().map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(item)}
                      className={`mx-1 px-3 py-2 border text-blue-500 rounded-lg ${
                        currentPage === item
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                  {/* Next Page Button */}
                  {currentPage < totalPages ? (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-green-500"
                      />
                    </button>
                  ) : (
                    <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-gray-500"
                      />
                    </div>
                  )}
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>

      <FooterComponent />
    </div>
  );
};

export default InfoUserComponent;
