import React from 'react';
import { 
  Users, 
  Activity,
  Calendar,
  FileText,
  ClipboardCheck,
  Bell,
  TrendingUp
} from 'lucide-react';

const TeacherDashboard = () => {
  const quickStats = [
    { label: 'Total Students', value: '45', icon: Users, color: 'yellow' },
    { label: 'Attendance Today', value: '92%', icon: Activity, color: 'green' },
    { label: 'Pending Assignments', value: '12', icon: FileText, color: 'red' },
    { label: 'Upcoming Meetings', value: '3', icon: Calendar, color: 'purple' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'assignment',
      message: 'New assignment submissions for Mathematics',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'meeting',
      message: 'Parent meeting scheduled with John\'s parents',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Attendance marked for Class X-A',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="p-6 h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold mb-2">Welcome, Teacher!</h1>
        <p className="text-yellow-100">Here's your daily overview</p>
      </div>

      <div className="space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Bell className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                  <ClipboardCheck className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-700">Mark Attendance</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                  <FileText className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-700">Create Assignment</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-700">Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 