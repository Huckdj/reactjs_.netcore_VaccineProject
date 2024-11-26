/* eslint-disable no-undef */
/* eslint-disable no-multi-str */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import NotificationComponent from "../../Additional/NotificationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import '../../../Asset/Css/Post.css'
import JoditEditor from 'jodit-react';
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver";
import SeenPostReview from "./SeenPostReview";
import LoadingComponent from "../../Additional/LoadingComponent";


function PostComponent() {
  const [add, setAdd] = useState(false);
  const [data, setData] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [filterData, setFilterData] = useState([])
  const [resmsg, setResmsg] = useState();

  const [PayLoad, setPayLoad] = useState({
    id: "",
    Title:"",
    linkImages:"",
    ShortContent:"",
    FullContentDesktop: "",
    FullContentMobile: "",
    PostType:""
  });

  const [LoadData, setLoadData] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      axios.post(`${urlapi}/api/PostPublics/GetAllDataPost`).then((res) => {
        setData(res.data);
        setFilterData(res.data)
        setIsLoading(false)
      });
    };
    if (LoadData) {
      fetchData();
      setLoadData(false);
    }
  }, [LoadData]);

  const[postTypeData, setPostTypeData] = useState([])
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      axios.post(`${urlapi}/api/PostType/GetDataPostType`).then((res) => {
        setPostTypeData(res.data.data);
        setIsLoading(false)
      });
    };
    if (LoadData) {
      fetchData();
      setLoadData(false);
    }
  }, [LoadData]);


  //filter
  const [Postypefilter, setPostypefilter] = useState("")
  useEffect(()=>{
    setIsLoading(true)
    if (Postypefilter !== '') {
      const Done = data.data.filter((item) => item.PostType === Postypefilter);
      setFilterData({data: Done});
      setIsLoading(false)
    }
    else if(Postypefilter === ""){
      setFilterData({data: data.data})
    }
  },[Postypefilter])

  //resetForm
  const handleResetFormBanner = () => {
    setPayLoad({
        id: "",
        Title:"",
        linkImages:"",
        ShortContent:"",
        FullContentDesktop: "",
        FullContentMobile: "",
        PostType:"",
        LinkRoute:""
    });
  };



  //pagiration
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.data
    ? filterData.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(
    (filterData.data ? filterData.data.length : 0) / itemsPerPage
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
      }, 4000);
      return () => clearTimeout(timer);
    }
  };

  const handleAdd = () => {
    setIsLoading(true);
    let status = '';
    let missingFields = [];
    // Kiểm tra từng trường hợp thiếu dữ liệu
    if (PayLoad.ShortContent === "") missingFields.push("ShortContent");
    if (PayLoad.Title === "") missingFields.push("Title");
    if (PayLoad.FullContentDesktop === "") missingFields.push("FullContentDesktop");
    if (PayLoad.FullContentMobile === "") missingFields.push("FullContentMobile");
    if (PayLoad.LinkImages === "") missingFields.push("LinkImages");
    if (PayLoad.LinkRoute === "") missingFields.push("LinkRoute");
    if (PayLoad.PostType === "") missingFields.push("Loại Bài Viết");

    // Nếu có trường thiếu, thì thông báo cho người dùng
    if (missingFields.length > 0) {
        setResmsg(`Thiếu các trường: ${missingFields.join(", ")}`);
        status = "missing_fields";
    } else if (PayLoad.id === "" && (PayLoad.ShortContent !== "" || PayLoad.Title !== "" || PayLoad.FullContentDesktop !== "" || PayLoad.FullContentMobile !== "" || PayLoad.LinkImages !== "" || PayLoad.LinkRoute !== "" || PayLoad.PostType !== "")) {
        status = "add_post"; 
    } else if (PayLoad.id !== "" && (PayLoad.ShortContent !== "" || PayLoad.Title !== "" || PayLoad.FullContentDesktop !== "" || PayLoad.FullContentMobile !== "" || PayLoad.LinkImages !== "" || PayLoad.LinkRoute !== "" || PayLoad.PostType !== "")) {
        status = "update_post";
    }

    switch (status) {
        case "missing_fields":
            break;
        case "add_post":
            axios.post(`${urlapi}/api/PostPublics/AddPost`, PayLoad)
                .then(res => {
                    setResmsg(res.data.data[0].ErrorMessage);
                    setLoadData(true);
                    handleResetFormBanner();
                });
            break;
        case "update_post":
            axios.post(`${urlapi}/api/PostPublics/UpdatePostbyID`, PayLoad)
                .then(res => {
                    setResmsg(res.data.data[0].ErrorMessage);
                    setLoadData(true);
                    handleResetFormBanner();
                });
            break;
        default:
            console.log("Không xác định trạng thái");
            break;
    }
    setIsLoading(false)
    msgactive(true);
};



  const handleEdit = (e) => {
    setPayLoad({
      id: e.ID,
      Title: e.Title,
      ShortContent:e.ShortContent,
      LinkRoute:e.LinkRoute,
      LinkImages:e.LinkImages,
      FullContentDesktop:e.FullContentDesktop,
      FullContentMobile:e.FullContentMobile,
      PostType: e.PostType
    });
    setAdd(true);
  };

  const handleDelete = (e) => {
    const id = e
    axios.post(`${urlapi}/api/PostPublics/DeletePost`,{id})
    .then(res =>{
        setResmsg(res.data.data[0].ErrorMessage)
        setLoadData(true)
    })
    msgactive(true)
  };
  const[isLoading,setIsLoading] = useState(true)
  // API get Link images
  const uploadImageToCloudinary = async (imageFile) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "myuploadpreset");
    formData.append("folder", "PostImages");

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
      setPayLoad((prevState) => ({
        ...prevState,
        linkImages: uploadedLink,
      }));
      console.log(PayLoad);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };


  // Lấy dữ liệu từ CKEditor
  const editor = useRef(null);
  const handleUpdateFullContentDesktop = () => {
    const newContent = editor.current.value;
    setPayLoad(prevState => ({
      ...prevState,
      FullContentDesktop: newContent
    }));
  };

  const handleUpdateFullContentMobile = () => {
    const newContent = editor.current.value;
    setPayLoad(prevState => ({
      ...prevState,
      FullContentMobile:newContent
    }));
  };


  // convert Link route
  useEffect(() => {
    if (PayLoad.Title && typeof PayLoad.Title === 'string') {
        const LinkRou = PayLoad.Title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, '-')
          .toLowerCase();
        setPayLoad(prevState => ({
          ...prevState,
          LinkRoute: LinkRou
        }));
      }
  }, [PayLoad.Title]);
  
  

  // Review
  const [openReview, setOpenReview] = useState(false)
  const [FullContents, setFullContents] = useState()
  const handleReview = (e) =>{
    setOpenReview(true)
    setFullContents(e)
  }


  //tab full content desk/mobile
  const[converttab, setConverttab] = useState('Desktop')


  

  return (
    <div>
      {/* Form Add */}
      <div className="font-basic">
        <div className="justify-center flex mt-6 font-bold text-[15px] lg:text-2xl">
          Thêm/Xóa/Sửa bài viết
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
            Tên bài viết
          </label>
          <input
            type="text"
            placeholder="tên bài viết"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
            value={PayLoad.Title}
            onChange={(e) =>
              setPayLoad({ ...PayLoad, Title: e.target.value })
            }
          />

          <hr className="border-[#a4ebdd] my-4" />

          <label className="font-bold text-lg ml-4 mt-6" htmlFor="PositionCode">
            Mô tả ngắn
          </label>
            <textarea
                placeholder="Mô tả ngắn"
                className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)] h-32 resize-none overflow-auto"
                value={PayLoad.ShortContent}
                onChange={(e) => setPayLoad({ ...PayLoad, ShortContent: e.target.value })}
            />

          <hr className="border-[#a4ebdd] my-4" />

          <label className="font-bold text-lg ml-4 mt-6" htmlFor="">
            Link liên kết
          </label>
          <input
            type="text"
            placeholder="Link liên kết"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]"
            value={PayLoad.LinkRoute}
            onChange={(e) =>
              setPayLoad({ ...PayLoad, LinkRoute: e.target.value })
            }
          />

            <hr className="border-[#a4ebdd] my-4" />

            <label className="font-bold text-lg ml-4 mt-6" htmlFor="">
                Loại bài viết
            </label>
            <select className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)]" defaultValue={PayLoad.PostType !== '' ? `${PayLoad.PostType}`: ``} onChange={(e) => setPayLoad({...PayLoad, PostType: e.target.value})}>
                <option value=''>Chọn Loại bài viết</option>
                {postTypeData.map((e, index) => (
                    <option key={index} value={e.NameType}>{e.NameType}</option>
                ))}
            </select>


          <hr className="border-[#a4ebdd] my-4" />
          <label
            className="font-bold text-lg ml-4 mt-6"
            htmlFor="NamePossition"
          >
            Ảnh Bài Viết
          </label>

          <input
            type="file"
            id="file-upload"
            className="border border-gray-300 rounded-md m-4 pl-3 outline-none p-2 w-[calc(100%-2rem)] hidden"
            accept="image/*"
            onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
          />
          {PayLoad.linkImages !== "" ? (
            <label
              className="justify-center border  m-4 rounded-md flex cursor-pointer p-2"
              for="file-upload"
            >
              <img
                src={PayLoad.linkImages}
                className="w-full min-w-[450px] max-w-[450px]"
              />
            </label>
          ) : (
            <label
              className="justify-center border m-4 rounded-md flex cursor-pointer"
              for="file-upload"
            >
              <img
                src="https://res.cloudinary.com/dumx42hqq/image/upload/v1730307526/Untitled_Project_2_llb95j.png"
                className="w-full min-w-[200px] max-w-[300px]"
              />
            </label>
            )}

            <hr className="border-[#a4ebdd] my-4" />
            <div className="flex justify-center mb-4">
                <label
                className={`font-bold text-lg ml-4 mt-6 border p-3  ${converttab==='Desktop' ? 'bg-green-700 text-white':'hover:bg-green-300'}`}
                onClick={()=> setConverttab('Desktop')}
                >
                    Nội dung Desktop
                </label>
                <label
                className={`font-bold text-lg ml-4 mt-6 border p-3 ${converttab==='Mobile' ? 'bg-green-700 text-white':'hover:bg-green-300'}`}
                onClick={()=> setConverttab('Mobile')}
                >
                    Nội dung Mobile
                </label>
            </div>
            {converttab === 'Desktop' && openReview === false && 
                <JoditEditor
                    ref={editor}
                    value={typeof PayLoad.FullContentDesktop === 'string' ? PayLoad.FullContentDesktop : ''}
                    tabIndex={1}
                    config={{
                        placeholder: 'Nhập nội dung Desktop'
                    }}
                    onChange={handleUpdateFullContentDesktop}
                />
            }
            {converttab === 'Mobile' && openReview === false &&
              <div className="">
                <JoditEditor
                ref={editor}
                value={typeof PayLoad.FullContentMobile === 'string' ? PayLoad.FullContentMobile : ''}
                tabIndex={1}
                config={{
                    placeholder: 'Nhập nội dung Mobile'
                }}
                onChange={handleUpdateFullContentMobile}
                />
              </div>
            }
        </div>
      </div>
      {/* Filter  */}
      <div className=" ml-2 mr-2 mt-5">
        <h2 className="font-bold text-2xl">Lọc dữ liệu theo loại:</h2>
        <div className="bg-gray-100">
          <select onChange={(e) => setPostypefilter(e.target.value)} className=" bg-gray-100 mx-auto w-full p-4 border">
            <option value="" >Chọn loại bài viết hoặc để trống</option>
            {postTypeData.map((e, index) => (
              <option key={index} value={e.NameType} >
                {e.NameType}
              </option>
            ))}
          </select>
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
                Tên Bài Viết
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Mô tả ngắn
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Ảnh Bài viết
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Link liên kết
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Loại bài viết
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Thời gian tạo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Toàn bộ bài viết
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
                  <td className="px-6 py-4 whitespace-nowrap border-r">{e.ID}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">{e.Title}</td>
                  <td className="px-6 py-4  max-w-[200px] line-clamp-4 overflow-hidden mb-2 min-w-[200px] border-r">{e.ShortContent}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r"><img src={e.LinkImages} className="w-[150px]"/></td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">{e.LinkRoute}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">{e.PostType}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r"><ConvertDatetimeserver isoString={e.CreateDate} /></td>
                  <td className="px-6 py-4 border-r ">
                    <div className="justify-center flex items-center">
                        <button className="border p-2 pr-4 pl-4 rounded-md bg-green-200 hover:bg-green-400 mr-2" onClick={() => handleReview(e.FullContentDesktop)}>
                            Desktop
                        </button>
                        <button className="border p-2 pr-4 pl-4 rounded-md bg-green-200 hover:bg-green-400" onClick={() => handleReview(e.FullContentMobile)}>
                            Mobile
                        </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <button
                      className="border p-2 pr-4 pl-4 rounded-md bg-green-200 hover:bg-green-400 mr-2"
                      onClick={() => handleEdit(e)}
                    >
                      Sửa
                    </button>
                    <button
                      className="border p-2 pr-4 pl-4 rounded-md bg-red-200 hover:bg-red-400"
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
      {openReview && 
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white p-4">
            <div className="right-0 justify-end grid bg-white left-0 top-0 border-b-2 mb-2 border-black">
                <FontAwesomeIcon icon={faX} className="text-[30px] cursor-pointer mb-2 mt-4" onClick={()=>setOpenReview(false)}/>
            </div>
            <div className="">
                <SeenPostReview htmlContent={FullContents}/> 
            </div>
        </div>
        }
        {isLoading === true && <LoadingComponent/>}
    </div>
  );
}

export default PostComponent;
