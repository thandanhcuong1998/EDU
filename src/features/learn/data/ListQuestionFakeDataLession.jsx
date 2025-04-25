const ListQuestionFakeDataLession = {
    N5: {
        basicGreetings: {
            metadata: {
                title: "Basic Greetings",
                description: "Learn essential Japanese greetings for everyday conversations",
                totalLessons: 3,
                estimatedTimeMinutes: 20,
                icon: "👋"
            },
            level1: [
                {
                    id: "n5-greet-l1-q1",
                    type: "radio",
                    title: "Which one means 'Good morning' in Japanese?",
                    options: ["こんにちは", "おはようございます", "こんばんは", "さようなら"],
                    images: [
                        "https://d2pur3iezf4d1j.cloudfront.net/images/greeting-day.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/greeting-morning.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/greeting-evening.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/greeting-goodbye.jpg",
                    ],
                    pronunciation: ["kon ni chi wa", "o ha yo u go za i ma su", "kon ban wa", "sa yo u na ra"],
                    correctAnswer: 2,
                    explanation: "おはようございます (Ohayou gozaimasu) is the formal way to say 'Good morning' in Japanese."
                },
                {
                    id: "n5-greet-l1-q2",
                    type: "fill-in-blank",
                    title: "Complete the greeting",
                    sentence: ["おはよう", "。"],
                    blankIndex: 0,
                    options: ["ございます", "です", "さん", "せんせい"],
                    pronunciation: ["go za i ma su", "de su", "sa n", "sen se i"],
                    correctAnswer: 1,
                    explanation: "おはようございます is the complete formal greeting for 'Good morning'."
                },
                {
                    id: "n5-greet-l1-q3",
                    type: "card-word-english",
                    title: "Arrange the English words to match the Japanese phrase",
                    options: ["morning", "good", "is", "it"],
                    hintToken: [
                        { text: "おはよう", pronunciation: "o ha yo u" },
                        { text: "ございます", pronunciation: "go za i ma su" }
                    ],
                    correctAnswer: [2, 1],
                    explanation: "おはよう ございます translates to 'Good morning' in English."
                },
                {
                    id: "n5-greet-l1-q4",
                    type: "fill-in-blank",
                    title: "Complete the evening greeting",
                    sentence: ["", "は。"],
                    blankIndex: 0,
                    options: ["こんにち", "こんばん", "おはよう", "さよう"],
                    pronunciation: ["kon ni chi", "kon ban", "o ha yo u", "sa yo u"],
                    correctAnswer: 2,
                    explanation: "こんばんは (Konbanwa) means 'Good evening' in Japanese."
                }
            ]
        },
        orderFood: {
            metadata: {
                title: "Food and Dining",
                description: "Learn how to order food and recognize common food items in Japanese",
                totalLessons: 3,
                estimatedTimeMinutes: 25,
                icon: "🍱"
            },
            level1: [
                {
                    id: "n5-food-l1-q1",
                    type: "radio",
                    title: "Which one of these is 'sushi'?",
                    options: ["みず", "すし", "ごはん", "おちゃ"],
                    images: [
                        "https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/d5ba4341af6256e34afff83dbfe65fd1",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/8bfd8aa1eee085e4972123b2a78dd503",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703",
                    ],
                    pronunciation: ["mi zu", "su shi", "go ha n", "o cha"],
                    correctAnswer: 2,
                    explanation: "すし (sushi) is a traditional Japanese dish of prepared vinegared rice with various toppings."
                },
                {
                    id: "n5-food-l1-q2",
                    type: "card-word-english",
                    title: "Write this in English",
                    options: ["water", "please", "Sushi"],
                    hintToken: [
                        { text: "すし", pronunciation: "su shi" },
                        { text: "、", pronunciation: "" },
                        { text: "ください", pronunciation: "ku da sa i" },
                        { text: "。", pronunciation: "" },
                    ],
                    correctAnswer: [3, 2],
                    explanation: "すし、ください。 means 'Sushi, please.' in English."
                },
                {
                    id: "n5-food-l1-q3",
                    type: "card-word-japan",
                    title: "Say it in Japanese",
                    options: [
                        { text: "み", pronunciation: "mi" },
                        { text: "ず", pronunciation: "zu" },
                        { text: "し", pronunciation: "shi" },
                    ],
                    hintToken: "Water",
                    correctAnswer: [1, 2],
                    explanation: "みず (mizu) means 'water' in Japanese."
                },
                {
                    id: "n5-food-l1-q4",
                    type: "fill-in-blank",
                    title: "Complete the sentence to order tea",
                    sentence: ["", "をください。"],
                    blankIndex: 0,
                    options: ["おちゃ", "すし", "みず", "ごはん"],
                    pronunciation: ["o cha", "su shi", "mi zu", "go ha n"],
                    correctAnswer: 1,
                    explanation: "おちゃをください means 'Please give me tea' in Japanese."
                },
                {
                    id: "n5-food-l1-q5",
                    type: "mapping-word",
                    title: "Select the matching pairs",
                    options2: [
                        { text: "please" },
                        { text: "rice" },
                        { text: "sushi" },
                        { text: "green tea" },
                        { text: "water" },
                    ],
                    options1: [
                        {
                            text: "おちゃ",
                            pronunciation: "o cha",
                            indexCorrect: 4
                        },
                        {
                            text: "ください",
                            pronunciation: "ku da sa i",
                            indexCorrect: 1
                        },
                        {
                            text: "すし",
                            pronunciation: "sushi",
                            indexCorrect: 3
                        },
                        {
                            text: "ごはん",
                            pronunciation: "go ha n",
                            indexCorrect: 2
                        },
                        {
                            text: "みず",
                            pronunciation: "mi zu",
                            indexCorrect: 5
                        }
                    ]
                }
            ]
        },
        numbers: {
            metadata: {
                title: "Numbers and Counting",
                description: "Learn Japanese numbers and counting system",
                totalLessons: 3,
                estimatedTimeMinutes: 30,
                icon: "🔢"
            },
            level1: [
                {
                    id: "n5-num-l1-q1",
                    type: "radio",
                    title: "Which one is the number 'three' in Japanese?",
                    options: ["いち", "に", "さん", "よん"],
                    images: [
                        "https://d2pur3iezf4d1j.cloudfront.net/images/number-1.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/number-2.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/number-3.jpg",
                        "https://d2pur3iezf4d1j.cloudfront.net/images/number-4.jpg",
                    ],
                    pronunciation: ["i chi", "ni", "sa n", "yo n"],
                    correctAnswer: 3,
                    explanation: "さん (san) is the Japanese word for the number 'three'."
                },
                {
                    id: "n5-num-l1-q2",
                    type: "fill-in-blank",
                    title: "Complete the number sequence",
                    sentence: ["いち、に、", "、よん、ご"],
                    blankIndex: 1,
                    options: ["ろく", "さん", "なな", "はち"],
                    pronunciation: ["ro ku", "sa n", "na na", "ha chi"],
                    correctAnswer: 2,
                    explanation: "The correct sequence is: いち (1), に (2), さん (3), よん (4), ご (5)"
                }
            ]
        }
    }
};

export default ListQuestionFakeDataLession;