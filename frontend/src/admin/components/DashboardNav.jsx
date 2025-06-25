import React from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  ClipboardList,
  GraduationCap,
  Clock
} from 'lucide-react';

const DashboardNav = () => {
  const statusItems = [
    {
      icon: BookOpen,
      label: 'Lesson Plans',
      status: '3 New',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'Parents',
      status: '110 Active'
    },
    {
      icon: GraduationCap,
      label: 'Subjects',
      status: '8 Courses'
    },
    {
      icon: ClipboardList,
      label: 'Students Attendance',
      status: 'Today',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Routines',
      status: 'All Set'
    },
    {
      icon: Clock,
      label: 'Teacher Timetable',
      status: 'Updated',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
      <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-2">
        {statusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 whitespace-nowrap"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className={`text-xs font-medium ${item.color || 'text-gray-500'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNav; 