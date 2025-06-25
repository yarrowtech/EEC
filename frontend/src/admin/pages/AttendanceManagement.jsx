import React, {useEffect} from 'react';
import { UserCheck, Search, Filter, Calendar, Download, Users, Clock } from 'lucide-react';

const AttendanceManagement = ({setShowAdminHeader}) => {

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Attendance</h1>
            <p className="text-yellow-100">Track and manage student attendance</p>
          </div>
          <div className="flex items-center space-x-4">
            <UserCheck className="w-12 h-12 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="all">All Classes</option>
                <option value="10a">Class 10-A</option>
                <option value="10b">Class 10-B</option>
                <option value="11a">Class 11-A</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Student</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Class</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Check-in Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total Present</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total Absent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: "John Smith",
                  class: "10-A",
                  status: "Present",
                  checkInTime: "08:30 AM",
                  totalPresent: 45,
                  totalAbsent: 2
                },
                {
                  id: 2,
                  name: "Emma Wilson",
                  class: "10-A",
                  status: "Absent",
                  checkInTime: "-",
                  totalPresent: 42,
                  totalAbsent: 5
                },
                {
                  id: 3,
                  name: "Michael Brown",
                  class: "10-B",
                  status: "Present",
                  checkInTime: "08:45 AM",
                  totalPresent: 44,
                  totalAbsent: 3
                }
              ].map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Class {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      student.status === 'Present' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{student.checkInTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{student.totalPresent} days</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{student.totalAbsent} days</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement; 