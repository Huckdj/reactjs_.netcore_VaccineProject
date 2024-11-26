/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "../../Additional/NotificationComponent.js";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "../../Additional/LoadingComponent.js";

function PostType() {
  const [add, setAdd] = useState(false);
  const [data, setData] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [resmsg, setResmsg] = useState();
  const [PayLoad, setPayLoad] = useState({
    id: '',
    NameType: '',
  });
  const [LoadData, setLoadData] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      axios.post(`${urlapi}/api/PostType/GetDataPostType`)
      .then(res =>{
        setData(res.data)
      })
    }
    if(LoadData){
      fetchData()
      setLoadData(false)
    }
  },[LoadData])

  const handleResetFormBanner = () => {
    setPayLoad({
      id: '',
      NameType: '',
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.data
    ? data.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(
    (data.data ? data.data.length : 0) / itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



    // Button Handle
    const [msg, setmsg] = useState(false);
    const msgactive = (e) => {
      if (e === true) {
        setmsg(true);
        const timer = setTimeout(() => {
          setmsg(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }

    const handleAdd = () => {
      if(PayLoad.NameType === ''){
        setResmsg("NameType Trống")
      }
      else if(PayLoad.id === '' && PayLoad.NameType !== '')
      {
        axios.post(`${urlapi}/api/PostType/AddPostType`,PayLoad)
        .then(res =>{
          setResmsg(res.data.data[0].ErrorMessage)
          setLoadData(true)
        })
      }
      else if(PayLoad.id !== '' && PayLoad.NameType !== '')
      {
        axios.post(`${urlapi}/api/PostType/EditPostType`,PayLoad)
        .then(res =>{
          setResmsg(res.data.data[0].ErrorMessage)
          setLoadData(true)
        })
      }
      msgactive(true)
    }

    const handleEdit = (e) => {
      setPayLoad({
        id: e.ID,
        NameType: e.NameType
      })
      setAdd(true)
    }

    const handleDelete = (e) => {
      const id = e
      axios.post(`${urlapi}/api/PostType/DeletePostType`, {id})
      .then(res =>{
        setResmsg(res.data.data[0].ErrorMessage)
        setLoadData(true)
      })
      msgactive(true)
    }

  return (
    <div>
      {/* Form Add */}
      <div className="font-basic">
        <div className="justify-center flex mt-6 font-bold text-[15px] lg:text-2xl">
          Thêm/Xóa/Sửa loại bài viết
        </div>
        <div className="flex mx-auto ml-[100px]">
          {add === false ? (
            <button
              className="border p-2 bg-[#9af5e0] hover:bg-[#2ed3b7] delay-200 transition-all w-48 ease-in-out mr-3"
              onClick={() => setAdd(!add)}
            >
              Thêm
            </button>
          ) : (
            <div>
              <button
                className="border p-2 bg-[#9af5e0] hover:bg-[#2ed3b7] delay-200 transition-all w-48 ease-in-out mr-3"
                onClick={() => handleAdd()}
              >
                Lưu
              </button>

              <button className="border p-2" onClick={() => setAdd(!add)}>
                Đóng
              </button>

              <button className="border p-2" onClick={handleResetFormBanner}>
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Form add */}
        <div
          className={`container mt-5 grid grid-cols-1 mx-auto border rounded-lg shadow-md ${
            add ? "block" : "hidden"
          }`}
        >
          <label className="font-bold text-lg ml-4 mt-6" htmlFor="id">
            ID
          </label>
          <input
            type="text"
            disabled
            placeholder="Auto Create / Tự động tạo"
            className="border border-gray-300 rounded-md pl-3 m-4 outline-none p-2 w-[calc(100%-2rem)]"
            value={PayLoad.id}
          />

          <hr className="border-[#a4ebdd] my-4" />

          <label className="font-bold text-lg ml-4 mt-6" htmlFor="PositionCode">
            Tên loại bài viết
          </label>
          <input
            type="text"
            placeholder="Loại bài viết"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
            value={PayLoad.NameType}
            onChange={(e) =>
              setPayLoad({ ...PayLoad, NameType: e.target.value })
            }
          />

          <hr className="border-[#a4ebdd] my-4" />
          
        </div>
      </div>

      {/* data */}
      <div className="overflow-x-auto mx-auto mt-6 border rounded-lg shadow-lg ml-2 mr-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b ">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tên Post Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((e) => (
                <tr
                  key={e.id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{e.ID}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.NameType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="border p-1 pr-2 pl-2 rounded-md bg-green-200 hover:bg-green-400 mr-2"
                      onClick={() => handleEdit(e)}
                    >
                      Sửa
                    </button>
                    <button className="border p-1 pr-2 pl-2 rounded-md bg-red-200 hover:bg-red-400"
                    onClick={() => handleDelete(e.ID)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="animate-pulse h-[100px] z-10">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                </td>
              </tr>
            )}

            </tbody>
          </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 mr-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-4"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            class
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 ml-4"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
      </div>

      {msg && <NotificationComponent msg={resmsg} />}
    </div>
  );
}

export default PostType;
