import React from 'react';
import { BookOpen, Clock, User, ChevronRight } from 'lucide-react';

const CourseProgress = () => {
  const courses = [
    { 
      id: 1, 
      name: "Mathematics", 
      progress: 85, 
      totalLessons: 20, 
      completedLessons: 17, 
      instructor: "Dr. Romit Beed", 
      nextClass: "Mon 10:00 AM",
      color: "bg-yellow-500"
    },
    { 
      id: 2, 
      name: "Science", 
      progress: 70, 
      totalLessons: 15, 
      completedLessons: 10, 
      instructor: "Jyoti Ghosh Dastidar", 
      nextClass: "Wed 2:00 PM",
      color: "bg-blue-500"
    },
    { 
      id: 3, 
      name: "English Language", 
      progress: 60, 
      totalLessons: 18, 
      completedLessons: 11, 
      instructor: "Benedict Joseph", 
      nextClass: "Fri 11:00 AM",
      color: "bg-green-500"
    },
    { 
      id: 4, 
      name: "Computer Application", 
      progress: 45, 
      totalLessons: 12, 
      completedLessons: 5, 
      instructor: "Soumyojit Pal", 
      nextClass: "Tue 3:00 PM",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-400">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Course Progress</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="group hover:bg-gray-50 rounded-lg p-4 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${course.color} flex items-center justify-center`}>
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {course.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{course.nextClass}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{course.progress}%</div>
                  <div className="text-sm text-gray-500">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    course.progress >= 80 ? 'bg-green-500' :
                    course.progress >= 60 ? 'bg-yellow-500' :
                    course.progress >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;