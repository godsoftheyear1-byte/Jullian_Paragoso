import { useEffect, useRef } from 'react';
import './SkillsProgress.css';

const SkillsProgress = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="skills-progress">
      <h1><i className="fa-solid fa-chart-line"></i> Technical Skills</h1>
      <div className="skills-bars">
        <div className="skill-item">
          <div className="skill-header">
            <span className="skill-name"><i className="fa-brands fa-html5"></i> HTML</span>
            <span className="skill-percent">95%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-progress-bar html-bar"></div>
          </div>
        </div>
        
        <div className="skill-item">
          <div className="skill-header">
            <span className="skill-name"><i className="fa-brands fa-css3-alt"></i> CSS</span>
            <span className="skill-percent">90%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-progress-bar css-bar"></div>
          </div>
        </div>
        
        <div className="skill-item">
          <div className="skill-header">
            <span className="skill-name"><i className="fa-brands fa-js"></i> JavaScript</span>
            <span className="skill-percent">85%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-progress-bar js-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
