/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
  <div className="flex flex-col items-center gap-6">
    {/* Hình ảnh */}
    <div className="overflow-hidden ">
      <img src="https://i.imgur.com/4RK7SgO.png" alt="404 Not Found" className="w-40 h-40 object-cover" />
    </div>

    <div className="font-basic font-bold text-3xl text-gray-800 uppercase">
      Không Tìm Thấy Trang
    </div>

    <p className="text-gray-600 text-lg">
      Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
    </p>

    {/* Nút quay lại trang chủ */}
    <a href="/" className="px-6 py-3 mt-4 bg-[#06a4ff] text-white rounded-lg shadow hover:bg-[#1250dc] transition duration-300 ease-in-out">
      Quay lại trang chủ
    </a>
  </div>
</div>

  )
}

export default NotFoundComponent
