/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingComponent from "../../Additional/LoadingComponent";

function VaccinationCenterInfo() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    localStorage.removeItem('dt')
    axios
      .post(`${urlapi}/api/PostPublics/RandomPost`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
        localStorage.setItem('dt','ok')
      })
      .catch((err) => {
        alert("Error fetching data: " + err);
        setIsLoading(false);
        localStorage.removeItem('dt')
      });
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <div className="hidden lg:block">
        <div className="justify-center flex items-center">
          <h2 className="border-r-2 pr-2 text-[27px] font-bold">
            Thông tin về trung tâm tiêm chủng MADU
          </h2>
          <Link
            to="/kaskdf"
            className="ml-3 text-[18px] text-[#1250dc] hover:text-[#1ec0ff] font-medium"
          >
            Xem tất cả <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {data.length > 0 && (
            <Link to={`/post/${data[0].LinkRoute}`} className="col-span-2">
              <img
                src={data[0].LinkImages}
                alt="Main Post"
                className="w-full h-[350px] object-cover rounded-lg border"
              />
              <div className="mt-3"></div>
              <h3 className="mt-2 text-lg font-semibold line-clamp-2 mb-2">
                {data[0].ShortContent}
              </h3>
              <span className="bg-gray-200 p-1 rounded-full text-sm">
                {data[0].PostType}
              </span>
            </Link>
          )}

          <div className="col-span-1 space-y-4">
            {data.slice(1, 6).map((item, index) => (
              <Link  to={`/post/${item.LinkRoute}`} key={index} className="flex items-start space-x-4">
                <img
                  src={item.LinkImages}
                  alt={`Post ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div>
                  <h4 className="text-sm  font-medium line-clamp-2">
                    {item.Title}
                  </h4>
                  <h4 className="text-xs font-light line-clamp-1">
                    {item.ShortContent}
                  </h4>
                  <span className=" text-xs bg-gray-300 rounded-xl p-1">
                    {item.PostType}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className="justify-center grid items-center">
          <h2 className=" pr-2 text-[20px] text-center font-bold">
            Thông tin về trung tâm <br />
            tiêm chủng MADU
          </h2>
          <Link
            to="/kaskdf"
            className="ml-3 text-[18px] text-[#1250dc] hover:text-[#1ec0ff] font-medium justify-center flex items-center"
          >
            Xem tất cả{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="px-2" />
          </Link>
        </div>

        <div className="flex flex-col mt-4 space-y-4 m-2">
          {data.length > 0 && (
            <Link to={`/post/${data[0].LinkRoute}`} className="mb-2">
              <img
                src={data[0].LinkImages}
                alt="Main Post"
                className="w-full h-48 object-cover rounded-lg border"
              />
              <h3 className="mt-2 text-md font-semibold line-clamp-2">
                {data[0].Title}
              </h3>
              <h3 className="mt-2 text-xs line-clamp-2">
                {data[0].ShortContent}
              </h3>
              <div className="mt-2">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  {data[0].PostType}
                </span>
              </div>
            </Link>
          )}

          {/* Danh sách bài viết phụ */}
          <div className="space-y-3">
            {data.slice(1, 5).map((item, index) => (
              <Link
                to={`/post/${item.LinkRoute}`}
                key={index}
                className="flex items-center space-x-3 border-b pb-3"
              >
                <img
                  src={item.LinkImages}
                  alt={`Post ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div>
                  <h4 className="text-sm font-medium line-clamp-2">
                    {item.Title}
                  </h4>
                  <h4 className="text-xs font-light line-clamp-2">
                    {item.ShortContent}
                  </h4>
                  <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs">{item.PostType}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isLoading && <LoadingComponent/>}
    </div>
  );
}

export default VaccinationCenterInfo;
