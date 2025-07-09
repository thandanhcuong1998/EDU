import { NotebookText, Star, Lock, BookOpenCheck } from 'lucide-react';
import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLessonQuestions } from '../redux/lessonSlice.js';
import { updateDailyProgress } from '@/features/user-profile/state/UserProgressReducer.jsx';
import ListQuestionFakeDataLession from '../data/ListQuestionFakeDataLession.jsx';
import { LanguageContext } from '../../../app/providers/LanguageProvider.jsx';
import './LearningPath.css'; // Import the new Learning Path styles

// Helper function to format topic names for display
const formatTopicName = (topic) => {
    return topic
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (string) => string.toUpperCase()); // Capitalize first letter
};

export default function MainLearn() {
    const { translations } = useContext(LanguageContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userProgress = useSelector(state => state.userProgress);

    // Memoize the entire lesson data structure for performance
    const allLessons = useMemo(() => {
        const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
        const userStartingLevel = userProgress.startingLevel || 'N5';
        const userLevelIndex = JLPT_LEVELS.indexOf(userStartingLevel);

        if (userLevelIndex === -1) {
            // Fallback for invalid startingLevel, show all available lessons
            return ListQuestionFakeDataLession;
        }

        const filteredLessons = {};
        for (let i = userLevelIndex; i < JLPT_LEVELS.length; i++) {
            const level = JLPT_LEVELS[i];
            if (ListQuestionFakeDataLession[level]) {
                filteredLessons[level] = ListQuestionFakeDataLession[level];
            }
        }
        return filteredLessons;
    }, [userProgress.startingLevel]);

    // Function to determine the status of a lesson
    const getLessonStatus = (jlptLevel, topic, lessonType, lessonIndex) => {
        const completedLevels = userProgress.completedLevels[jlptLevel]?.[topic] || [];
        const isUnlocked = userProgress.unlockedTopics[jlptLevel]?.includes(topic);

        if (completedLevels.includes(lessonType)) {
            return 'completed';
        }

        if (!isUnlocked) return 'locked';

        if (lessonType === 'theory') {
            return completedLevels.length > 0 ? 'completed' : 'current';
        }

        const levelMatch = lessonType.match(/level(\d+)/);
        if (!levelMatch) return 'locked';

        const levelNumber = parseInt(levelMatch[1], 10);
        if (levelNumber === 1) {
            return completedLevels.includes(`level${levelNumber}`) ? 'completed' : 'current';
        }

        if (completedLevels.includes(`level${levelNumber - 1}`)) {
            return 'current';
        }

        return 'locked';
    };

    const handleStartLesson = (jlptLevel, topic, lessonType) => {
        const lessonData = allLessons[jlptLevel]?.[topic]?.[lessonType];
        if (!lessonData) return;

        dispatch(setLessonQuestions({ questions: lessonData }));
        dispatch(updateDailyProgress()); // Update daily progress when a lesson starts
        navigate(`/lession?level=${jlptLevel}&topic=${topic}&type=${lessonType}`);
    };

    const getLessonName = (lessonType) => {
        if (lessonType === 'theory') return translations.learn.lessons.theory;
        const levelMatch = lessonType.match(/level(\d+)/);
        if (levelMatch) {
            return translations.learn.lessons.level.replace('{{level}}', levelMatch[1]);
        }
        return lessonType;
    };

    return (
        <div className="learning-path-container">
            {Object.keys(allLessons).map(jlptLevel => (
                <section key={jlptLevel} className="jlpt-level-section">
                    <h2 className="jlpt-level-title">{jlptLevel}</h2>
                    {Object.keys(allLessons[jlptLevel]).map(topic => (
                        <div key={topic} className="topic-unit">
                            <h3 className="topic-title">{formatTopicName(topic)}</h3>
                            <div className="lesson-nodes-container">
                                {Object.keys(allLessons[jlptLevel][topic]).map((lessonType, index) => {
                                    if (lessonType === 'metadata') return null; // Skip metadata
                                    const status = getLessonStatus(jlptLevel, topic, lessonType, index);
                                    const isLocked = status === 'locked';

                                    return (
                                        <div key={lessonType} className={`lesson-node ${status}`}>
                                            <button
                                                className="lesson-button"
                                                onClick={() => !isLocked && handleStartLesson(jlptLevel, topic, lessonType)}
                                                disabled={isLocked}
                                            >
                                                {isLocked ? <Lock size={24} /> : (lessonType === 'theory' ? <BookOpenCheck size={24} /> : <Star size={24} />)}
                                            </button>
                                            <div className="lesson-tooltip">
                                                <p className="tooltip-title">{formatTopicName(topic)}</p>
                                                <p className="tooltip-level">{getLessonName(lessonType)}</p>
                                                {!isLocked && (
                                                    <button
                                                        className="start-lesson-button"
                                                        onClick={() => handleStartLesson(jlptLevel, topic, lessonType)}
                                                    >
                                                        {translations.learn.lessons.startLearning}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}