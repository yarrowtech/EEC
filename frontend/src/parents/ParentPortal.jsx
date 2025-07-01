import React, { useState, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Activity,
  MessageSquare,
  Menu,
  X,
  Award,
  GraduationCap,
  FileText,
  Video,
  ChevronDown,
  Home
} from 'lucide-react';
import AttendanceReport from './AttendanceReport';
import AcademicReport from './AcademicReport';
import FeesPayment from './FeesPayment';
import HealthReport from './HealthReport';
import ComplaintManagementSystem from './ComplaintManagementSystem';
import ResultsView from './ResultsView';
import AchievementsView from './AchievementsView';
import CoursesView from './CoursesView';
import PTMPortal from './PTMPortal';
import ParentDashboard from './ParentDashboard';

const ParentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navRef = useRef(null);

  const scrollDown = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/parents' },
    { icon: Calendar, label: 'Attendance Report', path: '/parents/attendance' },
    { icon: BookOpen, label: 'Academic Report', path: '/parents/academic' },
    { icon: CreditCard, label: 'Fees Payment', path: '/parents/fees' },
    { icon: Activity, label: 'Health Report', path: '/parents/health' },
    { icon: MessageSquare, label: 'Complaints', path: '/parents/complaints' },
    { icon: Video, label: 'Parent-Teacher Meetings', path: '/parents/ptm' },
    { icon: GraduationCap, label: 'Results', path: '/parents/results', readOnly: true },
    { icon: Award, label: 'Achievements', path: '/parents/achievements', readOnly: true },
    { icon: FileText, label: 'Courses', path: '/parents/courses', readOnly: true }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex gap-0">
      {/* Mobile Sidebar Toggle */}
      {/* <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-yellow-500 text-white rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}

      {/* Backdrop for mobile sidebar */}
      {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )} */}

      {/* Sidebar */}
      <div
        className={`
          top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          lg:translate-x-0
        `}
        style={{ willChange: 'transform' }}
        aria-label="Sidebar"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Parent Portal</h2>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>

          <nav ref={navRef} className="space-y-2 overflow-y-auto flex-grow scrollbar-hide">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-colors ${
                  item.readOnly ? 'cursor-default opacity-75' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.readOnly && (
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    View Only
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Scroll Down Button */}
          <button
            onClick={scrollDown}
            className="mt-2 w-full py-2 flex items-center justify-center text-gray-500 hover:text-yellow-600 transition-colors"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<ParentDashboard />} />
          <Route path="attendance" element={<AttendanceReport />} />
          <Route path="academic" element={<AcademicReport />} />
          <Route path="fees" element={<FeesPayment />} />
          <Route path="health" element={<HealthReport />} />
          <Route path="complaints" element={<ComplaintManagementSystem />} />
          <Route path="ptm" element={<PTMPortal />} />
          <Route path="results" element={<ResultsView />} />
          <Route path="achievements" element={<AchievementsView />} />
          <Route path="courses" element={<CoursesView />} />
        </Routes>
      </div>
    </div>
  );
};

export default ParentPortal;