/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver";
import NotificationComponent from "../../Additional/NotificationComponent";
import LoadingLoginForm from "../../Additional/LoadingLoginForm";
function AgeItemComponent() {
  const [data, setData] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [reloaddata, setReloaddata] = useState(true);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${urlapi}/api/AgeItem/GetData`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (reloaddata) {
      fetchData();
      setReloaddata(false);
    }
  }, [reloaddata]);

  const [openinsert, setOpeninsert] = useState(false);
  const [payload, setPayload] = useState({
    ID:"",
    NameYearOld:""
  })
  const [msg,setMsg] = useState(false)
  const [resmsg, setResmsg] = useState()
  const handleAdd = () =>{
  setIsLoading(!isLoading)
    if(payload.NameYearOld === ""){
        setIsLoading(!isLoading)
        setResmsg("Không bỏ trống thư mục tuổi vắc xin")
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
    if(payload.ID === "" && payload.NameYearOld !== ""){
        axios.post(`${urlapi}/api/AgeItem/InsertCountry`,payload)
        .then(res=>{
            setResmsg(res.data.data[0].ErrorMessage)
            setOpeninsert(false)
            setReloaddata(true)
            setIsLoading(false)
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
        .catch(err=>{
            setResmsg(err.data.data[0].ErrorMessage)
            setIsLoading(false)
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
    setReloaddata(true)
    setPayload({
        ID:"",
        NameYearOld:""
    })
  }

  const hangleDelete = (e) =>{
    setIsLoading(true)
    const id = e
    axios.post(`${urlapi}/api/AgeItem/DeleteAge`,{id})
    .then(res=>{
        setResmsg(res.data.data[0].ErrorMessage)
        setIsLoading(false)
        if (msg === false) {
            setMsg(true);
            const timer = setTimeout(() => {
                setMsg(false);
            }, 5000);
            return () => clearTimeout(timer);
          } else {
            setMsg(false);
          }
          setReloaddata(true)
    })
    .catch(err=>{
        setResmsg(err.data.data[0].ErrorMessage)
          setIsLoading(false)
        if (msg === false) {
            setMsg(true);
            const timer = setTimeout(() => {
                setMsg(false);
            }, 5000);
            return () => clearTimeout(timer);
          } else {
            setMsg(false);
          }
          setReloaddata(true)
    })
  }

  const [confirmID, setConfirmID] = useState('')
  const [openEdit,setOpenEdit] = useState(false)
  const handleOpenEdit = (e) =>{
    setOpenEdit(true)
    setPayload({
      ID:e.ID,
      NameYearOld:e.NameYearOld
    })
    setConfirmID(e.ID)
  }

  const handleSaveEdit = (e) =>{
    setIsLoading(true)
    axios.post(`${urlapi}/api/AgeItem/EditByAgeId`,payload)
    .then(res=>{
        setResmsg(res.data.data[0].ErrorMessage)
        setOpenEdit(false)
        setReloaddata(true)
        setIsLoading(false)
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
    .catch(err =>{
        setResmsg(err.data.data[0].ErrorMessage)
        setOpenEdit(false)
        setIsLoading(false)
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
          
    })
  }

  const handleSetActive = (e) =>{
    setIsLoading(true)
    const updatedPayload = {
        ID: e.ID,
        IsActive: !e.IsActive,
    };

    axios.post(`${urlapi}/api/AgeItem/SetActiveAge`,updatedPayload)
      .then(res=>{
        setResmsg(res.data.data[0].ErrorMessage)
        setReloaddata(true)
        setIsLoading(false)
        if (msg === false) {
            setMsg(true);
            const timer = setTimeout(() => {
                setMsg(false);
            }, 3000);
            return () => clearTimeout(timer);
          } else {
            setMsg(false);
          }
      })
      .catch(err=>{
        setResmsg(err.data.data[0].ErrorMessage)
        setReloaddata(true)
        setIsLoading(false)
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
  return (
    <div>
      <div className=" my-6 overflow-x-auto mx-auto border rounded-lg shadow-lg ml-2 mr-2">
        <div>
          <button
            className={`m-2 rounded-lg bg-green-200 hover:bg-green-600 hover:text-white p-2 border ${
              openinsert === false ? "block" : "hidden"
            }`}
            onClick={() => setOpeninsert(!openinsert)}
          >
            Thêm Mới
          </button>
          <div className="flex">
            <button
                className={`m-2 px-10 rounded-lg bg-green-200 hover:bg-green-600 hover:text-white p-2 border ${
                openinsert === false ? "hidden" : "block"
                }`}
                onClick={() => handleAdd()}
            >
                Lưu
            </button>
            <button
                className={`m-2 px-10 rounded-lg bg-red-200 hover:bg-red-600 hover:text-white p-2 border ${
                    openinsert === false ? "hidden" : "block"
                    }`}
                onClick={() => setOpeninsert(!openinsert)}
            >
                Đóng
            </button>
          </div>
        </div>
        {/* insert new item */}
        <div
          className={`transition-all delay-200 flex overflow-hidden ${
            openinsert ? `max-h-screen` : `max-h-0`
          }`}
        >
          <div>
            <div className="m-2 font-semibold">ID</div>
            <input
              className="border p-1 outline-none m-2 w-[300px] placeholder:font-semibold"
              disabled
              placeholder="Auto/ Tự động tạo"
            />
          </div>
          <div>
            <div className="m-2 font-semibold">Thư mục tuổi</div>
            <input
              id="insertNameYearOld"
              className="border p-1 outline-none m-2 w-[300px] placeholder:font-semibold font-semibold focus:outline-blue-500"
              placeholder="Nhập Thư mục tuổi"
              onChange={(e) => setPayload({...payload,NameYearOld:e.target.value})}
              value={payload.NameYearOld}
            />
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Thư mục tuổi Vắc Xin
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Thời gian tạo
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Hành động
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Khóa
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((e) => (
              <tr
                key={e.ID}
                className={`hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className={`px-6 py-4 whitespace-nowrap ${openEdit && e.ID === confirmID && `bg-blue-500`}`}>{e.ID}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${openEdit && e.ID === confirmID && `bg-blue-500`}`}>
                    {openEdit && e.ID === confirmID ? (
                        <input
                        className={`border p-1 transition-all duration-300 ease-in-out font-semibold ${
                            openEdit && e.ID === confirmID ? `w-full` : `w-0 opacity-0`
                        }`}
                        value={payload.NameYearOld}
                        onChange={(e)=>setPayload({...payload,NameYearOld:e.target.value})}
                        />
                    ) : (
                        <input
                        className={`border font-semibold p-1 transition-all duration-300 ease-in-out w-full`}
                        value={e.NameYearOld}
                            disabled
                        />
                    )}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap ${openEdit && e.ID === confirmID && `bg-blue-500`}`}>
                    <ConvertDatetimeserver isoString={e.CreateDate}/>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openEdit && e.ID === confirmID && `bg-blue-500`}`}>
                    {openEdit && e.ID === confirmID ?(
                        <div>
                            <button className="mx-4 border bg-blue-300 p-2 rounded-md hover:bg-blue-700 hover:text-white" onClick={()=>handleSaveEdit(e.ID)}>
                                Lưu
                            </button>
                        </div>

                    ):(
                        <div>
                            <button className="mx-4 border bg-blue-300 p-2 rounded-md hover:bg-blue-700 hover:text-white" onClick={()=>handleOpenEdit(e)}>
                                Sửa
                            </button>
                            <button className="mx-4 border bg-red-300 p-2 rounded-md hover:bg-red-700 hover:text-white" onClick={()=> hangleDelete(e.ID)}>
                                Xóa
                            </button>
                        </div>
                    )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openEdit && e.ID === confirmID && `bg-blue-500`}`}> 
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {isLoading && <LoadingLoginForm/>}
      {msg && <NotificationComponent msg={resmsg} />}
    </div>
  );
}

export default AgeItemComponent;
