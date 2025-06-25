import React, { useState } from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications] = useState(3);
  
  const studentData = {
    name: "Koushik Bala",
    avatar: "src/koushik-bala-pp.jpg"
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{studentData.name}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
            <div className="relative">
              <img
                src={studentData.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;