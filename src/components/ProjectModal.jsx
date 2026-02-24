import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container card-beam" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
        
        <div className="modal-header">
          <div className="modal-icon">
            <i className={project.icon}></i>
          </div>
          <h2>{project.title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3><i className="fa-solid fa-info-circle"></i> Overview</h3>
            <p>{project.description}</p>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-star"></i> Key Features</h3>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>
                  <i className="fa-solid fa-check"></i> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-code"></i> Technologies Used</h3>
            <div className="modal-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="modal-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-lightbulb"></i> Challenges & Solutions</h3>
            <p>{project.challenges}</p>
          </div>

          <div className="modal-section">
            <h3><i className="fa-solid fa-trophy"></i> Results</h3>
            <p>{project.results}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i> Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
