import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';

const WelcomeCard = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: Sun };
    if (hour < 17) return { text: 'Good Afternoon', icon: Sun };
    return { text: 'Good Evening', icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const studentData = {
    name: "Student",
    id: "STU001",
    semester: "Fall 2024",
    avatar: "src/koushik-bala-pp.jpg"
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={studentData.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white/20 shadow-lg"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <GreetingIcon size={20} className="text-yellow-100" />
                <span className="text-lg font-medium opacity-90">{greeting.text},</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">{studentData.name}!</h1>
              <p className="text-yellow-100 text-sm">
                Student ID: {studentData.id} • {studentData.semester}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-yellow-100 text-sm mb-2">Today's Date</p>
            <p className="text-xl font-semibold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-sm text-yellow-100 mb-2">Quick Tip</p>
          <p className="text-white font-medium">
            "Success is the sum of small efforts repeated day in and day out." Keep up the great work! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;