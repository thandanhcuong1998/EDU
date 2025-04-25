# Lesson Structure Documentation

## Overview

This document describes the enhanced lesson data structure implemented in the Japanese language learning application. The structure is designed to support multiple JLPT levels, topics, and lesson types, providing a comprehensive framework for organizing educational content.

## Data Structure

The lesson data is organized in a hierarchical structure:

```
ListQuestionFakeDataLession
├── N5 (JLPT Level)
│   ├── orderFood (Topic)
│   │   └── level1 (Lesson Type/Level)
│   │       └── [Array of question objects]
│   └── greeting (Topic)
│       ├── theory (Lesson Type)
│       │   ├── title
│       │   ├── content
│       │   ├── vocabulary
│       │   └── grammar
│       ├── level1 (Lesson Type/Level)
│       │   └── [Array of question objects]
│       └── level2 (Lesson Type/Level)
│           └── [Array of question objects]
└── N4 (JLPT Level)
    └── time (Topic)
        ├── theory (Lesson Type)
        │   ├── title
        │   ├── content
        │   ├── vocabulary
        │   └── grammar
        └── level1 (Lesson Type/Level)
            └── [Array of question objects]
```

### JLPT Levels

The top level of the structure represents JLPT proficiency levels:
- **N5**: Beginner level
- **N4**: Elementary level
- **N3**: Intermediate level
- **N2**: Upper intermediate level
- **N1**: Advanced level

### Topics

Each JLPT level contains multiple topics, such as:
- **greeting**: Greetings & Basic Communication
- **orderFood**: Food & Dining
- **time**: Time & Schedule
- (Additional topics as per the comprehensive plan)

### Lesson Types

Each topic contains different types of lessons:
- **theory**: Explanatory content with vocabulary and grammar
- **level1**, **level2**, etc.: Practice exercises with increasing difficulty
- **test**: Assessment questions
- **review**: Review exercises

## Content Types

### Theory Lessons

Theory lessons have the following structure:
```javascript
theory: {
    title: "Lesson title",
    content: [
        "Paragraph 1",
        "Paragraph 2",
        // ...
    ],
    vocabulary: [
        { 
            japanese: "日本語",
            romaji: "nihongo", 
            vietnamese: "Tiếng Nhật", 
            usage: "Usage notes" 
        },
        // ...
    ],
    grammar: [
        { 
            pattern: "Pattern", 
            explanation: "Explanation", 
            examples: ["Example 1", "Example 2"] 
        },
        // ...
    ]
}
```

### Practice Lessons

Practice lessons contain an array of question objects with different types:
- **radio**: Multiple choice questions
- **card-word-english**: Arrange words to form English sentences
- **card-word-japan**: Arrange characters to form Japanese words
- **mapping-word**: Match pairs of related words

Each question type has its own specific structure as shown in the existing implementation.

## URL Parameters for Dynamic Lesson Loading

The application now supports dynamic lesson loading based on URL parameters:

- **level**: JLPT level (e.g., "N5", "N4")
- **topic**: Topic name (e.g., "greeting", "orderFood")
- **type**: Lesson type (e.g., "theory", "level1")

Example URL: `/lesson?level=N5&topic=greeting&type=theory`

If any parameter is missing or invalid, the application will fall back to the default lesson (N5.orderFood.level1).

## Implementation Details

The lesson component now:
1. Extracts parameters from the URL
2. Loads the appropriate lesson content based on these parameters
3. Renders different UI components based on the lesson type:
   - For theory lessons: Displays title, content, vocabulary, and grammar
   - For practice lessons: Displays interactive question components

## Future Enhancements

Planned enhancements to the lesson structure include:
1. Adding more JLPT levels (N3, N2, N1)
2. Expanding topics to cover all 10 planned areas
3. Adding test and review lesson types
4. Implementing user progress tracking per lesson
5. Adding more interactive question types

## Example Usage

To create a new topic:
1. Add a new entry to the appropriate JLPT level in ListQuestionFakeDataLession.jsx
2. Create theory content with title, paragraphs, vocabulary, and grammar
3. Create practice levels with appropriate question types
4. Access the new content via URL parameters

## Conclusion

This enhanced lesson structure provides a solid foundation for organizing Japanese language learning content in a structured, scalable way. It supports both theoretical explanations and practical exercises, allowing for a comprehensive learning experience.