import React from 'react';
import { Volume2 } from 'lucide-react';
import audioService from '@/shared/services/audioService';

export default function VocabularyItem({ item }) {
  const playAudio = async () => {
    if (item.audio && item.japanese) {
      await audioService.playAudio(item.japanese);
    }
  };

  return (
    <div className="vocabulary-item">
      <div className="vocabulary-item__content">
        <div className="vocabulary-item__japanese-row">
          <span className="vocabulary-item__japanese">{item.japanese}</span>
          {item.audio && (
            <button 
              onClick={playAudio}
              className="vocabulary-item__audio-button"
              aria-label="Play pronunciation"
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>
        {item.romaji && <div className="vocabulary-item__romaji">({item.romaji})</div>}
        {item.vietnamese && <div className="vocabulary-item__vietnamese">{item.vietnamese}</div>}
        {item.usage && (
          <div className="vocabulary-item__usage">{item.usage}</div>
        )}
      </div>
    </div>
  );
}