import React, { useState, useEffect } from 'react';
import { User, FileText, Clock, CheckCircle, XCircle, AlertCircle, Plus, Search, Filter, Calendar, Mail, Phone } from 'lucide-react';

const ComplaintManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState({ role: 'Student', id: 1, name: 'Koushik Bala', email: 'balakoushikerexamplemail.com' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Login Issues',
      description: 'Unable to access my course materials after password reset',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      submittedBy: 'Swapnanil Dutta',
      submittedDate: '2024-06-10',
      assignedTo: 'IT Support',
      lastUpdated: '2024-06-11'
    },
    {
      id: 2,
      title: 'Grade Discrepancy',
      description: 'My final grade for Mathematics course seems incorrect',
      category: 'Academic',
      priority: 'Medium',
      status: 'In Progress',
      submittedBy: 'Souvik Chakraborty',
      submittedDate: '2024-06-08',
      assignedTo: 'Academic Office',
      lastUpdated: '2024-06-12'
    },
    {
      id: 3,
      title: 'Course Material Missing',
      description: 'Week 5 lecture materials are not available in the system',
      category: 'Content',
      priority: 'Medium',
      status: 'Resolved',
      submittedBy: 'Koushik Bala',
      submittedDate: '2024-06-05',
      assignedTo: 'Course Coordinator',
      lastUpdated: '2024-06-13'
    }
  ]);

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Technical',
    priority: 'Medium'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['Technical', 'Academic', 'Content', 'Administrative', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const complaint = {
      id: complaints.length + 1,
      ...newComplaint,
      status: 'Open',
      submittedBy: currentUser.name,
      submittedDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Pending Assignment',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setComplaints([...complaints, complaint]);
    setNewComplaint({ title: '', description: '', category: 'Technical', priority: 'Medium' });
    setActiveTab('my-complaints');
  };

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : complaint
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Closed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || complaint.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || complaint.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStats = () => {
    const total = complaints.length;
    const open = complaints.filter(c => c.status === 'Open').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    return { total, open, inProgress, resolved };
  };

  const stats = getStats();

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-3xl font-bold text-gray-900">{stats.open}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-3xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
        <div className="space-y-4">
          {complaints.slice(0, 3).map(complaint => (
            <div key={complaint.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{complaint.title}</h4>
                  <p className="text-sm text-gray-600">{complaint.description.substring(0, 100)}...</p>
                  <p className="text-xs text-gray-500 mt-1">Submitted by {complaint.submittedBy} on {complaint.submittedDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubmitComplaint = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Submit New Complaint</h2>
      <form onSubmit={handleSubmitComplaint} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Title</label>
          <input
            type="text"
            required
            value={newComplaint.title}
            onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of your issue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required
            rows={4}
            value={newComplaint.description}
            onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please provide detailed information about your complaint"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newComplaint.category}
              onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={newComplaint.priority}
              onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Complaint</span>
        </button>
      </form>
    </div>
  );

  const renderComplaintsList = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold">All Complaints</h2>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredComplaints.map(complaint => (
          <div key={complaint.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">#{complaint.id} - {complaint.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{complaint.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Category:</span> {complaint.category}
                  </div>
                  <div>
                    <span className="font-medium">Submitted by:</span> {complaint.submittedBy}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {complaint.submittedDate}
                  </div>
                  <div>
                    <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <span className="text-sm font-medium">{complaint.status}</span>
                </div>
                {currentUser.role === 'admin' && (
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-xs md:text-5xl font-bold text-gray-900" >Complaint Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {currentUser.role}
                </span>
              </div>
              <select
                value={currentUser.role}
                onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
                className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FileText },
              { id: 'submit', label: 'Submit Complaint', icon: Plus },
              { id: 'my-complaints', label: 'My Complaints', icon: User },
              ...(currentUser.role === 'admin' ? [{ id: 'all-complaints', label: 'All Complaints', icon: FileText }] : [])
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-black '
                      : 'text-gray-600 hover:text-red-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <main>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'submit' && renderSubmitComplaint()}
          {activeTab === 'my-complaints' && renderComplaintsList()}
          {activeTab === 'all-complaints' && currentUser.role === 'admin' && renderComplaintsList()}
        </main>
      </div>
    </div>
  );
};

export default ComplaintManagementSystem;