/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ConvertDatetimeserver from "../../Additional/ConvertDatetimeserver";
import axios from "axios";
import NotificationComponent from "../../Additional/NotificationComponent";

function VaccineCenterComponent() {
  const [data, setData] = useState([]);
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [reloaddata, setReloaddata] = useState(true);
  const [CityData, setCityData] = useState([]);
  const [openinsert, setOpeninsert] = useState(false);
  const [payload, setPayload] = useState({
    ID: "",
    Name: "",
    Address: "",
    City: "",
    District: "",
    Ward: "",
    LinkGoogle:""
  });
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [msg, setMsg] = useState(false);
  const [resmsg, setResmsg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`${urlapi}/api/VaccineCenter/GetAllDataCenter`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (reloaddata) {
      fetchData();
      setReloaddata(false);
    }
  }, [reloaddata]);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=3").then((res) => {
      setCityData(res.data);
    });
  }, []);

  useEffect(() => {
    if (payload.City !== "") {
      const city = CityData.find(({ name }) => name === payload.City);
      setDistricts(city ? city.districts : []);
    }
  }, [payload.City]);

  useEffect(() => {
    if (payload.District !== "") {
      const district = districts.find(({ name }) => name === payload.District);
      setWard(district ? district.wards : []);
    }
  }, [payload.District]);

  const handleSave = () => {
    if (
      payload.Name === "" ||
      payload.City === "" ||
      payload.Address === "" ||
      payload.District === "" ||
      payload.Ward === "" ||
      payload.LinkGoogle ===""
    ) {
      setResmsg("Thiếu trường dữ liệu");
      if (!msg) {
        setMsg(true);
        setTimeout(() => setMsg(false), 5000);
      }
      return;
    }

    const apiCall = payload.ID === "" 
      ? axios.post(`${urlapi}/api/VaccineCenter/InsertCenter`, payload)
      : axios.post(`${urlapi}/api/VaccineCenter/EditCenterItem`, payload);

    apiCall
      .then((res) => {
        setResmsg(res.data.data[0].ErrorMessage);
        setReloaddata(true);
        setPayload({
          ID: "",
          Name: "",
          Address: "",
          City: "",
          District: "",
          Ward: "",
          LinkGoogle:""
        });
        if (!msg) {
          setMsg(true);
          setTimeout(() => setMsg(false), 5000);
        }
      })
      .catch((err) => {
        setResmsg(err);
        if (!msg) {
          setMsg(true);
          setTimeout(() => setMsg(false), 5000);
        }
      });
  };

  const handleEdit = (e) => {
    setPayload({
      ID: e.ID,
      Name: e.Name,
      Address: e.Address,
      City: e.City,
      District: e.District,
      Ward: e.Ward,
      LinkGoogle: e.LinkGoogle
    });
    setOpeninsert(true);
  };

  const handleDelete = (id) => {
    axios
      .post(`${urlapi}/api/VaccineCenter/DeleteCenterItem`, { id })
      .then((res) => {
        setResmsg(res.data.data[0].ErrorMessage);
        setReloaddata(true);
      })
      .catch((err) => {
        setResmsg(err);
        setReloaddata(true);
      });
  };

  const handleSetActive = (e) => {
    const payloadupdate = {
      ID: e.ID,
      IsActive: !e.IsActive,
    };
    axios
      .post(`${urlapi}/api/VaccineCenter/ActiveCenterItem`, payloadupdate)
      .then((res) => {
        setResmsg(res.data.data[0].ErrorMessage);
        setReloaddata(true);
        if (!msg) {
            setMsg(true);
            setTimeout(() => setMsg(false), 5000);
        }
      })
      .catch((err) => {
        setResmsg(err);
        setReloaddata(true);
        if (!msg) {
            setMsg(true);
            setTimeout(() => setMsg(false), 5000);
          }
        
      });
  };

  return (
    <div className="mt-6">
      {/* Form input */}
      <div
        className={`my-6 overflow-x-auto mx-auto border rounded-lg delay-150 transition-all shadow-lg ml-2 mr-2 ${
          openinsert ? "min-h-[600px]" : "min-h-0"
        }`}
      >
        <div className={`my-2 mb-6`}>
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
              onClick={handleSave}
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

          {/* Form input for vaccine center */}
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
            />

            <hr className="mt-6" />
            {/* Name */}
            <label className="font-semibold mb-2 mt-2">Tên trung tâm</label>
            <input
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              placeholder="Nhập tên trung tâm"
              value={payload.Name}
              onChange={(e) => setPayload({ ...payload, Name: e.target.value })}
            />

            <hr className="mt-6" />
            {/* Address */}
            <label className="font-semibold mb-2 mt-2">Địa chỉ</label>
            <input
              type="text"
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              value={payload.Address}
              onChange={(e) => setPayload({ ...payload, Address: e.target.value })}
              placeholder="Nhập Địa chỉ"
            />

            <hr className="mt-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Province */}
              <div className="grid">
                <label className="font-semibold mb-2 mt-2">Tỉnh thành</label>
                <select
                  className="border outline-none px-2 py-1 font-semibold rounded-md"
                  value={payload.City}
                  onChange={(e) => setPayload({ ...payload, City: e.target.value })}
                >
                  <option value="" className="text-gray-400" disabled>
                    Chọn tỉnh thành
                  </option>
                  {Array.isArray(CityData) &&
                    CityData.map((r) => (
                      <option key={r.name} value={r.name} className="text-gray-600 font-semibold">
                        {r.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* District */}
              <div className="grid">
                <label className="font-semibold mb-2 mt-2">Chọn Quận huyện</label>
                <select
                  className="border outline-none px-2 py-1 font-semibold rounded-md"
                  value={payload.District}
                  onChange={(e) => setPayload({ ...payload, District: e.target.value })}
                >
                  <option value="" className="text-gray-400" disabled>
                    Chọn quận huyện
                  </option>
                  {districts.length > 0
                    ? districts.map((r, index) => (
                        <option key={index} value={r.name} className="text-gray-600 font-semibold">
                          {r.name}
                        </option>
                      ))
                    : <option disabled>Chọn tỉnh thành trước</option>}
                </select>
              </div>

              {/* Ward */}
              <div className="grid">
                <label className="font-semibold mb-2 mt-2">Chọn Phường xã</label>
                <select
                  className="border outline-none px-2 py-1 font-semibold rounded-md"
                  value={payload.Ward}
                  onChange={(e) => setPayload({ ...payload, Ward: e.target.value })}
                >
                  <option value="" className="text-gray-400" disabled>
                    Chọn phường xã
                  </option>
                  {ward.length > 0
                    ? ward.map((r, index) => (
                        <option key={index} value={r.name} className="text-gray-600 font-semibold">
                          {r.name}
                        </option>
                      ))
                    : <option disabled>Chọn quận huyện trước</option>}
                </select>
              </div>
            </div>

            <hr className="mt-6" />
            {/* Link Map */}
            <label className="font-semibold mb-2 mt-2">Link Google Map</label>
            <input
              type="text"
              className="border outline-none px-2 py-1 font-semibold placeholder:font-semibold rounded-md"
              value={payload.LinkGoogle}
              onChange={(e) => setPayload({ ...payload, LinkGoogle: e.target.value })}
              placeholder="Nhập Địa chỉ"
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
                Tên trung tâm
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Phường/xã
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Quận huyện
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Thành phố
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Link Google Map
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                Thời gian tạo
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
                className="hover:bg-gray-100 transition-colors duration-200"
                >
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                    <button
                    className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        e.IsActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={() => handleSetActive(e)}
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
                    {e.Address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                    {e.Ward}
                </td>
                <td className="px-6 py-4 border-r border-b">{e.District}</td>
                <td className="px-6 py-4 border-r border-b">{e.City}</td>
                <td className="px-6 py-4 border-r border-b whitespace-normal"><a href={e.LinkGoogle} target="_blank" className="line-clamp-3 max-w-[500px] text-blue-500 hover:text-blue-400">{e.LinkGoogle}</a></td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                    <ConvertDatetimeserver isoString={e.CreateDate} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                    <button
                    className="border p-2 pr-4 pl-4 rounded-md bg-green-200 hover:bg-green-400 mr-2"
                    onClick={() => handleEdit(e)}
                    >
                    Sửa
                    </button>
                    <button
                    className="border p-2 pr-4 pl-4 rounded-md bg-red-200 hover:bg-red-400 mr-2"
                    onClick={() => handleDelete(e.ID)}
                    >
                    Xóa
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    {msg && <NotificationComponent msg={resmsg} />}
    </div>
  );
}

export default VaccineCenterComponent;
