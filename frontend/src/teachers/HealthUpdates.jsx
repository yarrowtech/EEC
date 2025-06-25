import React, { useState } from 'react';
import { Activity, Search, Plus, Calendar, AlertCircle } from 'lucide-react';

const HealthUpdates = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const students = [
    {
      id: 1,
      name: "Sarah Smith",
      class: "10-A",
      healthStatus: "Good",
      lastUpdate: "2024-03-01",
      recentIssues: [],
      height: "165 cm",
      weight: "52 kg",
      bloodGroup: "B+"
    },
    {
      id: 2,
      name: "John Doe",
      class: "10-A",
      healthStatus: "Under Observation",
      lastUpdate: "2024-03-05",
      recentIssues: ["Mild Fever"],
      height: "170 cm",
      weight: "60 kg",
      bloodGroup: "O+"
    }
  ];

  const [newUpdate, setNewUpdate] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Regular Checkup',
    findings: '',
    recommendations: '',
    status: 'Good'
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Student Health Updates</h1>
        <p className="text-blue-100">Manage and track student health records</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Classes</option>
              <option value="10a">Class 10-A</option>
              <option value="10b">Class 10-B</option>
            </select>
          </div>

          <button 
            onClick={() => setSelectedStudent(null)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Health Update</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Students</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedStudent?.id === student.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">Class: {student.class}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.healthStatus === 'Good' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.healthStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Update Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {selectedStudent ? `Update Health Record - ${selectedStudent.name}` : 'New Health Update'}
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newUpdate.date}
                    onChange={(e) => setNewUpdate({...newUpdate, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newUpdate.type}
                    onChange={(e) => setNewUpdate({...newUpdate, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Regular Checkup</option>
                    <option>Sick Visit</option>
                    <option>Follow-up</option>
                    <option>Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newUpdate.status}
                    onChange={(e) => setNewUpdate({...newUpdate, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Good</option>
                    <option>Under Observation</option>
                    <option>Needs Attention</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Findings</label>
                <textarea
                  value={newUpdate.findings}
                  onChange={(e) => setNewUpdate({...newUpdate, findings: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter medical findings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                <textarea
                  value={newUpdate.recommendations}
                  onChange={(e) => setNewUpdate({...newUpdate, recommendations: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter recommendations..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Health Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthUpdates; 