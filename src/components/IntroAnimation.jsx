import { useState, useEffect } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="intro-animation">
      <div className="intro-content">
        <div className="intro-logo">
          <i className="fa-solid fa-code"></i>
        </div>
        <h1 className="intro-name">
          <span className="letter">J</span>
          <span className="letter">u</span>
          <span className="letter">l</span>
          <span className="letter">l</span>
          <span className="letter">i</span>
          <span className="letter">a</span>
          <span className="letter">n</span>
          <span className="space"> </span>
          <span className="letter">P</span>
          <span className="letter">a</span>
          <span className="letter">r</span>
          <span className="letter">a</span>
          <span className="letter">g</span>
          <span className="letter">o</span>
          <span className="letter">s</span>
          <span className="letter">o</span>
        </h1>
        <p className="intro-tagline">Frontend Developer & Creator</p>
        <div className="intro-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
