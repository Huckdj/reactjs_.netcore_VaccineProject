import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VaccinationChart = () => {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API
    const fetchData = async () => {
      try {
        const response = await axios.post(`${urlapi}/api/Booking/GetDataChart`);
        setApiData(response.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Không thể lấy dữ liệu từ API!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlapi]); 

  if (loading) return <div className="text-center text-gray-500">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const chartData = apiData?.data?.map((item) => ({
    date: new Date(item.DateOnly).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    'Số Lượng': item.TotalBookings,
  }));
  if (chartData && chartData.length > 0) {
    const firstDate = new Date(chartData[0].date);
    const previousDate = new Date(firstDate);
    previousDate.setDate(firstDate.getDate() - 1); 

    chartData.unshift({
      date: previousDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      'Số Lượng': 0, 
    });
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Thống kê lịch đặt tháng này</h2>
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <ResponsiveContainer width="100%" height={window.innerHeight * 0.85}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#4B5563", fontSize: 14 }}
              label={{
                value: "Ngày",
                position: "insideBottom",
                offset: -5,
                fill: "#6B7280",
              }}
            />
            <YAxis
              tick={{ fill: "#4B5563", fontSize: 14 }}
              label={{
                value: "Số lượng lịch tiêm",
                angle: -90,
                position: "insideLeft",
                fill: "#6B7280",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ top: 0, left: 25 }} />
            <Line
              type="monotone"
              dataKey="Số Lượng"
              stroke="#4F46E5"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={{ stroke: "#4F46E5", strokeWidth: 2, fill: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VaccinationChart;
