import React, { useState } from 'react';
import { BookOpen, Plus, ChevronDown, ChevronRight, Search, Filter, Grid, List } from 'lucide-react';

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
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicData, setTopicData] = useState({
    introduction: '',
    explanation: '',
    rules: '',
    points: '',
    shortMethod: '',
    longMethod: '',
    recapitulation: '',
    evaluation: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTopicInput = (field, value) => {
    setTopicData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('New Lesson Plan:', formData);
    // Reset form
    setFormData({
      class: '',
      section: '',
      subject: '',
      chapter: ''
    });
    setIsDropdownOpen(false);
    alert('Lesson plan added successfully!');
  };

  const handleAddTopic = () => {
    // Here you would save the topicData to the lesson plan (API or state update)
    setShowAddTopic(false);
    setTopicData({
      introduction: '',
      explanation: '',
      rules: '',
      points: '',
      shortMethod: '',
      longMethod: '',
      recapitulation: '',
      evaluation: ''
    });
    alert('Topic added!');
  };

  const isFormValid = formData.class && formData.section && formData.subject && formData.chapter;

  const lessonPlans = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Introduction to Algebra',
      class: 'Grade 8',
      section: 'A',
      chapter: 'Chapter 1',
      status: 'Published',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      subject: 'Physics',
      title: "Newton's Laws of Motion",
      class: 'Grade 10',
      section: 'B',
      chapter: 'Chapter 3',
      status: 'Draft',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      subject: 'English Literature',
      title: "Shakespeare's Hamlet",
      class: 'Grade 12',
      section: 'A',
      chapter: 'Act 1',
      status: 'Published',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      subject: 'Chemistry',
      title: 'Organic Compounds',
      class: 'Grade 11',
      section: 'C',
      chapter: 'Chapter 5',
      status: 'Published',
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      subject: 'History',
      title: 'World War II',
      class: 'Grade 9',
      section: 'A',
      chapter: 'Chapter 8',
      status: 'Draft',
      lastUpdated: '1 day ago'
    },
    {
      id: 6,
      subject: 'Biology',
      title: 'Cell Structure',
      class: 'Grade 10',
      section: 'A',
      chapter: 'Chapter 2',
      status: 'Published',
      lastUpdated: '4 days ago'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="bg-white w-80 border-r border-gray-200 flex flex-col min-h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-semibold text-black">EEC Admin</span>
          </div>
        </div>
        {/* Only Lesson Plan Button */}
        <div className="flex-1 p-6">
          <button className="w-full flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-default" disabled>
            <BookOpen className="w-5 h-5" />
            <span className="text-lg font-medium text-white">Lesson Plan</span>
          </button>
        </div>
        {/* User Section */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            <div>
              <div className="text-sm font-medium text-black">Admin User</div>
              <div className="text-xs text-black">administrator@eec.edu</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">Lesson Plans</h1>
              <p className="text-black mt-1">Create, manage, and organize your teaching materials</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              {/* User Section */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-black">Admin User</div>
                  <div className="text-xs text-gray-600">administrator@eec.edu</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Lesson Plan Button & Form */}
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
                    <div className="flex flex-col w-32">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                      <input
                        type="text"
                        placeholder="Class"
                        value={formData.class}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col w-32">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Section</label>
                      <input
                        type="text"
                        placeholder="Section"
                        value={formData.section}
                        onChange={(e) => handleInputChange('section', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col w-40">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col w-40">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Chapter</label>
                      <input
                        type="text"
                        placeholder="Chapter"
                        value={formData.chapter}
                        onChange={(e) => handleInputChange('chapter', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col w-40">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-row gap-2 pt-4">
                      <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${isFormValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="py-2 px-4 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Controls (search, filter, view mode) */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lesson plans..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Lesson Plans</p>
                  <p className="text-2xl font-bold text-gray-800">6</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Plans Grid */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {lessonPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => { setSelectedPlan(plan); setShowAddTopic(false); }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{plan.subject}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{plan.class} - {plan.section}</span>
                    <span>{plan.chapter}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Updated {plan.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Lesson Plan Details */}
          {selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setSelectedPlan(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-2 text-purple-700">{selectedPlan.title}</h2>
                <p className="mb-1 text-gray-600">Subject: {selectedPlan.subject}</p>
                <p className="mb-1 text-gray-600">Class: {selectedPlan.class} - {selectedPlan.section}</p>
                <p className="mb-1 text-gray-600">Chapter: {selectedPlan.chapter}</p>
                <div className="mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4"
                    onClick={() => setShowAddTopic(!showAddTopic)}
                  >
                    {showAddTopic ? 'Hide Add Topic' : 'Add Topic'}
                  </button>
                  {showAddTopic && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                      <div className="flex gap-4 min-w-[1200px]">
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Introduction</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.introduction} onChange={e => handleTopicInput('introduction', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Explanation</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.explanation} onChange={e => handleTopicInput('explanation', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Rules and Regulation</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.rules} onChange={e => handleTopicInput('rules', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Points to Remember</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.points} onChange={e => handleTopicInput('points', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Short Method</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.shortMethod} onChange={e => handleTopicInput('shortMethod', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Long Method</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.longMethod} onChange={e => handleTopicInput('longMethod', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Recapitulation</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.recapitulation} onChange={e => handleTopicInput('recapitulation', e.target.value)} />
                        </div>
                        <div className="flex flex-col w-56">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Evaluation</label>
                          <textarea className="w-full border rounded p-2" rows={4} value={topicData.evaluation} onChange={e => handleTopicInput('evaluation', e.target.value)} />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                          onClick={handleAddTopic}
                        >
                          Save Topic
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                          onClick={() => setShowAddTopic(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlanDashboard;