import React, { useState, useEffect } from "react";
import axios from "axios";
import ConvertDatetimeserver from "../Additional/ConvertDatetimeserver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import NotificationComponent from "../Additional/NotificationComponent";

function AccountAdmin() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [resmsg, setResmsg] = useState();
  const [msg, setMsg] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const [confirmID, setConfirmID] = useState();
  const [reloaddata, setReloaddata] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${urlapi}/api/AuthUserAdmin/GetData`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if(reloaddata){
      fetchData();
      setReloaddata(false);
    }
  }, [reloaddata, urlapi]);

  // Filter data based on search
  const filteredData = data.filter(user => 
    user.Email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchEmail]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    axios
      .post(`${urlapi}/api/AuthUserAdmin/Delete`, { id })
      .then((res) => {
        setResmsg(res.data.data[0].ErrorMessage);
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
      .catch((err) => {
        setResmsg(err);
        if (msg === false) {
          setMsg(true);
          const timer = setTimeout(() => {
            setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setMsg(false);
        }
      });
  };

  const handleToggleActive = (id, currentStatus) => {
    axios
      .post(`${urlapi}/api/AuthUserAdmin/UpdateActive`, {
        id,
        isActive: !currentStatus,
      })
      .then((res) => {
        if (res.data.data[0].ErrorCode === 0) {
          setResmsg(res.data.data[0].ErrorMessage);
          setMsg(true);
          setData((prevData) =>
            prevData.map((user) =>
              user.ID === id ? { ...user, isActive: !currentStatus } : user
            )
          );
          const timer = setTimeout(() => {
            setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          setResmsg(res.data.data[0].ErrorMessage);
          setMsg(true);
          const timer = setTimeout(() => {
            setMsg(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        setResmsg("Lỗi khi cập nhật trạng thái.");
        setMsg(true);
        const timer = setTimeout(() => {
          setMsg(false);
        }, 5000);
        return () => clearTimeout(timer);
      });
  };

  const [Payload, setPayload] = useState({
    ID: "",
    Email: "",
    SDT: "",
    Password: ""
  });

  const handleOpenEdit = (e) => {
    setConfirmID(e.ID);
    setPayload({
      ID: e.ID,
      Email: e.Email,
      SDT: e.SDT,
      Password: e.Password
    });
    setOpenedit(true);
  };

  const handleSaveEdit = (e) => {
    try {
      axios.post(`${urlapi}/api/AuthUserAdmin/EditByID`, Payload)
        .then(res => {
          if(res.data.data[0].ErrorCode === 0){
            setOpenedit(false);
            setMsg(true);
            setReloaddata(true);
            setResmsg(res.data.data[0].ErrorMessage);
            const timer = setTimeout(() => {
              setMsg(false);
            }, 5000);
            return () => clearTimeout(timer);
          }
        });
    } catch(err) {
      setMsg(true);
      setResmsg(err);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Search Bar */}
      <div className="mx-2 mt-6 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto mx-auto border rounded-lg shadow-lg ml-2 mr-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Số Điện Thoại
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Password
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Active
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                Ngày Tạo
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
            {currentData.map((user) => (
              <tr
                key={user.ID}
                className={`hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {user.ID} {typeof user.GoogleId !=="object" && <p className="font-semibold">(Login google true)</p>}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {openedit && user.ID === confirmID ? (
                    <input 
                      value={Payload.Email}  
                      onChange={(e)=>setPayload({...Payload,Email:e.target.value})} 
                      className="border rounded-lg px-2 py-2 outline-none text-black"
                    />
                  ) : (
                    <div>{user.Email}</div>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {openedit && user.ID === confirmID ? (
                    <input 
                      value={Payload.SDT}  
                      onChange={(e)=>setPayload({...Payload,SDT:e.target.value})} 
                      className="border rounded-lg px-2 py-2 outline-none text-black"
                    />
                  ) : (
                    <div>
                      {typeof user.SDT !== "object" ? <p>{user.SDT}</p> : <p>NULL</p>}
                      
                    </div>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {openedit && user.ID === confirmID ? (
                    <input 
                      value={Payload.Password}  
                      onChange={(e)=>setPayload({...Payload,Password:e.target.value})} 
                      className="border rounded-lg px-2 py-2 outline-none text-black"
                    />
                  ) : (
                    <div>
                      {typeof user.Password !== "object" ? <p>{user.Password}</p> : <p>NULL</p>}
                    </div>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {user.isActive ? "Có" : "Không"}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {user.Admin ? "Admin" : "User"}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  <ConvertDatetimeserver isoString={user.CreateDate} />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  {openedit && user.ID === confirmID ? (
                    <div>
                      <button 
                        onClick={(e) => handleSaveEdit(user)} 
                        className="border p-1 pr-2 pl-2 rounded-md bg-green-200 hover:bg-green-400 mr-2"
                      >
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button 
                        className="border p-1 pr-2 pl-2 rounded-md bg-green-200 hover:bg-green-400 mr-2" 
                        onClick={(e) => handleOpenEdit(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className="border p-1 pr-2 pl-2 rounded-md bg-red-200 hover:bg-red-400"
                        onClick={() => handleDelete(user.ID)}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${openedit && user.ID === confirmID && "bg-gray-700 text-white"}`}>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleToggleActive(user.ID, user.isActive)}
                      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        user.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          user.isActive ? "translate-x-8" : "translate-x-0"
                        }`}
                      ></div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "bg-gray-200"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      {msg && <NotificationComponent msg={resmsg} />}
    </div>
  );
}

export default AccountAdmin;