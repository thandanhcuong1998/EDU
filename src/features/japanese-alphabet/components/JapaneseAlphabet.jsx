import React, { useState } from 'react';
import { hiraganaData, katakanaData } from '../data/AlphabetData.js';
import { playApiAudio } from '@/shared/lib/util.jsx';
import './JapaneseAlphabet.css'; // Import the new, unified CSS file

// The Grid component is now defined inside the main file for simplicity
const AlphabetGrid = ({ characters }) => {
    return (
        <div className="alphabet-grid">
            {characters.map((char, index) => {
                if (!char || !char.kana) {
                    // Render an empty, non-interactive placeholder
                    return <div key={`empty-${index}`} className="character-card character-card--empty"></div>;
                }
                return (
                    <button
                        key={`${char.kana}-${index}`}
                        className="character-card"
                        onClick={() => playApiAudio(char.kana)}
                        aria-label={`Play sound for ${char.kana} (${char.romaji})`}
                    >
                        <span className="character-card__kana" lang="ja">{char.kana}</span>
                        <span className="character-card__romaji">{char.romaji}</span>
                    </button>
                );
            })}
        </div>
    );
};

const JapaneseAlphabet = () => {
    const [activeTab, setActiveTab] = useState('hiragana');

    return (
        <div className="alphabet-container">
            <nav className="alphabet-tabs" aria-label="Alphabet Tabs">
                <button
                    className={`alphabet-tabs__button ${activeTab === 'hiragana' ? 'alphabet-tabs__button--active' : ''}`}
                    onClick={() => setActiveTab('hiragana')}
                >
                    Hiragana (ひらがな)
                </button>
                <button
                    className={`alphabet-tabs__button ${activeTab === 'katakana' ? 'alphabet-tabs__button--active' : ''}`}
                    onClick={() => setActiveTab('katakana')}
                >
                    Katakana (カタカナ)
                </button>
            </nav>

            <div className="tab-content">
                {activeTab === 'hiragana' && <AlphabetGrid characters={hiraganaData} />}
                {activeTab === 'katakana' && <AlphabetGrid characters={katakanaData} />}
            </div>
        </div>
    );
};

export default JapaneseAlphabet;