import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from './DashboardHome';
import AttendanceView from './AttendanceView';
import RoutineView from './RoutineView';
import AssignmentView from './AssignmentView';
import CoursesView from './CoursesView';
import AchievementsView from './AchievementsView';
import ThemeCustomizer from './ThemeCustomizer';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // default to closed on mobile

  // Define view components in an object for cleaner code
  const viewComponents = {
    dashboard: <DashboardHome />,
    attendance: <AttendanceView />,
    routine: <RoutineView />,
    assignments: <AssignmentView />,
    courses: <CoursesView />,
    achievements: <AchievementsView />,
    themecustomizer:<ThemeCustomizer/>,
  };

  const renderContent = () => {
    return viewComponents[activeView] || <DashboardHome />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${
        sidebarOpen && 'md:ml-64'
      }`}>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-2 sm:p-4 md:p-6 w-full">
          {renderContent()}
        </main>
      </div>
      {/* Theme Customizer */}
      <ThemeCustomizer />
    </div>
  );
};

export default Dashboard;