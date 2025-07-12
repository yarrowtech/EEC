import React, { useState, useEffect } from 'react';
import { X, Bell, ChevronDown, ChevronUp } from 'lucide-react';

const NoticeBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'School Reopens',
      message: 'School will reopen on January 15th after winter break.',
      date: '2023-12-20',
      priority: 'high'
    },
    {
      id: 2,
      title: 'PTA Meeting',
      message: 'Next PTA meeting scheduled for December 5th at 4:00 PM.',
      date: '2023-11-28',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Holiday Notice',
      message: 'School will be closed for Thanksgiving on November 23rd-24th.',
      date: '2023-11-15',
      priority: 'low'
    }
  ]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    message: '',
    priority: 'medium'
  });
  const [showForm, setShowForm] = useState(false);

  const toggleNoticeBoard = () => {
    setIsOpen(!isOpen);
  };

  const addNotice = (e) => {
    e.preventDefault();
    const notice = {
      id: notices.length + 1,
      title: newNotice.title,
      message: newNotice.message,
      date: new Date().toISOString().split('T')[0],
      priority: newNotice.priority
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: '', message: '', priority: 'medium' });
    setShowForm(false);
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notice Board Toggle Button */}
      <button
        onClick={toggleNoticeBoard}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center relative"
      >
        <Bell className="h-5 w-5" />
        {notices.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notices.length}
          </span>
        )}
      </button>

      {/* Notice Board Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">Notice Board</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowForm(!showForm)}
                className="p-1 rounded-full hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button 
                onClick={toggleNoticeBoard}
                className="p-1 rounded-full hover:bg-blue-500"
              >
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Add Notice Form */}
          {showForm && (
            <div className="p-3 border-b">
              <form onSubmit={addNotice}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    placeholder="Message"
                    value={newNotice.message}
                    onChange={(e) => setNewNotice({...newNotice, message: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-2">
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notices List */}
          <div className="max-h-96 overflow-y-auto">
            {notices.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notices yet</div>
            ) : (
              notices.map(notice => (
                <div key={notice.id} className="border-b p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{notice.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{notice.message}</div>
                    </div>
                    <button
                      onClick={() => deleteNotice(notice.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                    <span className="text-xs text-gray-500">{notice.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;