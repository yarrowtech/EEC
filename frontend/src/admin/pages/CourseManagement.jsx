import React, {useEffect, useState} from 'react';
import { BookOpen, Search, Filter, Plus, Edit3, Trash2, Users, Clock, Calendar } from 'lucide-react';

const CourseManagement = ({setShowAdminHeader}) => {

  const [allCourses, setAllCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])

  // making the admin header invisible
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/course/fetch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }).then((data) => {
        setAllCourses(data)
      }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
      setShowAdminHeader(false)
    }, [])

    useEffect(() => {
      setFilteredCourses(allCourses)
    }, [allCourses])

    const [showAddForm, setShowAddForm] = useState(false);
    const [newCourse, setNewCourse] = useState({
      title: '',
      department: '',
      instructor: '',
      duration: '',
      startingDate: '',
      desc: ''
    });

    const handleAddCourseChange = (e) => {
      const { name, value } = e.target;
      setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCourseSubmit = async (e) => {
      e.preventDefault();
      // Here you would send newCourse to backend or update state
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newCourse)
        })
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data);
        setShowAddForm(false);
        setNewCourse({ title: '', department: '', instructor: '', students: '', duration: '', startingDate: '', desc: '' });
      } catch(err) {
        console.log("Error: ", err)
      }
    };

    const handleSearchChange = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = allCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.department.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm)
      );
      setFilteredCourses(filtered);
    }

    const handleFilterChange = (e) => {
      const selectedDepartment = e.target.value;
      if (selectedDepartment === '') {
        setFilteredCourses(allCourses);
      } else {
        const filtered = allCourses.filter(course => course.department === selectedDepartment);
        setFilteredCourses(filtered);
      }
    };

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
                  onChange={handleSearchChange}
                />
              </div>
              
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" onChange={handleFilterChange}>
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

            <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200">
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

                  <p className="text-sm text-gray-600 mb-4">{course.desc}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{course.totalStudents} Students</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{course.duration} months</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Starts: {new Date(course.startingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAddForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-colors duration-200">
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl relative border border-yellow-300 animate-fadeIn">
      <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowAddForm(false)}>&times;</button>
      <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center tracking-tight">Add Course</h2>
      <form onSubmit={handleAddCourseSubmit} className="space-y-5">
        <div className="flex gap-4">
          <input name="title" value={newCourse.title} onChange={handleAddCourseChange} required placeholder="Course Title" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="department" value={newCourse.department} onChange={handleAddCourseChange} required placeholder="Department" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
        </div>
        <div className="flex gap-4">
          <input name="instructor" value={newCourse.instructor} onChange={handleAddCourseChange} required placeholder="Instructor" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          {/* <input name="students" value={newCourse.students} onChange={handleAddCourseChange} required placeholder="No. of Students" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" /> */}
        </div>
        <div className="flex gap-4">
          <input name="duration" value={newCourse.duration} onChange={handleAddCourseChange} required placeholder="Duration (e.g. 6 months)" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="startingDate" value={newCourse.startingDate} onChange={handleAddCourseChange} required placeholder="Start Date" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="date" />
        </div>
        <div>
          <textarea name="desc" value={newCourse.desc} onChange={handleAddCourseChange} required placeholder="Course Description" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm resize-none" rows={3} />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Add Course</button>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default CourseManagement;