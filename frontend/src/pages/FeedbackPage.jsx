import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useState } from 'react';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', { rating, feedback });
      
      // Mark feedback as submitted
      localStorage.setItem('feedbackSubmitted', 'true');
      
      // Navigate back or to a thank you page
      navigate('/feedback/thank-you');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">We'd Love Your Feedback!</h2>
          <p className="text-gray-600">
            Your feedback helps us improve our services and provide a better experience.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-medium text-gray-700">
              How would you rate your experience?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transform transition hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={40}
                    className={`transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text Area */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              id="feedback"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Tell us about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              type="submit"
              className="flex-1 bg-yellow-500 text-black py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors text-lg font-medium"
            >
              Submit Feedback
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage; 