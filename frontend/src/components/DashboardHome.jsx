import React from 'react';
import WelcomeCard from './WelcomeCard';
import CourseProgress from './CourseProgress';
import AchievementCard from './AchievementCard';
import CalendarWidget from './CalendarWidget';
import QuickStats from './QuickStats';

const DashboardHome = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Welcome Section */}
      <WelcomeCard />
      
      {/* Quick Stats */}
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Course Progress */}
          <CourseProgress />
          
          {/* Achievements */}
          <AchievementCard />
        </div>
        
        {/* Sidebar - Right 1 column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Calendar */}
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;