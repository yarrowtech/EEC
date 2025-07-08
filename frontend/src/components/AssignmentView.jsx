import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  FileText,
  Download,
} from "lucide-react";
import { questionPaper } from "./questionPaper";

const AssignmentView = () => {
  const [filter, setFilter] = useState("all"); // all, pending, completed, overdue
  const [assignmentType, setAssignmentType] = useState("school"); // 'school' or 'eec'


  // Sample assignment data
  const assignments = [
    {
      id: 1,
      title: "Database Design Project",
      course: "Database Management Systems",
      dueDate: "2025-06-20",
      status: "pending",
      priority: "high",
      description: "Design and implement a relational database for a library management system",
      submissionType: "file",
      maxMarks: 100
    },
    {
      id: 2,
      title: "React Component Assessment",
      course: "Web Development",
      dueDate: "2025-06-18",
      status: "completed",
      priority: "medium",
      description: "Create reusable React components with proper state management",
      submissionType: "link",
      maxMarks: 75,
      submittedAt: "2025-06-15"
    },
    {
      id: 3,
      title: "Algorithm Analysis Report",
      course: "Data Structures & Algorithms",
      dueDate: "2025-06-12",
      status: "overdue",
      priority: "high",
      description: "Analyze time and space complexity of sorting algorithms",
      submissionType: "file",
      maxMarks: 50
    },
    {
      id: 4,
      title: "Network Security Case Study",
      course: "Cybersecurity",
      dueDate: "2025-06-25",
      status: "pending",
      priority: "medium",
      description: "Analyze a real-world security breach and propose solutions",
      submissionType: "presentation",
      maxMarks: 80
    }
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // State for EEC Tryout answers and feedback
  const [questionType, setQuestionType] = useState("mcq");
  // EEC Tryout questions and brain games
  const [selectedClass, setSelectedClass] = useState("5");
  const [eecSubject, setEecSubject] = useState("science"); // 'science', 'math', 'game'
  const [questionData, setQuestionData] = useState(questionPaper);
  const [insight, setInsight] = useState({studentClass: selectedClass, subject: eecSubject, startTime: new Date(), questionType: questionType, endTime: null, correct: 0, incorrect: 0});

  useEffect(() => {
    if(!selectedClass || !questionData[selectedClass]) return;
    setEecSubject(Object.keys(questionData[selectedClass])[0])
  }, [selectedClass])

  useEffect(() => {
    setInsight({studentClass: selectedClass, subject: eecSubject, questionType: questionType, startTime: new Date(), endTime: null, correct: 0, incorrect: 0});
  }, [selectedClass, eecSubject, questionType])

  return (
    <div className="w-full min-h-screen bg-white px-1 sm:px-4 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Assignment Type Dropdown */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your assignments and submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="assignmentType" className="font-medium text-gray-700">Type:</label>
          <select
            id="assignmentType"
            value={assignmentType}
            onChange={e => setAssignmentType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="school">School Assignment</option>
            <option value="eec">Practice Paper</option>
            <option value="tryout">Tryout</option>
          </select>
        </div>
      </div>

      {/* School Assignment Section */}
      {assignmentType === 'school' && (
        <>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-2">
            {['all', 'pending', 'completed', 'overdue'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {assignments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {assignments.filter(a => a.status === 'overdue').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 ${getPriorityColor(assignment.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(assignment.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Book className="w-4 h-4" />
                        <span>{assignment.course}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {formatDate(assignment.dueDate)}</span>
                      </div>
                      <span className="text-gray-500">Max Marks: {assignment.maxMarks}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{assignment.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Submission: {assignment.submissionType}
                        </span>
                        {assignment.status === 'pending' && (
                          <span className={`text-sm font-medium ${
                            getDaysRemaining(assignment.dueDate) < 0 
                              ? 'text-red-600' 
                              : getDaysRemaining(assignment.dueDate) <= 3 
                                ? 'text-yellow-600' 
                                : 'text-green-600'
                          }`}>
                            {getDaysRemaining(assignment.dueDate) < 0 
                              ? `${Math.abs(getDaysRemaining(assignment.dueDate))} days overdue`
                              : `${getDaysRemaining(assignment.dueDate)} days remaining`
                            }
                          </span>
                        )}
                        {assignment.submittedAt && (
                          <span className="text-sm text-green-600">
                            Submitted on {formatDate(assignment.submittedAt)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        {assignment.status === 'pending' && (
                          <button className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-colors">
                            Submit
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-600">No assignments match your current filter.</p>
            </div>
          )}
        </>
      )}

      {/* EEC Tryout Section */}
      {assignmentType === 'eec' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label htmlFor="classSelect" className="font-medium text-gray-700">Select Class:</label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.keys(questionData).map((cls) => (
                <option key={cls} value={cls}>{`Class ${cls}`}</option>
              ))}
            </select>
            <label htmlFor="eecSubject" className="font-medium text-gray-700 ml-4">Subject:</label>
            <select
              id="eecSubject"
              value={eecSubject}
              onChange={e => setEecSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.keys(questionData[selectedClass]).map((subject) => (
                <option key={subject} value={subject}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</option>
              ))
              }
            </select>
          </div>
          <div>
            <label
              htmlFor="eecSubject"
              className="font-medium text-gray-700 ml-4"
            >
              Question Type:
            </label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => setQuestionType(e.target.value)} value={questionType}>
              <option value="mcq">MCQ</option>
              <option value="blank">Fill in the Blanks</option>
            </select>
          </div>
          <div className="space-y-4">
            {
              questionType === "mcq" ? <MCQ array={questionData[selectedClass][eecSubject]?.mcq} insight={insight} setInsight={setInsight} /> :
              <Blank array={questionData[selectedClass][eecSubject]?.blank} insight={insight} setInsight={setInsight} />
            }
          </div>
        </div>
      )}

      {/* Tryout Section */}
      {assignmentType === 'tryout' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-lg text-gray-700 font-semibold">
          Tryout assignments coming soon!
        </div>
      )}
    </div>
  );
};

function MCQ({array, insight, setInsight}) {
  const [eecFeedback, setEecFeedback] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [eecAnswers, setEecAnswers] = useState({}); // { [idx]: userInput }
  const [checked, setChecked] = useState(false)


  useEffect(() => {
    setShowAnswers(false);
    setEecFeedback(null);
  }, [array])

  useEffect(() => {
    if (!checked) return
    fetch(`${import.meta.env.VITE_API_URL}/api/behaviour/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insight)
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(data => {
      console.log(data)
    }).catch(error => {
      console.error(error);
    })
    setChecked(false)
  }, [checked])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [showAnswers])

  // Handler for answer input
  const handleEecInput = (idx, value) => {
    setEecAnswers((prev) => ({ ...prev, [idx]: value }));
    setEecFeedback(null);
  };
  // Handler for answer check
  const handleEecCheck = () => {
    let correction = []
    array.forEach((q, idx) => {
      const userAns = (eecAnswers[idx] || "").trim().toLowerCase();
      const correct = (q.a || "").trim().toLowerCase();
      correction.push(userAns === correct)
    });
    setEecFeedback(correction);
    setShowAnswers(true);
    setInsight((prev) => {
      return {...prev, endTime: new Date(), correct: correction.filter(c => c).length, incorrect: correction.filter(c => !c).length}
    })
    setChecked(true)
  };

  return (
    <>
      {array && array.map((q, idx) => (<div
        key={idx}
        className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg"
      >
        <div className="font-semibold text-gray-800 mb-1">
          Q{idx + 1}: {q.q}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
          <div className="flex flex-col gap-2">
            {q.o &&
              q.o.map((option) => (
                <div className="flex items-center gap-2">
                  <input
                    name={q.q}
                    type="radio"
                    id={option}
                    onChange={() => handleEecInput(idx, option)}
                  />
                  <label key={option} className="cursor-pointer text-black">
                    {option}
                  </label>
                </div>
              ))}
          </div>
        </div>
        {showAnswers && (
          <>
          <div className="text-sm text-gray-400 italic mt-1">Answer: {q.a}</div>
          <div className="text-sm text-gray-400 italic mt-1">Explanation: {q.e}</div>
          </>
        )}
      {eecFeedback !== null && (
        <p
          className={`${
            eecFeedback[idx] ? "text-green-500" : "text-red-500"
          } font-bold text-lg`}
        >
          {eecFeedback[idx] ? "Correct" : "Incorrect"}
        </p>
      )}
      </div>))}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleEecCheck}
        >
          Check
        </button>
        <button
          className={`px-3 py-1 ${
            showAnswers ? "bg-green-600" : "bg-red-600"
          } text-white rounded ${
            showAnswers ? "hover:bg-green-700" : "hover:bg-red-700"
          } transition-colors`}
          onClick={() => {
            setEecFeedback(null);
            setShowAnswers(!showAnswers);
          }}
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </button>
      </div>
    </>
  );
}

function Blank({array, insight, setInsight}) {

  const [eecFeedback, setEecFeedback] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [eecAnswers, setEecAnswers] = useState({}); // { [idx]: userInput }
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setShowAnswers(false);
    setEecFeedback(null);
  }, [array])

    useEffect(() => {
    window.scrollTo(0, 0)
  }, [showAnswers])

  useEffect(() => {
    if (!checked) return
    fetch(`${import.meta.env.VITE_API_URL}/api/behaviour/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insight)
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(data => {
      console.log(data)
    }).catch(error => {
      console.error(error);
    })
    setChecked(false)
  }, [checked])

  // Handler for answer input
  const handleEecInput = (idx, value) => {
    setEecAnswers((prev) => ({ ...prev, [idx]: value }));
    setEecFeedback(null);
  };
  // Handler for answer check
  const handleEecCheck = () => {
    let correction = []
    array.forEach((q, idx) => {
      const userAns = (eecAnswers[idx] || "").trim().toLowerCase();
      const correct = (q.a || "").trim().toLowerCase();
      correction.push(userAns === correct)
    });
    setEecFeedback(correction);
    setShowAnswers(true);
    setInsight((prev) => {
      return {...prev, endTime: new Date(), correct: correction.filter(c => c).length, incorrect: correction.filter(c => !c).length}
    })
    setChecked(true)
  };

  return (
    <>
      {array && array.map((q, idx) => (<div
        key={idx}
        className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg"
      >
        <div className="font-semibold text-gray-800 mb-1">
          Q{idx + 1}: {q.q}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
          <input
          type="text"
          className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-auto"
          placeholder="Your answer..."
          value={eecAnswers[idx] || ''}
          onChange={e => handleEecInput(idx, e.target.value)}
        />
        </div>
        {showAnswers && (
          <>
          <div className="text-sm text-gray-400 italic mt-1">Answer: {q.a}</div>
          <div className="text-sm text-gray-400 italic mt-1">Explanation: {q.e}</div>
          </>
        )}
        {eecFeedback !== null && (
        <p
          className={`${
            eecFeedback[idx] ? "text-green-500" : "text-red-500"
          } font-bold text-lg`}
        >
          {eecFeedback[idx] ? "Correct" : "Incorrect"}
        </p>
      )}
      </div>))}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleEecCheck}
        >
          Check
        </button>
        <button
          className={`px-3 py-1 ${
            showAnswers ? "bg-green-600" : "bg-red-600"
          } text-white rounded ${
            showAnswers ? "hover:bg-green-700" : "hover:bg-red-700"
          } transition-colors`}
          onClick={() => {
            setEecFeedback(null);
            setShowAnswers(!showAnswers);
          }}
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </button>
      </div>
    </>
  );
}


export default AssignmentView;