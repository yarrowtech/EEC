import React, { useState } from 'react';
import {
  BookOpen, Plus, ChevronDown, ChevronRight, Search,
  Grid, List
} from 'lucide-react';

const initialLessonPlans = [
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
  const [lessonPlans, setLessonPlans] = useState(initialLessonPlans);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    section: '',
    subject: '',
    chapter: '',
    date: ''
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    const newLessonPlan = {
      id: Math.max(...lessonPlans.map(plan => plan.id), 0) + 1, // Generate new ID
      title: formData.title || `New ${formData.subject} Lesson`,
      subject: formData.subject,
      class: formData.class,
      section: formData.section,
      chapter: formData.chapter,
      status: 'Draft',
      lastUpdated: 'Just now',
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    setLessonPlans(prev => [newLessonPlan, ...prev]);
    setSelectedPlan(newLessonPlan); // Auto-select the new lesson
    setFormData({ 
      title: '',
      class: '', 
      section: '', 
      subject: '', 
      chapter: '', 
      date: '' 
    });
    setIsDropdownOpen(false);
  };

  const isFormValid = formData.class && formData.section && formData.subject && formData.chapter;

  // Filter lesson plans based on search and subject filter
  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         plan.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All Subjects' || plan.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Lesson Plan Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, Teacher</span>
          </div>
        </div>
      </header>

      {/* Add Lesson Plan and Controls */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="dialog"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lesson Plan</span>
              {isDropdownOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {isDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-full min-w-[280px] sm:min-w-[400px] md:min-w-[700px]"
                role="dialog"
                aria-modal="true"
              >
                <h3 className="text-lg font-medium mb-4">Create New Lesson Plan</h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap items-end gap-4">
                    {['title', 'class', 'section', 'subject', 'chapter'].map((field) => (
                      <div className="flex flex-col w-full sm:w-32" key={field}>
                        <label htmlFor={field} className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          id={field}
                          type="text"
                          placeholder={field}
                          value={formData[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                          required={field !== 'title'}
                        />
                      </div>
                    ))}
                    <div className="flex flex-col w-full sm:w-40">
                      <label htmlFor="date" className="block text-xs font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                    <div className="flex flex-row gap-2 pt-4 w-full">
                      <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`py-2 px-4 rounded-md text-sm font-medium ${isFormValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(false)}
                        className="py-2 px-4 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Search, Filter, View */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <label htmlFor="search" className="sr-only">Search lesson plans</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search lesson plans..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subject-filter" className="sr-only">Filter by subject</label>
            <select
              id="subject-filter"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option>All Subjects</option>
              {[...new Set(lessonPlans.map(plan => plan.subject))].map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Split View: List and Detail */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-180px)]">
        {/* Lesson Plan List */}
        <div className="w-full md:w-1/3 border-r bg-white overflow-y-auto">
          <ul>
            {filteredPlans.length > 0 ? (
              filteredPlans.map(plan => (
                <li
                  key={plan.id}
                  className={`p-4 border-b cursor-pointer hover:bg-blue-50 transition-colors ${selectedPlan?.id === plan.id ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-black">{plan.title}</div>
                      <div className="text-xs text-gray-500">{plan.subject} | {plan.class} {plan.section}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Last updated: {plan.lastUpdated}</div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">
                No lesson plans found matching your criteria
              </li>
            )}
          </ul>
        </div>
        
        {/* Lesson Plan Detail */}
        <div className="flex-1 bg-gray-50 p-4 sm:p-8 overflow-y-auto">
          {selectedPlan ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-black">{selectedPlan.title}</h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Subject:</span> {selectedPlan.subject}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Class:</span> {selectedPlan.class} | 
                <span className="font-semibold"> Section:</span> {selectedPlan.section}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Chapter:</span> {selectedPlan.chapter}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Status:</span> 
                <span className={`px-2 py-1 rounded ml-2 ${getStatusColor(selectedPlan.status)}`}>
                  {selectedPlan.status}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                <span className="font-semibold">Last updated:</span> {selectedPlan.lastUpdated}
              </div>
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