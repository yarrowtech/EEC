import React from 'react';
import { Award } from 'lucide-react';
import { ADMIN_STATS } from './adminConstants';

const AdminCongratulationsCard = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-4 left-8">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      {/* Triangular flags */}
      <div className="absolute top-0 left-20">
        <div className="flex space-x-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-0 h-0 border-l-[15px] border-r-[15px] border-b-[20px] border-l-transparent border-r-transparent ${
                i % 3 === 0
                  ? 'border-b-yellow-300'
                  : i % 3 === 1
                  ? 'border-b-yellow-200'
                  : 'border-b-yellow-100'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Congratulations Admin,</h2>
        <p className="text-base lg:text-lg opacity-90">
          You have achieved <span className="font-bold">{ADMIN_STATS.salesIncrease}</span> more engagement today.
          <br />
          <span className="text-sm">Check your admin dashboard for detailed analytics.</span>
        </p>
      </div>
    </div>
  );
};

export default AdminCongratulationsCard;