// components/AbsoluteComponents.js
import React from 'react';
import { FaFileAlt, FaBriefcase, FaGraduationCap, FaTruck, FaStar } from 'react-icons/fa';

const AbsoluteComponents = () => {
  return (
    <div className="relative w-full h-24">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full">
        <FaFileAlt className="w-8 h-8 text-gray-700"/>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-1/4 flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full">
        <FaBriefcase className="w-8 h-8 text-gray-700"/>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-2/4 flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full">
        <FaGraduationCap className="w-8 h-8 text-gray-700"/>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-3/4 flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full">
        <FaTruck className="w-8 h-8 text-gray-700"/>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full">
        <FaStar className="w-8 h-8 text-gray-700"/>
      </div>
    </div>
  );
};

export default AbsoluteComponents;
