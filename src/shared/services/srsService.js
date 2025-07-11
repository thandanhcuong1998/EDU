/**
 * Spaced Repetition System (SRS) Service
 * Implements a simplified SM-2 algorithm for scheduling reviews.
 */

const getNextReviewDate = (interval) => {
    const now = new Date();
    now.setDate(now.getDate() + interval);
    return now.toISOString();
};

export const calculateSrsItem = (item, isCorrect) => {
    let { interval, repetition, easeFactor } = item || {
        interval: 0,
        repetition: 0,
        easeFactor: 2.5,
    };

    if (isCorrect) {
        if (repetition === 0) {
            interval = 1;
        } else if (repetition === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetition += 1;
    } else {
        repetition = 0;
        interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - 2) * (0.08 + (5 - 2) * 0.02));
    if (easeFactor < 1.3) {
        easeFactor = 1.3;
    }

    return {
        ...item,
        interval,
        repetition,
        easeFactor,
        nextReviewDate: getNextReviewDate(interval),
    };
};

const srsService = {
    calculateSrsItem,
};

export default srsService;
