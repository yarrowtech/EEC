import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({setShowAdminHeader}) => {
  const [timeFilter, setTimeFilter] = useState('last6months');

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  // making the admin header invisible
    useEffect(() => {
      setShowAdminHeader(true)
    }, [])

  // Data for Student Performance Trend (Line Chart)
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Performance Score',
        data: [75, 78, 80, 82, 85, 88],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const performanceOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Performance Score (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  // Data for Attendance Breakdown (Pie Chart)
  const attendanceData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        label: 'Attendance',
        data: [85, 10, 5],
        backgroundColor: ['#34d399', '#ef4444', '#facc15'],
      },
    ],
  };

  const attendanceOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Data for Course Progress (Bar Chart)
  const courseProgressData = {
    labels: ['Mathematics', 'Science', 'History', 'English', 'Art'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [85, 70, 65, 90, 60],
        backgroundColor: '#8b5cf6',
      },
    ],
  };

  const courseProgressOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Completion Rate (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Course',
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Analytics Overview</h2>
        <div className="flex items-center gap-3">
          <label htmlFor="time-filter" className="text-gray-700 font-medium">
            Time Period:
          </label>
          <select
            id="time-filter"
            value={timeFilter}
            onChange={handleTimeFilterChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last6months">Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
          <p className="text-2xl font-bold text-primary">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Teachers</h3>
          <p className="text-2xl font-bold text-primary">82</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Average Attendance</h3>
          <p className="text-2xl font-bold text-primary">92%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Course Completion Rate</h3>
          <p className="text-2xl font-bold text-primary">78%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Active Courses</h3>
          <p className="text-2xl font-bold text-primary">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-sm font-medium text-gray-600">Upcoming Exams</h3>
          <p className="text-2xl font-bold text-primary">3</p>
        </div>
      </div>

      {/* Student Performance Trend */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Student Performance Trend</h3>
      <p className="text-gray-600 mb-4">Average student performance scores over the selected time period.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-full">
          <Line data={performanceData} options={performanceOptions} />
        </div>
      </div>

      {/* Attendance Breakdown */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Attendance Breakdown</h3>
      <p className="text-gray-600 mb-4">Distribution of student attendance for the selected time period.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-full max-w-xs mx-auto">
          <Pie data={attendanceData} options={attendanceOptions} />
        </div>
      </div>

      {/* Course Progress */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Course Progress</h3>
      <p className="text-gray-600 mb-4">Completion rates for active courses.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-full">
          <Bar data={courseProgressData} options={courseProgressOptions} />
        </div>
      </div>

      {/* Teacher Activity */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Recent Teacher Activity</h3>
      <p className="text-gray-600 mb-4">Latest actions performed by teachers on the platform.</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Teacher</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-4 text-gray-600">Ms. Johnson</td>
              <td className="p-4 text-gray-600">Created Lesson</td>
              <td className="p-4 text-gray-600">Jun 15, 2025</td>
              <td className="p-4 text-gray-600">Algebra Basics for Class 8</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 text-gray-600">Mr. Patel</td>
              <td className="p-4 text-gray-600">Graded Exam</td>
              <td className="p-4 text-gray-600">Jun 14, 2025</td>
              <td className="p-4 text-gray-600">Midterm Science Exam - Class 9</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 text-gray-600">Ms. Smith</td>
              <td className="p-4 text-gray-600">Updated Timetable</td>
              <td className="p-4 text-gray-600">Jun 13, 2025</td>
              <td className="p-4 text-gray-600">Added extra session for History</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;