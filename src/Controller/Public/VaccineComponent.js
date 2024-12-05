import React, { useState, useMemo, useEffect } from 'react';
import { Input, SelectPicker } from 'rsuite';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './FooterComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VaccineProductList = () => {
  const urlapi = process.env.REACT_APP_API_BASE_URL;

  // State quản lý dữ liệu
  const [initialData, setInitialData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vaccineType, setVaccineType] = useState('all');
  const [ageRange, setAgeRange] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [singleResponse, packResponse] = await Promise.all([
          axios.post(`${urlapi}/api/SingleItem/GetDataPublic`),
          axios.post(`${urlapi}/api/PackageItem/GetDataPublic`),
        ]);

        const combinedData = [
          ...singleResponse.data.data.map((item) => ({ ...item, Type: 'single' })),
          ...packResponse.data.data.map((item) => ({ ...item, Type: 'combo' })),
        ];
        setInitialData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [urlapi]);

  // Dữ liệu cho SelectPicker
  const vaccineTypeData = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Vắc xin lẻ', value: 'single' },
    { label: 'Vắc xin gói', value: 'combo' },
  ];
  const ageRangeData = [
    { label: 'Tất cả độ tuổi', value: 'all' },
    { label: 'Trẻ Em (0-18 tuổi)', value: '0-18' },
    { label: 'Người Trưởng Thành (18-50 tuổi)', value: '18-50' },
    { label: 'Người Cao Tuổi (50-80 tuổi)', value: '50-80' },
  ];
  const priceRangeData = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Dưới 3 triệu', value: '0-3tr' },
    { label: 'Từ 3-5 triệu', value: '3tr-5tr' },
    { label: 'Trên 5 triệu', value: '5tr+' },
  ];

  // Bộ lọc dữ liệu
  const filteredVaccines = useMemo(() => {
    return initialData.filter((vaccine) => {
      const matchesSearch = vaccine.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        vaccineType === 'all' || vaccine.Type === vaccineType;
      const matchesAge = ageRange === 'all' || vaccine.AgeRange === ageRange;
      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === '0-3tr' && vaccine.Price < 3000000) ||
        (priceRange === '3tr-5tr' && vaccine.Price >= 3000000 && vaccine.Price < 5000000) ||
        (priceRange === '5tr+' && vaccine.Price >= 5000000);

      return matchesSearch && matchesType && matchesAge && matchesPrice;
    });
  }, [searchTerm, vaccineType, ageRange, priceRange, initialData]);

  // Toggle menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto p-4">
        {/* Nút hamburger menu cho thiết bị di động */}
        <div className="md:hidden mb-4 flex justify-end">
          <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Container cho bộ lọc */}
        <div className={`grid grid-cols-1 gap-4 mb-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:grid md:grid-cols-2 lg:grid-cols-4 md:block`}>
            <div>
            <label className='font-semibold py-2'>Chọn mức giá   </label>
          <Input
            placeholder="Tìm kiếm phiếu xin..."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            className="w-full"
          />
          </div>
          <div>
          <label className='font-semibold py-2 '>Chọn mức giá   </label>
          <SelectPicker
            data={vaccineTypeData}
            searchable={false}
            value={vaccineType}
            onChange={setVaccineType}
            placeholder="Loại phiếu xin"
            className="w-full"
          />
          </div>
          <div>
          <label className='font-semibold py-2'>Chọn độ tuổi  </label>
          <SelectPicker
            data={ageRangeData}
            searchable={false}
            value={ageRange}
            onChange={setAgeRange}
            placeholder="Độ tuổi"
            className="w-full"
          />
          </div>
          <div>
          <label className='font-semibold py-2'>Chọn mức giá   </label>
          <SelectPicker
            data={priceRangeData}
            searchable={false}
            value={priceRange}
            onChange={setPriceRange}
            placeholder="Mức giá"
            className="w-full"
          />
          </div>
        </div>

        {/* Lưới vắc-xin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVaccines.map((vaccine) => (
            <div key={vaccine.ID} className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform hover:border-blue-600 hover:shadow-xl">
              <img src={vaccine.LinkImages} alt={vaccine.Name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 truncate">{vaccine.Name}</h3>
                <p className="text-sm text-gray-600 mb-2">{vaccine.ShortContent}</p>
                <div className="mb-2 text-sm text-gray-500">
                    {filteredVaccines.ShortContent}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-semibold">{vaccine.PriceFormat} VNĐ</span>
                </div>
                <Link
                  to={`/vaccine/${vaccine.LinkRoute}`}
                  className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredVaccines.length === 0 && <div className="text-center text-gray-500 mt-8">Không tìm thấy câu xin phù hợp</div>}
      </div>
      <FooterComponent />
    </>
  );
};

export default VaccineProductList;
