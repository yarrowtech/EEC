import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock, Users, Search, Filter } from 'lucide-react';

const ExaminationManagement = ({setShowAdminHeader}) => {

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(false)
    }, [])


  const [examinations, setExaminations] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '',
    marks: '',
    venue: '',
    instructor: '',
    noOfStudents: '',
    status: 'scheduled'
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/exam/fetch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(data => {
      setExaminations(data || []);
    }).catch(error => {
      console.error('Error fetching examinations:', error);
    });
  }, [])



  // Filter examinations based on search and status
  // const filteredExaminations = examinations.filter(exam => {
  //   const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        exam.instructor.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
  //   return matchesSearch && matchesStatus;
  // });

  const [filteredExaminations, setFilteredExaminations] = useState(examinations);

  useEffect(() => {
    setFilteredExaminations(examinations)
  }, [examinations])

  useEffect(() => {
    setFilteredExaminations(examinations.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exam.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
      return matchesSearch && matchesStatus;
    }))
  }, [searchTerm, filterStatus]);

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      date: '',
      time: '',
      duration: '',
      marks: '',
      venue: '',
      instructor: '',
      noOfStudents: '',
      status: 'scheduled'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exam/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log(data)
      setShowModal(false);
      setEditingExam(null);
      resetForm();
    } catch(err) {
      console.log('Error submitting form:', err);
    }
    
  };

  // const handleEdit = (exam) => {
  //   setEditingExam(exam);
  //   setFormData({
  //     title: exam.title,
  //     subject: exam.subject,
  //     date: exam.date,
  //     time: exam.time,
  //     duration: exam.duration.toString(),
  //     totalMarks: exam.totalMarks.toString(),
  //     venue: exam.venue,
  //     instructor: exam.instructor,
  //     students: exam.students.toString(),
  //     status: exam.status
  //   });
  //   setShowModal(true);
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this examination?')) {
  //     setExaminations(prev => prev.filter(exam => exam.id !== id));
  //   }
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Examination Management</h1>
          <p className="text-gray-600">Manage and organize all examinations efficiently</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search examinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingExam(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Examination
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{examinations.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {examinations.filter(exam => exam.status === 'scheduled').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {examinations.filter(exam => exam.status === 'completed').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {examinations.reduce((sum, exam) => sum + exam.noOfStudents, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Examinations Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Examination Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExaminations.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.subject}</div>
                        <div className="text-sm text-gray-500">Instructor: {exam.instructor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(exam.date)}</div>
                      <div className="text-sm text-gray-500">{exam.time}</div>
                      <div className="text-sm text-gray-500">{exam.duration} minutes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Venue: {exam.venue}</div>
                      <div className="text-sm text-gray-500">Students: {exam.noOfStudents}</div>
                      <div className="text-sm text-gray-500">Marks: {exam.marks}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(exam.status)}`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(exam)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exam.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-colors duration-200">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl relative border border-yellow-300 animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => { setShowModal(false); setEditingExam(null); resetForm(); }}>&times;</button>
              <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center tracking-tight">{editingExam ? 'Edit Examination' : 'Add Examination'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-4">
                  <input name="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="Exam Title" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                  <input name="subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required placeholder="Subject" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                </div>
                <div className="flex gap-4">
                  <input name="instructor" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} required placeholder="Instructor" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                  <input name="venue" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} required placeholder="Venue" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
                </div>
                <div className="flex gap-4">
                  <input name="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required placeholder="Date" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="date" />
                  <input name="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required placeholder="Time" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="time" />
                </div>
                <div className="flex gap-4">
                  <input name="duration" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required placeholder="Duration (min)" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
                  <input name="marks" value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})} required placeholder="Total Marks" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
                </div>
                <div className="flex gap-4">
                  <input name="noOfStudents" value={formData.noOfStudents} onChange={e => setFormData({...formData, noOfStudents: e.target.value})} required placeholder="No. of Students" className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" type="number" min="0" />
                  <select name="status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 text-gray-800 text-base shadow-sm">
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">{editingExam ? 'Update' : 'Add'} Examination</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExaminationManagement;