import { achievementsData } from '../data/achievementsData.jsx';
import store from '@/app/store';
import { unlockAchievement } from '@/features/user-profile/state/UserProgressReducer.jsx';
import toastService from '@/shared/services/toastService';

const checkAchievements = () => {
    const state = store.getState();
    const userProgress = state.userProgress;

    Object.values(achievementsData).forEach(achievement => {
        if (!userProgress.unlockedAchievements.includes(achievement.id)) {
            if (achievement.trigger(userProgress)) {
                store.dispatch(unlockAchievement(achievement.id));
                toastService.success(`Thành tích mới: ${achievement.name}!`);
            }
        }
    });
};

const achievementService = {
    checkAchievements,
};

export default achievementService;
