/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React,{useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../Asset/Css/Introduce.css"
const data = [
    {
        Title:"Trước khi tiêm",
        color:"#1250dc",
        img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731891152/viduaaa_mmp3sp.svg",
        discription:[
            {
                Title:"Đặt trước",
                discription:"Đặt lịch trên web trước với chúng tôi để sắp xếp thời gian của bạn.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731891936/Untitled_Project_1_hqe66s.png"
            },
            {
                Title:"Sàng lọc",
                discription:"Khám sàng lọc và tư vấn cho đối tượng tiêm chủng.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731887532/San_loc_136300c357_hrxqvp.webp"
            },
            {
                Title:"Thông báo, giải đáp thắc mắc",
                discription:"Thông báo về loại vắc xin sẽ tiêm và ngày tiêm.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731888189/thong_bao_giai_dap_thac_mac_1f6cba5d2c_h2jji4.webp"
            }

        ]
    },
    {
        Title:"Quá trình tiêm",
        color:"#f79009",
        img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731891152/viduaaa_mmp3sp.svg",
        discription:[
            {
                Title:"Kiểm tra dụng cụ",
                discription:"Kiểm tra vắc xin, bơm tiêm và dung môi, dụng cụ trước khi sử dụng.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731889872/nhan_vien_y_te_eefe1c04b4_nbo2sx.webp"
            },
            {
                Title:"Kiểm tra tâm trạng",
                discription:"Giao tiếp để người được tiêm không lo lắng.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731889880/doi_tuong_tiem_chung_73443d1407_elswtt.webp"
            },
            {
                Title:"Thực hiện tiêm",
                discription:"Tiêm đúng chỉ định, đúng liều, đúng đường dùng.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731889880/thuc_hien_tiem_2c69619890_qkgsjx.webp"
            }

        ]
    },
    {
        Title:"Sau khi tiêm",
        color:"#039855",
        img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731891152/viduaaa_mmp3sp.svg",
        discription:[
            {
                Title:"Theo dõi sau tiêm",
                discription:"Lưu trú theo thời gian yêu cầu của bác sĩ và theo dõi phản ứng sau tiêm.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731890370/theo_doi_sau_tiem_28128c0d00_nrf2ry.webp"
            },
            {
                Title:"Bảo quản",
                discription:"Bảo quản vắc xin, vật tư tiêm chủng chưa sử dụng theo quy định GSP.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731890375/bao_quan_f11346581b_x1aqho.webp"
            },
            {
                Title:"Xử lý chất thải",
                discription:"Xử lý các chất thải y tế sau tiêm chủng theo đúng quy định.",
                img:"https://res.cloudinary.com/dumx42hqq/image/upload/v1731890380/xu_ly_chat_thai_efd0289b2a_ist1ee.webp"
            }

        ]
    }
]

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }
  
