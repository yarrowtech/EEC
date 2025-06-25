import React, { useState } from 'react';
import { Search, Filter, FileText, CheckCircle, AlertCircle, Download, Upload } from 'lucide-react';

const AssignmentEvaluation = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filter, setFilter] = useState('all');

  const submissions = [
    {
      id: 1,
      studentName: "Sarah Smith",
      assignmentTitle: "Mathematics Assignment 1",
      submissionDate: "2024-03-15",
      status: "submitted",
      marks: null,
      feedback: "",
      attachments: ["math_hw1.pdf"]
    },
    {
      id: 2,
      studentName: "John Doe",
      assignmentTitle: "Mathematics Assignment 1",
      submissionDate: "2024-03-14",
      status: "evaluated",
      marks: 85,
      feedback: "Good work! Please improve presentation.",
      attachments: ["math_solution.pdf"]
    }
  ];

  const [evaluation, setEvaluation] = useState({
    marks: "",
    feedback: "",
    status: "evaluated"
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'evaluated':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            <span>Evaluated</span>
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Assignment Evaluation</h1>
        <p className="text-blue-100">Review and grade student submissions</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending</option>
              <option value="evaluated">Evaluated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Submissions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{submission.studentName}</h3>
                    {getStatusBadge(submission.status)}
                  </div>
                  <p className="text-sm text-gray-500">{submission.assignmentTitle}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Submitted: {submission.submissionDate}</span>
                    {submission.marks && (
                      <span className="font-medium text-blue-600">
                        Marks: {submission.marks}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6">
            {selectedSubmission ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Evaluate Submission
                  </h2>
                  {getStatusBadge(selectedSubmission.status)}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Submission Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Student Name</p>
                      <p className="font-medium">{selectedSubmission.studentName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Submission Date</p>
                      <p className="font-medium">{selectedSubmission.submissionDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Assignment</p>
                      <p className="font-medium">{selectedSubmission.assignmentTitle}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedSubmission.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{attachment}</span>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                    <input
                      type="number"
                      value={evaluation.marks}
                      onChange={(e) => setEvaluation({...evaluation, marks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter marks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                    <textarea
                      value={evaluation.feedback}
                      onChange={(e) => setEvaluation({...evaluation, feedback: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter feedback for the student..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedSubmission(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Submit Evaluation
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a submission to evaluate
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEvaluation; 