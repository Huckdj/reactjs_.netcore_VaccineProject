import React, { useEffect, useState } from 'react';
import '../../Asset/Css/NotificationComponent.css'; // Nhập file CSS cho component

function NotificationComponent({ msg, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    if (msg) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [msg, duration]);

  return (
    <div className={`fixed right-2 top-8 p-4 border rounded-md shadow-md transition-tr ansform duration-500 ${isVisible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'} bg-white border-green-600 flex items-center`}>
      <div className={`mr-2 ${isVisible ? 'shake' : ''}`}>
        {/* Biểu tượng chuông */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a2 2 0 00-2 2v.586a5 5 0 00-3 4.414v3a1 1 0 00.293.707l1.414 1.414A2 2 0 007 18h6a2 2 0 001.414-.586l1.414-1.414A1 1 0 0016 13v-3a5 5 0 00-3-4.414V4a2 2 0 00-2-2zm1 14H9a1 1 0 00-.707.293l-1.414 1.414A1 1 0 007 18h6a1 1 0 00.707-.293l-1.414-1.414A1 1 0 0011 16z" />
        </svg>
      </div>
      <span className="font-bold">{msg}</span>
    </div>
  );
}

export default NotificationComponent;
