import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';

const RoutineView = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  
  const daysOfWeek = [
    { id: 'monday', name: 'Monday', short: 'Mon' },
    { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { id: 'thursday', name: 'Thursday', short: 'Thu' },
    { id: 'friday', name: 'Friday', short: 'Fri' },
    { id: 'saturday', name: 'Saturday', short: 'Sat' },
    { id: 'sunday', name: 'Sunday', short: 'Sun' }
  ];
  
  const weeklySchedule = {
    monday: [
      {
        id: 1,
        course: "Mathematics",
        instructor: "Dr. Romit Beed",
        time: "10:00 AM - 11:30 AM",
        room: "Room 101",
        type: "Lecture",
        color: "bg-yellow-500"
      },
      {
        id: 2,
        course: "Science",
        instructor: "Joyti Ghosh Dastidar",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 203",
        type: "Lab",
        color: "bg-green-500"
      }
    ],
    tuesday: [
      {
        id: 3,
        course: "English Language",
        instructor: "Ms. Benedict Joseph",
        time: "9:00 AM - 10:30 AM",
        room: "Studio 301",
        type: "Workshop",
        color: "bg-purple-500"
      },
      {
        id: 4,
        course: "Computer Application",
        instructor: "Soumyojit Pal",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 105",
        type: "Practical",
        color: "bg-blue-500"
      }
    ],
    wednesday: [
      {
        id: 5,
        course: "Environment Science",
        instructor: "Dr. Smith",
        time: "10:00 AM - 11:30 AM",
        room: "Room 101",
        type: "Lecture",
        color: "bg-yellow-500"
      }
    ],
    thursday: [
      {
        id: 6,
        course: "Biology",
        instructor: "Sonali Sen",
        time: "11:00 AM - 12:30 PM",
        room: "Lab 203",
        type: "Lab",
        color: "bg-green-500"
      },
      {
        id: 7,
        course: "Bengali",
        instructor: "Kathali Mitra",
        time: "3:00 PM - 4:30 PM",
        room: "Studio 301",
        type: "Workshop",
        color: "bg-purple-500"
      }
    ],
    friday: [
      {
        id: 8,
        course: "Sports",
        instructor: "Bartam Da Silva",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 105",
        type: "Practical",
        color: "bg-blue-500"
      }
    ],
    saturday: [],
    sunday: []
  };
  
  const todaySchedule = weeklySchedule[selectedDay] || [];
  
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return <BookOpen size={16} />;
      case 'lab':
        return <Clock size={16} />;
      case 'workshop':
        return <User size={16} />;
      case 'practical':
        return <Calendar size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Calendar className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Class Routine</h1>
            <p className="text-gray-600">Your weekly class schedule</p>
          </div>
        </div>
      </div>
      
      {/* Day Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedDay === day.id
                  ? 'bg-indigo-500 text-black shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm font-medium">{day.short}</div>
              <div className="text-xs mt-1 opacity-75">
                {weeklySchedule[day.id]?.length || 0} classes
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Selected Day Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {daysOfWeek.find(d => d.id === selectedDay)?.name} Schedule
          </h2>
        </div>
        
        <div className="p-6">
          {todaySchedule.length > 0 ? (
            <div className="space-y-4">
              {todaySchedule.map((classItem) => (
                <div key={classItem.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${classItem.color} flex items-center justify-center text-white`}>
                      {getTypeIcon(classItem.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{classItem.course}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          classItem.type === 'Lecture' ? 'bg-blue-100 text-blue-800' :
                          classItem.type === 'Lab' ? 'bg-green-100 text-green-800' :
                          classItem.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {classItem.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <span>{classItem.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{classItem.room}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span>{classItem.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Today</h3>
              <p className="text-gray-500">Enjoy your free day!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Weekly Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Overview</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(weeklySchedule).flat().length}
              </div>
              <div className="text-sm text-blue-800">Total Classes</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Lecture').length}
              </div>
              <div className="text-sm text-green-800">Lectures</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Lab').length}
              </div>
              <div className="text-sm text-purple-800">Labs</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Workshop' || c.type === 'Practical').length}
              </div>
              <div className="text-sm text-orange-800">Practicals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineView;