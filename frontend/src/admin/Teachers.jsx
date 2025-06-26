import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  Users,
  Star,
  Award,
  Eye,
  MoreVertical,
  Edit2
} from 'lucide-react';

const Teachers = ({setShowAdminHeader}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [teachers, setTeachers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    experience: '',
    qualification: '',
    students: '',
    rating: '',
    status: 'Active',
    joinDate: '',
    location: '',
    avatar: ''
  });

  // Filter teachers based on search and status
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // making the admin header invisible
  useEffect(() => {
    setShowAdminHeader(false)

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/get-teachers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch teachers');
      }
      return res.json();
    })
    .then(data => {
      setTeachers(data)
    })
    .catch(err => {
      console.error('Error fetching teachers:', err);
    });
  }, [])

  const handleAddTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTeacherSubmit = async (e) => {
    e.preventDefault();
    // Here you would send newTeacher to backend or update state
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher/auth/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newTeacher)
        })
        const data = await res.json();
        if (!res.ok) { 
          console.error('Registration failed:', data);
          throw new Error('Registration failed');
        }
      console.log('New teacher added:', data);
      setShowAddForm(false);
      // Optionally reset form
      setNewTeacher({
        name: '', email: '', mobile: '', subject: '', department: '', experience: '', qualification: '', joiningDate: '', address: '', pinCode: '', gender: ''
      });
    }
    catch (error) {
      console.error('Error adding teacher:', error);
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
              <h1 className="text-3xl font-bold text-yellow-700">Teacher Management</h1>
              <p className="text-gray-600 mt-2">Manage and monitor teaching staff</p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors" onClick={() => setShowAddForm(true)}>
              <Plus size={20} />
              Add New Teacher
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
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
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-yellow-50 z-10">
                <tr>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Teacher</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Employee ID</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Subject</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Department</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Qualification</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Experience</th>
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Join Date</th>
                  {/* <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Status</th> */}
                  <th className="border-b border-yellow-100 px-6 py-3 text-left text-sm font-semibold text-yellow-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredTeachers.map((teacher) => (
                  <tr 
                    key={teacher.id}
                    className="hover:bg-yellow-50 transition-colors border-b border-gray-100"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-yellow-700 flex-shrink-0">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{teacher.name}</div>
                          <div className="flex items-center gap-4 mt-1">
                            <a href={`mailto:${teacher.email}`} className="text-sm text-gray-500 hover:text-yellow-600 flex items-center gap-1 truncate">
                              <Mail size={14} className="flex-shrink-0" />
                              <span className="truncate">{teacher.email}</span>
                            </a>
                            <a href={`tel:${teacher.mobile}`} className="text-sm text-gray-500 hover:text-yellow-600 flex items-center gap-1 flex-shrink-0">
                              <Phone size={14} />
                              {teacher.mobile}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono">{teacher.empId}</td>
                    <td className="px-6 py-4 text-gray-600">{teacher.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{teacher.department}</td>
                    <td className="px-6 py-4 text-gray-600">{teacher.qualification}</td>
                    <td className="px-6 py-4 text-gray-600">{teacher.experience} years</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(teacher.joiningDate).toLocaleDateString()}
                    </td>
                    {/* <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {teacher.status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded" title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-50 rounded" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixed Footer Section */}
        <div className="flex-shrink-0 p-8 pt-4 bg-white/90 border-t border-yellow-100">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-yellow-50 transition-colors">Previous</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-yellow-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-colors duration-200">
          <div className="scale-[0.9] bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl relative border border-yellow-300 animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowAddForm(false)}>&times;</button>
            <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center tracking-tight">Add New Teacher</h2>
            <form onSubmit={handleAddTeacherSubmit} className="space-y-5">
              <div className="flex gap-4">
                <input name="name" value={newTeacher.name} onChange={handleAddTeacherChange} required placeholder="Full Name" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                <input name="email" value={newTeacher.email} onChange={handleAddTeacherChange} required placeholder="Email" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              </div>
              <div className="flex gap-4">
                <input name="mobile" value={newTeacher.mobile} onChange={handleAddTeacherChange} required placeholder="Phone" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                <input name="subject" value={newTeacher.subject} onChange={handleAddTeacherChange} required placeholder="Subject" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              </div>
              <div className="flex gap-4">
                <input name="department" value={newTeacher.department} onChange={handleAddTeacherChange} required placeholder="Department" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                <input name="qualification" value={newTeacher.qualification} onChange={handleAddTeacherChange} required placeholder="Qualification" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              </div>
              <div className="flex gap-4">
                <input name="experience" value={newTeacher.experience} onChange={handleAddTeacherChange} required placeholder="Experience (years)" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
                </div>
              <div className="flex gap-4">
								<select name="gender" value={newTeacher.gender} onChange={handleAddTeacherChange} required className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 text-gray-800 text-base shadow-sm">
									<option value="">Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
              </div>
              <div className='flex gap-4'>
                <input name="address" value={newTeacher.address} onChange={handleAddTeacherChange} required placeholder="Address" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              </div>
             
              <div className="flex gap-4">
                <input type="text" name="pinCode" value={newTeacher.pinCode} onChange={handleAddTeacherChange} required placeholder="PIN CODE" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                <input name="joiningDate" value={newTeacher.joiningDate} onChange={handleAddTeacherChange} required placeholder="Join Date" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="date" />
              </div>
              
            
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Add Teacher</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers