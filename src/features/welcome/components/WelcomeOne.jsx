import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

const WelcomeOne = ({ title, resourceAnimation }) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        // Đặt class animation
        setAnimationClass('typewriter');

        // Xóa class sau khi animation hoàn thành
        const timer = setTimeout(() => {
            setAnimationClass('');
        }, 2000); // Thời gian tương ứng với thời gian animation

        return () => clearTimeout(timer);
    }, [title]); // Chạy lại khi title thay đổi

    return (
        <div className="d-flex justify-content-center align-items-center flex-column height-80vh">
            <div className="chat-bubble ">
                <span className={animationClass}>{title}</span>
            </div>
            <DotLottieReact
                src={resourceAnimation}
                loop
                autoplay
                style={{
                    width: '400px',
                    height: '250px',
                }}
            />
        </div>
    );
};

export default WelcomeOne;
