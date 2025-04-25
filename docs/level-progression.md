# Level Progression Implementation

This document describes the implementation of level progression in the Japanese language learning application. The implementation allows users to progress through different levels of lessons, with each level building on the previous one and including review questions.

## Overview

The level progression system follows these principles:
1. Users progress through levels in a structured way (level1 → level2 → etc.)
2. When a user completes a level, they automatically advance to the next level
3. Higher levels include review questions from previous levels to reinforce learning
4. If a user completes all levels in a topic, they move to the next topic
5. If a user completes all topics in a JLPT level, they move to the next JLPT level

## Components Modified

### 1. Redux Reducer (LessionQuestionChoiceReducer.jsx)

Added a `resetState` action to reset the state when transitioning between levels:

```javascript
resetState(state, action) {
   // Reset state for a new lesson
   return {
      ...initialState,
      questions: action.payload?.questions || initialState.questions,
   };
}
```

### 2. Lesson Hook (useLessionHook.js)

Added level progression logic:

#### a. Getting URL Parameters

```javascript
const [searchParams] = useSearchParams();
   
// Get current lesson parameters from URL
const jlptLevel = searchParams.get('level') || 'N5';
const topic = searchParams.get('topic') || 'orderFood';
const lessonType = searchParams.get('type') || 'level1';
```

#### b. Determining the Next Level

```javascript
const getNextLevel = () => {
   // Parse the current level number if it's a level type
   const currentLevelMatch = lessonType.match(/level(\d+)/);
   
   // If not a level type (e.g., it's a theory lesson), default to level1
   if (!currentLevelMatch) {
      // If it's a theory lesson, move to level1 of the same topic
      if (lessonType === 'theory') {
         return { level: jlptLevel, topic, type: 'level1' };
      }
      return { level: jlptLevel, topic, type: 'level1' };
   }
   
   const currentLevelNum = parseInt(currentLevelMatch[1]);
   const nextLevelNum = currentLevelNum + 1;
   const nextLevelType = `level${nextLevelNum}`;
   
   // Check if next level exists for this topic
   if (
      ListQuestionFakeDataLession[jlptLevel] &&
      ListQuestionFakeDataLession[jlptLevel][topic] &&
      ListQuestionFakeDataLession[jlptLevel][topic][nextLevelType]
   ) {
      // Next level exists, return it
      return { level: jlptLevel, topic, type: nextLevelType };
   }
   
   // If no next level for this topic, check if there are more topics in this JLPT level
   if (ListQuestionFakeDataLession[jlptLevel]) {
      const topics = Object.keys(ListQuestionFakeDataLession[jlptLevel]);
      const currentTopicIndex = topics.indexOf(topic);
      
      if (currentTopicIndex < topics.length - 1) {
         // Move to the first level of the next topic
         const nextTopic = topics[currentTopicIndex + 1];
         // Check if the next topic has a theory lesson first
         if (ListQuestionFakeDataLession[jlptLevel][nextTopic].theory) {
            return { level: jlptLevel, topic: nextTopic, type: 'theory' };
         }
         // Otherwise go to level1
         return { level: jlptLevel, topic: nextTopic, type: 'level1' };
      }
   }
   
   // If no more topics in this JLPT level, check if there's a next JLPT level
   const jlptLevels = Object.keys(ListQuestionFakeDataLession);
   const currentLevelIndex = jlptLevels.indexOf(jlptLevel);
   
   if (currentLevelIndex < jlptLevels.length - 1) {
      // Move to the first topic and level of the next JLPT level
      const nextJlptLevel = jlptLevels[currentLevelIndex + 1];
      if (ListQuestionFakeDataLession[nextJlptLevel]) {
         const nextTopics = Object.keys(ListQuestionFakeDataLession[nextJlptLevel]);
         if (nextTopics.length > 0) {
            // Check if the first topic has a theory lesson
            if (ListQuestionFakeDataLession[nextJlptLevel][nextTopics[0]].theory) {
               return { level: nextJlptLevel, topic: nextTopics[0], type: 'theory' };
            }
            // Otherwise go to level1
            return { level: nextJlptLevel, topic: nextTopics[0], type: 'level1' };
         }
      }
   }
   
   // If no next level exists at all, return null
   return null;
};
```

#### c. Creating Combined Questions with Review

```javascript
const createCombinedQuestions = (nextLevelInfo) => {
   if (!nextLevelInfo) return [];
   
   const { level, topic, type } = nextLevelInfo;
   
   // If it's a theory lesson, just return the theory content
   if (type === 'theory') {
      return ListQuestionFakeDataLession[level][topic][type];
   }
   
   // Get questions for the next level
   const nextLevelQuestions = ListQuestionFakeDataLession[level][topic][type];
   
   // If this is level1, no need for review questions
   if (type === 'level1') {
      return nextLevelQuestions;
   }
   
   // Get review questions from previous level
   const currentLevelMatch = type.match(/level(\d+)/);
   if (!currentLevelMatch) return nextLevelQuestions;
   
   const currentLevelNum = parseInt(currentLevelMatch[1]);
   const prevLevelType = `level${currentLevelNum - 1}`;
   
   // Check if previous level exists
   if (
      ListQuestionFakeDataLession[level] &&
      ListQuestionFakeDataLession[level][topic] &&
      ListQuestionFakeDataLession[level][topic][prevLevelType]
   ) {
      const prevLevelQuestions = ListQuestionFakeDataLession[level][topic][prevLevelType];
      
      // Select a subset of review questions (e.g., 30% of previous level)
      const reviewCount = Math.max(1, Math.floor(prevLevelQuestions.length * 0.3));
      const reviewQuestions = [];
      
      // Randomly select review questions
      const indices = new Set();
      while (indices.size < reviewCount && indices.size < prevLevelQuestions.length) {
         const randomIndex = Math.floor(Math.random() * prevLevelQuestions.length);
         if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            // Create a copy of the question to avoid reference issues
            const questionCopy = JSON.parse(JSON.stringify(prevLevelQuestions[randomIndex]));
            // Add a flag to indicate this is a review question
            questionCopy.isReview = true;
            reviewQuestions.push(questionCopy);
         }
      }
      
      // Combine new questions with review questions
      return [...nextLevelQuestions, ...reviewQuestions];
   }
   
   return nextLevelQuestions;
};
```

#### d. Handling Level Completion

```javascript
const handleButtonClick = () => {
   if (isCorrect === null) {
      checkAnswer();
   } else if (progressBar === 100) {
      // Level completed, determine next level
      const nextLevelInfo = getNextLevel();
      
      if (nextLevelInfo) {
         // Navigate to the next level
         const { level, topic, type } = nextLevelInfo;
         
         // Create combined questions with review
         const combinedQuestions = createCombinedQuestions(nextLevelInfo);
         
         // Update Redux store with the new questions
         dispatch(resetState({ questions: combinedQuestions }));
         
         // Navigate to the next level
         navigation(`/lession?level=${level}&topic=${topic}&type=${type}`);
      } else {
         // If no next level, go back to learn page
         navigation('/learn');
      }
   } else {
      changeScreenQuestion();
   }
};
```

### 3. Learn Page (MainLearn.jsx)

Updated to dynamically display available topics and lessons:

#### a. State Management

```javascript
const [selectedJlptLevel, setSelectedJlptLevel] = useState('N5');
const [selectedTopic, setSelectedTopic] = useState('');
const [availableTopics, setAvailableTopics] = useState([]);
const [topicLessons, setTopicLessons] = useState([]);
const [clickedLessonIndex, setClickedLessonIndex] = useState(null);
```

#### b. Dynamic Topic and Lesson Loading

```javascript
// Initialize available topics and select the first one
useEffect(() => {
    if (ListQuestionFakeDataLession[selectedJlptLevel]) {
        const topics = Object.keys(ListQuestionFakeDataLession[selectedJlptLevel]);
        setAvailableTopics(topics);
        
        if (topics.length > 0 && !selectedTopic) {
            setSelectedTopic(topics[0]);
        }
    }
}, [selectedJlptLevel]);

// Update available lessons when topic changes
useEffect(() => {
    if (selectedJlptLevel && selectedTopic && 
        ListQuestionFakeDataLession[selectedJlptLevel] && 
        ListQuestionFakeDataLession[selectedJlptLevel][selectedTopic]) {
        
        const lessonTypes = Object.keys(ListQuestionFakeDataLession[selectedJlptLevel][selectedTopic]);
        
        // Sort lesson types: theory first, then levels in order
        const sortedLessonTypes = lessonTypes.sort((a, b) => {
            if (a === 'theory') return -1;
            if (b === 'theory') return 1;
            
            const levelA = a.match(/level(\d+)/);
            const levelB = b.match(/level(\d+)/);
            
            if (levelA && levelB) {
                return parseInt(levelA[1]) - parseInt(levelB[1]);
            }
            
            return a.localeCompare(b);
        });
        
        setTopicLessons(sortedLessonTypes);
    } else {
        setTopicLessons([]);
    }
}, [selectedJlptLevel, selectedTopic]);
```

#### c. Dynamic Lesson Display

```javascript
<ul className="step-course">
    {topicLessons.map((lessonType, index) => (
        <li
            key={lessonType}
            className={`course position-relative ${getPositionClass(index, topicLessons.length)} ${clickedLessonIndex === index ? 'click' : ''}`}
            onClick={() => onHandleClickCourse(index)}
        >
            <Star 
                size={42} 
                color={index === 0 || clickedLessonIndex === index ? undefined : "rgb(77, 89, 97)"} 
            />
            <div className="tooltiptext">
                <p>{formatTopicName(selectedTopic)}</p>
                <p>{getLessonName(lessonType)}</p>
                <button onClick={() => onHandleStartLession(lessonType)}>
                    Bắt đầu học
                </button>
            </div>
        </li>
    ))}
</ul>
```

## User Experience

1. Users start with theory lessons or level1 of a topic
2. After completing a level, they automatically progress to the next level
3. Higher levels include review questions from previous levels
4. Users can also manually select different topics and levels from the learn page
5. The button text changes to "Next Level" when a level is completed

## Future Enhancements

1. Add user progress tracking to remember completed levels
2. Implement a visual indicator for completed levels
3. Add difficulty progression in review questions
4. Implement adaptive learning based on user performance