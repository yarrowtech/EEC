import React, { useState } from 'react';
import {
  BookOpen, Plus, ChevronDown, ChevronRight, Search,
  Grid, List
} from 'lucide-react';

const lessonPlans = [
  { id: 1, subject: 'Mathematics', title: 'Introduction to Algebra', class: 'Grade 8', section: 'A', chapter: 'Chapter 1', status: 'Published', lastUpdated: '2 days ago' },
  { id: 2, subject: 'Physics', title: "Newton's Laws of Motion", class: 'Grade 10', section: 'B', chapter: 'Chapter 3', status: 'Draft', lastUpdated: '1 week ago' },
  { id: 3, subject: 'English Literature', title: "Shakespeare's Hamlet", class: 'Grade 12', section: 'A', chapter: 'Act 1', status: 'Published', lastUpdated: '3 days ago' },
  { id: 4, subject: 'Chemistry', title: 'Organic Compounds', class: 'Grade 11', section: 'C', chapter: 'Chapter 5', status: 'Published', lastUpdated: '5 days ago' },
  { id: 5, subject: 'History', title: 'World War II', class: 'Grade 9', section: 'A', chapter: 'Chapter 8', status: 'Draft', lastUpdated: '1 day ago' },
  { id: 6, subject: 'Biology', title: 'Cell Structure', class: 'Grade 10', section: 'A', chapter: 'Chapter 2', status: 'Published', lastUpdated: '4 days ago' }
];

const getStatusColor = (status) =>
  status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

const LessonPlanDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [formData, setFormData] = useState({
    class: '',
    section: '',
    subject: '',
    chapter: ''
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('New Lesson Plan:', formData);
    setFormData({ class: '', section: '', subject: '', chapter: '' });
    setIsDropdownOpen(false);
    alert('Lesson plan added successfully!');
  };

  const isFormValid = formData.class && formData.section && formData.subject && formData.chapter;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Add Lesson Plan and Controls */}
      <div className="bg-white border-b border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lesson Plan</span>
              {isDropdownOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-full min-w-[700px]">
                <div className="flex flex-wrap items-end gap-4">
                  {['class', 'section', 'subject', 'chapter'].map((field) => (
                    <div className="flex flex-col w-32" key={field}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{field}</label>
                      <input
                        type="text"
                        placeholder={field}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col w-40">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-row gap-2 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                      className={`py-2 px-4 rounded-md text-sm font-medium ${isFormValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="py-2 px-4 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search, Filter, View */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lesson plans..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>English Literature</option>
            <option>Chemistry</option>
            <option>History</option>
            <option>Biology</option>
          </select>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split View: List and Detail */}
      <div className="flex h-[calc(100vh-200px)]">
        {/* Lesson Plan List */}
        <div className="w-full md:w-1/3 border-r bg-white overflow-y-auto">
          <ul>
            {lessonPlans.map(plan => (
              <li
                key={plan.id}
                className={`p-4 border-b cursor-pointer hover:bg-blue-50 ${selectedPlan && selectedPlan.id === plan.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-black">{plan.title}</div>
                    <div className="text-xs text-gray-500">{plan.subject} | {plan.class} {plan.section}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(plan.status)}`}>{plan.status}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last updated: {plan.lastUpdated}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Lesson Plan Detail */}
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          {selectedPlan ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-black">{selectedPlan.title}</h2>
              <div className="mb-2 text-gray-700">Subject: <span className="font-medium">{selectedPlan.subject}</span></div>
              <div className="mb-2 text-gray-700">Class: <span className="font-medium">{selectedPlan.class}</span> Section: <span className="font-medium">{selectedPlan.section}</span></div>
              <div className="mb-2 text-gray-700">Chapter: <span className="font-medium">{selectedPlan.chapter}</span></div>
              <div className="mb-2 text-gray-700">Status: <span className={`px-2 py-1 rounded ${getStatusColor(selectedPlan.status)}`}>{selectedPlan.status}</span></div>
              <div className="text-xs text-gray-400">Last updated: {selectedPlan.lastUpdated}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span>Select a lesson plan to view details</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlanDashboard;