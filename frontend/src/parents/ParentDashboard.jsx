import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Activity,
  Bell,
  Video,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const ParentDashboard = () => {
  const quickStats = [
    { label: 'Attendance Rate', value: '95%', icon: Calendar, color: 'green' },
    { label: 'Assignments Due', value: '3', icon: BookOpen, color: 'red' },
    { label: 'Upcoming PTMs', value: '2', icon: Video, color: 'blue' },
    { label: 'Pending Fees', value: '$0', icon: CreditCard, color: 'yellow' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'ptm',
      message: 'Parent-Teacher Meeting scheduled for Mathematics',
      time: '1 hour ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'assignment',
      message: 'New Science assignment due next week',
      time: '3 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'health',
      message: 'Health check-up scheduled for next Monday',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Parent Portal!</h1>
        <p className="text-yellow-100">Track your child's progress and stay connected</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
        {/* Important Notifications */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Important Updates</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    notification.priority === 'high' 
                      ? 'bg-red-50' 
                      : notification.priority === 'medium'
                      ? 'bg-yellow-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <AlertCircle className={`w-5 h-5 ${
                    notification.priority === 'high'
                      ? 'text-red-500'
                      : notification.priority === 'medium'
                      ? 'text-yellow-500'
                      : 'text-gray-500'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Quick Links</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                <Video className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700">Schedule PTM</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                <CreditCard className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700">Pay Fees</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-left rounded-lg hover:bg-yellow-50 transition-colors">
                <Activity className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700">View Health Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard; 