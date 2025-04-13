const ListQuestionFakeDataLession = {
  N5: {
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
            { text: 'おちゃ', pronunciation: 'o cha', indexCorrect: 4 },
            { text: 'ください', pronunciation: 'ku da sa i', indexCorrect: 1 },
            { text: 'すし', pronunciation: 'sushi', indexCorrect: 3 },
            { text: 'ごはん', pronunciation: 'go ha n', indexCorrect: 2 },
            { text: 'みず', pronunciation: 'mi zu', indexCorrect: 5 },
          ],
        },
      ],
    },
  },
};

export default ListQuestionFakeDataLession;
