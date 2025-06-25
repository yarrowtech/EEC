import React, { useState, useEffect } from 'react';
import DashboardNav from './components/DashboardNav';

const stats = [
  { label: 'Teachers', value: 12, icon: '👨‍🏫', trend: '+2' },
  { label: 'Students', value: 120, icon: '👨‍🎓', trend: '+15' },
  { label: 'Courses', value: 18, icon: '📚', trend: '+3' },
  { label: 'Parents', value: 110, icon: '👥', trend: '+8' },
];

const quickActions = [
  { title: 'Add New Student', action: 'student', icon: '➕' },
  { title: 'Create Course', action: 'course', icon: '📝' },
  { title: 'Send Notification', action: 'notification', icon: '📢' },
  { title: 'Generate Report', action: 'report', icon: '📊' },
];

const Dashboard = ({setShowAdminHeader}) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    // In a real app, this would navigate or open a modal
    setTimeout(() => setSelectedAction(null), 2000);
  };

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(true)
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-8">
      <div className="mx-auto bg-yellow-50/95 rounded-2xl shadow-2xl p-8 border border-yellow-300">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-800 mb-2">Admin Dashboard</h1>
          <p className="text-yellow-700 text-lg">Overview of the institution's key statistics and quick actions.</p>
        </div>

        {/* Navigation Menu - Only shown on dashboard */}
        <DashboardNav />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-yellow-500"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <span className="text-3xl font-bold mb-1 text-yellow-900">{stat.value}</span>
              <span className="text-lg font-semibold text-yellow-800 mb-2">{stat.label}</span>
              <span className="text-sm text-yellow-700 font-medium">{stat.trend} this month</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleActionClick(action.action)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAction === action.action
                    ? 'bg-yellow-400 border-yellow-600 scale-95'
                    : 'bg-yellow-200 border-yellow-500 hover:bg-yellow-300 hover:border-yellow-600 hover:scale-105'
                }`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-semibold text-yellow-900">{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl p-6 text-yellow-900 text-center shadow-md border border-yellow-500">
          <h3 className="font-bold text-xl mb-2 text-yellow-900">Welcome to EEC Admin Dashboard!</h3>
          <p className="font-medium">
            {selectedAction 
              ? `Processing ${selectedAction} action...`
              : 'Use the quick actions above or the sidebar to manage teachers, students, courses, and more.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;