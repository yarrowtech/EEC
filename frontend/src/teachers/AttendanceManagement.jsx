import React, { useState } from 'react';
import { Calendar, Search, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');

  const students = [
    {
      id: 1,
      name: "Sarah Smith",
      rollNumber: "101",
      class: "10-A",
      attendance: {
        "2024-03-15": "present",
        "2024-03-14": "present",
        "2024-03-13": "absent"
      }
    },
    {
      id: 2,
      name: "John Doe",
      rollNumber: "102",
      class: "10-A",
      attendance: {
        "2024-03-15": "present",
        "2024-03-14": "absent",
        "2024-03-13": "present"
      }
    }
  ];

  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => ({
      ...acc,
      [student.id]: student.attendance[selectedDate] || 'present'
    }), {})
  );

  const getLastWeekDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getAttendanceStatus = (studentId, date) => {
    const student = students.find(s => s.id === studentId);
    return student?.attendance[date] || '-';
  };

  const toggleAttendance = (studentId) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
        <p className="text-yellow-100">Mark and track student attendance</p>
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
            
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="10-A">Class 10-A</option>
              <option value="10-B">Class 10-B</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <button 
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Save Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Today's Attendance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                  </div>
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`p-2 rounded-full ${
                      attendanceData[student.id] === 'present'
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    {attendanceData[student.id] === 'present' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Overview</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Student</th>
                    {getLastWeekDates().map((date) => (
                      <th key={date} className="px-4 py-2 text-center text-sm font-medium text-gray-500">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2 text-sm text-gray-800">{student.name}</td>
                      {getLastWeekDates().map((date) => (
                        <td key={date} className="px-4 py-2 text-center">
                          <span className={`inline-block w-6 h-6 rounded-full ${
                            getAttendanceStatus(student.id, date) === 'present'
                              ? 'bg-green-100 text-green-600'
                              : getAttendanceStatus(student.id, date) === 'absent'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {getAttendanceStatus(student.id, date) === 'present' ? '✓' : 
                             getAttendanceStatus(student.id, date) === 'absent' ? '✕' : '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {Object.values(attendanceData).filter(status => status === 'present').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-semibold text-red-600">
                  {Object.values(attendanceData).filter(status => status === 'absent').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Average</h3>
            <div className="text-center">
              <p className="text-3xl font-semibold text-yellow-600">95%</p>
              <p className="text-sm text-gray-500">Attendance Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trends</h3>
            <div className="text-center">
              <p className="text-3xl font-semibold text-yellow-600">↑ 2%</p>
              <p className="text-sm text-gray-500">vs Last Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement; 