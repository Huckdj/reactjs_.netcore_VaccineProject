import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

function formatDate(inputDate) {
    const date = new Date(inputDate);  
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
  
    return `${day}-${month}-${year}`;
}
  
function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3');
}

function BookingPrivateComponent() {
    const [currentPage, setCurrentPage] = useState(1);
    const urlapi = process.env.REACT_APP_API_BASE_URL;
    const [bookingHistory, setBookingHistory] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [reloaddata, setReloaddata] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch booking data
    useEffect(() => {
        const fetchdata = async () => {
            axios.post(`${urlapi}/api/Booking/GetAllData`)
            .then(res => {
                setBookingHistory(res.data.data);
                setFilteredBookings(res.data.data);
            });
        }
        if(reloaddata){
            fetchdata();
            setReloaddata(false);
        }
    }, [reloaddata]);

    // Search functionality
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching

        const filtered = bookingHistory.filter(booking => 
            booking.Name.toLowerCase().includes(value) ||
            booking.SDTInject.includes(value) ||
            booking.NameCenter.toLowerCase().includes(value) ||
            booking.status.toLowerCase().includes(value)
        );

        setFilteredBookings(filtered);
    };

    const itemsPerPage = 5;
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBookings.slice(startIndex, endIndex);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    // Get pagination buttons
    const getPaginationButtons = () => {
        let buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(i);
        }
        return buttons;
    };

    const [openStatus, setOpenStatus] = useState(false);
    const [confirm, setConfirm] = useState('');
    const handleActive = (e) => {
        setConfirm(e);
        setOpenStatus(!openStatus);
    }

    const handleUpdatestatus = (id, status) => {
        const payload = {
            id: id,
            NewStatus: status
        }
        axios.post(`${urlapi}/api/Booking/UPDATESTATUS`, payload)
        .then(res => {
            if(res.data.data[0].ErrorCode === 0){
                setReloaddata(true);
                setOpenStatus(false);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            {/* Search Input */}
            <div className="mb-4 flex items-center">
                <div className="relative w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm theo tên, số điện thoại, chi nhánh, trạng thái..." 
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                </div>
                {searchTerm && (
                    <span className="ml-2 text-gray-600">
                        Kết quả: {filteredBookings.length} bản ghi
                    </span>
                )}
            </div>

            {/* Rest of the existing component remains the same */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-[#f0f8ff]">
                        <tr>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Mã lịch</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Tên người tiêm</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">SDT Người tiêm</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Ngày sinh</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Chi Nhánh</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Ngày tiêm chủng</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Tên liên hệ</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Số điện thoại liên hệ</th>
                            <th className="p-4 text-left text-[#1255ff] font-medium whitespace-nowrap">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedData().map((booking) => (
                            <tr key={booking.bookingID} className="hover:bg-gray-50 transition-all">
                                <td className="p-6 whitespace-nowrap">{booking.ID}</td>
                                <td className="p-4 whitespace-nowrap">{booking.Name}</td>
                                <td className="p-4 whitespace-nowrap">
                                    {booking.SDTInject === "" ? 
                                        <p className='text-red-500'>Không có</p> : 
                                        <p>{formatPhoneNumber(booking.SDTInject)}</p>
                                    }
                                </td>
                                <td className="p-4 whitespace-nowrap">{formatDate(booking.Birthday)}</td>
                                <td className="p-4 whitespace-nowrap grid">
                                    <p className='font-semibold'>{booking.NameCenter}</p>
                                    <p>{booking.Address}</p>
                                </td>
                                <td className="p-4 text-green-600 whitespace-nowrap">{formatDate(booking.DateInject)}</td>
                                <td className="p-4 whitespace-nowrap">{booking.NameContact}</td>
                                <td className="p-4 whitespace-nowrap">{formatPhoneNumber(booking.SDT)}</td> 
                                <td className="p-4 whitespace-nowrap">
                                    <button onClick={() => handleActive(booking.ID)}>
                                        {booking.status === 'PROCESSING' && <p className='border px-2 py-1 rounded-lg bg-orange-500 text-white text-center'>
                                            Chờ xác nhận
                                        </p>}
                                        {booking.status === 'CONFIRMED' && <p className='border px-2 py-1 rounded-lg bg-blue-500 text-white text-center'>
                                            Đã xác nhận
                                        </p>}
                                        {booking.status === 'INJECTED' && <p className='border px-2 py-1 rounded-lg bg-green-500 text-white text-center'>
                                            Đã tiêm
                                        </p>}
                                        {booking.status === 'CANCELED' && <p className='border px-2 py-1 rounded-lg bg-red-500 text-white text-center'>
                                            Đã hủy
                                        </p>}
                                        {booking.status === "EXPIRED" && (
                                            <p className="border px-2 py-1 rounded-lg bg-red-800 text-white text-center">
                                                Quá hạn
                                            </p>
                                        )}
                                    </button>
                                    <div className='relative'>
                                        <div className={`fixed z-50 bg-white border shadow-lg w-[150px] ${openStatus && confirm === booking.ID ? 'grid':'hidden'}`}>
                                            <button className='p-2 bg-blue-500 text-white mb-2' onClick={() => handleUpdatestatus(booking.ID, 'CONFIRMED')}>Đã xác nhận</button>
                                            <button className='p-2 bg-green-500 mb-2' onClick={() => handleUpdatestatus(booking.ID, 'INJECTED')}>Đã tiêm</button>
                                            <button className='p-2 bg-red-500 text-white' onClick={() => handleUpdatestatus(booking.ID, 'CANCELED')}>Đã hủy</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6">
                {/* Previous Page Button */}
                {currentPage > 1 ? (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-green-500" />
                    </button>
                ) : (
                    <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-500" />
                    </div>
                )}

                {/* Page Number Buttons */}
                {getPaginationButtons().map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(item)}
                        className={`mx-1 px-3 py-2 border text-blue-500 rounded-lg ${currentPage === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        {item}
                    </button>
                ))}

                {/* Next Page Button */}
                {currentPage < totalPages ? (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="mx-2 px-4 py-2 border text-blue-500 rounded-lg hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="text-green-500" />
                    </button>
                ) : (
                    <div className="mx-2 px-4 py-2 border text-blue-500 rounded-lg bg-gray-200">
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingPrivateComponent