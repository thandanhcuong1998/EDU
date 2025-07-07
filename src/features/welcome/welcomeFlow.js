
export const WELCOME_FLOW = [
    {
        id: 'one',
        path: '', // The root /welcome path
        next: 'two',
    },
    {
        id: 'two',
        path: 'step=two',
        next: 'proficiency',
        previous: 'one',
    },
    {
        id: 'proficiency',
        path: 'step=proficiency',
        next: 'dailyGoal',
        previous: 'two',
        isQuestion: true, // Mark this as a question step
    },
    {
        id: 'dailyGoal',
        path: 'step=dailyGoal',
        next: null, // This is the last step
        previous: 'proficiency',
        isQuestion: true, // Mark this as a question step
    },
    // To add a new step after 'dailyGoal', you would just add it here.
    // For example:
    // {
    //     id: 'newQuestion',
    //     path: 'step=newQuestion',
    //     next: null,
    //     previous: 'dailyGoal',
    //     isQuestion: true,
    // },
    // And update the 'next' property of 'dailyGoal' to 'newQuestion'.
];

export const getStepConfig = (stepId) => {
    if (!stepId) {
        return WELCOME_FLOW.find(step => step.id === 'one');
    }
    return WELCOME_FLOW.find(step => step.id === stepId);
};

