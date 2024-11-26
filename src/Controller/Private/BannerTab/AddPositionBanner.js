/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NoficationComponent from "../../Additional/NotificationComponent";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function AddPosition() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [add, setAdd] = useState(false);
  const [dataPositon, setDataPosition] = useState([]);
  const [editingPosition, setEditingPosition] = useState({
    id: "",
    positionCode: "",
    name: ""
  });
  const [msg, setmsg] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  const[fetchDatareload, setFetchDatareload] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${urlapi}/api/PositionBanner/GetPositionData`
        );
        setDataPosition(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    if(fetchDatareload === true)
    {
      fetchData();
      setFetchDatareload(false)
    }
  }, [fetchDatareload]);

  const[resmsg, setResmsg]= useState() 
  const handleAddPosition = () => {
    if(editingPosition.positionCode === '')
    {
      setResmsg('PositionCode không thể để trống')
    }
    else if(editingPosition.name === '')
    {
      setResmsg('Name không thể bỏ trống')
    }
    else if(editingPosition.id === ''){
      axios.post(`${urlapi}/api/PositionBanner/AddPositionBanner`, editingPosition)
      .then( res => {
        setResmsg(res.data.data[0].ErrorMessage)
        setFetchDatareload(true)
      })
    }
    else if(editingPosition.id !== ''){
      axios.post(`${urlapi}/api/PositionBanner/EditPositionBanner`, editingPosition)
      .then( res => {
        setResmsg(res.data.data[0].ErrorMessage)
        setFetchDatareload(true)
      })
    }

    if (msg === false) {
      setmsg(true);
      const timer = setTimeout(() => {
        setmsg(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setmsg(false);
    }
  };

  const handleDelte = (e) => {
    const id = e
    axios.post(`${urlapi}/api/PositionBanner/DeletePosition`,{id})
    .then(res => 
      setResmsg(res.data.data[0].ErrorMessage)
    )
    if (msg === false) {
      setmsg(true);
      const timer = setTimeout(() => {
        setmsg(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setmsg(false);
    }
    setFetchDatareload(true)
  }
  const handleEditPosition = (position) => {
    setEditingPosition({
      id: position.ID,
      positionCode: position.PositionCode,
      name: position.Name
    });
    setAdd(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPositon.data ? dataPositon.data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil((dataPositon.data ? dataPositon.data.length : 0) / itemsPerPage);

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

  return (
    <div className="font-basic">
      <div className="justify-center flex mt-6 font-bold text-[15px] lg:text-2xl">
        Thêm/ Chỉnh sửa vị trí của banner
      </div>
      <div className="flex mx-auto ml-[100px]">
        <div></div>
        {add === false ? (
          <button
            className="border p-2 bg-[#9af5e0] hover:bg-[#2ed3b7] delay-200 transition-all w-48 ease-in-out mr-3"
            onClick={(e) => setAdd(!add)}
          >
            Thêm
          </button>
        ) : (
          <div>
            <button
              className="border p-2 bg-[#9af5e0] hover:bg-[#2ed3b7] delay-200 transition-all w-48 ease-in-out mr-3"
              onClick={() => handleAddPosition()}
            >
              Lưu
            </button>
            <button className="border p-2" onClick={() => setAdd(!add)}>Đóng</button>
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
          value={editingPosition.id}
        />

        <hr className="border-[#a4ebdd] my-4" />

        <label className="font-bold text-lg ml-4 mt-6" htmlFor="PositionCode">
          Position Code
        </label>
        <input
          type="text"
          placeholder="Mã vị trí"
          className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
          value={editingPosition.positionCode}
          onChange={(e) => setEditingPosition({ ...editingPosition, positionCode: e.target.value })}
        />

        <hr className="border-[#a4ebdd] my-4" />

        <label className="font-bold text-lg ml-4 mt-6" htmlFor="NamePossition">
          Tên Vị Trí Banner
        </label>
        <input
          type="text"
          placeholder="Nhập Tên vị trí banner"
          className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
          value={editingPosition.name}
          onChange={(e) => setEditingPosition({ ...editingPosition, name: e.target.value })}
        />
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
                Mã Code (PositionId)
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Ngày Giờ Tạo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b"></th>
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
        <td className="px-6 py-4 whitespace-nowrap">{e.PositionCode}</td>
        <td className="px-6 py-4 whitespace-nowrap">{e.Name}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <ConvertDatetimeserver isoString={e.CreatedAt} />
        </td>
        <td>
          <button
            className="border p-1 pr-2 pl-2 rounded-md bg-green-200 hover:bg-green-400 mr-2"
            onClick={() => handleEditPosition(e)}
          >
            Sửa
          </button>
          <button
            className="border p-1 pr-2 pl-2 rounded-md bg-red-200 hover:bg-red-400"
            onClick={() => handleDelte(e.ID)}
          >
            Xóa
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      {[...Array(5)].map((_, index) => (
        <td
          key={index}
          className="px-6 py-4 whitespace-nowrap animate-pulse"
          colSpan={index === 4 ? 2 : 1} // colspan 2 cho ô cuối (nút Sửa, Xóa)
        >
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </td>
      ))}
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
          <FontAwesomeIcon icon={faArrowLeft}/>
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
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </div>
      {msg && <NoficationComponent msg={resmsg} />}
    </div>
  );
}

export default AddPosition;
