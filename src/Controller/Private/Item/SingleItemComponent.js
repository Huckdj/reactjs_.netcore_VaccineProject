/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver";
import axios from "axios";
import SeenPostReview from "../PostTab/SeenPostReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import JoditEditor from "jodit-react";
import NotificationComponent from "../../Additional/NotificationComponent";

function PackageItemComponent() {
  const [data, setData] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [reloaddata, setReloaddata] = useState(true);
  
  // Fetch main data
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`${urlapi}/api/SingleItem/GetDataSingleAllItem`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    if (reloaddata) {
      fetchData();
      setReloaddata(false);
    }
  }, [reloaddata]);

  // Fetch country items
  const [TypePack, setTypePack] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios.post(`${urlapi}/api/CountryItem/GetdataPublic`).then((res) => {
        setTypePack(res.data.data);
      });
    };
    fetchData();
  }, []);

  // Fetch age types
  const [AgePack, setAgePack] = useState([]);
  useEffect(() => {
    const fetchAgeTypes = async () => {
      axios.post(`${urlapi}/api/AgeItem/GetData`).then((res) => {
        setAgePack(res.data.data);
      });
    };
    fetchAgeTypes();
  }, []);

  const [seenpostfull, setSeenpostfull] = useState(false);
  const [FullContents, setFullContents] = useState();
  const handleOpenReview = (e) => {
    setFullContents(e);
    setSeenpostfull(true);
  };

  const [openinsert, setOpeninsert] = useState(false);
  const [payload, setPayload] = useState({
    ID: "",
    Name: "",
    Price: "",
    ShortContent: "",
    FullContent: "",
    LinkImages:"",
    LinkRoute:"",
    CountryItem:"",
    AgeType: "", // Added AgeType to payload
  });

  const editor = useRef(null);
  const handleUpdateFullContent = (newContent) => {
    setPayload((prevState) => ({
      ...prevState,
      FullContent: newContent,
    }));
  };

  const [isLoading,setIsLoading] = useState(false)
  const uploadImageToCloudinary = async (imageFile) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "myuploadpreset");
    formData.append("folder", "Item");

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
      setPayload((prevState) => ({
        ...prevState,
        LinkImages: uploadedLink,
      }));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const [msg,setMsg] = useState(false)
  const [resmsg, setResmsg] = useState()
  const handleSave = () =>{
    // check data send
    if(payload.Name === '' || payload.Price === '' || payload.CountryItem === '' || payload.ShortContent === '' 
      || payload.FullContent === '' || payload.LinkImages === '' || payload.LinkRoute === '' || payload.AgeType === '')
    {
      setResmsg('Thiếu trường dữ liệu')
      if (msg === false) {
        setMsg(true);
        const timer = setTimeout(() => {
            setMsg(false);
        }, 5000);
        return () => clearTimeout(timer);
      } else {
        setMsg(false);
      }
    }

    else{
      // Modify payload to match the new structure
      const submitPayload = {
        name: payload.Name,
        Price: parseFloat(payload.Price),
        CountryItem: payload.CountryItem,
        ShortContent: payload.ShortContent,
        FullContent: payload.FullContent,
        LinkImages: payload.LinkImages,
        LinkRoute: payload.LinkRoute,
        AgeType: payload.AgeType
      };

      if(payload.ID === ''){
        axios.post(`${urlapi}/api/SingleItem/InsertItem`, submitPayload)
        .then(
          res =>{
            setResmsg(res.data.data[0].ErrorMessage)
            setReloaddata(true)
            setPayload({
              ID: "",
              Name: "",
              Price: "",
              ShortContent: "",
              FullContent: "",
              LinkImages:"",
              LinkRoute:"",
              CountryItem:"",
              AgeType: ""
            })
            if (msg === false) {
              setMsg(true);
              const timer = setTimeout(() => {
                  setMsg(false);
              }, 5000);
              return () => clearTimeout(timer);
            } else {
              setMsg(false);
            }
          }
        )
        .catch(err =>{
            setResmsg(err.data.data[0].ErrorMessage)
            if (msg === false) {
              setMsg(true);
              const timer = setTimeout(() => {
                  setMsg(false);
              }, 5000);
              return () => clearTimeout(timer);
            } else {
              setMsg(false);
            }
        })
      }
      else{
        // Add ID to payload for edit
        submitPayload.id = payload.ID;
        axios.post(`${urlapi}/api/SingleItem/EditSingleItem`, submitPayload)
        .then(
          res =>{
            setResmsg(res.data.data[0].ErrorMessage)
            setReloaddata(true)
            setPayload({
              ID: "",
              Name: "",
              Price: "",
              ShortContent: "",
              FullContent: "",
              LinkImages:"",
              LinkRoute:"",
              CountryItem:"",
              AgeType: ""
            })
            if (msg === false) {
              setMsg(true);
              const timer = setTimeout(() => {
                  setMsg(false);
              }, 5000);
              return () => clearTimeout(timer);
            } else {
              setMsg(false);
            }
          }
        )
        .catch(err =>{
            setResmsg(err)
            if (msg === false) {
              setMsg(true);
              const timer = setTimeout(() => {
                  setMsg(false);
              }, 5000);
              return () => clearTimeout(timer);
            } else {
              setMsg(false);
            }
        })
      }
    }
  }

  const handleEdit = (e) =>{
    setPayload({
      ID: e.ID,
      Name: e.Name,
      Price: e.Price,
      ShortContent: e.ShortContent,
      FullContent: e.FullContent,
      LinkImages:e.LinkImages,
      LinkRoute:e.LinkRoute,
      CountryItem:e.CountryItem,
      AgeType: e.AgeType
    })
    setOpeninsert(true)
  }

  const handleDelete = (e) =>{
    const id = e 
    axios.post(`${urlapi}/api/SingleItem/Deletesingleitem`,{id})
    .then(
      res =>{
        setResmsg(res.data.data[0].ErrorMessage)
        setReloaddata(true)
        if (msg === false) {
          setMsg(true);
          const timer = setTimeout(() => {
              setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setMsg(false);
        }
      }
    )
    .catch(
      err =>{
        setResmsg(err.data.data[0].ErrorMessage)
        setReloaddata(true)
        if (msg === false) {
          setMsg(true);
          const timer = setTimeout(() => {
              setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setMsg(false);
        }
    }
    )
  }

  const handleSetActive = (e) =>{
    const payloadupdate = ({
      ID: e.ID,
      IsActive:!e.IsActive
    })
    axios.post(`${urlapi}/api/SingleItem/ActiveSingleItem`,payloadupdate)
    .then(
      res =>{
        setResmsg(res.data.data[0].ErrorMessage)
        setReloaddata(true)
        if (msg === false) {
          setMsg(true);
          const timer = setTimeout(() => {
              setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setMsg(false);
        }
      }
    )
    .catch(
      err =>{
        setResmsg(err)
        setReloaddata(true)
        if (msg === false) {
          setMsg(true);
          const timer = setTimeout(() => {
              setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setMsg(false);
        }
    }
    )
  }
  return (
    <div className="mt-6">
      {/* Form input */}
      <div
        className={`my-6 overflow-x-auto mx-auto border rounded-lg delay-150 transition-all shadow-lg ml-2 mr-2 ${
          openinsert ? "min-h-screen" : "min-h-0"
        }`}
      >
        <div className="my-2 mb-6">
          <div className="flex">
            <button
              className={`m-2 rounded-lg bg-green-200 hover:bg-green-600 hover:text-white p-2 border ${
                openinsert === false ? "block" : "hidden"
              }`}
              onClick={() => setOpeninsert(!openinsert)}
            >
              Thêm Mới
            </button>

            {/* Thêm dữ liệu */}
            <button
              className={`m-2 rounded-lg bg-green-200 hover:bg-green-600 px-8 hover:text-white p-2 border ${
                openinsert === false ? "hidden" : "block"
              }`}
              onClick={() => handleSave()}
            >
              Lưu
            </button>
            <button
              className={`m-2 rounded-lg bg-red-200 hover:bg-red-600 px-8 hover:text-white p-2 border ${
                openinsert === false ? "hidden" : "block"
              }`}
              onClick={() => setOpeninsert(!openinsert)}
            >
              Đóng
            </button>
          </div>

          <div
            className={`container mx-auto delay-150 transition-all ${
              openinsert ? "grid max-h-[400px]" : "grid max-h-0 overflow-hidden"
            }`}
          >
            <hr className="mt-6" />
            {/* ID */}
            <label className="font-semibold mb-2">ID</label>
            <input
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              disabled
              placeholder="AutoCreate/Tự động tạo"
              value={payload.ID}
              onChange={(e) => setPayload({...payload,ID:e.target.value})}
            ></input>

            <hr className="mt-6" />
            {/* Tên vắc xin */}
            <label className="font-semibold mb-2 mt-2">Tên vắc xin</label>
            <input
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              placeholder="Nhập Tên vắc xin"
              value={payload.Name}
              onChange={(e)=>setPayload({...payload,Name:e.target.value})}
            ></input>

            <hr className="mt-6" />
            {/* Nhập giá */}
            <label className="font-semibold mb-2 mt-2">Giá</label>
            <input
              type="number"
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              value={payload.Price}
              onChange={(e) =>
                setPayload({ ...payload, Price: e.target.value })
              }
              placeholder="Nhập giá"
            ></input>

            <hr className="mt-6" />
            {/* Link liên kết */}
            <label className="font-semibold mb-2 mt-2">Link liên kết</label>
            <input
              type="text"
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              value={payload.LinkRoute}
              onChange={(e) =>
                setPayload({ ...payload, LinkRoute: e.target.value })
              }
              placeholder="Nhập Link liên kết"
            ></input>

            <hr className="mt-6" />
            {/* Chọn nước sản xuất */}
            <label className="font-semibold mb-2 mt-2">Chọn nước sản xuất</label>
            <select
              id="select-CountryItem"
              className="border outline-none px-2 py-1 font-semibold rounded-md"
              defaultValue=""
              onChange={(e)=>setPayload({...payload,CountryItem:e.target.value})}
            >
              <option value="" className="text-gray-400" disabled>
                Chọn nước sản xuất
              </option>
              {TypePack.map((r) => (
                <option
                  value={r.NameCountry}
                  className="text-gray-600 font-semibold"
                >
                  {r.NameCountry}
                </option>
              ))}
            </select>


            <hr className="mt-6" />
        {/* Chọn độ tuổi */}
        <label className="font-semibold mb-2 mt-2">Độ tuổi</label>
        <select
          id="select-AgeType"
          className="border outline-none px-2 py-1 font-semibold rounded-md"
          value={payload.AgeType}
          onChange={(e)=>setPayload({...payload, AgeType:e.target.value})}
        >
          <option value="" className="text-gray-400" disabled>
            Chọn độ tuổi
          </option>
          {AgePack.map((r) => (
            <option
              key={r.ID}
              value={r.NameYearOld}
              className="text-black font-semibold"
            >
              {r.NameYearOld}
            </option>
          ))}
        </select>

            <hr className="mt-6" />
            {/* Mô tả ngắn */}
            <label className="font-semibold mb-2 mt-2">Mô tả ngắn</label>
            <textarea
              type="text"
              className="border outline-none px-2 py-1 font-semibold min-h-[200px] rounded-md"
              value={payload.ShortContent}
              onChange={(e) =>
                setPayload({ ...payload, ShortContent: e.target.value })
              }
              placeholder="Nhập mô tả ngắn"
            ></textarea>

            <hr className="mt-6" />
            {/* ảnh bài sản phẩm */}
            <label className="font-semibold mb-2 mt-2">Ảnh sản phẩm</label>
            <input
              type="file"
              id="file-upload"
              className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)] hidden"
              accept="image/*"
              onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
            />
            {payload.LinkImages !== "" ? (
              <label
                className="place-content-center grid border min-h-[200px] rounded-md cursor-pointer"
                for="file-upload"
              >
                <img
                  src={payload.LinkImages}
                  className="w-full min-w-[450px] max-w-[450px]"
                />
              </label>
            ) : (
              <label
                className="justify-center border rounded-md flex cursor-pointer"
                for="file-upload"
              >
                <img
                  src="https://res.cloudinary.com/dumx42hqq/image/upload/v1730307526/Untitled_Project_2_llb95j.png"
                  className="w-full min-w-[200px] max-w-[300px]"
                />
              </label>
            )}

            <hr className="mt-6" />
            {/* Mô tả dài */}
            <label className="font-semibold mb-2 mt-2">Mô tả dài</label>
            <JoditEditor
              ref={editor}
              value={payload.FullContent}
              tabIndex={1}
              config={{
                placeholder: "Nhập nội dung",
                readonly: false
              }}
              onChange={handleUpdateFullContent}
              className="h-auto"
            />
          </div>
        </div>
      </div>

      {/* data */}
      <div className="my-6 overflow-x-auto mx-auto border rounded-lg shadow-lg ml-2 mr-2">
        <table className="min-w-full divide-y container divide-gray-200 overflow-x-auto mx-auto overflow-y-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Khóa
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Tên Vắc Xin
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Giá
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Độ tuổi
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Nước sản xuất
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Mô tả ngắn
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Mô tả dài
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Ảnh Mô tả
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Thời gian tạo
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Link Liên kết
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Hành động
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((e) => (
              <tr
                key={e.ID}
                className={`hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  <button
                      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        e.IsActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                      onClick={() =>handleSetActive(e)}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          e.IsActive ? "translate-x-8" : "translate-x-0"
                        }`}
                      ></div>
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.ID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.PriceFormat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.AgeType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.CountryItem}
                </td>
                <td className="px-6 py-4 border-r border-b">
                  {e.ShortContent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  <button
                    onClick={() => handleOpenReview(e.FullContent)}
                    className="border px-2 py-1 rounded-lg bg-[#1255ff] text-white hover:bg-blue-400 border-b"
                  >
                    Xem
                  </button>
                </td>
                <td className="px-6 py-4 border-r border-b">
                  <img src={e.LinkImages} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  <ConvertDatetimeserver isoString={e.CreateDate} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  {e.LinkRoute}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                  <button className="border p-2 pr-4 pl-4 rounded-md bg-green-200 hover:bg-green-400 mr-2" onClick={()=>handleEdit(e)}>
                    Sửa
                  </button>
                  <button className="border p-2 pr-4 pl-4 rounded-md bg-red-200 hover:bg-red-400 mr-2" onClick={()=>handleDelete(e.ID)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {seenpostfull && (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white p-4 z-20">
          <div className="right-0 justify-end grid bg-white left-0 top-0 border-b-2 mb-2 border-black">
            <FontAwesomeIcon
              icon={faX}
              className="text-[30px] cursor-pointer mb-2 mt-4"
              onClick={() => setSeenpostfull(false)}
            />
          </div>
          <div className="">
            <SeenPostReview htmlContent={FullContents} />
          </div>
        </div>
      )}

      {msg && <NotificationComponent msg={resmsg}/>}
    </div>
  );
}

export default PackageItemComponent;
