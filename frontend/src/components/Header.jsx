import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationList = [
    {
      id: 1,
      type: 'assignment',
      message: 'Math Assignment due tomorrow!',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'exam',
      message: 'Science Exam scheduled for Friday.',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'general',
      message: 'School will be closed next Monday.',
      time: '3 days ago',
    },
  ];
  const [profileOpen, setProfileOpen] = useState(false);
  
  const studentData = {
    name: "Koushik Bala",
    avatar: "src/koushik-bala-pp.jpg"
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 w-full">
        {/* Top row: Hamburger + Profile (mobile) */}
        <div className="flex w-full sm:hidden items-center justify-between mb-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="block" style={{lineHeight: 0}}>
              <Menu size={28} color="#222" />
            </span>
            <noscript><span style={{fontSize: 28}}>☰</span></noscript>
          </button>
          <div className="relative flex items-center">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open profile menu"
            >
              <img
                src={studentData.avatar}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col">
                <span className="px-4 py-2 text-gray-700 text-sm">{studentData.name}</span>
                <span className="px-4 py-2 text-gray-500 text-xs">Student</span>
                <button className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 text-sm">Logout</button>
              </div>
            )}
          </div>
        </div>
        {/* Second row: Search + Notifications + Profile (desktop) */}
        <div className="flex w-full items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-md md:max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
            />
          </div>
          {/* Right side (desktop) */}
          <div className="hidden sm:flex items-center space-x-4 ml-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Show notifications"
              >
                <Bell size={20} className="text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
                  <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                    {notificationList.map((n) => (
                      <li key={n.id} className="px-4 py-3 flex items-start gap-3 hover:bg-yellow-50 transition-colors">
                        <span className={`mt-1 w-2 h-2 rounded-full ${n.type === 'assignment' ? 'bg-yellow-500' : n.type === 'exam' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                        <div className="flex-1">
                          <div className="text-sm text-gray-800">{n.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {notificationList.length === 0 && (
                    <div className="p-4 text-gray-500 text-sm text-center">No new notifications</div>
                  )}
                </div>
              )}
            </div>
            {/* Profile (desktop) */}
            <div className="relative flex items-center space-x-2">
              <img
                src={studentData.avatar}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">{studentData.name}</span>
                <span className="text-xs text-gray-500">Student</span>
              </div>
              {/* Dropdown for desktop (optional, can add settings/logout here) */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;