
import { useContext } from 'react';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';
import './HomePage.css'; // Import the new HomePage CSS
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ChangeLanguage from '@/features/theme/components/ChangeLanguage.jsx';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/features/theme/components/ThemeToggle.jsx';
import { Book, Lightbulb, Users, Globe } from 'lucide-react'; // Icons for features

const Index = () => {
    const { translations } = useContext(LanguageContext);
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const handleStartLearning = () => {
        navigate('/welcome');
    };

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <a href="/" className="homepage-header__logo-link">
                    {/* Replace with your actual logo image */}
                    <img src="https://omolds.github.io/assets/images/sitom/omolds/logoOmolds544x348.png" alt="Japanese-EDU Logo" className="homepage-header__logo" />
                </a>
                <div className="header-controls">
                    <div className="language-switcher">
                        <span>{language === 'ja' ? '日本語' : 'Tiếng Việt'}</span>
                        <ChangeLanguage />
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-section__content">
                        <h1 className="hero-section__title">
                            <span>{translations.welcome}</span>
                        </h1>
                        <p className="hero-section__subtitle">
                            <span>{translations.subWelcome}</span>
                        </p>
                        <button
                            className="hero-section__button"
                            onClick={handleStartLearning}
                        >
                            {translations.buttonStart}
                        </button>
                    </div>
                    <div className="hero-section__lottie">
                        <DotLottieReact
                            src="https://lottie.host/11bb064d-3b67-436f-bb3b-f3e9509acc0a/WUtr7agxex.json" // Japanese-themed Lottie
                            loop
                            autoplay
                        />
                    </div>
                </section>

                {/* Why Learn Japanese Section */}
                <section className="section-spacing">
                    <h2 className="section-title">{translations.homepage.whyLearn.title}</h2>
                    <p className="section-subtitle">{translations.homepage.whyLearn.subtitle}</p>
                    <div className="why-learn-grid">
                        <div className="why-card">
                            <Book size={80} className="why-card__icon" />
                            <h3 className="why-card__title">{translations.homepage.whyLearn.card1.title}</h3>
                            <p className="why-card__description">{translations.homepage.whyLearn.card1.description}</p>
                        </div>
                        <div className="why-card">
                            <Lightbulb size={80} className="why-card__icon" />
                            <h3 className="why-card__title">{translations.homepage.whyLearn.card2.title}</h3>
                            <p className="why-card__description">{translations.homepage.whyLearn.card2.description}</p>
                        </div>
                        <div className="why-card">
                            <Users size={80} className="why-card__icon" />
                            <h3 className="why-card__title">{translations.homepage.whyLearn.card3.title}</h3>
                            <p className="why-card__description">{translations.homepage.whyLearn.card3.description}</p>
                        </div>
                        <div className="why-card">
                            <Globe size={80} className="why-card__icon" />
                            <h3 className="why-card__title">{translations.homepage.whyLearn.card4.title}</h3>
                            <p className="why-card__description">{translations.homepage.whyLearn.card4.description}</p>
                        </div>
                    </div>
                </section>

                {/* Our Unique Approach Section */}
                <section className="section-spacing" style={{ backgroundColor: 'var(--color-background)' }}>
                    <h2 className="section-title">{translations.homepage.ourApproach.title}</h2>
                    <p className="section-subtitle">{translations.homepage.ourApproach.subtitle}</p>
                    <div className="approach-content">
                        <div className="approach-item">
                            <div className="approach-item__lottie">
                                <DotLottieReact src="https://lottie.host/21111111-1111-1111-1111-111111111111/example1.json" loop autoplay /> {/* Placeholder Lottie */}
                            </div>
                            <div className="approach-item__text">
                                <h3>{translations.homepage.ourApproach.item1.title}</h3>
                                <p>{translations.homepage.ourApproach.item1.description}</p>
                            </div>
                        </div>
                        <div className="approach-item">
                            <div className="approach-item__lottie">
                                <DotLottieReact src="https://lottie.host/22222222-2222-2222-2222-222222222222/example2.json" loop autoplay /> {/* Placeholder Lottie */}
                            </div>
                            <div className="approach-item__text">
                                <h3>{translations.homepage.ourApproach.item2.title}</h3>
                                <p>{translations.homepage.ourApproach.item2.description}</p>
                            </div>
                        </div>
                        <div className="approach-item">
                            <div className="approach-item__lottie">
                                <DotLottieReact src="https://lottie.host/33333333-3333-3333-3333-333333333333/example3.json" loop autoplay /> {/* Placeholder Lottie */}
                            </div>
                            <div className="approach-item__text">
                                <h3>{translations.homepage.ourApproach.item3.title}</h3>
                                <p>{translations.homepage.ourApproach.item3.description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You'll Learn Section */}
                <section className="section-spacing" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <h2 className="section-title">{translations.homepage.whatLearn.title}</h2>
                    <p className="section-subtitle">{translations.homepage.whatLearn.subtitle}</p>
                    <div className="learn-grid">
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item1.title}</h3>
                        </div>
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item2.title}</h3>
                        </div>
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item3.title}</h3>
                        </div>
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item4.title}</h3>
                        </div>
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item5.title}</h3>
                        </div>
                        <div className="learn-item">
                            <Book size={60} className="learn-item__icon" />
                            <h3 className="learn-item__title">{translations.homepage.whatLearn.item6.title}</h3>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="cta-section">
                    <h2 className="cta-section__title">{translations.homepage.cta.title}</h2>
                    <button
                        className="cta-section__button"
                        onClick={handleStartLearning}
                    >
                        {translations.homepage.cta.button}
                    </button>
                </section>
            </main>

            <footer className="homepage-footer">
                <p>&copy; {new Date().getFullYear()} Japanese-EDU. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Index;
