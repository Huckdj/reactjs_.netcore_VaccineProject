/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingComponent from "../../Additional/LoadingComponent";
function PostServiceComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    const id = 2;
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

  const [data2, setData2] = useState([]);
  useEffect(() => {
    setIsLoading(true)
    const id = 12;
    axios
      .post(`${urlapi}/api/PostPublics/GetFullPostByIdType`, { id })
      .then((res) => {
        setData2(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  
  return (
  <div className="container mx-auto mt-10">
      <h2 className=" uppercase m-2 border-b-2 font-semibold border-[#06a4ff] text-[18px]">Về dịch vụ của chúng tôi</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 m-2">
        {data.slice(0,4).map((e)=>(
          <Link to={`/post/${e.LinkRoute}`} className="w-full min-h-[300px] max-h-[300px] h-auto relative border-2 hover:border-2 hover:border-[#06a4ff] rounded-lg delay-50 transition-all ease-in-out">
            <img src={e.LinkImages} className="opacity-50 w-full h-full object-cover rounded-lg hover:border-[#06a4ff] hover:opacity-90" />
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 min-h-[80px] opacity-70 max-h-[80px] bg-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#086ec5] uppercase max-h-[80px] text-center font-semibold lg:line-clamp-3">{e.Title}</div>
          </Link>
        ))}
      </div>

      <h2 className="font-semibold uppercase m-2 mt-10 border-b-2 border-[#06a4ff] text-[18px]">Thông tin và điều trị cho trẻ em</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 m-2">
        {data2.slice(0,4).map((e)=>(
          <Link to={`/post/${e.LinkRoute}`} className="w-full min-h-[300px] max-h-[300px] h-auto relative border-2 hover:border-2 hover:border-[#06a4ff] rounded-lg delay-50 transition-all ease-in-out">
            <img src={e.LinkImages} className="opacity-50 w-full h-full object-cover rounded-lg hover:border-[#06a4ff] hover:opacity-90" />
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 min-h-[80px] opacity-70 max-h-[80px] bg-white"></div>
            <div className="absolute top-1/2 left-1/2 lg:line-clamp-3 xl:line-clamp-none transform -translate-x-1/2 -translate-y-1/2 text-[#086ec5] uppercase max-h-[80px] text-center font-semibold">{e.Title}</div>
          </Link>
        ))}
      </div>
      {isLoading && <LoadingComponent/>}
  </div>
  );
}

export default PostServiceComponent;
