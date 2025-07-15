export const GAME_TYPES = {
  MEMORY_MATCH: 'memory_match',
  WORD_SCRAMBLE: 'word_scramble',
  SPEED_TYPING: 'speed_typing',
  KANJI_PUZZLE: 'kanji_puzzle',
  SOUND_MATCH: 'sound_match',
  GRAMMAR_QUIZ: 'grammar_quiz'
};

export const GAME_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const memoryMatchData = {
  easy: [
    { id: 1, word: 'こんにちは', meaning: 'Xin chào', emoji: '👋' },
    { id: 2, word: 'ありがとう', meaning: 'Cảm ơn', emoji: '🙏' },
    { id: 3, word: 'おはよう', meaning: 'Chào buổi sáng', emoji: '🌅' },
    { id: 4, word: 'さようなら', meaning: 'Tạm biệt', emoji: '👋' },
    { id: 5, word: 'おやすみ', meaning: 'Chúc ngủ ngon', emoji: '😴' },
    { id: 6, word: 'いただきます', meaning: 'Mời ăn', emoji: '🍽️' }
  ],
  medium: [
    { id: 1, word: '家族', meaning: 'Gia đình', emoji: '👨‍👩‍👧‍👦' },
    { id: 2, word: '友達', meaning: 'Bạn bè', emoji: '👥' },
    { id: 3, word: '学校', meaning: 'Trường học', emoji: '🏫' },
    { id: 4, word: '仕事', meaning: 'Công việc', emoji: '💼' },
    { id: 5, word: '旅行', meaning: 'Du lịch', emoji: '✈️' },
    { id: 6, word: '音楽', meaning: 'Âm nhạc', emoji: '🎵' },
    { id: 7, word: '映画', meaning: 'Phim', emoji: '🎬' },
    { id: 8, word: '料理', meaning: 'Nấu ăn', emoji: '👨‍🍳' }
  ],
  hard: [
    { id: 1, word: '経済', meaning: 'Kinh tế', emoji: '💰' },
    { id: 2, word: '政治', meaning: 'Chính trị', emoji: '🏛️' },
    { id: 3, word: '文化', meaning: 'Văn hóa', emoji: '🎭' },
    { id: 4, word: '歴史', meaning: 'Lịch sử', emoji: '📚' },
    { id: 5, word: '科学', meaning: 'Khoa học', emoji: '🔬' },
    { id: 6, word: '技術', meaning: 'Công nghệ', emoji: '💻' },
    { id: 7, word: '環境', meaning: 'Môi trường', emoji: '🌍' },
    { id: 8, word: '社会', meaning: 'Xã hội', emoji: '🏘️' },
    { id: 9, word: '教育', meaning: 'Giáo dục', emoji: '🎓' },
    { id: 10, word: '健康', meaning: 'Sức khỏe', emoji: '🏥' }
  ]
};

export const wordScrambleData = {
  easy: [
    { word: 'こんにちは', meaning: 'Xin chào', scrambled: 'こんちには' },
    { word: 'ありがとう', meaning: 'Cảm ơn', scrambled: 'ありとうが' },
    { word: 'おはよう', meaning: 'Chào buổi sáng', scrambled: 'おようは' },
    { word: 'さようなら', meaning: 'Tạm biệt', scrambled: 'さよならう' },
    { word: 'おやすみ', meaning: 'Chúc ngủ ngon', scrambled: 'おみやす' }
  ],
  medium: [
    { word: '家族', meaning: 'Gia đình', scrambled: '族家' },
    { word: '友達', meaning: 'Bạn bè', scrambled: '達友' },
    { word: '学校', meaning: 'Trường học', scrambled: '校学' },
    { word: '仕事', meaning: 'Công việc', scrambled: '事仕' },
    { word: '旅行', meaning: 'Du lịch', scrambled: '行旅' },
    { word: '音楽', meaning: 'Âm nhạc', scrambled: '楽音' },
    { word: '映画', meaning: 'Phim', scrambled: '画映' },
    { word: '料理', meaning: 'Nấu ăn', scrambled: '理料' }
  ],
  hard: [
    { word: '経済', meaning: 'Kinh tế', scrambled: '済経' },
    { word: '政治', meaning: 'Chính trị', scrambled: '治政' },
    { word: '文化', meaning: 'Văn hóa', scrambled: '化文' },
    { word: '歴史', meaning: 'Lịch sử', scrambled: '史歴' },
    { word: '科学', meaning: 'Khoa học', scrambled: '学科' },
    { word: '技術', meaning: 'Công nghệ', scrambled: '術技' },
    { word: '環境', meaning: 'Môi trường', scrambled: '境環' },
    { word: '社会', meaning: 'Xã hội', scrambled: '会社' }
  ]
};

