import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 h-full animate-pulse">
      <div className="p-4">
        <div className="h-48 bg-gray-800 rounded-md"></div>
      </div>
      
      <div className="p-4">
        <div className="h-3 bg-gray-800 rounded-md w-1/4 mb-2"></div>
        <div className="h-5 bg-gray-800 rounded-md w-3/4 mb-4"></div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="h-4 bg-gray-800 rounded-md w-1/4"></div>
          <div className="h-8 w-8 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;