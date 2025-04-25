/**
 * Audio service for playing sounds in the application
 */

/**
 * Play audio from API for a given Japanese character or text
 * @param {string} text - The Japanese text to play
 * @returns {Promise<{success: boolean, error?: string}>} - Result object with success status and optional error
 */
export const playAudio = async (text) => {
  if (!text) {
    console.warn('No text provided to play audio.');
    return { success: false, error: 'No text provided' };
  }

  const baseApiUrl = 'https://proxy.junookyo.workers.dev/';
  const params = new URLSearchParams({
    language: 'ja-JP',
    text: text,
    speed: '1',
  });

  const apiUrl = `${baseApiUrl}?${params.toString()}`;
  console.log('Playing audio from:', apiUrl);

  try {
    const audio = new Audio(apiUrl);
    await audio.play();
    return { success: true };
  } catch (error) {
    console.error('Error playing audio:', error);

    // Import dynamically to avoid circular dependencies
    const { default: toastService } = await import('../shared/services/toastService');
    toastService.error(`無法播放音頻: ${text}`);

    return { 
      success: false, 
      error: error.message || 'Unknown error occurred'
    };
  }
};

/**
 * Play audio for a question's hint tokens
 * @param {Object} question - The question object containing hint tokens
 * @returns {Promise<{success: boolean, error?: string}>} - Result object with success status and optional error
 */
export const playWordAudio = async (question) => {
  const { hintToken } = question || { hintToken: [] };
  if (Array.isArray(hintToken) && hintToken.length > 0) {
    const romaji = hintToken.map(item => item.text);
    return await playAudio(romaji.join(''));
  }
  return { success: false, error: 'No hint token available' };
};

// Export as a service object for easier imports and mocking in tests
const audioService = {
  playAudio,
  playWordAudio
};

export default audioService;
