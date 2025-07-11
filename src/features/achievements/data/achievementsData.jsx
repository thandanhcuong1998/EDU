import { Award, BookOpen, Trophy, Star } from 'lucide-react';

export const achievementsData = {
    XP_500: {
        id: 'xp500',
        name: 'Người học chăm chỉ',
        description: 'Đạt 500 XP',
        icon: <Trophy size={24} />,
        trigger: (progress) => progress.experience >= 500,
    },
    XP_1000: {
        id: 'xp1000',
        name: 'Chuyên gia XP',
        description: 'Đạt 1000 XP',
        icon: <Award size={24} />,
        trigger: (progress) => progress.experience >= 1000,
    },
    LESSONS_5: {
        id: 'lessons5',
        name: 'Người hoàn thành bài học',
        description: 'Hoàn thành 5 bài học',
        icon: <BookOpen size={24} />,
        trigger: (progress) => {
            const totalCompleted = Object.values(progress.completedLevels).reduce((acc, level) => {
                return acc + Object.values(level).reduce((topicAcc, lessons) => topicAcc + lessons.length, 0);
            }, 0);
            return totalCompleted >= 5;
        },
    },
    // Add more achievements here
};