function VaccineProcessComponent() {
    const [isActiveProcess, setIsActiveProcess] = useState(0);
    const handleBeforeChange = (oldIndex, newIndex) => {
        setIsActiveProcess(newIndex);
    };
    const settings = {
        dots: true,
        infinite: false,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: handleBeforeChange,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
              style={{
                position:"absolute",
                bottom:10,
              }}
            >
              <ul style={{ margin: "0px", }}> {dots} </ul>
            </div>)
      };
  return (
    <div className="process-text">
      {/* Dêsktop */}
      <div className="lg:block hidden container mx-auto">
        <div className="place-content-center grid font-semibold uppercase lg:text-[27px] mt-7 mb-7">
          Quy trình tiêm chủng của chúng tôi
        </div>
        <div className="place-content-center grid">
          <img
            src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731887095/Processmadu_bu5o56.svg"
            className="w-full"
          />
          <div className="grid grid-cols-3 gap-3 mr-2 ml-2">
            {/* 1 */}
            <div className="border mt-4 rounded-lg">
              <div className="bg-[#1250dc] flex items-center rounded-t-lg mb-6 p-2">
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1731889538/muiten_agyhj8.svg' className="max-w-[50px] w-full"/>
                <h2 className="font-bold text-[25px] text-white">Trước khi tiêm</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 m-2">
                <div className="flex items-center">
                  <div className="bg-[#eaeffb] rounded-full mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731891936/Untitled_Project_1_hqe66s.png"
                      className="max-w-[70px] min-w-[70px] w-full rounded-lg opacity-85"
                    />
                  </div>    
                  <div className="">
                    <h2 className="font-semibold text-[20px]">Đặt trước</h2>
                    <p className="line-clamp-2">
                      Đặt lịch trên web trước với chúng tôi để sắp xếp thời gian
                      của bạn.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731887532/San_loc_136300c357_hrxqvp.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">Sàng lọc</h2>
                    <p className="line-clamp-2">
                      Khám sàng lọc và tư vấn cho đối tượng tiêm chủng.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731888189/thong_bao_giai_dap_thac_mac_1f6cba5d2c_h2jji4.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">
                      Thông báo, giải đáp thắc mắc
                    </h2>
                    <p className="line-clamp-2">
                      Thông báo về loại vắc xin sẽ tiêm và ngày tiêm.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="border mt-4 rounded-lg">
              <div className="bg-[#f79009] flex items-center rounded-t-lg mb-6 p-2">
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1731889538/muiten_agyhj8.svg' className="max-w-[50px] w-full"/>
                <h2 className="font-bold text-[25px] text-white">Quá trình tiêm </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 m-2">
                <div className="flex items-center">
                  <div className="bg-[#eaeffb] rounded-full mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731889872/nhan_vien_y_te_eefe1c04b4_nbo2sx.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div className="">
                    <h2 className="font-semibold text-[20px]">Kiểm tra dụng cụ</h2>
                    <p className="line-clamp-2">
                        Kiểm tra vắc xin, bơm tiêm và dung môi, dụng cụ trước khi sử dụng.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731889880/doi_tuong_tiem_chung_73443d1407_elswtt.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">Kiểm tra tâm trạng</h2>
                    <p className="line-clamp-2">
                      Giao tiếp để người được tiêm không lo lắng.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731889880/thuc_hien_tiem_2c69619890_qkgsjx.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">
                        Thực hiện tiêm
                    </h2>
                    <p className="line-clamp-2">
                        Tiêm đúng chỉ định, đúng liều, đúng đường dùng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="border mt-4 rounded-lg">
              <div className="bg-[#039855] flex items-center rounded-t-lg mb-6 p-2">
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1731889538/muiten_agyhj8.svg' className="max-w-[50px] w-full"/>
                <h2 className="font-bold text-[25px] text-white">Sau khi tiêm </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 m-2">

                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731890370/theo_doi_sau_tiem_28128c0d00_nrf2ry.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div className="">
                    <h2 className="font-semibold text-[20px]">Theo dõi sau tiêm</h2>
                    <p className="line-clamp-2">
                        Lưu trú theo thời gian yêu cầu của bác sĩ và theo dõi phản ứng sau tiêm.
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731890375/bao_quan_f11346581b_x1aqho.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">Bảo quản</h2>
                    <p className="line-clamp-2">
                        Bảo quản vắc xin, vật tư tiêm chủng chưa sử dụng theo quy định GSP.
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731890380/xu_ly_chat_thai_efd0289b2a_ist1ee.webp"
                      className="max-w-[70px] min-w-[70px] w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[20px]">
                        Xử lý chất thải
                    </h2>
                    <p className="line-clamp-2">
                        Xử lý các chất thải y tế sau tiêm chủng theo đúng quy định.
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden block">
        <h2 className="font-semibold uppercase text-center mt-7 text-[20px]">Quy trình tiêm chủng của chúng tôi</h2>
        {isActiveProcess === 0 &&
            <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731891152/viduaaa_mmp3sp.svg" className="w-full"/>
        }
        {isActiveProcess === 1 &&
            <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731894266/a_ygh7hd.svg" className="w-full"/>
        }
        {isActiveProcess === 2 &&
            <img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1731894311/a_h0mztg.svg" className="w-full"/>
        }
        <Slider {...settings} className="mt-8">
            {data.map((e,index)=>(
                <div key={index}>
                    <div className="border-2 rounded-t-md mr-2 ml-2 min-h-[450px] max-h-[450px]">
                        <div className={`bg-[${e.color}] p-2 rounded-t-md text-white flex items-center`}>
                            <img src={'https://res.cloudinary.com/dumx42hqq/image/upload/v1731889538/muiten_agyhj8.svg'} className="max-w-[50px]"/>
                            <div className="font-semibold text-[20px]">{e.Title}</div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-3 mb-3">
                            {e.discription.map((b,index) =>(
                                <div key={index} className="place items-center flex">
                                    <img src={b.img} className="max-w-[80px] m-2"/>
                                    <div className="m-2">
                                        <h2 className="font-semibold">{b.Title}</h2>
                                        <p>{b.discription}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default VaccineProcessComponent;
