import React, {useEffect, useState} from 'react';
import { Users, Search, Filter, Plus, Edit3, Trash2, Mail, Phone } from 'lucide-react';

const ParentsManagement = ({setShowAdminHeader}) => {

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])

    const [showAddForm, setShowAddForm] = useState(false);
    const [newParent, setNewParent] = useState({
      name: '',
      email: '',
      phone: '',
      children: '', // comma separated
      grade: ''
    });

    const handleAddParentChange = (e) => {
      const { name, value } = e.target;
      setNewParent(prev => ({ ...prev, [name]: value }));
    };

    const handleAddParentSubmit = (e) => {
      e.preventDefault();
      // Here you would send newParent to backend or update state
      setShowAddForm(false);
      setNewParent({ name: '', email: '', phone: '', children: '', grade: '' });
    };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-white/90 rounded-2xl shadow-2xl m-4 border border-yellow-200 overflow-hidden">
        
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-8 bg-white/90 border-b border-yellow-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">Parents Management</h1>
              <p className="text-gray-600 mt-2">Manage and view parent information</p>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parents..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="all">All Grades</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4" />
              <span>Add Parent</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-yellow-50 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Children</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-yellow-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    name: "John Smith",
                    email: "john.smith@example.com",
                    phone: "+1 234-567-8900",
                    children: ["Sarah Smith"],
                    grade: "Grade 10"
                  },
                  {
                    id: 2,
                    name: "Mary Johnson",
                    email: "mary.j@example.com",
                    phone: "+1 234-567-8901",
                    children: ["Tom Johnson", "Lisa Johnson"],
                    grade: "Grade 11, Grade 12"
                  }
                ].map((parent) => (
                  <tr key={parent.id} className="hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{parent.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{parent.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{parent.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        {parent.children.map((child, index) => (
                          <span key={index} className="text-sm text-gray-600">{child}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{parent.grade}</td>
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
      <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center tracking-tight">Add Parent</h2>
      <form onSubmit={handleAddParentSubmit} className="space-y-5">
        <div className="flex gap-4">
          <input name="name" value={newParent.name} onChange={handleAddParentChange} required placeholder="Full Name" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="email" value={newParent.email} onChange={handleAddParentChange} required placeholder="Email" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
        </div>
        <div className="flex gap-4">
          <input name="phone" value={newParent.phone} onChange={handleAddParentChange} required placeholder="Phone" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
          <input name="children" value={newParent.children} onChange={handleAddParentChange} required placeholder="Children's Name" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
        </div>
        <div>
          <input name="grade" value={newParent.grade} onChange={handleAddParentChange} required placeholder="Grade(s)" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Add Parent</button>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default ParentsManagement;