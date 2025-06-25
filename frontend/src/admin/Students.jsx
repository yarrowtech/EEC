import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, MoreVertical } from 'lucide-react';

const studentData = [
  {
    id: 1,
    name: 'John Doe',
    roll: '2024001',
    class: 'X',
    section: 'A',
    gender: 'Male',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    address: '123 Student St, Education City',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    roll: '2024002',
    class: 'X',
    section: 'B',
    gender: 'Female',
    phone: '+1234567891',
    email: 'jane.smith@example.com',
    address: '456 Learning Ave, Knowledge Town',
    status: 'Active'
  },
  // Add more sample data as needed
];

const Students = ({setShowAdminHeader}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-yellow-700">Student Management</h1>
            <p className="text-gray-600 mt-2">Manage and monitor student information</p>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Add New Student
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Classes</option>
            <option value="X">Class X</option>
            <option value="IX">Class IX</option>
            {/* Add more class options */}
          </select>
          <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            {/* Add more section options */}
          </select>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yellow-50">
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Name</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Roll No.</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Class</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Section</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Gender</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Phone</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Status</th>
                <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr 
                  key={student.id}
                  className="hover:bg-yellow-50 transition-colors"
                >
                  <td className="border-b border-yellow-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-yellow-100 px-6 py-4 text-gray-600">{student.roll}</td>
                  <td className="border-b border-yellow-100 px-6 py-4 text-gray-600">{student.class}</td>
                  <td className="border-b border-yellow-100 px-6 py-4 text-gray-600">{student.section}</td>
                  <td className="border-b border-yellow-100 px-6 py-4 text-gray-600">{student.gender}</td>
                  <td className="border-b border-yellow-100 px-6 py-4 text-gray-600">{student.phone}</td>
                  <td className="border-b border-yellow-100 px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="border-b border-yellow-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-600">
            Showing {filteredStudents.length} of {studentData.length} students
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-yellow-50">Previous</button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-yellow-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
