import React from 'react';
import { FiLoader } from "react-icons/fi";


const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Loading SCADA...</h2>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 relative">
            {/* <FiLoader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-gray-900" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;