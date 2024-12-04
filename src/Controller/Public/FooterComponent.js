/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import {faAngleDown, faAngleUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const vechungtoi = [
  {
    Title:"Giới thiệu",
    LinkRoute:"/post/trung-tam-tiem-chung-madu"
  },
  {
    Title:"Chính sách bảo mật",
    LinkRoute:"/post/chinh-sach-bao-mat"
  },
  {
    Title:"Chính sách đặt cọc",
    LinkRoute:"/post/chinh-sach-dat-coc"
  },
  {
    Title:"Chính sách thanh toán",
    LinkRoute:"/post/chinh-sach-thanh-toan"
  },
  {
    Title:"Chính sách thu thập và xử lý dữ liệu cá nhân",
    LinkRoute:"/post/chinh-sach-thu-thap-va-xu-ly-du-lieu-ca-nhan"
  },
  {
    Title:"Đội ngũ y bác sỹ",
    LinkRoute:"/post/doi-ngu-y-bac-sy"
  },
]

const danhmuc = [
  {
    Title:"Tiêm chủng",
    LinkRoute:"/post/tiem-chung"
  },
  {
    Title:"Tư vấn bệnh lý",
    LinkRoute:"/post/tu-van-benh-ly"
  },
  {
    Title:"Bảng giá",
    LinkRoute:"/post/bang-gia-tiem-chung-madu-va-cac-hinh-thuc-thanh-toan-tien-loi"
  },
]

const timhieuthem = [
  {
    Title:"Tin tức sự kiện",
    LinkRoute:"/tin-tuc"
  },
  {
    Title:"Hoạt động xã hội",
    LinkRoute:"/post/tu-van-benh-ly"
  },
  {
    Title:"Tuyển dụng",
    LinkRoute:"/post/tuyen-dung"
  },
  {
    Title:"Bệnh thường gặp",
    LinkRoute:"/post/benh-thuong-gap"
  },
  {
    Title:"Chăm sóc sức khỏe",
    LinkRoute:"/post/cham-soc-suc-khoe"
  }
]
function FooterComponent() {
  const [tongdai,setTongdai] = useState(false)
  const [vechungtoidrd, setVechungtoi] = useState(false)
  const [danhmucdrd, setDanhmuc] = useState(false)
  const [timhieuthemdrd, setTimhieuthem] = useState(false)
  return (
    <div className='footer-component mt-10 pb-2 shadow-2xl border'>
      <div className='lg:grid hidden'>
        <div className='bg-[#1250dc] h-[50px] hidden lg:flex items-center'>

          <div className='container mx-auto justify-between flex'>
            <div className='items-center flex'>
              <FontAwesomeIcon icon={faLocationDot} className='text-white text-xl px-3'/>
              <span className='text-white font-medium text-xl'>Xem hệ thống trung tâm toàn quốc</span>
            </div>
            <div className='items-center flex'>
              <Link to="/tim-kiem-trung-tam" className='text-blue-500 p-2 rounded-full bg-white'>Xem danh sách trung tâm hiện tại</Link>
            </div>
          </div>

        </div>
        
        <div className='container mx-auto px-[200px]'>
          <div className='lg:block hidden m-2'>
            <div className='flex'>
              <div className='grid grid-cols-4'>

                <div className='px-4'>
                  <h2 className='text-gray-500 uppercase text-xs font-semibold'>Về chúng tôi</h2>
                  <div className='grid grid-cols-1 mt-2'>
                    {vechungtoi.map((e)=>(
                      <Link to={e.LinkRoute} className='py-1'>
                        <p className='text-blue-600 text-sm'>{e.Title}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='px-4'>
                  <h2 className='text-gray-500 uppercase text-xs font-semibold'>Danh mục</h2>
                  <div className='grid grid-cols-1 mt-2'>
                    {danhmuc.map((e)=>(
                      <Link to={e.LinkRoute} className='py-1'>
                        <p className='text-blue-600 text-sm'>{e.Title}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='px-4'>
                  <h2 className='text-gray-500 uppercase text-xs font-semibold'>Tìm hiểu thêm</h2>
                  <div className='grid grid-cols-1 mt-2'>
                    {timhieuthem.map((e)=>(
                      <Link to={e.LinkRoute} className='py-1'>
                        <p className='text-blue-600 text-sm'>{e.Title}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='px-4'>
                  <div>
                    <h2 className='text-gray-500 uppercase text-xs font-semibold'>Tổng đài</h2>
                    <div className='grid grid-cols-1 mt-2'>
                      <h2 className='text-sm font-semibold'>Tư vấn bệnh lý</h2>
                      <a href='tel:033.123.4567' className='text-xs text-blue-700 py-2'>033.123.4567</a>
                      <h2 className='text-sm font-semibold'>Trung tâm vắc xin</h2>
                      <a href='tel:033.123.4567' className='text-xs text-blue-700 py-2'>033.123.4567</a>
                      <h2 className='text-sm font-semibold'>Góp ý, khiếu nại</h2>
                      <a href='tel:033.123.4567' className='text-xs text-blue-700 py-2'>033.123.4567</a>
                    </div>
                  </div>

                  <div className='py-4'>
                    <h2 className='text-gray-500 uppercase text-xs font-semibold'>Chứng nhận bởi</h2>
                    <div className='grid grid-cols-2 mt-2 items-center'>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052300/bo_cong_thuong_a8e5750f57_sdn0im.svg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052313/DMCA_1_1f84305343_t80e1u.svg'/>
                    </div>
                  </div>

                  <div className='py-4'>
                    <h2 className='text-gray-500 uppercase text-xs font-semibold'>Hỗ trợ thanh toán</h2>
                    <div className='grid grid-cols-5 mt-2 gap-1 items-center'>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052567/visa_fdc3324c35_hr7hsc.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052571/mtc_1ed684ff7c_qwql2m.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052567/momo_ebbd8eb9b0_hm2lwt.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/zalopay_884e503cf9_aqwdid.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/amex_2610a984a5_vnhhyf.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/vnpay_1f73f546c4_gosgat.svg' className='p-1 border rounded-lg'/>
                      <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052563/jcb_7655e615ce_gc27ks.svg' className='p-1 border rounded-lg'/>
                    </div>
                  </div>
                </div>

              </div>

              <div>
                <h2 className='text-gray-500 uppercase text-xs font-semibold whitespace-nowrap'>Kết nối với chúng tôi</h2>
                <div className='grid grid-cols-3 py-3'>
                    <a href="https://web.facebook.com/madu.vaccinations/" className='px-1'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732051461/facebook_icon_zbcxhg.svg"/></a>
                    <a href="https://zalo.me/0338988152" className='px-1'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732051518/zalo_ghkevn.svg"/></a>
                    <a href="https://youtube.com/@maduvaccinations" className='px-1'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732051404/youtube_vb5agb.svg" className='w-full'/></a>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className='container mx-auto'>
          <hr/>
          <div className='place-items-center grid text-xs font-medium text-gray-500'>
            <span>© 2024 - 2024 Trung tâm tiêm chủng MADU. Quản lý và xuất bản bởi Bùi Mạnh Đức </span>
            <ul className='flex'>
              <li className='px-2'>Địa Chỉ : 123 Việt Nam</li>
              <li className='px-2'>•</li>
              <li className='px-2'>Số điện thoại: (033).123.4567</li>
              <li className='px-2'>•</li>
              <li className='px-2'>Email: maduvaccinations@gmail.com</li>
              <li className='px-2'>•</li>
              <li className='px-2'>Người quản lý nội dung: Bùi Mạnh Đức</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='lg:hidden block'>
        <div className='place-items-center grid bg-[#1250dc]'>
          <span className='text-white my-2'>Xem hệ thống trung tâm trên toàn quốc</span>
          <div className='items-center flex'>
              <Link to="/tim-kiem-trung-tam" className='text-[#1250dc] text-sm my-3 p-2 rounded-full bg-white'>Xem danh sách trung tâm hiện tại</Link>
          </div>
        </div>
        
        <div className='container mx-auto'>
          {/* Tổng đài */}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2' onClick={() => setTongdai(!tongdai)}>
              <h2 className='uppercase font-bold text-gray-700'>Tổng đài</h2>
              <div className='absolute right-0'>
                {tongdai ? (<FontAwesomeIcon icon={faAngleUp} className='duration-300 transition-all'/>) : (<FontAwesomeIcon icon={faAngleDown} className='duration-300 transition-all'/>)}
              </div>
            </div>
            <div className={`m-2 overflow-hidden transition-all duration-300 ${tongdai ? "max-h-screen" : "max-h-0"}`}>
              <div className='justify-between items-center flex'>
                <h2 className='text-sm font-semibold text-gray-500'>Tư vấn bệnh lý</h2>
                <a href='tel:033.123.4567' className='text-sm text-[#1250dc] py-2'>033.123.4567</a>
              </div>
              <div className='justify-between items-center flex'>
                <h2 className='text-sm font-semibold text-gray-500'>Trung tâm vắc xin</h2>
                <a href='tel:033.123.4567' className='text-sm text-[#1250dc] py-2'>033.123.4567</a>
              </div>
              <div className='justify-between items-center flex'>
                <h2 className='text-sm font-semibold text-gray-500'>Góp ý, khiếu nại</h2>
                <a href='tel:033.123.4567' className='text-sm text-[#1250dc] py-2'>033.123.4567</a>
              </div>
            </div>
            <hr/>
          </div>

          {/* Về chúng tôi */}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2' onClick={() => setVechungtoi(!vechungtoidrd)}>
              <h2 className='uppercase font-bold text-gray-700'>Về chúng tôi</h2>
              <div className='absolute right-0'>
                {vechungtoidrd ? (<FontAwesomeIcon icon={faAngleUp} className='duration-300 transition-all'/>) : (<FontAwesomeIcon icon={faAngleDown} className='duration-300 transition-all'/>)}
              </div>
            </div>
            <div className={`m-2 overflow-hidden transition-all duration-300 ${vechungtoidrd ? "max-h-screen" : "max-h-0"}`}>
              <div className='grid grid-cols-1 mt-2'>
                  {vechungtoi.map((e)=>(
                    <Link to={e.LinkRoute} className='py-1'>
                      <p className='text-blue-600 text-sm'>{e.Title}</p>
                    </Link>
                  ))}
              </div>
            </div>
            <hr/>
          </div>

          {/* danh mục*/}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2' onClick={() => setDanhmuc(!danhmucdrd)}>
              <h2 className='uppercase font-bold text-gray-700'>Danh mục</h2>
              <div className='absolute right-0'>
                {danhmucdrd ? (<FontAwesomeIcon icon={faAngleUp} className='duration-300 transition-all'/>) : (<FontAwesomeIcon icon={faAngleDown} className='duration-300 transition-all'/>)}
              </div>
            </div>
            <div className={`m-2 overflow-hidden transition-all duration-300 ${danhmucdrd ? "max-h-screen" : "max-h-0"}`}>
              <div className='grid grid-cols-1 mt-2'>
                  {danhmuc.map((e)=>(
                    <Link to={e.LinkRoute} className='py-1'>
                      <p className='text-blue-600 text-sm'>{e.Title}</p>
                    </Link>
                  ))}
              </div>
            </div>
            <hr/>
          </div>

          {/* Tìm Hiểu thêm*/}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2' onClick={() => setTimhieuthem(!timhieuthemdrd)}>
              <h2 className='uppercase font-bold text-gray-700'>Tìm Hiểu thêm</h2>
              <div className='absolute right-0'>
                {timhieuthemdrd ? (<FontAwesomeIcon icon={faAngleUp} className='duration-300 transition-all'/>) : (<FontAwesomeIcon icon={faAngleDown} className='duration-300 transition-all'/>)}
              </div>
            </div>
            <div className={`m-2 overflow-hidden transition-all duration-300 ${timhieuthemdrd ? "max-h-screen" : "max-h-0"}`}>
              <div className='grid grid-cols-1 mt-2'>
                  {danhmuc.map((e)=>(
                    <Link to={e.LinkRoute} className='py-1'>
                      <p className='text-blue-600 text-sm'>{e.Title}</p>
                    </Link>
                  ))}
              </div>
            </div>
            <hr/>
          </div>

          {/* Kết nối với chúng tôi */}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2'>
              <h2 className='uppercase font-bold text-gray-700'>Kết nối với chúng tôi</h2>
            </div>
            <div className='py-2'>
              <div className='flex items-center'>
                      <a href="https://web.facebook.com/madu.vaccinations/" className='px-2'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732094857/5296499_fb_facebook_facebook_logo_icon_dejpqm.png"/></a>
                      <a href="https://zalo.me/0338988152" className='px-2'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732094858/7044033_zalo_icon_yqvj2y.png"/></a>
                      <a href="https://youtube.com/@maduvaccinations" className='px-2'><img src="https://res.cloudinary.com/dumx42hqq/image/upload/v1732051404/youtube_vb5agb.svg" className='w-[50px]'/></a>
              </div>
            </div>
            <hr/>
          </div>

          {/* Hỗ trợ thanh toán */}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2'>
              <h2 className='uppercase font-bold text-gray-700'>Hỗ trợ thanh toán </h2>
            </div>
            <div className='py-2 m-2'>
              <div className='grid grid-cols-7 gap-2 items-center'>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052567/visa_fdc3324c35_hr7hsc.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052571/mtc_1ed684ff7c_qwql2m.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052567/momo_ebbd8eb9b0_hm2lwt.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/zalopay_884e503cf9_aqwdid.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/amex_2610a984a5_vnhhyf.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052565/vnpay_1f73f546c4_gosgat.svg' className='p-1 border rounded-lg'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052563/jcb_7655e615ce_gc27ks.svg' className='p-1 border rounded-lg'/>
              </div>
            </div>


            <hr/>
          </div>

          {/* Hỗ trợ thanh toán */}
          <div>
            <div className='m-2 flex relative cursor-pointer py-2'>
              <h2 className='uppercase font-bold text-gray-700'>Chứng nhận bởi</h2>
            </div>
            <div className=''>
              <div className='grid grid-cols-2 gap-4 items-center'>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052300/bo_cong_thuong_a8e5750f57_sdn0im.svg' className='w-full'/>
                <img src='https://res.cloudinary.com/dumx42hqq/image/upload/v1732052313/DMCA_1_1f84305343_t80e1u.svg'/>
              </div>
            </div>
          </div>
          
          <div className='m-2 text-xs font-medium text-gray-500'>
            <hr/>
            <div>
              <span>© 2024 - 2024 Trung tâm tiêm chủng MADU. Quản lý và xuất bản bởi Bùi Mạnh Đức</span>
              <div>Địa chỉ: 123 Việt Nam</div>
              <div className='py-2'>• Số điện thoại:<a href='tel:0331234567' className='text-[#1250dc]'> (033).123.4567</a></div>
              <div className='py-2'>• Email:<a href='mailto:maduvaccinations@gmail.com' className='text-[#1250dc]'> maduvaccinations@gmail.com</a></div>
              <div className='py-2'>• Người quản lý nội dung: Bùi Mạnh Đức</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FooterComponent
