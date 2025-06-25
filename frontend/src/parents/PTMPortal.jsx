import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, Users, Bell, Check, X } from 'lucide-react';

const PTMPortal = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const meetings = [
    {
      id: 1,
      teacherName: "Ms. Johnson",
      subject: "Mathematics",
      date: "2024-03-20",
      time: "10:00 AM",
      type: "Video Call",
      status: "pending",
      topic: "Academic Progress Discussion",
      notification: {
        read: false,
        timestamp: "2024-03-15T10:30:00"
      }
    },
    {
      id: 2,
      teacherName: "Mr. Smith",
      subject: "Science",
      date: "2024-03-22",
      time: "2:30 PM",
      type: "In Person",
      status: "confirmed",
      topic: "Project Discussion",
      notification: {
        read: true,
        timestamp: "2024-03-14T15:45:00"
      }
    }
  ];

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-4 h-4" />;
      case 'Phone Call':
        return <Phone className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const handleResponse = (meetingId, response) => {
    // Handle meeting response (accept/decline)
    console.log(`Meeting ${meetingId} ${response}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Parent-Teacher Meetings</h1>
        <p className="text-yellow-100">View and respond to meeting requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Meetings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
            </div>
            <div className="p-4 space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-yellow-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-800">
                          Meeting with {meeting.teacherName}
                        </h3>
                        {!meeting.notification.read && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{meeting.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getMeetingTypeIcon(meeting.type)}
                          <span>{meeting.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Topic: {meeting.topic}
                      </p>
                    </div>

                    {meeting.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleResponse(meeting.id, 'accept')}
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResponse(meeting.id, 'decline')}
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {meeting.status === 'confirmed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications & Calendar */}
        <div className="space-y-6">
          {/* Recent Notifications */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      !meeting.notification.read ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}
                  >
                    <Bell className={`w-5 h-5 ${
                      !meeting.notification.read ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                    <div>
                      <p className="text-sm text-gray-800">
                        New meeting request from {meeting.teacherName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(meeting.notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {meetings.filter(m => m.status === 'confirmed').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {meetings.filter(m => m.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTMPortal; 