import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, Plus, Edit3, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const WeeklyRoutine = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day', 'week'
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
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
        startTime: "10:00",
        endTime: "11:30",
        room: "Room 101",
        type: "Lecture",
        color: "bg-blue-500"
      },
      {
        id: 2,
        course: "Science",
        instructor: "Joyti Ghosh Dastidar",
        time: "2:00 PM - 3:30 PM",
        startTime: "14:00",
        endTime: "15:30",
        room: "Lab 203",
        type: "Lab",
        color: "bg-green-500"
      },
      {
        id: 3,
        course: "Study Time",
        instructor: "Self Study",
        time: "7:00 PM - 9:00 PM",
        startTime: "19:00",
        endTime: "21:00",
        room: "Home",
        type: "Study",
        color: "bg-purple-500"
      }
    ],
    tuesday: [
      {
        id: 4,
        course: "English Language",
        instructor: "Ms. Benedict Joseph",
        time: "9:00 AM - 10:30 AM",
        startTime: "09:00",
        endTime: "10:30",
        room: "Studio 301",
        type: "Workshop",
        color: "bg-orange-500"
      },
      {
        id: 5,
        course: "Computer Application",
        instructor: "Soumyojit Pal",
        time: "1:00 PM - 2:30 PM",
        startTime: "13:00",
        endTime: "14:30",
        room: "Lab 105",
        type: "Practical",
        color: "bg-indigo-500"
      },
      {
        id: 6,
        course: "Exercise",
        instructor: "Personal",
        time: "6:00 PM - 7:00 PM",
        startTime: "18:00",
        endTime: "19:00",
        room: "Gym",
        type: "Physical",
        color: "bg-red-500"
      }
    ],
    wednesday: [
      {
        id: 7,
        course: "Environment Science",
        instructor: "Dr. Smith",
        time: "10:00 AM - 11:30 AM",
        startTime: "10:00",
        endTime: "11:30",
        room: "Room 101",
        type: "Lecture",
        color: "bg-blue-500"
      },
      {
        id: 8,
        course: "Project Work",
        instructor: "Self",
        time: "3:00 PM - 5:00 PM",
        startTime: "15:00",
        endTime: "17:00",
        room: "Home",
        type: "Project",
        color: "bg-yellow-500"
      }
    ],
    thursday: [
      {
        id: 9,
        course: "Biology",
        instructor: "Sonali Sen",
        time: "11:00 AM - 12:30 PM",
        startTime: "11:00",
        endTime: "12:30",
        room: "Lab 203",
        type: "Lab",
        color: "bg-green-500"
      },
      {
        id: 10,
        course: "Bengali",
        instructor: "Kathali Mitra",
        time: "3:00 PM - 4:30 PM",
        startTime: "15:00",
        endTime: "16:30",
        room: "Studio 301",
        type: "Workshop",
        color: "bg-orange-500"
      },
      {
        id: 11,
        course: "Reading Time",
        instructor: "Self",
        time: "8:00 PM - 9:00 PM",
        startTime: "20:00",
        endTime: "21:00",
        room: "Home",
        type: "Study",
        color: "bg-purple-500"
      }
    ],
    friday: [
      {
        id: 12,
        course: "Sports",
        instructor: "Bartam Da Silva",
        time: "2:00 PM - 3:30 PM",
        startTime: "14:00",
        endTime: "15:30",
        room: "Sports Complex",
        type: "Physical",
        color: "bg-red-500"
      },
      {
        id: 13,
        course: "Music Practice",
        instructor: "Self",
        time: "6:00 PM - 7:30 PM",
        startTime: "18:00",
        endTime: "19:30",
        room: "Music Room",
        type: "Creative",
        color: "bg-pink-500"
      }
    ],
    saturday: [
      {
        id: 14,
        course: "Art & Craft",
        instructor: "Ms. Creative",
        time: "10:00 AM - 12:00 PM",
        startTime: "10:00",
        endTime: "12:00",
        room: "Art Studio",
        type: "Creative",
        color: "bg-pink-500"
      },
      {
        id: 15,
        course: "Family Time",
        instructor: "Family",
        time: "6:00 PM - 8:00 PM",
        startTime: "18:00",
        endTime: "20:00",
        room: "Home",
        type: "Personal",
        color: "bg-teal-500"
      }
    ],
    sunday: [
      {
        id: 16,
        course: "Meditation",
        instructor: "Self",
        time: "8:00 AM - 8:30 AM",
        startTime: "08:00",
        endTime: "08:30",
        room: "Home",
        type: "Personal",
        color: "bg-teal-500"
      },
      {
        id: 17,
        course: "Hobby Time",
        instructor: "Self",
        time: "10:00 AM - 11:30 AM",
        startTime: "10:00",
        endTime: "11:30",
        room: "Home",
        type: "Creative",
        color: "bg-pink-500"
      },
      {
        id: 18,
        course: "Rest & Relaxation",
        instructor: "Self",
        time: "2:00 PM - 4:00 PM",
        startTime: "14:00",
        endTime: "16:00",
        room: "Home",
        type: "Personal",
        color: "bg-teal-500"
      }
    ]
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
      case 'study':
        return <BookOpen size={16} />;
      case 'physical':
        return <User size={16} />;
      case 'project':
        return <Edit3 size={16} />;
      case 'creative':
        return <Plus size={16} />;
      case 'personal':
        return <User size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-green-100 text-green-800';
      case 'workshop':
        return 'bg-orange-100 text-orange-800';
      case 'practical':
        return 'bg-indigo-100 text-indigo-800';
      case 'study':
        return 'bg-purple-100 text-purple-800';
      case 'physical':
        return 'bg-red-100 text-red-800';
      case 'project':
        return 'bg-yellow-100 text-yellow-800';
      case 'creative':
        return 'bg-pink-100 text-pink-800';
      case 'personal':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[currentTime.getDay()];
  };

  const isToday = (day) => {
    return day === getCurrentDay();
  };

  const formatTime = (time) => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const renderDayView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-purple-400">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {daysOfWeek.find(d => d.id === selectedDay)?.name} Schedule
            {isToday(selectedDay) && (
              <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">Today</span>
            )}
          </h2>
          <div className="text-sm text-gray-500">
            {todaySchedule.length} {todaySchedule.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        {todaySchedule.length > 0 ? (
          <div className="space-y-4">
            {todaySchedule.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all hover:border-indigo-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {getTypeIcon(item.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{item.course}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)} flex-shrink-0 ml-2`}>
                        {item.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.room}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.instructor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Today</h3>
            <p className="text-gray-500">Enjoy your free day!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Weekly Overview</h2>
      </div>
      
      <div className="overflow-x-auto max-w-full">
        <div className="min-w-[700px] md:min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-gray-200 min-w-[700px] md:min-w-0">
            <div className="p-3 bg-gray-50 font-medium text-gray-700 text-center">Time</div>
            {daysOfWeek.map((day) => (
              <div key={day.id} className={`p-3 font-medium text-center ${
                isToday(day.id) ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-700'
              }`}>
                <div className="text-sm">{day.short}</div>
                <div className="text-xs opacity-75 mt-1">
                  {weeklySchedule[day.id]?.length || 0} items
                </div>
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          <div className="relative">
            {getTimeSlots().map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-purple-400 min-h-16 min-w-[700px] md:min-w-0">
                <div className="p-3 bg-gray-50 text-sm text-gray-600 text-center border-r border-gray-200">
                  {time}
                </div>
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="relative p-1 border-r border-gray-100 w-full max-w-full">
                    {weeklySchedule[day.id]?.map((item) => {
                      const startHour = parseInt(item.startTime.split(':')[0]);
                      const currentHour = parseInt(time.split(':')[0]);
                      
                      if (startHour === currentHour) {
                        return (
                          <div
                            key={item.id}
                            className={`absolute left-1 right-1 ${item.color} text-white p-1 rounded text-xs overflow-hidden z-10 max-w-full`}
                            style={{
                              top: '4px',
                              height: 'calc(100% - 8px)',
                              minHeight: '40px'
                            }}
                          >
                            <div className="font-medium truncate">{item.course}</div>
                            <div className="text-xs opacity-90 truncate">{item.instructor}</div>
                            <div className="text-xs opacity-75 truncate">{item.room}</div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {daysOfWeek.find(d => d.id === selectedDay)?.name} Timeline
            {isToday(selectedDay) && (
              <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">Today</span>
            )}
          </h2>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="relative">
          <div className="space-y-0">
            {getTimeSlots().map((time) => (
              <div key={time} className="flex items-start space-x-4 h-16 border-b border-gray-100 last:border-b-0">
                <div className="w-16 text-sm text-gray-600 py-2 flex-shrink-0">
                  {time}
                </div>
                <div className="flex-1 relative">
                  {todaySchedule.map((item) => {
                    const startHour = parseInt(item.startTime.split(':')[0]);
                    const currentHour = parseInt(time.split(':')[0]);
                    
                    if (startHour === currentHour) {
                      return (
                        <div
                          key={item.id}
                          className={`absolute left-0 right-0 ${item.color} text-white p-3 rounded-lg shadow-sm`}
                          style={{
                            top: '8px',
                            height: 'calc(100% - 16px)',
                            minHeight: '48px'
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(item.type)}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.course}</div>
                              <div className="text-xs opacity-90 truncate">{item.instructor} • {item.room}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Calendar className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Weekly Routine</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Today is {daysOfWeek.find(d => d.id === getCurrentDay())?.name} • {formatTime()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Current Time */}
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-400">
            <div className="text-sm text-gray-500">Current Time</div>
            <div className="text-lg font-semibold text-gray-900">{formatTime()}</div>
          </div>
          {/* Date View */}
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border  border-purple-400">
            <div className="text-sm text-gray-500">Date</div>
            <div className="text-lg font-semibold text-gray-900">
              {currentTime.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg shadow-sm border p-4 border-purple-400 space-x-2 ">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={16} className="inline mr-1" />
              Day
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock size={16} className="inline mr-1" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid size={16} className="inline mr-1" />
              Week
            </button>
          </div>
        </div>
      </div>
      
      {/* Day Selector (only show for day and timeline views) */}
      {(viewMode === 'day' || viewMode === 'timeline') && (
        <div className="bg-white rounded-xl shadow-sm border border-purple-400 p-4 sm:p-6">
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`p-3 rounded-lg text-center transition-all relative ${
                  selectedDay === day.id
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isToday(day.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
                <div className="text-sm font-medium">{day.short}</div>
                <div className="text-xs mt-1 opacity-75">
                  {weeklySchedule[day.id]?.length || 0} items
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      {viewMode === 'day' && renderDayView()}
      {viewMode === 'timeline' && renderTimelineView()}
      {viewMode === 'week' && renderWeekView()}
      
      {/* Weekly Overview Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-400">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Weekly Statistics</h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(weeklySchedule).flat().length}
              </div>
              <div className="text-sm text-blue-800">Total Items</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Lecture' || c.type === 'Lab').length}
              </div>
              <div className="text-sm text-green-800">Classes</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Study').length}
              </div>
              <div className="text-sm text-purple-800">Study Time</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Physical').length}
              </div>
              <div className="text-sm text-red-800">Physical</div>
            </div>
            
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">
                {Object.values(weeklySchedule).flat().filter(c => c.type === 'Creative' || c.type === 'Personal').length}
              </div>
              <div className="text-sm text-pink-800">Personal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyRoutine;