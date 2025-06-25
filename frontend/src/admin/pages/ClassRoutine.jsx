import React, { useState } from 'react';
import { Calendar, Clock, Filter, Download, Plus, Edit3, Trash2, Search, MapPin, Users } from 'lucide-react';

const ClassRoutine = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:30 - 11:30',
    '11:30 - 12:30',
    '13:30 - 14:30',
    '14:30 - 15:30'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Sample routine data
  const routineData = {
    'Monday': {
      '08:00 - 09:00': { subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', class: 'Grade 10A' },
      '09:00 - 10:00': { subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 201', class: 'Grade 10A' },
      '10:30 - 11:30': { subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 205', class: 'Grade 10A' },
      '11:30 - 12:30': { subject: 'Chemistry', teacher: 'Dr. James Wilson', room: 'Lab 301', class: 'Grade 10A' },
      '13:30 - 14:30': { subject: 'Biology', teacher: 'Dr. Lisa Brown', room: 'Room 105', class: 'Grade 10A' }
    },
    'Tuesday': {
      '08:00 - 09:00': { subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 201', class: 'Grade 10A' },
      '09:00 - 10:00': { subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', class: 'Grade 10A' },
      '10:30 - 11:30': { subject: 'Chemistry', teacher: 'Dr. James Wilson', room: 'Lab 301', class: 'Grade 10A' },
      '11:30 - 12:30': { subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 205', class: 'Grade 10A' },
      '13:30 - 14:30': { subject: 'Biology', teacher: 'Dr. Lisa Brown', room: 'Room 105', class: 'Grade 10A' }
    },
    'Wednesday': {
      '08:00 - 09:00': { subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 205', class: 'Grade 10A' },
      '09:00 - 10:00': { subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 201', class: 'Grade 10A' },
      '10:30 - 11:30': { subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', class: 'Grade 10A' },
      '11:30 - 12:30': { subject: 'Biology', teacher: 'Dr. Lisa Brown', room: 'Room 105', class: 'Grade 10A' },
      '13:30 - 14:30': { subject: 'Chemistry', teacher: 'Dr. James Wilson', room: 'Lab 301', class: 'Grade 10A' }
    },
    'Thursday': {
      '08:00 - 09:00': { subject: 'Chemistry', teacher: 'Dr. James Wilson', room: 'Lab 301', class: 'Grade 10A' },
      '09:00 - 10:00': { subject: 'Biology', teacher: 'Dr. Lisa Brown', room: 'Room 105', class: 'Grade 10A' },
      '10:30 - 11:30': { subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 201', class: 'Grade 10A' },
      '11:30 - 12:30': { subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', class: 'Grade 10A' },
      '13:30 - 14:30': { subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 205', class: 'Grade 10A' }
    },
    'Friday': {
      '08:00 - 09:00': { subject: 'Biology', teacher: 'Dr. Lisa Brown', room: 'Room 105', class: 'Grade 10A' },
      '09:00 - 10:00': { subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 205', class: 'Grade 10A' },
      '10:30 - 11:30': { subject: 'Chemistry', teacher: 'Dr. James Wilson', room: 'Lab 301', class: 'Grade 10A' },
      '11:30 - 12:30': { subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 201', class: 'Grade 10A' },
      '13:30 - 14:30': { subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', class: 'Grade 10A' }
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 border-blue-300 text-blue-800',
      'Physics': 'bg-purple-100 border-purple-300 text-purple-800',
      'English': 'bg-green-100 border-green-300 text-green-800',
      'Chemistry': 'bg-orange-100 border-orange-300 text-orange-800',
      'Biology': 'bg-pink-100 border-pink-300 text-pink-800'
    };
    return colors[subject] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-white/90 rounded-2xl shadow-2xl m-4 border border-yellow-200 overflow-hidden">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-8 bg-white/90 border-b border-yellow-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">Class Routine</h1>
              <p className="text-gray-600 mt-2">Manage and view class schedules</p>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routine..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Classes</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>

              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Schedule</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <table className="min-w-full border-collapse table-fixed">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="sticky top-0 left-0 z-20 bg-yellow-50 px-6 py-4 text-left text-sm font-medium text-yellow-800 w-32">Time</th>
                  {weekDays.map(day => (
                    <th key={day} className="sticky top-0 z-10 px-4 py-4 text-left text-sm font-medium text-yellow-800 min-w-[250px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot} className="hover:bg-yellow-50/50">
                    <td className="sticky left-0 z-10 bg-yellow-50 px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{timeSlot}</span>
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const classData = routineData[day]?.[timeSlot];
                      return (
                        <td key={`${day}-${timeSlot}`} className="px-4 py-4">
                          {classData ? (
                            <div className={`p-3 rounded-lg border ${getSubjectColor(classData.subject)} group hover:shadow-md transition-all cursor-pointer`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm mb-1">{classData.subject}</h4>
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-1 text-xs">
                                      <Users className="w-3 h-3" />
                                      <span>{classData.teacher}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs">
                                      <MapPin className="w-3 h-3" />
                                      <span>{classData.room}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                  <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                                    <Edit3 className="w-3 h-3" />
                                  </button>
                                  <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400 hover:border-yellow-300 hover:text-yellow-500 transition-colors cursor-pointer">
                              <Plus className="w-4 h-4 mx-auto mb-1" />
                              <span className="text-xs">Add Class</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine; 