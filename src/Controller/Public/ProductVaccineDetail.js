import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './FooterComponent';
import LoadingComponent from '../Additional/LoadingComponent';

const ProductDetail = () => {
  const { route } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const urlapi = process.env.REACT_APP_API_BASE_URL;

  const fetchProductDetail = async () => {
    try {
      const singleApiUrl = `${urlapi}/api/SingleItem/GetsingleByRoute`;
      const singleResponse = await axios.post(singleApiUrl, { LinkRoute: `${route}` });

      if (singleResponse.data.status === '0' && singleResponse.data.data.length > 0) {
        setProduct(singleResponse.data.data[0]);
      } else {
        const packageApiUrl = `${urlapi}/api/PackageItem/GetsingleByRoute`;
        const packageResponse = await axios.post(packageApiUrl, { LinkRoute: `${route}` });

        if (packageResponse.data.status === '0' && packageResponse.data.data.length > 0) {
          setProduct(packageResponse.data.data[0]);
        } else {
          setError('Không tìm thấy sản phẩm!');
        }
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải dữ liệu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [route]);

  if (loading) {
    return <div className="text-center mt-20"><LoadingComponent/></div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto px-4">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            
            <div className="flex justify-center">
              <img
                src={product.LinkImages}
                alt={product.Name}
                className="w-full h-auto rounded-lg shadow-md max-w-sm md:max-w-full"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.Name}</h1>
              <p className="text-sm md:text-lg text-gray-600 mb-4">{product.ShortContent}</p>
              <p className="text-lg md:text-xl text-green-600 font-semibold mb-6">
                {product.Price.toLocaleString()} VNĐ
              </p>

              <div className="text-xs md:text-sm text-gray-500 mb-6 space-y-2">
                <p>
                  <strong>Xuất xứ:</strong> {product.CountryItem}
                </p>
                <p>
                  <strong>Độ tuổi:</strong> {product.AgeType}
                </p>
                <p>
                  <strong>Ngày tạo:</strong> {new Date(product.CreateDate).toLocaleDateString()}
                </p>
              </div>
              <Link
                to="/dat-lich-tiem-chung"
                className="bg-blue-500 text-white px-4 py-2 w-full md:w-auto block text-center rounded-md hover:bg-blue-600 transition"
              >
                Đặt lịch tiêm
              </Link>
              <h2 className="font-semibold text-lg md:text-xl mt-6 mb-2">Mô tả</h2>
              <div className="prose lg:prose-lg text-gray-700 mb-6 overflow-y-auto max-h-64 md:max-h-96 border rounded-lg p-4">
                <div dangerouslySetInnerHTML={{ __html: product.FullContent }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default ProductDetail;
