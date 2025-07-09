const ListQuestionFakeDataLession = {
   N5: {
      basicGreetings: {
         metadata: {
            title: 'Basic Greetings',
            description:
               'Learn essential Japanese greetings for everyday conversations',
            totalLessons: 3,
            estimatedTimeMinutes: 20,
            icon: '👋',
         },
         theory: {
            title: 'Chào hỏi cơ bản',
            content: [
               'Trong bài học này, chúng ta sẽ học các câu chào hỏi thông dụng nhất trong tiếng Nhật.',
               'Những câu chào này rất quan trọng để tạo ấn tượng tốt và bắt đầu cuộc trò chuyện.',
            ],
            vocabulary: [
               {
                  japanese: 'おはようございます',
                  romaji: 'ohayou gozaimasu',
                  vietnamese: 'Chào buổi sáng (lịch sự)',
                  usage: 'Dùng để chào vào buổi sáng, trước 10 giờ sáng.',
               },
               {
                  japanese: 'こんにちは',
                  romaji: 'konnichiwa',
                  vietnamese: 'Chào buổi chiều/Xin chào',
                  usage: 'Dùng để chào vào ban ngày, từ khoảng 10 giờ sáng đến 5 giờ chiều.',
               },
               {
                  japanese: 'こんばんは',
                  romaji: 'konbanwa',
                  vietnamese: 'Chào buổi tối',
                  usage: 'Dùng để chào vào buổi tối.',
               },
               {
                  japanese: 'さようなら',
                  romaji: 'sayounara',
                  vietnamese: 'Tạm biệt',
                  usage: 'Dùng khi chia tay, mang ý nghĩa có thể sẽ không gặp lại trong một thời gian dài.',
               },
               {
                  japanese: 'おやすみなさい',
                  romaji: 'oyasuminasai',
                  vietnamese: 'Chúc ngủ ngon',
                  usage: 'Dùng trước khi đi ngủ.',
               },
            ],
            grammar: [
               {
                  pattern: '〜です',
                  explanation: 'Là cấu trúc câu khẳng định cơ bản, tương đương với "là" trong tiếng Việt.',
                  examples: ['わたしはがくせいです。 (Tôi là học sinh.)'],
               },
            ],
         },
         level1: [
            {
               id: 'n5-greet-l1-q1',
               type: 'radio',
               title: "Cách nói 'Chào buổi sáng' một cách lịch sự trong tiếng Nhật là gì?",
               options: [
                  'こんにちは',
                  'おはようございます',
                  'こんばんは',
                  'さようなら',
               ],
               pronunciation: [
                  'konnichiwa',
                  'ohayou gozaimasu',
                  'konbanwa',
                  'sayounara',
               ],
               correctAnswer: 2,
            },
            {
               id: 'n5-greet-l1-q2',
               type: 'fill-in-blank',
               title: 'Hoàn thành câu chào buổi tối',
               sentence: ['', 'は。'],
               blankIndex: 0,
               options: ['こんにち', 'こんばん', 'おはよう', 'さよう'],
               pronunciation: ['konnichi', 'konban', 'ohayou', 'sayou'],
               correctAnswer: 2,
            },
         ],
         level2: [
            {
               id: 'n5-greet-l2-q1',
               type: 'mapping-word',
               title: 'Ghép cặp câu chào và ý nghĩa',
               options1: [
                  { text: 'こんにちは', indexCorrect: 2 },
                  { text: 'こんばんは', indexCorrect: 3 },
                  { text: 'おやすみなさい', indexCorrect: 1 },
               ],
               options2: [
                  { text: 'Chúc ngủ ngon' },
                  { text: 'Chào buổi chiều' },
                  { text: 'Chào buổi tối' },
               ],
            },
         ],
      },
      selfIntroduction: {
         metadata: {
            title: 'Self Introduction',
            description: 'Learn how to introduce yourself in Japanese.',
            totalLessons: 2,
            estimatedTimeMinutes: 15,
            icon: '🧑',
         },
         theory: {
            title: 'Giới thiệu bản thân',
            content: ['Học cách giới thiệu tên, tuổi và nghề nghiệp của bạn.'],
            vocabulary: [
               { japanese: 'わたし', romaji: 'watashi', vietnamese: 'Tôi' },
               { japanese: 'なまえ', romaji: 'namae', vietnamese: 'Tên' },
               { japanese: 'です', romaji: 'desu', vietnamese: 'Là' },
            ],
            grammar: [
               {
                  pattern: '〜は〜です',
                  explanation: 'Cấu trúc cơ bản để giới thiệu: "A là B".',
                  examples: ['わたしはマイクです。 (Tôi là Mike.)'],
               },
            ],
         },
         level1: [
            {
               id: 'n5-intro-l1-q1',
               type: 'card-word-japan',
               title: 'Sắp xếp thành câu "Tôi là Tanaka."',
               options: [
                  { text: 'は', pronunciation: 'wa' },
                  { text: 'です', pronunciation: 'desu' },
                  { text: 'たなか', pronunciation: 'tanaka' },
                  { text: 'わたし', pronunciation: 'watashi' },
               ],
               hintToken: 'My name is Tanaka.',
               correctAnswer: [4, 1, 3, 2],
            },
         ],
      },
   },
   N4: {
      shopping: {
         metadata: {
            title: 'Shopping',
            description: 'Learn phrases for shopping in Japan.',
            totalLessons: 2,
            estimatedTimeMinutes: 20,
            icon: '🛒',
         },
         theory: {
            title: 'Mua sắm',
            content: ['Học các mẫu câu hữu ích khi đi mua sắm.'],
            vocabulary: [
               { japanese: 'これ', romaji: 'kore', vietnamese: 'Cái này' },
               { japanese: 'いくら', romaji: 'ikura', vietnamese: 'Bao nhiêu tiền' },
               { japanese: 'ください', romaji: 'kudasai', vietnamese: 'Làm ơn cho tôi' },
            ],
            grammar: [
               {
                  pattern: 'これはいくらですか。',
                  explanation: 'Dùng để hỏi giá của một món đồ.',
                  examples: ['これはいくらですか。 (Cái này bao nhiêu tiền?)'],
               },
            ],
         },
         level1: [
            {
               id: 'n4-shop-l1-q1',
               type: 'radio',
               title: "Câu nào dùng để hỏi 'Cái này giá bao nhiêu?'",
               options: [
                  'これをください。',
                  'これはいくらですか。',
                  'こんにちは。',
               ],
               correctAnswer: 2,
            },
         ],
      },
   },
   N3: {
      dailyLife: {
         metadata: {
            title: 'Daily Life',
            description: 'Learn phrases for daily conversations.',
            totalLessons: 2,
            estimatedTimeMinutes: 25,
            icon: '🏠',
         },
         theory: {
            title: 'Cuộc sống hàng ngày',
            content: ['Học các mẫu câu thường dùng trong cuộc sống hàng ngày.'],
            vocabulary: [
               { japanese: 'おはよう', romaji: 'ohayou', vietnamese: 'Chào buổi sáng' },
               { japanese: 'おやすみ', romaji: 'oyasumi', vietnamese: 'Chúc ngủ ngon' },
            ],
            grammar: [
               {
                  pattern: '〜があります',
                  explanation: 'Dùng để nói về sự tồn tại của vật.',
                  examples: ['ペンがあります。 (Có cây bút.)'],
               },
            ],
         },
         level1: [
            {
               id: 'n3-daily-l1-q1',
               type: 'radio',
               title: "Chọn câu đúng để nói 'Có một cuốn sách.'",
               options: [
                  '本があります。',
                  '本をください。',
                  '本はいくらですか。',
               ],
               correctAnswer: 1,
            },
         ],
      },
   },
   N2: {
      business: {
         metadata: {
            title: 'Business Japanese',
            description: 'Learn polite expressions for business situations.',
            totalLessons: 2,
            estimatedTimeMinutes: 30,
            icon: '💼',
         },
         theory: {
            title: 'Tiếng Nhật trong kinh doanh',
            content: ['Học các cách nói lịch sự và trang trọng trong môi trường công sở.'],
            vocabulary: [
               { japanese: 'お世話になります', romaji: 'osewa ni narimasu', vietnamese: 'Cảm ơn vì sự giúp đỡ' },
               { japanese: '恐れ入ります', romaji: 'osoreirimasu', vietnamese: 'Xin lỗi/Cảm ơn (khi làm phiền)' },
            ],
            grammar: [
               {
                  pattern: '〜ております',
                  explanation: 'Dạng khiêm nhường của 〜ています.',
                  examples: ['お待ちしております。 (Tôi đang đợi.)'],
               },
            ],
         },
         level1: [
            {
               id: 'n2-biz-l1-q1',
               type: 'fill-in-blank',
               title: 'Hoàn thành câu: "Cảm ơn vì sự giúp đỡ của bạn."',
               sentence: ['いつも', '。'],
               blankIndex: 0,
               options: ['お世話になります', 'ありがとうございます', 'すみません'],
               correctAnswer: 1,
            },
         ],
      },
   },
   N1: {
      advancedGrammar: {
         metadata: {
            title: 'Advanced Grammar',
            description: 'Master complex Japanese grammar patterns.',
            totalLessons: 2,
            estimatedTimeMinutes: 35,
            icon: '📚',
         },
         theory: {
            title: 'Ngữ pháp nâng cao',
            content: ['Khám phá các cấu trúc ngữ pháp phức tạp thường xuất hiện trong JLPT N1.'],
            vocabulary: [
               { japanese: '〜ざるを得ない', romaji: 'zaru o enai', vietnamese: 'Không thể không làm' },
               { japanese: '〜ものか', romaji: 'mono ka', vietnamese: 'Tuyệt đối không' },
            ],
            grammar: [
               {
                  pattern: '〜ざるを得ない',
                  explanation: 'Diễn tả việc không còn cách nào khác ngoài việc phải làm gì đó.',
                  examples: ['行きたくないが、行かざるを得ない。 (Không muốn đi nhưng không thể không đi.)'],
               },
            ],
         },
         level1: [
            {
               id: 'n1-adv-l1-q1',
               type: 'card-word-english',
               title: 'Sắp xếp các từ để tạo câu: "Tôi không thể không chấp nhận đề nghị đó."',
               options: ['accept', 'to', 'have', 'no', 'choice', 'but', 'the', 'offer'],
               hintToken: [
                  { text: 'その', pronunciation: 'sono' },
                  { text: '提案', pronunciation: 'teian' },
                  { text: 'を', pronunciation: 'o' },
                  { text: '受け入れざるを得ない', pronunciation: 'ukeire-zaru o enai' },
               ],
               correctAnswer: [5, 6, 1, 2, 3, 7, 8, 4],
            },
         ],
      },
   },
};

export default ListQuestionFakeDataLession;
