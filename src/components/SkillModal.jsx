import { useEffect } from 'react';
import './ProjectModal.css'; // Reuse the same styles

const SkillModal = ({ skill, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen || !skill) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container card-beam" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
        
        <div className="modal-header">
          <div className="modal-icon">
            <i className={skill.icon}></i>
          </div>
          <h2>{skill.title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3><i className="fa-solid fa-info-circle"></i> About</h3>
            <p>{skill.description}</p>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-star"></i> Expertise</h3>
            <ul>
              {skill.expertise.map((item, index) => (
                <li key={index}>
                  <i className="fa-solid fa-check"></i> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-tools"></i> Tools & Technologies</h3>
            <div className="modal-tags">
              {skill.tools.map((tool, index) => (
                <span key={index} className="modal-tag">{tool}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-rocket"></i> What I Build With It</h3>
            <p>{skill.usage}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i> Back to Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