export const speedTypingData = {
  easy: [
    { word: 'こんにちは', meaning: 'Xin chào', romaji: 'konnichiwa' },
    { word: 'ありがとう', meaning: 'Cảm ơn', romaji: 'arigatou' },
    { word: 'おはよう', meaning: 'Chào buổi sáng', romaji: 'ohayou' },
    { word: 'さようなら', meaning: 'Tạm biệt', romaji: 'sayounara' },
    { word: 'おやすみ', meaning: 'Chúc ngủ ngon', romaji: 'oyasumi' }
  ],
  medium: [
    { word: '家族', meaning: 'Gia đình', romaji: 'kazoku' },
    { word: '友達', meaning: 'Bạn bè', romaji: 'tomodachi' },
    { word: '学校', meaning: 'Trường học', romaji: 'gakkou' },
    { word: '仕事', meaning: 'Công việc', romaji: 'shigoto' },
    { word: '旅行', meaning: 'Du lịch', romaji: 'ryokou' },
    { word: '音楽', meaning: 'Âm nhạc', romaji: 'ongaku' },
    { word: '映画', meaning: 'Phim', romaji: 'eiga' },
    { word: '料理', meaning: 'Nấu ăn', romaji: 'ryouri' }
  ],
  hard: [
    { word: '経済', meaning: 'Kinh tế', romaji: 'keizai' },
    { word: '政治', meaning: 'Chính trị', romaji: 'seiji' },
    { word: '文化', meaning: 'Văn hóa', romaji: 'bunka' },
    { word: '歴史', meaning: 'Lịch sử', romaji: 'rekishi' },
    { word: '科学', meaning: 'Khoa học', romaji: 'kagaku' },
    { word: '技術', meaning: 'Công nghệ', romaji: 'gijutsu' },
    { word: '環境', meaning: 'Môi trường', romaji: 'kankyou' },
    { word: '社会', meaning: 'Xã hội', romaji: 'shakai' }
  ]
};

export const kanjiPuzzleData = {
  easy: [
    { kanji: '人', meaning: 'Người', strokeCount: 2, radicals: ['亻'] },
    { kanji: '大', meaning: 'Lớn', strokeCount: 3, radicals: ['大'] },
    { kanji: '小', meaning: 'Nhỏ', strokeCount: 3, radicals: ['小'] },
    { kanji: '山', meaning: 'Núi', strokeCount: 3, radicals: ['山'] },
    { kanji: '川', meaning: 'Sông', strokeCount: 3, radicals: ['川'] },
    { kanji: '火', meaning: 'Lửa', strokeCount: 4, radicals: ['火'] }
  ],
  medium: [
    { kanji: '家族', meaning: 'Gia đình', strokeCount: 10, radicals: ['宀', '豕'] },
    { kanji: '学校', meaning: 'Trường học', strokeCount: 12, radicals: ['木', '冖'] },
    { kanji: '仕事', meaning: 'Công việc', strokeCount: 8, radicals: ['士', '亻'] },
    { kanji: '旅行', meaning: 'Du lịch', strokeCount: 11, radicals: ['方', '彳'] },
    { kanji: '音楽', meaning: 'Âm nhạc', strokeCount: 13, radicals: ['音', '楽'] },
    { kanji: '映画', meaning: 'Phim', strokeCount: 12, radicals: ['日', '田'] }
  ],
  hard: [
    { kanji: '経済', meaning: 'Kinh tế', strokeCount: 17, radicals: ['糸', '氵'] },
    { kanji: '政治', meaning: 'Chính trị', strokeCount: 9, radicals: ['攵', '正'] },
    { kanji: '文化', meaning: 'Văn hóa', strokeCount: 8, radicals: ['文', '化'] },
    { kanji: '歴史', meaning: 'Lịch sử', strokeCount: 16, radicals: ['厂', '史'] },
    { kanji: '科学', meaning: 'Khoa học', strokeCount: 16, radicals: ['禾', '斗'] },
    { kanji: '技術', meaning: 'Công nghệ', strokeCount: 15, radicals: ['扌', '木'] }
  ]
};

