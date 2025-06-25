import React, {useEffect} from 'react';
import { BookOpen, Search, Filter, Plus, Edit3, Trash2, Users, Clock, Calendar } from 'lucide-react';

const CourseManagement = ({setShowAdminHeader}) => {

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-white/90 rounded-2xl shadow-2xl m-4 border border-yellow-200 overflow-hidden">
        
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-8 bg-white/90 border-b border-yellow-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">Course Management</h1>
              <p className="text-gray-600 mt-2">Manage and organize courses</p>
            </div>
            <div className="flex items-center space-x-4">
              <BookOpen className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Fine Arts">Fine Arts</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Advanced Mathematics",
                  department: "Science",
                  instructor: "Dr. Sarah Johnson",
                  students: 32,
                  duration: "6 months",
                  startDate: "2024-01-15",
                  description: "Advanced level mathematics covering calculus and linear algebra"
                },
                {
                  id: 2,
                  title: "Physics Fundamentals",
                  department: "Science",
                  instructor: "Prof. Michael Chen",
                  students: 28,
                  duration: "6 months",
                  startDate: "2024-01-15",
                  description: "Comprehensive study of basic physics principles and mechanics"
                },
                {
                  id: 3,
                  title: "English Literature",
                  department: "Arts",
                  instructor: "Ms. Emily Davis",
                  students: 25,
                  duration: "6 months",
                  startDate: "2024-01-15",
                  description: "Study of classic literature and contemporary works"
                }
              ].map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        {course.department}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{course.students} Students</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement; 