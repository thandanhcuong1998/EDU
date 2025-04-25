/**
 * Comprehensive lesson data structure for Japanese language learning
 * Organized by JLPT levels, topics, and lesson types
 */
const ListQuestionFakeDataLession = {
   // N5 Level (Beginner)
   N5: {
      // Existing topic - kept for backward compatibility
      orderFood: {
         level1: [
            {
               type: 'radio',
               title: 'Which one of these is “sushi”?\n',
               options: ['みず', 'すし', 'ごはん', 'おちゃ'],
               images: [
                  'https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be',
                  'https://d2pur3iezf4d1j.cloudfront.net/images/d5ba4341af6256e34afff83dbfe65fd1',
                  'https://d2pur3iezf4d1j.cloudfront.net/images/8bfd8aa1eee085e4972123b2a78dd503',
                  'https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703',
               ],
               pronunciation: ['mi zu', 'su shi', 'go ha n', 'o cha'],
               correctAnswer: 2,
            },
            {
               type: 'card-word-english',
               title: 'Write this in English',
               options: ['water', 'please', 'Sushi'],
               hintToken: [
                  { text: 'すし', pronunciation: 'su shi' },
                  { text: '、', pronunciation: '' },
                  { text: 'ください', pronunciation: 'ku da sa i' },
                  { text: '。', pronunciation: '' },
               ],
               correctAnswer: [3, 2],
            },
            {
               type: 'card-word-japan',
               title: 'Say it in Japanese\n',
               options: [
                  { text: 'み', pronunciation: 'mi' },
                  { text: 'ず', pronunciation: 'zu' },
                  {
                     text: 'し',
                     pronunciation: 'shi',
                  },
               ],
               hintToken: 'Water',
               correctAnswer: [1, 2],
            },
            {
               type: 'mapping-word',
               title: 'Select the matching pairs\n',
               options2: [
                  { text: 'please' },
                  { text: 'rice' },
                  { text: 'sushi' },
                  { text: 'green tea' },
                  { text: 'water' },
               ],
               options1: [
                  {
                     text: 'おちゃ',
                     pronunciation: 'o cha',
                     indexCorrect: 4,
                  },
                  {
                     text: 'ください',
                     pronunciation: 'ku da sa i',
                     indexCorrect: 1,
                  },
                  {
                     text: 'すし',
                     pronunciation: 'sushi',
                     indexCorrect: 3,
                  },
                  {
                     text: 'ごはん',
                     pronunciation: 'go ha n',
                     indexCorrect: 2,
                  },
                  {
                     text: 'みず',
                     pronunciation: 'mi zu',
                     indexCorrect: 5,
                  },
               ],
            },
         ],
      },

      // New topic: Greetings & Basic Communication
      greeting: {
         // Theory section with vocabulary and grammar explanations
         theory: {
            title: 'Chào hỏi cơ bản',
            content: [
               'Trong tiếng Nhật, lời chào thay đổi theo thời điểm trong ngày và mức độ trang trọng.',
               'Các lời chào cơ bản bao gồm: おはよう (Ohayou - Chào buổi sáng), こんにちは (Konnichiwa - Chào buổi chiều), こんばんは (Konbanwa - Chào buổi tối), さようなら (Sayounara - Tạm biệt).',
            ],
            vocabulary: [
               {
                  japanese: 'おはよう',
                  romaji: 'ohayou',
                  vietnamese: 'Chào buổi sáng',
                  usage: 'Không trang trọng, dùng với người thân quen',
               },
               {
                  japanese: 'おはようございます',
                  romaji: 'ohayou gozaimasu',
                  vietnamese: 'Chào buổi sáng',
                  usage: 'Trang trọng, dùng với người lạ hoặc cấp trên',
               },
               {
                  japanese: 'こんにちは',
                  romaji: 'konnichiwa',
                  vietnamese: 'Chào buổi chiều',
                  usage: 'Dùng từ khoảng 10h sáng đến chiều tối',
               },
               {
                  japanese: 'こんばんは',
                  romaji: 'konbanwa',
                  vietnamese: 'Chào buổi tối',
                  usage: 'Dùng từ chiều tối đến đêm',
               },
               {
                  japanese: 'さようなら',
                  romaji: 'sayounara',
                  vietnamese: 'Tạm biệt',
                  usage: 'Dùng khi chia tay trong thời gian dài',
               },
               {
                  japanese: 'じゃあね',
                  romaji: 'jaa ne',
                  vietnamese: 'Hẹn gặp lại',
                  usage: 'Không trang trọng, dùng với bạn bè',
               },
            ],
            grammar: [
               {
                  pattern: 'A + です',
                  explanation: 'A là...',
                  examples: [
                     'わたしは学生です (Watashi wa gakusei desu) - Tôi là học sinh',
                  ],
               },
               {
                  pattern: 'はじめまして',
                  explanation: 'Rất vui được gặp bạn (lần đầu)',
                  examples: [
                     'はじめまして、たなかです (Hajimemashite, Tanaka desu) - Rất vui được gặp bạn, tôi là Tanaka',
                  ],
               },
            ],
         },

         // Practice levels with increasing difficulty
         level1: [
            {
               type: 'radio',
               title: 'Chọn cách nói "Chào buổi sáng" trong tiếng Nhật',
               options: ['こんにちは', 'おはよう', 'こんばんは', 'さようなら'],
               pronunciation: [
                  'kon ni chi wa',
                  'o ha yo u',
                  'kon ban wa',
                  'sa yo u na ra',
               ],
               correctAnswer: 2,
            },
            {
               type: 'card-word-japan',
               title: 'Sắp xếp các ký tự để tạo từ "Konnichiwa"',
               options: [
                  { text: 'こ', pronunciation: 'ko' },
                  { text: 'ん', pronunciation: 'n' },
                  { text: 'に', pronunciation: 'ni' },
                  { text: 'ち', pronunciation: 'chi' },
                  { text: 'は', pronunciation: 'wa' },
               ],
               hintToken: 'Chào buổi chiều',
               correctAnswer: [1, 2, 3, 4, 5],
            },
            {
               type: 'mapping-word',
               title: 'Ghép các lời chào với thời điểm thích hợp',
               options2: [
                  { text: 'Buổi sáng' },
                  { text: 'Buổi chiều' },
                  { text: 'Buổi tối' },
                  { text: 'Khi chia tay' },
               ],
               options1: [
                  {
                     text: 'おはよう',
                     pronunciation: 'o ha yo u',
                     indexCorrect: 1,
                  },
                  {
                     text: 'こんにちは',
                     pronunciation: 'kon ni chi wa',
                     indexCorrect: 2,
                  },
                  {
                     text: 'こんばんは',
                     pronunciation: 'kon ban wa',
                     indexCorrect: 3,
                  },
                  {
                     text: 'さようなら',
                     pronunciation: 'sa yo u na ra',
                     indexCorrect: 4,
                  },
               ],
            },
         ],

         level2: [
            {
               type: 'radio',
               title: 'Chọn cách chào trang trọng vào buổi sáng',
               options: [
                  'おはよう',
                  'おはようございます',
                  'こんにちは',
                  'こんばんは',
               ],
               pronunciation: [
                  'o ha yo u',
                  'o ha yo u go za i ma su',
                  'kon ni chi wa',
                  'kon ban wa',
               ],
               correctAnswer: 2,
            },
            {
               type: 'card-word-english',
               title: 'Dịch sang tiếng Việt',
               options: ['Chào buổi sáng', 'Chào buổi chiều', 'Tạm biệt'],
               hintToken: [
                  { text: 'さようなら', pronunciation: 'sa yo u na ra' },
               ],
               correctAnswer: 3,
            },
            {
               type: 'mapping-word',
               title: 'Ghép các lời chào với mức độ trang trọng',
               options2: [
                  { text: 'Thân mật' },
                  { text: 'Trang trọng 1' },
                  { text: 'Trang trọng 2' },
                  { text: 'Trang trọng 3' },
               ],
               options1: [
                  {
                     text: 'おはよう',
                     pronunciation: 'o ha yo u',
                     indexCorrect: 1,
                  },
                  {
                     text: 'おはようございます',
                     pronunciation: 'o ha yo u go za i ma su',
                     indexCorrect: 2,
                  },
                  {
                     text: 'じゃあね',
                     pronunciation: 'ja a ne',
                     indexCorrect: 3,
                  },
                  {
                     text: 'さようなら',
                     pronunciation: 'sa yo u na ra',
                     indexCorrect: 4,
                  },
               ],
            },
         ],
      },
   },

   // N4 Level (Elementary)
   N4: {
      // Time & Schedule topic
      time: {
         theory: {
            title: 'Thời gian và lịch biểu',
            content: [
               "Trong tiếng Nhật, cách diễn đạt thời gian có một số quy tắc đặc biệt. Ví dụ, khi đọc giờ, ta dùng 'ji' cho giờ và 'fun' hoặc 'pun' cho phút.",
               'Các từ chỉ thời gian như hôm nay, ngày mai, tuần này, tháng sau cũng rất quan trọng trong giao tiếp hàng ngày.',
            ],
            vocabulary: [
               {
                  japanese: 'いま',
                  romaji: 'ima',
                  vietnamese: 'Bây giờ',
                  usage: 'Chỉ thời điểm hiện tại',
               },
               {
                  japanese: 'きょう',
                  romaji: 'kyou',
                  vietnamese: 'Hôm nay',
                  usage: 'Chỉ ngày hiện tại',
               },
               {
                  japanese: 'あした',
                  romaji: 'ashita',
                  vietnamese: 'Ngày mai',
                  usage: 'Chỉ ngày kế tiếp',
               },
               {
                  japanese: 'きのう',
                  romaji: 'kinou',
                  vietnamese: 'Hôm qua',
                  usage: 'Chỉ ngày trước đó',
               },
            ],
            grammar: [
               {
                  pattern: '〜時〜分',
                  explanation: '~ giờ ~ phút',
                  examples: ['3時15分 (san-ji juu-go-fun) - 3 giờ 15 phút'],
               },
               {
                  pattern: '〜から〜まで',
                  explanation: 'Từ ~ đến ~',
                  examples: [
                     '9時から5時まで (ku-ji kara go-ji made) - Từ 9 giờ đến 5 giờ',
                  ],
               },
            ],
         },

         level1: [
            {
               type: 'radio',
               title: 'Chọn từ có nghĩa là "ngày mai"',
               options: ['きょう', 'あした', 'きのう', 'いま'],
               pronunciation: ['kyo u', 'a shi ta', 'ki no u', 'i ma'],
               correctAnswer: 2,
            },
            {
               type: 'card-word-japan',
               title: 'Viết "Hôm nay" bằng tiếng Nhật',
               options: [
                  { text: 'き', pronunciation: 'ki' },
                  { text: 'ょ', pronunciation: 'yo' },
                  { text: 'う', pronunciation: 'u' },
               ],
               hintToken: 'Ngày hiện tại',
               correctAnswer: [1, 2, 3],
            },
            {
               type: 'mapping-word',
               title: 'Ghép các từ chỉ thời gian với nghĩa tiếng Việt',
               options2: [
                  { text: 'Bây giờ' },
                  { text: 'Hôm nay' },
                  { text: 'Ngày mai' },
                  { text: 'Hôm qua' },
               ],
               options1: [
                  {
                     text: 'いま',
                     pronunciation: 'i ma',
                     indexCorrect: 1,
                  },
                  {
                     text: 'きょう',
                     pronunciation: 'kyo u',
                     indexCorrect: 2,
                  },
                  {
                     text: 'あした',
                     pronunciation: 'a shi ta',
                     indexCorrect: 3,
                  },
                  {
                     text: 'きのう',
                     pronunciation: 'ki no u',
                     indexCorrect: 4,
                  },
               ],
            },
         ],
      },
   },
};

export default ListQuestionFakeDataLession;