export const soundMatchData = {
  easy: [
    { word: 'こんにちは', meaning: 'Xin chào', audio: 'konnichiwa.mp3' },
    { word: 'ありがとう', meaning: 'Cảm ơn', audio: 'arigatou.mp3' },
    { word: 'おはよう', meaning: 'Chào buổi sáng', audio: 'ohayou.mp3' },
    { word: 'さようなら', meaning: 'Tạm biệt', audio: 'sayounara.mp3' },
    { word: 'おやすみ', meaning: 'Chúc ngủ ngon', audio: 'oyasumi.mp3' }
  ],
  medium: [
    { word: '家族', meaning: 'Gia đình', audio: 'kazoku.mp3' },
    { word: '友達', meaning: 'Bạn bè', audio: 'tomodachi.mp3' },
    { word: '学校', meaning: 'Trường học', audio: 'gakkou.mp3' },
    { word: '仕事', meaning: 'Công việc', audio: 'shigoto.mp3' },
    { word: '旅行', meaning: 'Du lịch', audio: 'ryokou.mp3' },
    { word: '音楽', meaning: 'Âm nhạc', audio: 'ongaku.mp3' }
  ],
  hard: [
    { word: '経済', meaning: 'Kinh tế', audio: 'keizai.mp3' },
    { word: '政治', meaning: 'Chính trị', audio: 'seiji.mp3' },
    { word: '文化', meaning: 'Văn hóa', audio: 'bunka.mp3' },
    { word: '歴史', meaning: 'Lịch sử', audio: 'rekishi.mp3' },
    { word: '科学', meaning: 'Khoa học', audio: 'kagaku.mp3' },
    { word: '技術', meaning: 'Công nghệ', audio: 'gijutsu.mp3' }
  ]
};

export const grammarQuizData = {
  easy: [
    {
      question: 'Cách nói "Tôi là học sinh" bằng tiếng Nhật?',
      options: ['私は学生です', '私は先生です', '私は医者です', '私は会社員です'],
      correct: 0,
      explanation: '私は学生です (Watashi wa gakusei desu) = Tôi là học sinh'
    },
    {
      question: 'Cách nói "Cảm ơn bạn" bằng tiếng Nhật?',
      options: ['おはよう', 'ありがとう', 'さようなら', 'おやすみ'],
      correct: 1,
      explanation: 'ありがとう (Arigatou) = Cảm ơn'
    },
    {
      question: 'Cách nói "Xin chào" vào buổi sáng?',
      options: ['こんにちは', 'おはよう', 'こんばんは', 'さようなら'],
      correct: 1,
      explanation: 'おはよう (Ohayou) = Chào buổi sáng'
    }
  ],
  medium: [
    {
      question: 'Cách nói "Tôi thích âm nhạc" bằng tiếng Nhật?',
      options: ['私は音楽が好きです', '私は音楽を聞きます', '私は音楽を歌います', '私は音楽を作ります'],
      correct: 0,
      explanation: '私は音楽が好きです (Watashi wa ongaku ga suki desu) = Tôi thích âm nhạc'
    },
    {
      question: 'Cách nói "Tôi đang học tiếng Nhật" bằng tiếng Nhật?',
      options: ['私は日本語を勉強します', '私は日本語を勉強しています', '私は日本語を習います', '私は日本語を教えます'],
      correct: 1,
      explanation: '私は日本語を勉強しています (Watashi wa nihongo wo benkyou shiteimasu) = Tôi đang học tiếng Nhật'
    },
    {
      question: 'Cách nói "Bạn có khỏe không?" bằng tiếng Nhật?',
      options: ['お元気ですか', 'お疲れ様です', 'お世話になります', 'お邪魔します'],
      correct: 0,
      explanation: 'お元気ですか (Ogenki desu ka) = Bạn có khỏe không?'
    }
  ],
  hard: [
    {
      question: 'Cách nói "Tôi muốn đi du lịch Nhật Bản" bằng tiếng Nhật?',
      options: ['私は日本に旅行したいです', '私は日本に旅行します', '私は日本に旅行に行きます', '私は日本に旅行をします'],
      correct: 0,
      explanation: '私は日本に旅行したいです (Watashi wa nihon ni ryokou shitai desu) = Tôi muốn đi du lịch Nhật Bản'
    },
    {
      question: 'Cách nói "Tôi đã hoàn thành bài tập" bằng tiếng Nhật?',
      options: ['私は宿題を終わりました', '私は宿題を終わります', '私は宿題を終わらせました', '私は宿題を終わらせます'],
      correct: 2,
      explanation: '私は宿題を終わらせました (Watashi wa shukudai wo owarasemashita) = Tôi đã hoàn thành bài tập'
    },
    {
      question: 'Cách nói "Bạn có thể giúp tôi không?" bằng tiếng Nhật?',
      options: ['手伝ってください', '手伝ってもらえますか', '手伝ってあげます', '手伝ってくださいませんか'],
      correct: 1,
      explanation: '手伝ってもらえますか (Tetsudatte moraemasu ka) = Bạn có thể giúp tôi không?'
    }
  ]
};

