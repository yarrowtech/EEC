import React, {useEffect} from 'react';
import { Users, Search, Filter, Plus, Edit3, Trash2, Mail, Phone } from 'lucide-react';

const ParentsManagement = ({setShowAdminHeader}) => {

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

            <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
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
      </div>
    </div>
  );
};

export default ParentsManagement; 