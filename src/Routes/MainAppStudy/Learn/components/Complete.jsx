import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Complete = props => {
  return (
    <>
      <div className="complete">
        <DotLottieReact
          src="https://lottie.host/2e764051-bb35-4b0d-ae72-9d86c727e726/1ZQytL6BoT.lottie"
          loop
          autoplay
          style={{
            width: '550px',
            height: '300px',
          }}
        />
        <h2 className="complete">Practice Complete!</h2>
        <p>You completed this lesson</p>
      </div>
    </>
  );
};
