// src/components/JapaneseAlphabet.js
import React, { useState } from 'react';
import AlphabetGrid from './AlphabetGrid.jsx';
import { hiraganaData, katakanaData } from '../../../Helpers/AlphabetData.js'; // Import dữ liệu
import './Alphabet.css'; // File CSS chung

const JapaneseAlphabet = () => {
   const [activeTab, setActiveTab] = useState('hiragana');
   const rootClass =
      'bg-app-primary whitespace-nowrap py-3 px-3 sm:px-4 border-b-2 text-sm ease-in-out';
   return (
      <div className=" p-4 sm:p-6 rounded-lg shadow-md w-full">
         <div className="border-gray-200 mb-4">
            <nav className="-mb-px space-x-4 sm:space-x-6" aria-label="Tabs">
               <button
                  className={`${rootClass}
              ${
                 activeTab === 'hiragana'
                    ? 'font-semibold tab-active-characters '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium inactive'
              }`}
                  onClick={() => setActiveTab('hiragana')}
               >
                  Hiragana (ひらがな)
               </button>
               <button
                  className={`${rootClass}
              ${
                 activeTab === 'katakana'
                    ? 'font-semibold tab-active-characters '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium inactive'
              }`}
                  onClick={() => setActiveTab('katakana')}
               >
                  Katakana (カタカナ)
               </button>
            </nav>
         </div>

         {/* Tab Content */}
         <div className="mt-4">
            {activeTab === 'hiragana' && (
               <AlphabetGrid characters={hiraganaData} />
            )}
            {activeTab === 'katakana' && (
               <AlphabetGrid characters={katakanaData} />
            )}
         </div>
      </div>
   );
};

export default JapaneseAlphabet;
