import React, {useEffect, useState} from 'react';
import { BookOpen, Search, Filter, Plus, Edit3, Trash2, Users, Clock } from 'lucide-react';

const SubjectManagement = ({setShowAdminHeader}) => {

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
      fetch(`${import.meta.env.VITE_API_URL}/api/subject/fetch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch subjects');
        }
        return res.json();
      }).then(data => {
        setSubjects(data)
      }).catch(err => {
        console.error("Error fetching subjects: ", err);
      })
    }, [])

    useEffect(() => {
      setFilteredSubjects(subjects);
    }, [subjects])

    const [showAddForm, setShowAddForm] = useState(false);
    const [newSubject, setNewSubject] = useState({
      subjectName: '',
      grade: '',
      teachers: '', // comma separated
      totalStudents: '',
      hoursPerWeek: ''
    });

    const handleAddSubjectChange = (e) => {
      const { name, value } = e.target;
      setNewSubject(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubjectSubmit = async (e) => {
      e.preventDefault();
      // Here you would send newSubject to backend or update state
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newSubject),
        })
        if (!res.ok) {
          throw new Error('Failed to add subject');
        }
        const data = await res.json();
        console.log(data);
        setShowAddForm(false);
        setNewSubject({ subjectName: '', grade: '', teachers: '', totalStudents: '', hoursPerWeek: '' });
      } catch(err) {
        console.log("Error: ", err);
      }
    };

    const handleFilterChange = (e) => {
      const value = e.target.value;
      if (value === 'all') {
        setFilteredSubjects(subjects);
      } else {
        const filtered = subjects.filter(subject => subject.grade === value);
        setFilteredSubjects(filtered);
      }
    };
    const handleSearchChange = (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = subjects.filter(subject => 
        subject.subjectName.toLowerCase().includes(query) ||
        subject.teachers.some(teacher => teacher.toLowerCase().includes(query))
      );
      setFilteredSubjects(filtered);
    };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-white/90 rounded-2xl shadow-2xl m-4 border border-yellow-200 overflow-hidden">
        
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-8 bg-white/90 border-b border-yellow-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">Subject Management</h1>
              <p className="text-gray-600 mt-2">Manage and organize subjects</p>
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
                  placeholder="Search subjects..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onChange={handleSearchChange}
                />
              </div>
              
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" onChange={handleFilterChange}>
                <option value="all">All Grades</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-yellow-50 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Teachers</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Students</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Hours/Week</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{subject.subjectName}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{subject.grade}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        {subject.teachers.map((teacher, index) => (
                          <span key={index} className="text-sm text-gray-600">{teacher}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{subject.totalStudents}</td>
                    <td className="px-6 py-4 text-gray-600">{subject.hoursPerWeek}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-colors duration-200">
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl relative border border-yellow-300 animate-fadeIn">
      <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowAddForm(false)}>&times;</button>
      <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center tracking-tight">Add Subject</h2>
      <form onSubmit={handleAddSubjectSubmit} className="space-y-5">
        <div className="flex gap-4">
          <input name="subjectName" value={newSubject.subjectName} onChange={handleAddSubjectChange} required placeholder="Subject Name" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="grade" value={newSubject.grade} onChange={handleAddSubjectChange} required placeholder="Grade" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
        </div>
        <div className="flex gap-4">
          <input name="teachers" value={newSubject.teachers} onChange={handleAddSubjectChange} required placeholder="Teachers (comma separated)" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="totalStudents" value={newSubject.totalStudents} onChange={handleAddSubjectChange} required placeholder="No. of Students" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
        </div>
        <div>
          <input name="hoursPerWeek" value={newSubject.hoursPerWeek} onChange={handleAddSubjectChange} required placeholder="Hours/Week" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Add Subject</button>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default SubjectManagement;