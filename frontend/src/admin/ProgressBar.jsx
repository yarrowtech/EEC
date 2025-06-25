import React from 'react';

const AdminProgressBar = ({ 
  progress, 
  color = 'bg-blue-500', 
  height = 'h-2',
  showPercentage = false,
  animated = true 
}) => {
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`${height} rounded-full ${color} ${animated ? 'transition-all duration-500' : ''}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <span className="text-xs text-gray-600 mt-1">{progress}%</span>
      )}
    </div>
  );
};

export default AdminProgressBar;
