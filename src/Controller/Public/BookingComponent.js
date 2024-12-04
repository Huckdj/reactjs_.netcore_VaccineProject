/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./FooterComponent";
import "../../Asset/Css/Booking.css";
import {
  DatePicker,
  SelectPicker,
  VStack,
  TagPicker,
  DateRangePicker,
} from "rsuite";
import "rsuite/styles/index.less";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingLoginForm from "../Additional/LoadingLoginForm";

function BookingComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;

  const [datacenter, setDatacenter] = useState([]);
  const [singlevc, setSinglevc] = useState([]);
  const [packvc, setPackvc] = useState([]);
  const [emailuser, setEmailuser] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .post(`${urlapi}/api/VaccineCenter/GetDataPublic`)
        .then((res) => {
          setDatacenter(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .post(`${urlapi}/api/PackageItem/GetDataPublic`)
        .then((res) => {
          setPackvc(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });

      axios
        .post(`${urlapi}/api/SingleItem/GetDataPublic`)
        .then((res) => {
          setSinglevc(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });

      const token = localStorage.getItem("token");

      if (token) {
        axios
          .get(`${urlapi}/api/AuthUser/GetUserInfo`, {
            headers: {
              Authorization: `Bearer ` + token,
            },
          })
          .then((res) => {
            setPayload((prevState) => ({
              ...prevState,
              IDUser: res.data.userId,
            }));
            setPayload((prevState) => ({
              ...prevState,
              Email: res.data.email,
            }));
            setEmailuser(true);
          })
          .catch((err) => {
            setPayload((prevState) => ({
              ...prevState,
              IDUser: "",
            }));
          });
      }
    };
    fetchdata();
  }, [urlapi]);

  const datacenterselect = datacenter.map((e) => ({
    label: (
      <div className="pl-4 py-2 grid hover:bg-blue-300">
        <div className="uppercase font-medium">{e.Name}</div>
        <div className="line-clamp-3">
          Địa chỉ: {e.Address}, {e.Ward},<br className="block md:hidden" />{" "}
          {e.District}, {e.City}
        </div>
      </div>
    ),
    value: e.ID,
  }));

  const packvcs = packvc.map((e) => ({
    label: (
      <div className="">
        <p>{e.Name}</p>
        <p>Giá: {e.Price}</p>
      </div>
    ),
    value: { Name: e.Name, Price: e.Price },
  }));
  const singlevcs = singlevc.map((e) => ({
    label: (
      <div className="">
        <p>{e.Name}</p>
        <p>Giá: {e.Price}</p>
      </div>
    ),
    value: { Name: e.Name, Price: e.Price },
  }));

  const [payload, setPayload] = useState({
    Name: "",
    Birthday: "",
    SDTInject: "",
    NameContact: "",
    DateInject: "",
    SDT: "",
    Email: "",
    IDUser: "",
    IDCenter: "",
    vaccinepack: [],
    vaccinesingle: [],
  });

  const [notifications, setNotifications] = useState([]);
  const [Loading,setIsLoading] = useState(false)
  const handleOrder = (e) => {
    setIsLoading(true)
    const id = Date.now();
    axios
      .post(`${urlapi}/api/Booking/Booking`, payload)
      .then((res) => {
        if (res.data.data[0].ErrorCode === 0) {
          const newNotification = {
            id,
            msg: `${res.data.data[0].ErrorMessage}`,
            open: true,
            type: true,
          };
          setNotifications((prev) => [...prev, newNotification]);
          setIsLoading(false)
          setTimeout(() => {
            navigate('/cam-on')
          }, 2000);
        } else {
          const newNotification = {
            id,
            msg: `${res.data.data[0].ErrorMessage}`,
            open: true,
            type: false,
          };
          setNotifications((prev) => [...prev, newNotification]);
          setIsLoading(false)
        }
        setTimeout(() => {
          setNotifications((prev) =>
            prev.map((noti) => (noti.id === id ? { ...noti, open: false } : noti))
          );
        }, 2000);
      })
      .catch((err) => {
        const newNotification = {
          id,
          msg: err,
          open: true,
          type: false,
        };
        setNotifications((prev) => [...prev, newNotification]);
        setIsLoading(false)
      });
  };
  const handleAddPack = (selectedItems) => {
    setPayload((prevState) => ({
      ...prevState,
      vaccinepack: selectedItems,
    }));
  };
  const handleAddSingle = (selectedItems) => {
    setPayload((prevState) => ({
      ...prevState,
      vaccinesingle: selectedItems,
    }));
  };
  const handleAddCenter = (selectedItems) => {
    setPayload((prevState) => ({
      ...prevState,
      IDCenter: selectedItems,
    }));
  };
  const formatDateToSQL = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const DateBirthDay = (date) => {
    const formattedDate = formatDateToSQL(date);
    setPayload((prevState) => ({
      ...prevState,
      Birthday: formattedDate,
    }));
  };

  const DateInjectPicker = (date) => {
    const formattedDate = formatDateToSQL(date);
    setPayload((prevState) => ({
      ...prevState,
      DateInject: formattedDate,
    }));
  };
  const { beforeToday } = DateRangePicker;

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto">
        <div className="flex bg-blue-500 p-2 rounded-xl justify-center">
          <div className="place-items-center grid">
            <p className="text-2xl font-semibold text-white">
              Đặt trước lịch tiêm chủng
            </p>
            <p className="text-[15px] normal-case text-center text-white">
              Quý khách đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi
              đến trung tâm làm thủ tục và hưởng thêm nhiều chính sách ưu đãi
              khác.
            </p>
          </div>
        </div>

        {/* Form order */}
        <div className="shadowform mx-4 lg:mx-20 mt-4 px-4 rounded-md p-2">
          <div className="flex">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76141 17 6.99998C17 4.23856 14.7614 1.99998 12 1.99998C9.23858 1.99998 7 4.23856 7 6.99998C7 9.76141 9.23858 12 12 12Z"
                fill="#ACC0F3"
              ></path>
              <path
                d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
                fill="url(#paint0_linear_3708_96166)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_3708_96166"
                  x1="21.0902"
                  y1="22.5"
                  x2="15.1916"
                  y2="9.09562"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#1250DC"></stop>
                  <stop offset="1" stop-color="#306DE4"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="font-semibold px-2"> Thông tin người tiêm</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6">
            <div className="grid">
              <label className="font-semibold mb-2">
                Họ tên người tiêm <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className=" outline-none border rounded-md p-2 focus:font-semibold"
                value={payload.Name}
                onChange={(e) =>
                  setPayload({ ...payload, Name: e.target.value })
                }
              />
            </div>
            <div className="grid">
              <label className="font-semibold mb-2">
                Ngày sinh người tiêm <span className="text-red-600">*</span>
              </label>
              <DatePicker
                format="dd/MM/yyyy"
                placeholder="Chọn ngày sinh"
                size="lg"
                onChange={DateBirthDay}
              />
            </div>
            <div className="grid">
              <label className="font-semibold mb-2">
                Số điện thoại người tiêm
              </label>
              <input
                type="number"
                placeholder="Nhập số điện thoại (Không bắt buộc)"
                className=" outline-none border rounded-md p-2 focus:font-semibold"
                value={payload.SDTInject}
                onChange={(e) =>
                  setPayload({ ...payload, SDTInject: e.target.value })
                }
              />
            </div>
          </div>

          {/* Số nguyoiwf liên hệ */}
          <hr />
          <div className="flex mt-6">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76141 17 6.99998C17 4.23856 14.7614 1.99998 12 1.99998C9.23858 1.99998 7 4.23856 7 6.99998C7 9.76141 9.23858 12 12 12Z"
                fill="#ACC0F3"
              ></path>
              <path
                d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
                fill="url(#paint0_linear_3708_96166)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_3708_96166"
                  x1="21.0902"
                  y1="22.5"
                  x2="15.1916"
                  y2="9.09562"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#1250DC"></stop>
                  <stop offset="1" stop-color="#306DE4"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="font-semibold px-2"> Thông tin người liên hệ</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="grid">
              <label className="font-semibold mb-2">
                Họ tên người liên hệ <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className=" outline-none border rounded-md p-2 focus:font-semibold"
                value={payload.NameContact}
                onChange={(e) =>
                  setPayload({ ...payload, NameContact: e.target.value })
                }
              />
            </div>

            <div className="grid">
              <label className="font-semibold mb-2">
                Chọn ngày tiêm <span className="text-red-600">*</span>
              </label>
              <DatePicker
                format="dd/MM/yyyy"
                placeholder="Chọn ngày tiêm"
                size="lg"
                onChange={DateInjectPicker}
                shouldDisableDate={beforeToday()}
              />
            </div>

            <div className="grid">
              <label className="font-semibold mb-2">
                Số điện thoại liên hệ <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="Nhập số điện thoại"
                className=" outline-none border rounded-md p-2 focus:font-semibold"
                value={payload.SDT}
                onChange={(e) =>
                  setPayload({ ...payload, SDT: e.target.value })
                }
              />
            </div>

            <div className="grid">
              <label className="font-semibold mb-2">
                Email liên hệ <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Nhập Email (Bắt buộc)"
                className=" outline-none border rounded-md p-2 focus:font-semibold"
                value={payload.Email}
                disabled={emailuser}
                onChange={(e) =>
                  setPayload({ ...payload, Email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex mt-6">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.52714 19.642C9.18736 19.5903 9.82806 19.8874 10.2011 20.4346C10.4905 20.8591 10.7647 21.2937 11.0235 21.7371C11.0931 21.8568 11.1932 21.9561 11.3172 22.0257C11.3732 22.0576 11.4326 22.0826 11.4954 22.1C11.5701 22.1208 11.6465 22.1314 11.7246 22.131C11.8672 22.131 12.0081 22.0941 12.1321 22.0245C12.2543 21.9549 12.3545 21.8551 12.4224 21.7359L12.4886 21.62C12.7276 21.2183 12.9792 20.8241 13.2432 20.4381C13.6173 19.891 14.259 19.5943 14.9197 19.6472C18.1232 19.9034 20.3847 20.5297 20.3847 21.2618C20.3847 22.2218 16.4935 23.0002 11.6924 23.0002C6.89119 23.0002 3 22.2218 3 21.2618C3 20.5252 5.29111 19.8951 8.52714 19.642Z"
                fill="#ACC0F3"
              ></path>
              <path
                d="M16.9616 3.04077C16.1919 2.33939 15.29 1.79873 14.3086 1.45047C13.3273 1.10222 12.2863 0.953388 11.2467 1.0127C10.207 1.07202 9.18972 1.33828 8.25435 1.79589C7.31898 2.2535 6.48438 2.89324 5.79948 3.67761C5.11458 4.46198 4.59316 5.37519 4.26579 6.3637C3.93843 7.35222 3.8117 8.39614 3.89305 9.43426C3.97439 10.4724 4.26217 11.4838 4.73951 12.4093C5.21686 13.3347 5.87415 14.1556 6.67287 14.8237C8.4989 16.3418 10.0246 18.1884 11.1712 20.268C11.2272 20.3715 11.3103 20.458 11.4115 20.5181C11.5128 20.5783 11.6284 20.6099 11.7462 20.6096C11.8638 20.6095 11.9793 20.5776 12.0803 20.5172C12.1813 20.4568 12.2641 20.3703 12.3199 20.2666L12.3733 20.1662C13.5281 18.1119 15.0507 16.2872 16.8651 14.7833C17.7059 14.0566 18.3821 13.159 18.8486 12.1504C19.3151 11.1417 19.5611 10.0451 19.5702 8.93386C19.5793 7.82258 19.3514 6.72214 18.9016 5.70593C18.4517 4.68973 17.7904 3.78114 16.9616 3.04077ZM11.7462 12.1345C11.1015 12.1345 10.4713 11.9433 9.93521 11.5852C9.39916 11.227 8.98137 10.7179 8.73465 10.1223C8.48794 9.52666 8.42339 8.87125 8.54916 8.23895C8.67493 7.60664 8.98539 7.02583 9.44125 6.56996C9.89712 6.11409 10.4779 5.80364 11.1102 5.67787C11.7425 5.55209 12.398 5.61664 12.9936 5.86336C13.5892 6.11007 14.0983 6.52787 14.4565 7.06391C14.8146 7.59996 15.0058 8.23017 15.0058 8.87487C15.0048 9.73906 14.661 10.5676 14.0499 11.1786C13.4389 11.7897 12.6104 12.1335 11.7462 12.1345Z"
                fill="url(#paint0_linear_3708_961710.2288200667855429)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_3708_961710.2288200667855429"
                  x1="19.5705"
                  y1="20.6096"
                  x2="0.435545"
                  y2="5.28825"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#1250DC"></stop>
                  <stop offset="1" stop-color="#306DE4"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="font-semibold px-2"> Chọn trung tâm bạn cần tiêm</h2>
          </div>

          <div className="custom-select-picker-center mt-3">
            <VStack>
              <SelectPicker
                data={datacenterselect}
                style={{ width: "100%" }}
                virtualized={false}
                onChange={handleAddCenter}
              />
            </VStack>
          </div>

          <div className="flex mt-6">
            <svg
              className="w-[20px]"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.622 48.248a.5.5 0 0 1-.38-.824l1.391-1.63-2.654 1.531a.5.5 0 0 1-.6-.787l1.376-1.371-1.858 1.072a.5.5 0 0 1-.626-.761l1.809-2.068-2.353 1.359a.5.5 0 0 1-.587-.8l.7-.639-.377.217a.5.5 0 0 1-.627-.105.5.5 0 0 1-.018-.635l2.141-2.742a.39.39 0 0 1-.036-.054.5.5 0 0 1 .183-.683l.866-.5a.5.5 0 0 1 .644.74L14.184 41.4l2.132-1.231a.5.5 0 0 1 .587.8l-.7.636.984-.569a.5.5 0 0 1 .626.762l-1.809 2.068 2.551-1.472a.5.5 0 0 1 .6.787l-1.375 1.37 1.861-1.074a.5.5 0 0 1 .63.756l-1.391 1.631 1.076-.62a.5.5 0 0 1 .5.865l-3.592 2.074a.489.489 0 0 1-.242.065ZM41.43 31.943a.5.5 0 0 1-.336-.87l1.285-1.168-2.689 1.552a.5.5 0 0 1-.548-.834l2.041-1.523-3.383 1.958a.5.5 0 0 1-.564-.823l4.381-3.517-6.528 3.768a.5.5 0 0 1-.533-.844l.753-.517-1.787 1.031a.5.5 0 0 1-.534-.844l1.819-1.253-3 1.734a.5.5 0 0 1-.548-.834l5.541-4.117-7.619 4.4a.5.5 0 0 1-.541-.839l5.56-3.98-7.455 4.3a.5.5 0 0 1-.525-.85l1.688-1.116-2.691 1.553a.5.5 0 0 1-.535-.842l6.091-4.236-6.383 3.685a.5.5 0 0 1-.526-.85l2.143-1.418-2.207 1.278a.5.5 0 0 1-.543-.838l7.174-5.189-6.934 4a.5.5 0 0 1-.533-.844l4.1-2.822a.491.491 0 0 1-.516-.21.5.5 0 0 1 .109-.674l4.508-3.483a.487.487 0 0 1-.254-.181.5.5 0 0 1 .066-.664l3.171-2.9a.505.505 0 0 1 .246-.5l.866-.5a.5.5 0 0 1 .587.8l-.8.729 1.107-.638a.5.5 0 0 1 .556.828l-3.551 2.743 4.165-2.4a.5.5 0 0 1 .533.844l-3.841 2.64 4.314-2.488a.5.5 0 0 1 .543.838l-7.177 5.2 8.034-4.638a.5.5 0 0 1 .526.85l-2.137 1.414 2.458-1.419a.5.5 0 0 1 .535.843L35.021 21.5l6.746-3.9a.5.5 0 0 1 .525.85L40.6 19.574l1.991-1.149a.5.5 0 0 1 .541.839l-5.559 3.975 6.237-3.6a.5.5 0 0 1 .547.834l-5.545 4.117 6.309-3.642a.5.5 0 0 1 .534.845l-1.818 1.253 2.145-1.238a.5.5 0 0 1 .534.844l-.757.52 1.008-.582a.5.5 0 0 1 .563.822l-4.381 3.518 5.175-2.988a.5.5 0 0 1 .549.834l-2.511 1.869a.5.5 0 0 1 .334.87l-3.534 3.212a.5.5 0 0 1-.237.545l-1.045.6a.489.489 0 0 1-.25.071Z"
                fill="#d6dbe3"
                class="fill-d6dbe3"
              ></path>
              <path
                d="M44.773 21.233a.5.5 0 0 1-.337-.868l1.608-1.476-2.1 1.209a.5.5 0 0 1-.552-.831l4.12-3.123-4.771 2.756a.5.5 0 0 1-.53-.846l2.567-1.735-2.931 1.693a.5.5 0 0 1-.529-.848l2.06-1.383-2.389 1.379a.5.5 0 0 1-.537-.842l4.87-3.421-5.455 3.15a.5.5 0 0 1-.524-.851l.481-.316a.5.5 0 0 1-.386-.9l3.54-2.413a.494.494 0 0 1-.359-.226.5.5 0 0 1 .132-.678l2.9-2.046a.473.473 0 0 1-.133-.124.5.5 0 0 1 .061-.663l4.291-3.995a.5.5 0 0 1 .243-.515l.868-.5a.5.5 0 0 1 .59.8l-2.093 1.94 2.694-1.555a.5.5 0 0 1 .539.841l-.485.342.719-.415a.5.5 0 0 1 .532.846l-2.4 1.634 2.76-1.593a.5.5 0 0 1 .524.851l-.137.091.355-.206a.5.5 0 0 1 .537.842l-4.87 3.422L55.7 7.511a.5.5 0 0 1 .528.847l-2.062 1.386 2.4-1.382a.5.5 0 0 1 .53.847l-2.985 2.016a.511.511 0 0 1 .489.218.5.5 0 0 1-.116.675l-4.7 3.568a.5.5 0 0 1 .293.866l-3.81 3.5a.5.5 0 0 1-.238.541l-1 .574a.491.491 0 0 1-.256.066Z"
                fill="#8991a0"
                class="fill-8991a0"
              ></path>
              <path
                d="M56.435 11.508a.5.5 0 0 1-.368-.839l.179-.194-.635.366a.5.5 0 0 1-.664-.713l1.139-1.682L54.267 9.5a.5.5 0 0 1-.624-.765l.693-.78-1.024.591a.5.5 0 0 1-.63-.757l.806-.946-1.188.683a.5.5 0 0 1-.631-.756l.81-.952-1.2.691a.5.5 0 0 1-.619-.771l.6-.653-.89.514a.5.5 0 0 1-.665-.712l1.143-1.7-1.583.913a.5.5 0 0 1-.653-.73l.636-.863a.5.5 0 0 1-.235-.933L50.709.6a.5.5 0 0 1 .652.729l-.525.714 1.382-.8a.5.5 0 0 1 .665.712l-1.144 1.7L53.571 2.6a.5.5 0 0 1 .619.77l-.6.655.891-.515a.5.5 0 0 1 .631.757l-.808.95 1.194-.69a.5.5 0 0 1 .631.757l-.807.948 1.193-.689a.5.5 0 0 1 .624.765l-.694.78 1.024-.591a.5.5 0 0 1 .616.092.5.5 0 0 1 .048.621L57 8.888l1.6-.924a.5.5 0 0 1 .617.771l-.345.374a.5.5 0 0 1 .238.933l-2.421 1.4a.493.493 0 0 1-.254.066ZM50.289 29.565a.5.5 0 0 1-.425-.763l1.188-1.908-1.979 1.141a.5.5 0 0 1-.666-.709l1.155-1.738-1.862 1.074a.5.5 0 0 1-.632-.756l.825-.972-1.219.7a.5.5 0 0 1-.618-.771l.591-.644-.879.507a.5.5 0 0 1-.665-.712l1.143-1.69-1.826 1.058a.5.5 0 0 1-.648-.736l1.017-1.332-1.545.892a.5.5 0 0 1-.61-.779l.412-.427-.64.369a.5.5 0 0 1-.666-.709l1.16-1.739L41.034 20a.5.5 0 0 1-.654-.727l1.074-1.473-1.662.959a.5.5 0 0 1-.6-.788l.179-.177-.344.2a.5.5 0 0 1-.66-.718l1.117-1.6-1.758 1.015a.5.5 0 0 1-.607-.784l.313-.317-.512.295a.5.5 0 0 1-.606-.784l.3-.307-.5.288a.5.5 0 0 1-.622-.766l.662-.737-.978.565a.5.5 0 0 1-.628-.106.5.5 0 0 1-.015-.637l.968-1.228-1.455.84a.5.5 0 0 1-.643-.742l.966-1.226-1.453.839a.5.5 0 0 1-.671-.7l1.175-1.828-1.92 1.102a.5.5 0 0 1-.674-.7l1.13-1.812a.5.5 0 0 1-.391-.912l1.61-.93a.5.5 0 0 1 .674.7L32.73 8.591l1.97-1.139a.5.5 0 0 1 .671.7L34.2 9.983l1.923-1.11a.5.5 0 0 1 .643.742l-.966 1.226L37.254 10a.5.5 0 0 1 .642.742l-.967 1.23 1.456-.841a.5.5 0 0 1 .622.766l-.662.737.978-.565a.5.5 0 0 1 .606.784l-.3.307.5-.288a.5.5 0 0 1 .606.783l-.312.318.512-.295a.5.5 0 0 1 .66.718L40.475 16l1.758-1.015a.5.5 0 0 1 .6.789l-.179.176.344-.2a.5.5 0 0 1 .654.728l-1.072 1.47 1.661-.959a.5.5 0 0 1 .666.709l-1.154 1.739 1.861-1.075a.5.5 0 0 1 .611.78l-.413.427.64-.369a.5.5 0 0 1 .648.737l-1.017 1.331 1.545-.892a.5.5 0 0 1 .664.713l-1.143 1.688 1.827-1.053a.5.5 0 0 1 .618.77L49 23.14l.882-.509a.5.5 0 0 1 .632.756l-.824.971 1.217-.7a.5.5 0 0 1 .666.709L50.42 26.1l1.861-1.075a.5.5 0 0 1 .675.7l-1.187 1.908 1.3-.749a.5.5 0 1 1 .5.865l-3.03 1.751a.489.489 0 0 1-.25.065Z"
                fill="#b9bfcc"
                class="fill-b9bfcc"
              ></path>
              <path
                d="M22.807 48.152a.5.5 0 0 1-.288-.909l.47-.331-1.3.748a.5.5 0 0 1-.541-.839l8.16-5.854-9.355 5.4a.5.5 0 0 1-.521-.852l5.458-3.537-5.91 3.413a.5.5 0 0 1-.518-.855l2.922-1.863-3.247 1.874a.5.5 0 0 1-.525-.851l7.413-4.878-8 4.619a.5.5 0 0 1-.516-.856l.291-.181-.518.3a.5.5 0 0 1-.517-.855l1.082-.684-1.334.77a.5.5 0 0 1-.525-.851l6.7-4.4-7.246 4.183a.5.5 0 0 1-.514-.863l2.406-1.541-2.641 1.524a.5.5 0 0 1-.542-.839l7.953-5.71-8.32 4.8a.5.5 0 0 1-.545-.836l6.706-4.9-6.345 3.669a.5.5 0 0 1-.537-.842l3.637-2.55-2.159 1.246a.5.5 0 0 1-.554-.83l4.738-3.622a.5.5 0 0 1-.44-.856l4.2-3.9a.5.5 0 0 1 .244-.518l.877-.506a.5.5 0 0 1 .59.8l-1.985 1.844 2.554-1.474a.5.5 0 0 1 .553.83l-4.578 3.5 5.328-3.075a.5.5 0 0 1 .537.842l-3.636 2.548L26.482 27a.5.5 0 0 1 .545.836l-6.708 4.9 9.01-5.2a.5.5 0 0 1 .542.839l-7.953 5.711 12.79-7.386a.5.5 0 0 1 .52.854l-2.4 1.534 3.458-1.988a.5.5 0 0 1 .525.85l-6.706 4.4 7.719-4.456a.5.5 0 0 1 .518.855l-1.077.681 1.394-.8a.5.5 0 0 1 .517.856l-.3.188.483-.279a.5.5 0 0 1 .525.85l-7.411 4.877 8.006-4.623a.5.5 0 0 1 .519.855l-2.932 1.87 3.149-1.824a.5.5 0 0 1 .521.853l-5.448 3.531 1.284-.741a.5.5 0 0 1 .541.839l-8.158 5.853 2.187-1.261a.5.5 0 0 1 .538.841l-2.892 2.035a.5.5 0 0 1-.015.857l-6.716 3.878a.491.491 0 0 1-.25.067Z"
                fill="#1255ff"
                class="fill-31b5a5"
              ></path>
              <path
                d="M12.869 32.95a5.509 5.509 0 0 0-.048 7.116c.066.077.14.148.207.225a4.265 4.265 0 0 0-1.577 2.738 3.306 3.306 0 0 0 .735 2.308 11.26 11.26 0 0 0 .828.851L2.005 57.2.4 58.8a.393.393 0 0 0 .179.667A1.04 1.04 0 0 0 1.6 59.2l11.29-11.291.921-.92.26.26a3.885 3.885 0 0 0 4.132.744 4.568 4.568 0 0 0 1.521-1.044 6 6 0 0 0 8.137-.61c1.275-1.261 2.536-2.536 3.8-3.8l12.858-12.862 2.7-2.7 2.362 2.362c1.257.96 2.561-.1 3.453-.991.733-.733 1.7-1.478.83-2.529-.956-1.152-2.163-2.164-3.22-3.221l-3.229-3.229 8.123-8.125a3.339 3.339 0 0 0 3.293-.589.994.994 0 0 0 .212-.165 2.3 2.3 0 0 0-.066-3.29c-.532-.539-1.071-1.071-1.607-1.607-1.376-1.377-2.744-2.763-4.13-4.131a3.111 3.111 0 0 0-3.787-.311 2.347 2.347 0 0 0-.83 3.437l-7.993 7.994q-1.343-1.341-2.683-2.682C36.852 8.8 35.8 7.54 34.6 6.556a2.226 2.226 0 0 0-2.845.3c-.715.644-2.333 1.828-1.686 2.925a5.235 5.235 0 0 0 .861.912l1.977 1.977.111.11-12.082 12.084L14.1 31.7c-.412.412-.852.809-1.231 1.25Zm5.039 14.208a1.768 1.768 0 0 1-1.153.186 2.52 2.52 0 0 1-1.345-.7l-1.1-1.1a5.151 5.151 0 0 1-1.136-1.344 2.748 2.748 0 0 1 .189-2.691 3.336 3.336 0 0 1 .372-.448c1.663 1.789 3.485 3.465 5.225 5.175a4.441 4.441 0 0 1-1.052.922Zm23.777-16.351c-1.256-.93-2.059-2.351-3.442-3.149a7.575 7.575 0 0 0-5.621-.727 20.494 20.494 0 0 1-2.405.673 6.064 6.064 0 0 1-3.611-.807 7.69 7.69 0 0 1-1.925-1.722 7.024 7.024 0 0 0-1.091-1.16l2.873-2.873 1.952 1.951.369.37c.069.068.3.049.369.043a2.1 2.1 0 0 0 .564-.127c.113-.043.613-.229.433-.408l-2.6-2.6-.162-.161 2.42-2.41.362-.362 1.952 1.952.37.37c.068.068.3.05.368.044a2.067 2.067 0 0 0 .565-.127c.113-.043.613-.229.432-.41l-2.6-2.6-.162-.162 2.748-2.748 12.498 12.494ZM49.418 5.5l5.082 5.08-7.907 7.907-2.193-2.193 4.93-4.931.739-.738c.207-.207.172-.437-.134-.5a1.267 1.267 0 0 0-1.024.274l-5.193 5.193-.01.01-2.197-2.192q3.954-3.954 7.907-7.91Zm.425-3.5a1.108 1.108 0 0 1 .824-.652 1.7 1.7 0 0 1 1.11.534c.086.081.167.168.251.251l3.723 3.724L57.5 7.6a2.008 2.008 0 0 1 .219 2.929c-.557.515-1.158.12-1.644-.325a.67.67 0 0 0-.1-.132l-5.896-5.89A1.931 1.931 0 0 1 49.843 2Zm-17.2 8.529a13.3 13.3 0 0 1-.979-.979c-.79-.981.406-1.762 1.059-2.415.036-.037.225-.277.284-.284h.007a1.407 1.407 0 0 0 .184.176c.016.013.029.029.043.042.109.106.215.216.322.323l1.421 1.421 4.923 4.923a.642.642 0 0 0 .126.18l5.931 5.932a.489.489 0 0 0 .137.082l.025.025 5.33 5.331a12.19 12.19 0 0 1 1.054 1.054c.447.573.245.993-.163 1.446-.247.275-.527.526-.789.788a1.867 1.867 0 0 1-.274.274.478.478 0 0 0-.184.152.423.423 0 0 0-.158-.173l-3-3a.671.671 0 0 0-.125-.179L34.469 12.3c-.03-.03-.071-.033-.106-.053q-.863-.858-1.717-1.717ZM15.325 32.18l1.975 1.97.369.37c.224.224.7.12.958.007.161-.072.622-.337.389-.569l-2.6-2.6-.14-.139 2.751-2.751 1.977 1.977.37.369c.229.23.7.141.961.021.168-.077.621-.355.383-.593l-2.6-2.6-.137-.136 2.653-2.653c.093.093.187.184.276.281.275.3.531.613.8.913a6.479 6.479 0 0 0 2.09 1.559 7.771 7.771 0 0 0 5.65.287 7.723 7.723 0 0 1 2.49-.536 6.335 6.335 0 0 1 3.441 1.143c1.306.944 2.089 2.3 3.463 3.147L27.658 44.834c-.382.383-.753.782-1.15 1.15a4.241 4.241 0 0 1-5.954-.147c-2.02-2.019-4.069-4.012-6.06-6.06a4.655 4.655 0 0 1-.156-6.61c.319-.338.662-.658.987-.987Z"
                fill="#262626"
                class="fill-262626"
              ></path>
            </svg>
            <h2 className="font-semibold px-2">
              {" "}
              Chọn loại vắc xin bạn dự kiến tiêm
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gói vắc xin */}
            <div className="flex flex-col items-start">
              <h2 className="font-semibold text-lg mb-2 text-gray-700">
                Gói vắc xin
              </h2>
              <TagPicker
                placeholder="chọn gói vắc xin"
                data={packvcs}
                block
                style={{ width: "100%" }}
                onChange={handleAddPack}
              />
            </div>

            {/* Vắc xin lẻ */}
            <div className="flex flex-col items-start">
              <h2 className="font-semibold text-lg mb-2 text-gray-700">
                Vắc xin lẻ
              </h2>
              <TagPicker
                placeholder="chọn vắc xin lẻ"
                data={singlevcs}
                block
                style={{ width: "100%" }}
                onChange={handleAddSingle}
              />
            </div>
          </div>

          <div className="mt-6 justify-center flex">
            <button
              className="border px-4 py-2 rounded-lg bg-[#1255ff] text-white font-semibold delay-150 transition-all hover:scale-105 hover:bg-[#0c40e9]"
              onClick={handleOrder}
            >
              Đặt lịch
            </button>
          </div>
        </div>
        <div className="">
          {notifications.map(({ id, msg, open, type }) => (
            <div
              className={`whitespace-nowrap fixed z-50 ${
                type ? "bg-[#1255ff]" : "bg-red-600"
              } text-white px-2 my-2 rounded-lg p-4  transition-all duration-500 ease-in-out top-0 left-1/2 transform top-${
                id % 5
              } -translate-x-1/2 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
        {Loading && <LoadingLoginForm/>}
      <FooterComponent />
    </>
  );
}

export default BookingComponent;
