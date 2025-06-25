import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Filter, Download, Plus, Edit3, Trash2 } from 'lucide-react';

const TeacherTimetable = ({setShowAdminHeader}) => {
  const [currentView, setCurrentView] = useState('week');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const currentWeek = new Date();

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])

  // Sample data
  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics' },
    { id: 2, name: 'Prof. Michael Chen', subject: 'Physics' },
    { id: 3, name: 'Ms. Emily Davis', subject: 'English Literature' },
    { id: 4, name: 'Mr. David Wilson', subject: 'Chemistry' },
    { id: 5, name: 'Dr. Lisa Brown', subject: 'Biology' }
  ];

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:30 - 11:30',
    '11:30 - 12:30',
    '13:30 - 14:30',
    '14:30 - 15:30',
    '15:30 - 16:30'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableData = {
    'Monday': {
      '08:00 - 09:00': { teacher: 'Dr. Sarah Johnson', subject: 'Advanced Mathematics', class: 'Grade 12A', room: 'Room 101' },
      '09:00 - 10:00': { teacher: 'Prof. Michael Chen', subject: 'Physics Lab', class: 'Grade 11B', room: 'Lab 201' },
      '10:30 - 11:30': { teacher: 'Ms. Emily Davis', subject: 'English Literature', class: 'Grade 10A', room: 'Room 205' },
      '11:30 - 12:30': { teacher: 'Dr. Sarah Johnson', subject: 'Calculus', class: 'Grade 12B', room: 'Room 101' },
      '13:30 - 14:30': { teacher: 'Mr. David Wilson', subject: 'Organic Chemistry', class: 'Grade 11A', room: 'Lab 301' },
      '14:30 - 15:30': { teacher: 'Dr. Lisa Brown', subject: 'Biology', class: 'Grade 10B', room: 'Room 105' }
    },
    'Tuesday': {
      '08:00 - 09:00': { teacher: 'Prof. Michael Chen', subject: 'Quantum Physics', class: 'Grade 12A', room: 'Room 202' },
      '09:00 - 10:00': { teacher: 'Ms. Emily Davis', subject: 'Creative Writing', class: 'Grade 11A', room: 'Room 205' },
      '10:30 - 11:30': { teacher: 'Dr. Lisa Brown', subject: 'Molecular Biology', class: 'Grade 12B', room: 'Lab 105' },
      '11:30 - 12:30': { teacher: 'Mr. David Wilson', subject: 'Chemical Analysis', class: 'Grade 11B', room: 'Lab 301' },
      '13:30 - 14:30': { teacher: 'Dr. Sarah Johnson', subject: 'Statistics', class: 'Grade 10A', room: 'Room 101' },
      '15:30 - 16:30': { teacher: 'Prof. Michael Chen', subject: 'Physics Tutorial', class: 'Grade 10B', room: 'Room 202' }
    },
    'Wednesday': {
      '08:00 - 09:00': { teacher: 'Ms. Emily Davis', subject: 'Shakespeare Studies', class: 'Grade 12A', room: 'Room 205' },
      '09:00 - 10:00': { teacher: 'Dr. Lisa Brown', subject: 'Genetics Lab', class: 'Grade 11A', room: 'Lab 105' },
      '10:30 - 11:30': { teacher: 'Mr. David Wilson', subject: 'Inorganic Chemistry', class: 'Grade 12B', room: 'Room 301' },
      '11:30 - 12:30': { teacher: 'Dr. Sarah Johnson', subject: 'Trigonometry', class: 'Grade 11B', room: 'Room 101' },
      '13:30 - 14:30': { teacher: 'Prof. Michael Chen', subject: 'Mechanics', class: 'Grade 10A', room: 'Room 202' },
      '14:30 - 15:30': { teacher: 'Ms. Emily Davis', subject: 'Poetry Analysis', class: 'Grade 10B', room: 'Room 205' }
    },
    'Thursday': {
      '08:00 - 09:00': { teacher: 'Dr. Lisa Brown', subject: 'Ecology', class: 'Grade 12A', room: 'Room 105' },
      '09:00 - 10:00': { teacher: 'Mr. David Wilson', subject: 'Analytical Chemistry', class: 'Grade 12B', room: 'Lab 301' },
      '10:30 - 11:30': { teacher: 'Dr. Sarah Johnson', subject: 'Geometry', class: 'Grade 10A', room: 'Room 101' },
      '11:30 - 12:30': { teacher: 'Prof. Michael Chen', subject: 'Thermodynamics', class: 'Grade 11A', room: 'Room 202' },
      '13:30 - 14:30': { teacher: 'Ms. Emily Davis', subject: 'Grammar & Composition', class: 'Grade 11B', room: 'Room 205' },
      '15:30 - 16:30': { teacher: 'Dr. Lisa Brown', subject: 'Biology Lab', class: 'Grade 10B', room: 'Lab 105' }
    },
    'Friday': {
      '08:00 - 09:00': { teacher: 'Mr. David Wilson', subject: 'Physical Chemistry', class: 'Grade 12A', room: 'Lab 301' },
      '09:00 - 10:00': { teacher: 'Dr. Sarah Johnson', subject: 'Algebra Review', class: 'Grade 11A', room: 'Room 101' },
      '10:30 - 11:30': { teacher: 'Prof. Michael Chen', subject: 'Wave Physics', class: 'Grade 12B', room: 'Room 202' },
      '11:30 - 12:30': { teacher: 'Ms. Emily Davis', subject: 'Literature Discussion', class: 'Grade 11B', room: 'Room 205' },
      '13:30 - 14:30': { teacher: 'Dr. Lisa Brown', subject: 'Human Anatomy', class: 'Grade 10A', room: 'Room 105' },
      '14:30 - 15:30': { teacher: 'Mr. David Wilson', subject: 'Chemistry Review', class: 'Grade 10B', room: 'Room 301' }
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
    
    for (const [key, value] of Object.entries(colors)) {
      if (subject.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-white/90 rounded-2xl shadow-2xl m-4 border border-yellow-200 overflow-hidden">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-8 bg-white/90 border-b border-yellow-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">Teacher Timetable</h1>
              <p className="text-gray-600 mt-2">Manage and view teaching schedules</p>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  value={selectedTeacher} 
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="all">All Teachers</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('week')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    currentView === 'week' 
                      ? 'bg-white shadow-sm text-yellow-600' 
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setCurrentView('day')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    currentView === 'day' 
                      ? 'bg-white shadow-sm text-yellow-600' 
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  Day View
                </button>
              </div>
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
          {/* Weekly Timetable */}
          {currentView === 'week' && (
            <div className="h-full flex flex-col bg-white">
              <div className="flex-shrink-0 p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>
                <p className="text-gray-600">{formatDate(currentWeek)} - Week View</p>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full table-fixed">
                      <thead className="bg-yellow-50">
                        <tr>
                          <th className="sticky left-0 z-20 bg-yellow-50 px-6 py-4 text-left text-sm font-medium text-yellow-800 w-32">Time</th>
                          {weekDays.map(day => (
                            <th key={day} className="px-4 py-4 text-left text-sm font-medium text-yellow-800 min-w-[200px]">
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
                              const classData = timetableData[day]?.[timeSlot];
                              return (
                                <td key={`${day}-${timeSlot}`} className="px-4 py-4">
                                  {classData ? (
                                    <div className={`p-3 rounded-lg border-l-4 ${getSubjectColor(classData.subject)} group hover:shadow-md transition-all cursor-pointer`}>
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-sm mb-1">{classData.subject}</h4>
                                          <div className="space-y-1">
                                            <div className="flex items-center space-x-1 text-xs">
                                              <Users className="w-3 h-3" />
                                              <span>{classData.class}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-xs">
                                              <MapPin className="w-3 h-3" />
                                              <span>{classData.room}</span>
                                            </div>
                                            <p className="text-xs font-medium">{classData.teacher}</p>
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
          )}

          {/* Teacher Summary Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {teachers.map(teacher => {
              const teacherClasses = Object.values(timetableData).flatMap(day => 
                Object.values(day).filter(classData => classData.teacher === teacher.name)
              );
              
              return (
                <div key={teacher.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.subject}</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weekly Classes</span>
                      <span className="font-medium">{teacherClasses.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subjects</span>
                      <span className="font-medium">{new Set(teacherClasses.map(c => c.subject)).size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Classes</span>
                      <span className="font-medium">{new Set(teacherClasses.map(c => c.class)).size}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    View Full Schedule
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTimetable;