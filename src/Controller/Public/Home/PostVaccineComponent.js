/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../Additional/LoadingComponent";

function PostVaccineComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = 1;
    axios
      .post(`${urlapi}/api/PostPublics/GetFullPostByIdType`, { id })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="uppercase font-bold pt-4 border-b-2 pb-2 border-[#06a4ff] justify-between flex m-2">
        <div className="gap-1 grid md:text-[18px] font-semibold">Tìm hiểu về các loại vắc xin</div>
        <a
          href="/tat-ca-bai-viet-vaccine"
          className="delay-100 md:text-[18px] hover:text-[#1ec0ff] hover:-translate-y-1.5 transition-transform duration-100 font-normal"
        >
          Xem thêm
        </a>
      </div>

      <div className=" hidden grid-cols-1 md:grid md:grid-cols-4 md:gap-1 mt-2">
        {data.slice(0, 8).map((e, index) => (
          <Link key={index} to={`/post/${e.LinkRoute}`} className="border m-2 bg-[#f6f7f9] rounded-lg">
            <div className="justify-center flex items-center overflow-hidden">
              <img
                src={e.LinkImages}
                className="justify-center transition-all delay-100 ease-in-out flex items-center hover:scale-110"
              />
            </div>
            <div className="justify-center flex mt-2 mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{e.Title}</div>
            <div className='line-clamp-2 text-sm text-gray-500 p-1 text-justify'>{e.ShortContent}</div>
          </Link>
        ))}
      </div>

      <div className=" grid md:hidden grid-cols-1 md:grid-cols-4 md:gap-1 mt-2 rounded-md ">
        {data.slice(0, 4).map((e, index) => (
          <Link key={index} to={`/post/${e.LinkRoute}`} className="border m-2 bg-[#f6f7f9] rounded-lg">
            <div className="justify-center flex items-center overflow-hidden">
              <img
                src={e.LinkImages}
                className="justify-center transition-all delay-100 ease-in-out flex items-center hover:scale-110"
              />
            </div>
            <div className="justify-center flex mt-2 mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{e.Title}</div>
            <div className='line-clamp-2  overflow-hidden text-sm text-gray-500 p-2 pb-0 text-justify '>{e.ShortContent}</div>
          </Link>
        ))}
      </div>
      {isLoading && <LoadingComponent />}
    </div>
  );
}

export default PostVaccineComponent;