export const gameRewards = {
  [GAME_TYPES.MEMORY_MATCH]: {
    easy: { xp: 10, coins: 5 },
    medium: { xp: 20, coins: 10 },
    hard: { xp: 30, coins: 15 }
  },
  [GAME_TYPES.WORD_SCRAMBLE]: {
    easy: { xp: 8, coins: 4 },
    medium: { xp: 16, coins: 8 },
    hard: { xp: 24, coins: 12 }
  },
  [GAME_TYPES.SPEED_TYPING]: {
    easy: { xp: 12, coins: 6 },
    medium: { xp: 24, coins: 12 },
    hard: { xp: 36, coins: 18 }
  },
  [GAME_TYPES.KANJI_PUZZLE]: {
    easy: { xp: 15, coins: 8 },
    medium: { xp: 30, coins: 15 },
    hard: { xp: 45, coins: 22 }
  },
  [GAME_TYPES.SOUND_MATCH]: {
    easy: { xp: 10, coins: 5 },
    medium: { xp: 20, coins: 10 },
    hard: { xp: 30, coins: 15 }
  },
  [GAME_TYPES.GRAMMAR_QUIZ]: {
    easy: { xp: 12, coins: 6 },
    medium: { xp: 24, coins: 12 },
    hard: { xp: 36, coins: 18 }
  }
};

export const gameDescriptions = {
  [GAME_TYPES.MEMORY_MATCH]: {
    title: 'Memory Match',
    description: 'Ghép các cặp từ tiếng Nhật với nghĩa tương ứng',
    icon: '🧠',
    color: '#4CAF50'
  },
  [GAME_TYPES.WORD_SCRAMBLE]: {
    title: 'Word Scramble',
    description: 'Sắp xếp lại các ký tự để tạo thành từ tiếng Nhật đúng',
    icon: '🔀',
    color: '#FF9800'
  },
  [GAME_TYPES.SPEED_TYPING]: {
    title: 'Speed Typing',
    description: 'Gõ nhanh romaji của từ tiếng Nhật',
    icon: '⌨️',
    color: '#2196F3'
  },
  [GAME_TYPES.KANJI_PUZZLE]: {
    title: 'Kanji Puzzle',
    description: 'Ghép các bộ thủ để tạo thành kanji hoàn chỉnh',
    icon: '🧩',
    color: '#9C27B0'
  },
  [GAME_TYPES.SOUND_MATCH]: {
    title: 'Sound Match',
    description: 'Nghe và chọn từ tiếng Nhật đúng',
    icon: '🎵',
    color: '#F44336'
  },
  [GAME_TYPES.GRAMMAR_QUIZ]: {
    title: 'Grammar Quiz',
    description: 'Trả lời câu hỏi về ngữ pháp tiếng Nhật',
    icon: '📝',
    color: '#00BCD4'
  }
};

export const getGameData = (gameType, difficulty) => {
  const dataMap = {
    [GAME_TYPES.MEMORY_MATCH]: memoryMatchData,
    [GAME_TYPES.WORD_SCRAMBLE]: wordScrambleData,
    [GAME_TYPES.SPEED_TYPING]: speedTypingData,
    [GAME_TYPES.KANJI_PUZZLE]: kanjiPuzzleData,
    [GAME_TYPES.SOUND_MATCH]: soundMatchData,
    [GAME_TYPES.GRAMMAR_QUIZ]: grammarQuizData
  };

  return dataMap[gameType]?.[difficulty] || [];
};

export const getGameReward = (gameType, difficulty) => {
  return gameRewards[gameType]?.[difficulty] || { xp: 0, coins: 0 };
};

export const getGameDescription = (gameType) => {
  return gameDescriptions[gameType] || {};
}; 