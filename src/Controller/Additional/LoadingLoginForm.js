import React from 'react';

function LoadingLoginForm() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100">
      <div className="border-4 border-t-[#1255ff] border-gray-300 p-4 w-16 h-16 animate-spin rounded-full"></div>
    </div>
  );
}

export default LoadingLoginForm;
