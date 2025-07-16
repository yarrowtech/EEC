import React from 'react';
import { BookOpen, Trophy, Clock, TrendingUp } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    {
      title: "Active Courses",
      value: "4",
      change: "+1 this semester",
      changeType: "positive",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Achievements",
      value: "12",
      change: "+3 this month",
      changeType: "positive",
      icon: Trophy,
      color: "bg-yellow-500"
    },
    {
      title: "Study Hours",
      value: "24",
      change: "This week",
      changeType: "neutral",
      icon: Clock,
      color: "bg-green-500"
    },
    {
      title: "Overall Progress",
      value: "78%",
      change: "+5% this month",
      changeType: "positive",
      icon: TrendingUp,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-purple-400 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={24} className="text-white" />
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-700 bg-green-100' 
                  : stat.changeType === 'negative'
                  ? 'text-red-700 bg-red-100'
                  : 'text-gray-700 bg-gray-100'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;