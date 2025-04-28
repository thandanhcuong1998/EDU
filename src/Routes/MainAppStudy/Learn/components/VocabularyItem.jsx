import React from 'react';
import { Volume2 } from 'lucide-react';
import audioService from '../../../../services/audioService';

export default function VocabularyItem({ item }) {
  const playAudio = async () => {
    if (item.audio && item.japanese) {
      await audioService.playAudio(item.japanese);
    }
  };

  return (
    <div className="vocabulary-item flex items-start mb-2 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="font-bold text-lg text-white">{item.japanese}</span>
          {item.audio && (
            <button 
              onClick={playAudio}
              className="ml-2 p-1 rounded-full hover:bg-gray-600 transition-colors"
              aria-label="Play pronunciation"
            >
              <Volume2 size={18} className="text-blue-400" />
            </button>
          )}
        </div>
        <div className="text-gray-300">({item.romaji})</div>
        <div className="text-gray-200">{item.vietnamese}</div>
        {item.usage && (
          <div className="text-gray-400 text-sm mt-1">{item.usage}</div>
        )}
      </div>
    </div>
  );
}