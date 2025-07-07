import React, { useContext, useState, useRef, useEffect } from 'react';
import Vietnam from '@/shared/assets/img/vietnam.png';
import Japan from '@/shared/assets/img/japan.png';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';
import { ChevronDown } from 'lucide-react';
import './ChangeLanguage.css'; // Import the new CSS

export default function ChangeLanguage() {
    const { changeLanguage, language } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: Vietnam },
        { code: 'ja', name: '日本語', flag: Japan },
    ];

    const currentLang = languages.find(lang => lang.code === language);

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="language-selector" ref={dropdownRef}>
            <button
                className="language-selector__button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <img src={currentLang?.flag} alt={currentLang?.name} className="language-selector__flag" />
                <span>{currentLang?.name}</span>
                <ChevronDown size={16} />
            </button>

            <div className={`language-selector__dropdown ${isOpen ? 'language-selector__dropdown--active' : ''}`}>
                {languages.map((lang) => (
                    <div
                        key={lang.code}
                        className="language-selector__item"
                        onClick={() => handleLanguageChange(lang.code)}
                    >
                        <img src={lang.flag} alt={lang.name} className="language-selector__flag" />
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}