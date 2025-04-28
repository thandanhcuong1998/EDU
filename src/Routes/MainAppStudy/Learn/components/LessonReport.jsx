import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle, ArrowRight, Award } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../../../Redux/Reducers/UserProgressReducer.jsx';

export default function LessonReport({ stats, onContinue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Format time display (convert seconds to minutes and seconds)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Calculate performance score (simple algorithm)
  const calculateScore = () => {
    // Base score starts at 100
    let score = 100;

    // Deduct points for incorrect attempts (5 points per error)
    score -= stats.incorrectAttempts * 5;

    // Ensure score doesn't go below 0
    return Math.max(0, score);
  };

  // Get performance message based on score
  const getPerformanceMessage = (score) => {
    if (score >= 90) return "Xuất sắc! Bạn đã nắm vững bài học này.";
    if (score >= 70) return "Tốt! Bạn đã hiểu phần lớn bài học.";
    if (score >= 50) return "Khá! Hãy xem lại những phần bạn còn chưa chắc.";
    return "Cần cố gắng hơn! Hãy xem lại bài học này.";
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Hoàn thành bài học!</h2>
          <p className="text-gray-400 mt-1">
            {stats.topic} - {stats.level}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center">
            <Clock size={24} className="text-blue-400 mr-3" />
            <div>
              <div className="text-sm text-gray-400">Thời gian hoàn thành</div>
              <div className="text-xl font-semibold text-white">{formatTime(stats.timeSpent)}</div>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center">
            <AlertTriangle size={24} className="text-amber-400 mr-3" />
            <div>
              <div className="text-sm text-gray-400">Số lần trả lời sai</div>
              <div className="text-xl font-semibold text-white">{stats.incorrectAttempts}</div>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center">
            <Award size={24} className="text-purple-400 mr-3" />
            <div>
              <div className="text-sm text-gray-400">Kinh nghiệm nhận được</div>
              <div className="text-xl font-semibold text-white">+{stats.xpEarned} XP</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Điểm số</span>
            <span className="text-white font-bold">{calculateScore()}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full" 
              style={{ width: `${calculateScore()}%` }}
            ></div>
          </div>
          <p className="mt-3 text-gray-300 text-center">
            {getPerformanceMessage(calculateScore())}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              // Add XP to user progress
              dispatch(addExperience(stats.xpEarned));

              // Continue to next level or back to learn page
              if (onContinue) {
                onContinue();
              } else {
                navigate('/learn');
              }
            }}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
          >
            <span>Tiếp tục học</span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
