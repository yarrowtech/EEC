import React from 'react';

const AdminAvatar = ({ src, alt, emoji, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center ${className}`}>
      {emoji || (src ? <img src={src} alt={alt} className="rounded-full w-full h-full object-cover" /> : '👤')}
    </div>
  );
};

export default AdminAvatar;