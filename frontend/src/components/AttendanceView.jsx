import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

const AttendanceView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  const attendanceStats = {
    totalClasses: 45,
    attended: 38,
    absent: 4,
    late: 3,
    percentage: 84.4
  };
  
  const attendanceData = [
    { date: "2024-06-13", course: "JavaScript Fundamentals", status: "present", time: "10:00 AM" },
    { date: "2024-06-12", course: "React Development", status: "present", time: "2:00 PM" },
    { date: "2024-06-11", course: "Database Design", status: "late", time: "11:00 AM" },
    { date: "2024-06-10", course: "UI/UX Design", status: "present", time: "3:00 PM" },
    { date: "2024-06-08", course: "JavaScript Fundamentals", status: "absent", time: "10:00 AM" },
    { date: "2024-06-07", course: "React Development", status: "present", time: "2:00 PM" },
    { date: "2024-06-06", course: "Database Design", status: "present", time: "11:00 AM" },
    { date: "2024-06-05", course: "UI/UX Design", status: "present", time: "3:00 PM" }
  ];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'absent':
        return <XCircle className="text-red-500" size={20} />;
      case 'late':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status) => {
    const styles = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600">Track your class attendance and patterns</p>
          </div>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalClasses}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attended</p>
              <p className="text-2xl font-bold text-green-600">{attendanceStats.attended}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="text-red-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-indigo-600">{attendanceStats.percentage}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <TrendingUp className="text-indigo-600" size={20} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Attendance</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(record.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{record.course}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {record.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;