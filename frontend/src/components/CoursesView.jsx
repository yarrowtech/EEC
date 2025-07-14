import React, { useState } from 'react';
import { Book, Clock, Users, Calendar, Star, Play, FileText, Award } from 'lucide-react';

const CoursesView = () => {
  const [filter, setFilter] = useState('all'); // all, enrolled, completed, in-progress

  // Sample courses data
  const courses = [
  {
    id: 1,
    title: "Mathematics",
    code: "MATH101",
    instructor: "Prof. Ananya Mukherjee",
    semester: "Spring 2025",
    credits: 3,
    status: "in-progress",
    progress: 65,
    enrolledStudents: 45,
    rating: 4.8,
    description: "Covers algebra, geometry, and basic trigonometry concepts with problem-solving sessions.",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    nextClass: "2025-06-16T10:00:00",
    assignments: 4,
    completedAssignments: 2,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400"
  },
  {
    id: 2,
    title: "English Literature",
    code: "ENG102",
    instructor: "Dr. Rakesh Sharma",
    semester: "Spring 2025",
    credits: 4,
    status: "in-progress",
    progress: 80,
    enrolledStudents: 60,
    rating: 4.9,
    description: "Study of prose, poetry, and drama from classic and modern authors.",
    schedule: "Tue, Thu - 2:00 PM",
    nextClass: "2025-06-17T14:00:00",
    assignments: 6,
    completedAssignments: 5,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400"
  },
  {
    id: 3,
    title: "Science",
    code: "SCI103",
    instructor: "Dr. Kavita Iyer",
    semester: "Spring 2025",
    credits: 3,
    status: "completed",
    progress: 100,
    enrolledStudents: 55,
    rating: 4.7,
    description: "Introduction to physics, chemistry, and biology for foundational knowledge.",
    schedule: "Mon, Wed - 11:00 AM",
    nextClass: null,
    assignments: 8,
    completedAssignments: 8,
    grade: "A",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
  },
  {
    id: 4,
    title: "History",
    code: "HIST104",
    instructor: "Prof. Vivek Chatterjee",
    semester: "Spring 2025",
    credits: 3,
    status: "enrolled",
    progress: 0,
    enrolledStudents: 30,
    rating: 4.6,
    description: "Covers Indian and World History including important movements and events.",
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
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your enrolled courses and track progress</p>
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full overflow-x-hidden">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
            <div className="h-48 bg-blue-100 relative flex items-end justify-start w-full">
              {/* Show course image if available, else fallback to light bg */}
              {course.image && (
                <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover object-center" style={{zIndex:0}} />
              )}
              <div className="absolute inset-0 bg-white bg-opacity-60" style={{zIndex:1}}></div>
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                  {course.status.replace('-', ' ')}
                </span>
              </div>
              <div className="relative z-10 p-4">
                <h3 className="text-xl font-bold mb-1 text-gray-900">{course.title}</h3>
                <p className="text-blue-800">{course.code} • {course.credits} Credits</p>
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