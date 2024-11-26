/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "../../Additional/NotificationComponent.js";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "../../Additional/LoadingComponent.js";

function BannerComponent() {
  const[LinkImgupload, setLinkImgUpload] =  useState('')
  const[isLoading, setIsLoading] = useState(false)
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [add, setAdd] = useState(false);
  const [dataBanner, setDataBanner] = useState([]);
  const [editingBanner, setEditingBanner] = useState({
    id: "",
    name: "",
    description: "",
    linkImages: "",
    posText: "",
  });
  const [msg, setmsg] = useState(false);
  const [dataPositon, setDataPosition] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [fetchDatas,setFetchData] = useState(true)
  const msgactive = (e) => {
    if (e === true) {
      setmsg(true);
      const timer = setTimeout(() => {
        setmsg(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${urlapi}/api/BannerPublics/GetBannerData`
        );
        setDataBanner(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
      setFetchData(false)
    };
    fetchData();
    if (fetchDatas) {
      fetchData();
    }
  }, [fetchDatas]);

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
      setFetchData(false)
    };
    if (fetchDatas) {
      fetchData();
    }
  }, [fetchDatas]);



  const [resmsg, setResmsg] = useState();
  const handleAddBanner = () => {
    setIsLoading(true)
    if(editingBanner.name === ''){
      setResmsg('Name không thể bỏ trống')
    }
    else if(editingBanner.description === ''){
      setResmsg('Mô tả không thể bỏ trống')
    }
    else if(editingBanner.linkImages === ''){
      setResmsg('tải lên ảnh Banner')
    }
    else if(editingBanner.PosText === ''){
      setResmsg('Chọn Ví trí')
    }
    else if(editingBanner.id === ''){
      axios.post(`${urlapi}/api/BannerPublics/AddBanner`, editingBanner)
      .then(res => {
        setResmsg(res.data.data[0].ErrorMessage)
        setFetchData(true)
      })
      .catch((error) => (
        setmsg(error)
      ))
      msgactive(true)
    }
    else if(editingBanner.id !== ''){
      axios.post(`${urlapi}/api/BannerPublics/UpDateByID`, editingBanner)
      .then(res => {
        setResmsg(res.data.data[0].ErrorMessage)
        setFetchData(true)
      })
      .catch((error) => (
        setmsg(error)
      ))
      msgactive(true)
    }
    setIsLoading(false)
  };

  const handleEditBanner = (e) => {
    setEditingBanner({
      id: e.ID,
      description: e.Description,
      name: e.Name,
      linkImages: e.LinkImages,
      PosText:e.PosText
    });

    setLinkImgUpload(e.LinkImages)
    setAdd(true);
  };
  
  const handleDeleteBanner = (e) => {
    const id = e
    axios.post(`${urlapi}/api/BannerPublics/DeleteBanner`,{id})
    .then(res => (
      setResmsg(res.data.data[0].ErrorMessage)
    )).catch(error => (
      setResmsg(error)
    ))
    setFetchData(true)
    msgactive(true)
  }
  
  const handleResetFormBanner = () => {
    setEditingBanner({
      id: "",
      name: "",
      description: "",
      linkImages: "",
      posText: "",
    })
  }


  // page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataBanner.data
    ? dataBanner.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(
    (dataBanner.data ? dataBanner.data.length : 0) / itemsPerPage
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



// API get Link images
const uploadImageToCloudinary = async (imageFile) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "myuploadpreset");
  formData.append("folder", "BannerMADUVaccine");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dumx42hqq/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploadedLink = response.data.secure_url;
    setLinkImgUpload(uploadedLink);
    setEditingBanner((prevState) => ({
      ...prevState,
      linkImages: uploadedLink,
    }));
    console.log(editingBanner);
  } catch (error) {
    console.error(error);
  }
  setIsLoading(false);
};






  return (
    <div>
      <div className="font-basic">
        <div className="justify-center flex mt-6 font-bold text-[15px] lg:text-2xl">
          Thêm xóa sửa Banner
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
                onClick={() => handleAddBanner()}
              >
                Lưu
              </button>
              <button className="border p-2" onClick={() => setAdd(!add)}>
                Đóng
              </button>
              <button className="border p-2" onClick={() => handleResetFormBanner()}>
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
            value={editingBanner.id}
          />

          <hr className="border-[#a4ebdd] my-4" />

          <label className="font-bold text-lg ml-4 mt-6" htmlFor="PositionCode">
            Tên Banner
          </label>
          <input
            type="text"
            placeholder="Mã vị trí"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
            value={editingBanner.name}
            onChange={(e) =>
              setEditingBanner({ ...editingBanner, name: e.target.value })
            }
          />

          <hr className="border-[#a4ebdd] my-4" />

          <label
            className="font-bold text-lg ml-4 mt-6"
            htmlFor="NamePossition"
          >
            Mô Tả Banner
          </label>
          <input
            type="text"
            placeholder="Nhập Tên vị trí banner"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
            value={editingBanner.description}
            onChange={(e) =>
              setEditingBanner({
                ...editingBanner,
                description: e.target.value,
              })
            }
          />

          <hr className="border-[#a4ebdd] my-4" />

          <label
            className="font-bold text-lg ml-4 mt-6"
            htmlFor="NamePossition"
          >
            Ảnh Banner
          </label>
          
          <input
            type="file"
            id="file-upload"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)] hidden"
            accept="image/*"
            onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
          />
          {editingBanner.linkImages !== '' ? (
            <label className="justify-center border m-4 rounded-md flex cursor-pointer" for='file-upload'>
              <img src={editingBanner.linkImages} className="w-full min-w-[300px] max-w-[450px]"/>
            </label>
          ):(
              <label className="justify-center border m-4 rounded-md flex cursor-pointer" for='file-upload'>
                <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1730307526/Untitled_Project_2_llb95j.png" className="w-full min-w-[200px] max-w-[300px]"/>
              </label>
          ) }
          
          <label
            className="font-bold text-lg ml-4 mt-6"
            htmlFor="NamePossition"
          >
            Vị trí
          </label>
          <select
            className="border border-green-500 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)] bg-green-50 text-green-700 focus:border-green-600"
            onChange={(e) =>
              setEditingBanner({ ...editingBanner, posText: e.target.value })
            }
          >
            <option value='' className="text-green-600">Chọn vị trí banner</option>
            {dataPositon.data && Array.isArray(dataPositon.data) ? (
              dataPositon.data.map((e) => (
                <option
                  key={e.PositionCode}
                  value={e.PositionCode}
                  className="font-semibold bg-green-50 text-green-700 hover:bg-green-100"
                >
                  {e.PositionCode} ({e.Name})
                </option>
              ))
            ) : (
              <option disabled className="text-green-600">
                Không có dữ liệu vị trí
              </option>
            )}
          </select>
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
                  Ảnh Mẫu
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tên mô tả
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Ngày Giờ Tạo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  PositionID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                  Hành động
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={e.LinkImages} className="max-w-[200px]" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.Description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ConvertDatetimeserver isoString={e.CreateDate} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.PosText}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="border p-1 pr-2 pl-2 rounded-md bg-green-200 hover:bg-green-400 mr-2"
                      onClick={() => handleEditBanner(e)}
                    >
                      Sửa
                    </button>
                    <button className="border p-1 pr-2 pl-2 rounded-md bg-red-200 hover:bg-red-400"
                    onClick={() => handleDeleteBanner(e.ID)}
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
                  <div className="w-[200px] h-16 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-48 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-20 h-6 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-8 bg-gray-200 rounded"></div>
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
        {isLoading === true && <LoadingComponent/>}
      </div>
    </div>
  );
}

export default BannerComponent;
