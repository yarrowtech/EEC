import React, { useState } from 'react';
import { FileText, Calendar, Search, Plus, Clock, AlertCircle, X } from 'lucide-react';

const AssignmentManagement = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    class: "",
    dueDate: "",
    maxMarks: "",
    status: "draft",
  });

  const assignments = [
    {
      id: 1,
      title: "Mathematics Assignment 1",
      subject: "Mathematics",
      class: "10-A",
      dueDate: "2024-03-25",
      maxMarks: 100,
      status: "active",
      submissionCount: 15,
      totalStudents: 45
    },
    {
      id: 2,
      title: "Science Project",
      subject: "Science",
      class: "10-A",
      dueDate: "2024-03-28",
      maxMarks: 50,
      status: "draft",
      submissionCount: 0,
      totalStudents: 45
    }
  ];

  const handleChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    // Add logic to save this assignment to your backend or state
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Assignment Management</h1>
        <p className="text-yellow-100">Create and manage student assignments</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              <option value="all">All Classes</option>
              <option value="10-A">Class 10-A</option>
              <option value="10-B">Class 10-B</option>
            </select>
          </div>

          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Active Assignments</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-yellow-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            assignment.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {assignment.subject} | Class {assignment.class}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>Max Marks: {assignment.maxMarks}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Submissions: {assignment.submissionCount}/{assignment.totalStudents}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {assignments.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Drafts</p>
                <p className="text-2xl font-semibold text-gray-600">
                  {assignments.filter(a => a.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Due Dates</h3>
            <div className="space-y-4">
              {assignments
                .filter(a => a.status === 'active')
                .map(assignment => (
                  <div key={assignment.id} className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                      <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Assignment</h2>
            <div className="space-y-4">
              <input
                name="title"
                value={newAssignment.title}
                onChange={handleChange}
                type="text"
                placeholder="Title"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                name="subject"
                value={newAssignment.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                name="class"
                value={newAssignment.class}
                onChange={handleChange}
                type="text"
                placeholder="Class (e.g. 10-A)"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                name="dueDate"
                value={newAssignment.dueDate}
                onChange={handleChange}
                type="date"
                placeholder="Due date"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                name="maxMarks"
                value={newAssignment.maxMarks}
                onChange={handleChange}
                type="number"
                placeholder="Marks"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <select
                name="status"
                value={newAssignment.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;