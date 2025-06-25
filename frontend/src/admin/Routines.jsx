import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Clock, Calendar } from 'lucide-react';

const routineData = [
  {
    id: 1,
    class: 'X',
    section: 'A',
    day: 'Monday',
    schedule: [
      { time: '8:00 AM - 8:45 AM', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson' },
      { time: '8:45 AM - 9:30 AM', subject: 'Physics', teacher: 'Prof. Michael Chen' },
      { time: '9:30 AM - 10:15 AM', subject: 'Chemistry', teacher: 'Dr. Emily Brown' },
      { time: '10:15 AM - 10:45 AM', subject: 'Break', teacher: '-' },
      { time: '10:45 AM - 11:30 AM', subject: 'Biology', teacher: 'Dr. James Wilson' },
    ]
  },
  {
    id: 2,
    class: 'X',
    section: 'B',
    day: 'Monday',
    schedule: [
      { time: '8:00 AM - 8:45 AM', subject: 'Physics', teacher: 'Prof. Michael Chen' },
      { time: '8:45 AM - 9:30 AM', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson' },
      { time: '9:30 AM - 10:15 AM', subject: 'Biology', teacher: 'Dr. James Wilson' },
      { time: '10:15 AM - 10:45 AM', subject: 'Break', teacher: '-' },
      { time: '10:45 AM - 11:30 AM', subject: 'Chemistry', teacher: 'Dr. Emily Brown' },
    ]
  },
  // Add more routine data as needed
];

const Routines = ({setShowAdminHeader}) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');

  const filteredRoutines = routineData.filter(routine => 
    (!selectedClass || routine.class === selectedClass) &&
    (!selectedSection || routine.section === selectedSection) &&
    (!selectedDay || routine.day === selectedDay)
  );

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 p-8">
      <div className="max-w-7xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 border border-yellow-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-700">Class Routines</h1>
            <p className="text-gray-600 mt-2">Manage and organize class schedules</p>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Create New Routine
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select 
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            <option value="X">Class X</option>
            <option value="IX">Class IX</option>
            {/* Add more class options */}
          </select>
          <select 
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            {/* Add more section options */}
          </select>
          <select 
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* Routines */}
        {filteredRoutines.map(routine => (
          <div key={routine.id} className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-yellow-50 px-6 py-4 flex justify-between items-center border-b border-yellow-100">
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Class {routine.class} - Section {routine.section}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Calendar size={16} />
                    <span>{routine.day}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-800 p-2" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800 p-2" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {routine.schedule.map((period, index) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600 min-w-[180px]">
                      <Clock size={16} />
                      <span>{period.time}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{period.subject}</div>
                      <div className="text-sm text-gray-600">{period.teacher}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800" title="Edit Period">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredRoutines.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No routines found</h3>
            <p className="text-gray-600 mt-1">Try adjusting your filters or create a new routine.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routines; 