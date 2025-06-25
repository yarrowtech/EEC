import React from 'react';
import { Award, Lock, Star } from 'lucide-react';

const AchievementCard = () => {
  const achievements = [
    { id: 1, title: "First Assignment", description: "Completed your first assignment", icon: "🎯", earned: true, date: "2024-06-01", points: 100 },
    { id: 2, title: "Week Streak", description: "7 days of continuous learning", icon: "🔥", earned: true, date: "2024-06-08", points: 250 },
    { id: 3, title: "Quiz Master", description: "Scored 90+ in 3 quizzes", icon: "🏆", earned: true, date: "2024-06-10", points: 300 },
    { id: 4, title: "Code Warrior", description: "Submit 10 coding assignments", icon: "⚔️", earned: false, progress: 7, total: 10, points: 500 },
    { id: 5, title: "Perfect Attendance", description: "Attend all classes for a month", icon: "📅", earned: false, progress: 18, total: 20, points: 400 },
    { id: 6, title: "Team Player", description: "Complete 5 group projects", icon: "🤝", earned: false, progress: 2, total: 5, points: 350 }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const upcomingAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="text-yellow-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          <div className="text-sm text-gray-500">
            {earnedAchievements.length} of {achievements.length} earned
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Earned Achievements */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Star className="text-yellow-500" size={20} />
            <span>Recent Achievements</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedAchievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award size={14} className="text-white" />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        +{achievement.points} points
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Achievements */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Lock className="text-gray-400" size={20} />
            <span>Upcoming Achievements</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAchievements.map((achievement) => {
              const progressPercent = Math.round((achievement.progress / achievement.total) * 100);
              return (
                <div key={achievement.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <Lock size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                          +{achievement.points} points
                        </span>
                        <span className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
