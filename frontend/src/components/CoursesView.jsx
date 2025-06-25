import React, { useState } from 'react';
import { Book, Clock, Users, Calendar, Star, Play, FileText, Award } from 'lucide-react';

const CoursesView = () => {
  const [filter, setFilter] = useState('all'); // all, enrolled, completed, in-progress

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Database Management Systems",
      code: "CS301",
      instructor: "Dr. Sarah Johnson",
      semester: "Spring 2025",
      credits: 3,
      status: "in-progress",
      progress: 65,
      enrolledStudents: 45,
      rating: 4.8,
      description: "Learn database design, SQL, normalization, and database administration",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      nextClass: "2025-06-16T10:00:00",
      assignments: 4,
      completedAssignments: 2,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400"
    },
    {
      id: 2,
      title: "Web Development",
      code: "CS205",
      instructor: "Prof. Michael Chen",
      semester: "Spring 2025",
      credits: 4,
      status: "in-progress",
      progress: 80,
      enrolledStudents: 60,
      rating: 4.9,
      description: "Modern web development with React, Node.js, and full-stack applications",
      schedule: "Tue, Thu - 2:00 PM",
      nextClass: "2025-06-17T14:00:00",
      assignments: 6,
      completedAssignments: 5,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      code: "CS202",
      instructor: "Dr. Emily Rodriguez",
      semester: "Spring 2025",
      credits: 3,
      status: "completed",
      progress: 100,
      enrolledStudents: 55,
      rating: 4.7,
      description: "Fundamental data structures and algorithmic problem solving",
      schedule: "Mon, Wed - 11:00 AM",
      nextClass: null,
      assignments: 8,
      completedAssignments: 8,
      grade: "A",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      code: "CS401",
      instructor: "Dr. Alex Kumar",
      semester: "Spring 2025",
      credits: 3,
      status: "enrolled",
      progress: 0,
      enrolledStudents: 30,
      rating: 4.6,
      description: "Introduction to cybersecurity principles and practices",
      schedule: "Tue, Thu - 9:00 AM",
      nextClass: "2025-06-17T09:00:00",
      assignments: 5,
      completedAssignments: 0,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'enrolled': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const formatNextClass = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage your enrolled courses and track progress</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {['all', 'enrolled', 'in-progress', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filterType.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <Book className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {courses.filter(c => c.status === 'in-progress').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.status === 'completed').length}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-purple-600">
                {courses.reduce((sum, course) => sum + course.credits, 0)}
              </p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                  {course.status.replace('-', ' ')}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                <p className="text-blue-100">{course.code} • {course.credits} Credits</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{course.enrolledStudents} students</span>
                  </div>
                </div>
                {course.grade && (
                  <span className="text-lg font-bold text-green-600">Grade: {course.grade}</span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4">{course.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Schedule:</span>
                  <span className="font-medium">{course.schedule}</span>
                </div>
                {course.nextClass && (
                  <div className="flex items-center justify-between">
                    <span>Next Class:</span>
                    <span className="font-medium text-blue-600">
                      {formatNextClass(course.nextClass)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Assignments:</span>
                  <span className="font-medium">
                    {course.completedAssignments}/{course.assignments} completed
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  View Course
                </button>
                {course.status === 'in-progress' && (
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">No courses match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesView;