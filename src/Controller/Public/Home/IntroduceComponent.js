/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../../Additional/LoadingComponent";
import { Link } from "react-router-dom";

function IntroduceComponent() {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const id = "8";
    axios
      .post(`${urlapi}/api/PostPublics/GetPostByID`, { id })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="top-introduce lg:max-h-[700px] items-center bg-[#d6f6ff]">
      {/* Desktop */}
      <div className="bg-[#d6f6ff]">
        <div className='lg:flex hidden min-h-[500px] max-h-[700px] justify-center pb-2 bg-cover bg-[url("https://res.cloudinary.com/dumx42hqq/image/upload/v1731853093/bg-vaccination_ubvwpx.png")]'>
          {data.map((e) => (
            <div className="container mx-auto">
              <div className="bg-[#1ec0ff]  h-[50px] rounded-b-full items-center lg:mr-[200px] lg:ml-[200px] xl:mr-[400px] xl:ml-[400px] flex justify-center shadow-2xl">
                <div className="font-semibold xl:text-[30px] lg:text-[20px] font-sans justify-center flex text-white">
                  {e.Title}
                </div>
              </div>

              <div className="mt-4 justify-center pl-2 items-center flex">
                <div className=" justify-center grid">
                  <p className="text-[27px] font-medium text-center max-w-[500px]">
                    "Tiêm chủng hôm nay để bảo vệ sức khỏe mai sau, cho bạn và
                    cộng đồng!"
                  </p>
                  <div className=" text-justify mr-4">
                    <div className="line-clamp-[9] max-w-[500px]">{e.ShortContent}</div>
                    <div className="justify-end flex">
                      <Link to={`/post/${e.LinkRoute}`} className="font-semibold hover:underline hover:text-[#1ec0ff] mt-4">Tìm hiểu thêm</Link>
                    </div>
                  </div>
                </div>

                <div className="grid place-items-center">
                  <p className="text-[27px] font-medium text-center max-w-[500px] xl:min-w-[600px]">
                    Vì sao chọn chúng tôi?
                  </p>
                  <div className="grid-cols-2 grid gap-3 text-center max-w-[500px] xl:min-w-[500px] mb-6">
                    <div className="text-center border-2 rounded-lg max-w-[500px] w-auto">
                      <div>
                        <img
                          src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731854312/tiem_nhe_it_dau_fc0f59106c_urwwzj.webp"
                        />
                      </div>
                      <div className="bg-[#06a4ff] rounded-b-lg text-white p-1 font-medium z-4">
                        Tiêm nhẹ nhàng ít đau
                      </div>
                    </div>

                    <div className="text-center border-2 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731857408/vaccine_chinh_hang_da_chung_loai_b9216eeac9_n7kpmv.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg text-white p-1 font-medium">
                        Chính hãng, đa chủng loại
                      </div>
                    </div>

                    <div className="text-center border-2 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731857542/gia_tot_0022801d83_xolfe6.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg text-white p-1 font-medium">
                        Giá phù hợp
                      </div>
                    </div>

                    <div className="text-center border-2 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731858225/he_thong_luu_tru_dat_chuan_GSP_8107a958b3_ueo6og.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg text-white p-1 font-medium">
                        Đạt chuẩn GSP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="bg-[#d6f6ff]">
        <div className="lg:hidden block min-h-[500px] h-full justify-center pb-2 bg-cover bg-[url('https://res.cloudinary.com/dumx42hqq/image/upload/v1731853093/bg-vaccination_ubvwpx.png')]">
          {data.map((e) => (
            <div className="container mx-auto">
              <div className="bg-[#1ec0ff]  h-[50px] rounded-b-full items-center lg:mr-[200px] lg:ml-[200px] xl:mr-[400px] xl:ml-[400px] flex justify-center shadow-2xl">
                <div className="font-semibold xl:text-[30px] lg:text-[20px] font-sans justify-center flex text-white">
                  {e.Title}
                </div>
              </div>

              <div className="">
                <div className=" justify-center grid">
                  <p className="text-[20px] font-medium text-center max-w-[500px] mt-4">
                    "Tiêm chủng hôm nay để bảo vệ sức khỏe mai sau, cho bạn và
                    cộng đồng!"
                  </p>
                  <div className="max-w-[500px] line-clamp-6 pb-0 text-justify m-2">
                    {e.ShortContent}
                  </div>
                  <div className="justify-end flex">
                      <Link to={`/post/${e.LinkRoute}`} className="font-semibold hover:underline hover:text-[#1ec0ff] mt-2 m-2">Tìm hiểu thêm</Link>
                  </div>
                </div>

                <div className="grid place-items-center">
                  <p className="text-[20px] mt-4 font-medium text-center max-w-[500px] xl:min-w-[600px]">
                    Vì sao chọn chúng tôi?
                  </p>
                  <div className="grid-cols-2 grid gap-2 text-center max-w-[500px] xl:min-w-[500px] mb-6 m-2">
                    <div className="text-center border-2 border-gray-300 rounded-lg max-w-[500px] w-auto">
                      <div>
                        <img
                          src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731854312/tiem_nhe_it_dau_fc0f59106c_urwwzj.webp"
                        />
                      </div>
                      <div className="bg-[#06a4ff] rounded-b-lg place-items-center grid text-white p-1 font-medium z-4 max-h-[60px] min-h-[60px]">
                        Tiêm nhẹ nhàng ít đau
                      </div>
                    </div>

                    <div className="text-center border-2 border-gray-300 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731857408/vaccine_chinh_hang_da_chung_loai_b9216eeac9_n7kpmv.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg place-items-center grid text-white p-1 font-medium max-h-[60px] min-h-[60px]">
                        Chính hãng, đa chủng loại
                      </div>
                    </div>

                    <div className="text-center border-2 border-gray-300 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731857542/gia_tot_0022801d83_xolfe6.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg place-items-center grid text-white p-1 font-medium max-h-[60px] min-h-[60px]">
                        Giá phù hợp
                      </div>
                    </div>

                    <div className="text-center border-2 border-gray-300 rounded-lg max-w-[400px] w-auto">
                      <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731858225/he_thong_luu_tru_dat_chuan_GSP_8107a958b3_ueo6og.webp" />
                      <div className="bg-[#06a4ff] rounded-b-lg place-items-center grid text-white p-1 font-medium max-h-[60px] min-h-[60px]">
                        Đạt chuẩn GSP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && <LoadingComponent />}
    </div>
  );
}

export default IntroduceComponent;
