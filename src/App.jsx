
import './App.css'
import { useState } from 'react'
import AIChat from './components/AIChat'
import IntroAnimation from './components/IntroAnimation'
import ProjectModal from './components/ProjectModal'
import SkillModal from './components/SkillModal'

// Project Data
const projectsData = [
  {
    id: 1,
    title: 'Portfolio Website',
    icon: 'fa-solid fa-palette',
    description: 'A modern, responsive portfolio showcasing my work with stunning animations and navy blue theme.',
    tags: ['React', 'CSS3', 'Vite'],
    features: [
      'Stunning navy blue color palette with aqua accents',
      'Falling lines background animation for dynamic effect',
      'Card beam animations on all interactive elements',
      'AI chatbot integration using Ollama for visitor interaction',
      'Fully responsive design that works on all devices',
      'Smooth scroll navigation with animated sections'
    ],
    challenges: 'Creating smooth animations while maintaining 60fps performance across all devices. Implemented hardware acceleration using CSS transforms and will-change properties to ensure buttery-smooth animations.',
    results: 'Achieved a visually stunning portfolio with excellent performance metrics. The unique design stands out while maintaining professional appeal and accessibility standards.'
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    icon: 'fa-solid fa-code',
    description: 'Full-stack e-commerce solution with payment integration and real-time inventory management.',
    tags: ['React', 'Node.js', 'MongoDB'],
    features: [
      'Secure payment processing with Stripe integration',
      'Real-time inventory tracking and updates',
      'User authentication and authorization system',
      'Shopping cart with persistent storage',
      'Admin dashboard for product management',
      'Order tracking and email notifications'
    ],
    challenges: 'Implementing real-time inventory updates across multiple users while preventing overselling. Used MongoDB transactions and optimistic locking to ensure data consistency.',
    results: 'Successfully launched platform handling 1000+ daily transactions with 99.9% uptime. Reduced cart abandonment by 30% through streamlined checkout process.'
  },
  {
    id: 3,
    title: 'Task Management App',
    icon: 'fa-solid fa-mobile-screen',
    description: 'Intuitive task manager with drag-and-drop functionality and team collaboration features.',
    tags: ['Vue.js', 'Firebase', 'Tailwind'],
    features: [
      'Drag-and-drop task organization with smooth animations',
      'Real-time collaboration with multiple team members',
      'Task prioritization and deadline tracking',
      'File attachments and comments on tasks',
      'Custom project boards and workflows',
      'Mobile-responsive design for on-the-go access'
    ],
    challenges: 'Synchronizing drag-and-drop state across multiple users in real-time. Implemented Firebase Realtime Database with conflict resolution strategies.',
    results: 'Improved team productivity by 40% with intuitive interface. Users report 25% faster task completion times compared to previous tools.'
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    icon: 'fa-solid fa-chart-line',
    description: 'Real-time data visualization dashboard with interactive charts and customizable widgets.',
    tags: ['React', 'D3.js', 'API'],
    features: [
      'Interactive charts with zoom and pan capabilities',
      'Real-time data updates using WebSocket connections',
      'Customizable dashboard layouts with drag-and-drop',
      'Multiple chart types: line, bar, pie, scatter plots',
      'Data export functionality in multiple formats',
      'Responsive design that adapts to screen size'
    ],
    challenges: 'Rendering large datasets efficiently without performance degradation. Implemented data virtualization and canvas-based rendering for optimal performance.',
    results: 'Dashboard handles 100,000+ data points with smooth 60fps rendering. Reduced data analysis time by 60% through intuitive visualizations.'
  },
  {
    id: 5,
    title: 'Interactive Game',
    icon: 'fa-solid fa-gamepad',
    description: 'Browser-based game with smooth animations, sound effects, and leaderboard system.',
    tags: ['JavaScript', 'Canvas', 'WebGL'],
    features: [
      'Smooth 60fps gameplay using requestAnimationFrame',
      'Particle effects and dynamic lighting with WebGL',
      'Sound effects and background music',
      'Global leaderboard with real-time updates',
      'Multiple difficulty levels and game modes',
      'Touch controls for mobile devices'
    ],
    challenges: 'Maintaining consistent frame rate across different devices and browsers. Optimized rendering pipeline and implemented adaptive quality settings.',
    results: 'Achieved 10,000+ active players in first month. Average session time of 15 minutes with 70% return rate.'
  },
  {
    id: 6,
    title: 'Blog Platform',
    icon: 'fa-solid fa-blog',
    description: 'Modern blogging platform with markdown support, comments, and social sharing features.',
    tags: ['Next.js', 'GraphQL', 'Prisma'],
    features: [
      'Markdown editor with live preview',
      'SEO optimization with meta tags and sitemaps',
      'Comment system with moderation tools',
      'Social media sharing integration',
      'Image optimization and lazy loading',
      'Dark mode support with theme switching'
    ],
    challenges: 'Implementing server-side rendering for optimal SEO while maintaining fast page loads. Used Next.js ISR (Incremental Static Regeneration) for best of both worlds.',
    results: 'Achieved 95+ Lighthouse scores across all metrics. Organic traffic increased by 200% within 3 months of launch.'
  }
];

// Skills Data
const skillsData = {
  html: {
    title: 'HTML5',
    icon: 'fa-brands fa-html5',
    description: 'Expert in semantic HTML5 markup, creating accessible and SEO-friendly web structures. I focus on writing clean, maintainable code that follows web standards and best practices.',
    expertise: [
      'Semantic HTML elements for better accessibility',
      'Form validation and input types',
      'Canvas and SVG for graphics',
      'Web APIs (Geolocation, Storage, Workers)',
      'Microdata and structured data for SEO',
      'Responsive images and media elements'
    ],
    tools: ['VS Code', 'Emmet', 'HTML Validators', 'Accessibility Tools'],
    usage: 'I use HTML5 to create the foundation of every web project, ensuring proper document structure, accessibility compliance, and semantic meaning. From simple landing pages to complex web applications, HTML5 is where it all begins.'
  },
  css: {
    title: 'CSS3',
    icon: 'fa-brands fa-css3-alt',
    description: 'Advanced CSS3 skills including animations, flexbox, grid, and modern layout techniques. I create beautiful, responsive designs that work seamlessly across all devices.',
    expertise: [
      'CSS Grid and Flexbox for modern layouts',
      'CSS animations and transitions',
      'Custom properties (CSS variables)',
      'Responsive design with media queries',
      'CSS preprocessors (Sass, Less)',
      'Performance optimization and critical CSS'
    ],
    tools: ['Sass', 'PostCSS', 'Tailwind CSS', 'CSS Modules', 'Styled Components'],
    usage: 'CSS3 is my tool for bringing designs to life. I create stunning animations, responsive layouts, and pixel-perfect interfaces. Whether it\'s a simple button hover effect or complex page transitions, CSS3 makes it possible.'
  },
  javascript: {
    title: 'JavaScript',
    icon: 'fa-brands fa-js',
    description: 'Proficient in modern JavaScript (ES6+) and frameworks. I build interactive, dynamic web applications with clean, efficient code following industry best practices.',
    expertise: [
      'ES6+ features (arrow functions, destructuring, modules)',
      'Async programming (Promises, async/await)',
      'DOM manipulation and event handling',
      'React and Vue.js frameworks',
      'State management (Redux, Vuex)',
      'API integration and data fetching'
    ],
    tools: ['React', 'Vue.js', 'Node.js', 'Webpack', 'Babel', 'ESLint'],
    usage: 'JavaScript powers the interactivity in all my projects. From simple form validations to complex single-page applications, I use JavaScript to create engaging user experiences. I\'m comfortable with both vanilla JS and modern frameworks like React and Vue.'
  }
};



const Home = () => {
  return (
    <div className="Home">
       <img src="logo.png" className="logo" alt="logo" title="Jullian Paragoso - Frontend Developer" />
      <nav className="navbar">
        <a href="#" title="Go to top of page"><i className="fa-solid fa-house"></i> Home</a>
        <a href="#about" title="Learn more about Jullian"><i className="fa-solid fa-user"></i> About</a>
        <a href="#experience" title="View work experience"><i className="fa-solid fa-briefcase"></i> Experience</a>
        <a href="#projects" title="Explore projects portfolio"><i className="fa-solid fa-diagram-project"></i> Projects</a>
        <a href="#contact" title="Get in touch"><i className="fa-solid fa-envelope"></i> Contact</a>
      </nav>
    </div>
  )
}


const Body = ({ onOpenAI }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="body">
      <div className="body-content">
        <h2><i className="fa-solid fa-heart"></i> Gay Obsessed developer</h2>
         <h1><i className="fa-solid fa-code"></i> I'm <span>Jullian Paragoso</span></h1>
         <h2><i className="fa-solid fa-laptop-code"></i> Frontend Developer</h2>
          <p>I'm a Frontend Developer with a passion for creating beautiful and functional<br/> websites. I have a strong background in HTML, CSS, and JavaScript, and I'm always eager<br/> to learn new technologies and improve my skills.</p>
          <img src="profile.png" className="profile" alt="profile "/>
      </div>
      <div className="body-btn">
        <a href="#contact" className="btn" title="Send me a message"><i className="fa-solid fa-paper-plane"></i> Contact Me <i className="fa-solid fa-arrow-right"></i></a>
        <button onClick={onOpenAI} className="btn" title="Chat with my AI assistant"><i className="fa-solid fa-robot"></i> Ask My AI <i className="fa-solid fa-arrow-right"></i></button>
      </div>
      
      {/* Decorative Corner Arrows */}
      <div className="corner-decorations">
        <i className="fa-solid fa-code corner-icon top-left"></i>
        <i className="fa-solid fa-terminal corner-icon top-right"></i>
        <i className="fa-solid fa-laptop-code corner-icon bottom-left"></i>
        <i className="fa-solid fa-brackets-curly corner-icon bottom-right"></i>
      </div>


      <div id="about" className="about">
        <h1 className='about-title'><i className="fa-solid fa-circle-info"></i> About</h1>
        <div className="about-content">
          <img src="keyboard.png" className="keyboard" alt="keyboard "/>
          <p>I'm a passionate frontend developer with<br/> expertise in creating responsive and user-friendly<br/> websites. My journey in web development began with <br/>a curiosity about how websites are built, and it <br/>has evolved into a career where I help businesses bring their<br/> digital visions to life.</p>
        </div>
         <div className="files">
            <button onClick={() => setSelectedSkill(skillsData.html)} className="btntn"><i className="fa-brands fa-html5"></i> HTML</button>
            <button onClick={() => setSelectedSkill(skillsData.css)} className="btntn"><i className="fa-brands fa-css3-alt"></i> CSS</button>
            <button onClick={() => setSelectedSkill(skillsData.javascript)} className="btntn"><i className="fa-brands fa-js"></i> JavaScript</button>
         </div>
         
         {/* Decorative Arrows */}
         <div className="decorative-arrows">
           <i className="fa-solid fa-angles-down arrow-bounce"></i>
         </div>
      </div>

      <div id="experience" className="Experience">
        <h1><i className="fa-solid fa-star"></i> Experience</h1>
      <div className="experience-content">
        <div className="experience-item">
          <div className="experience1 card-beam">
           <h2>Frontend Developer</h2>
           <h3>Self-Employed</h3>
            <p>
            <i className="fa-solid fa-arrow-right"></i> 
             Developing responsive, user-centric web interfaces using modern frameworks like React and Vue.
            </p>
            <p>
             <i className="fa-solid fa-arrow-right"></i> 
              Bridging the gap between design and technical implementation to ensure pixel-perfect layouts.
           </p>
      </div>

     <div className="experience1 card-beam">
       <h2 >Software Engineer</h2>
       <h3 >Self-Employed</h3>
       <p>
          <i className="fa-solid fa-arrow-right"></i> 
          Architecting scalable backend systems and optimizing database performance for high-traffic apps.
       </p>
         <p>
           <i className="fa-solid fa-arrow-right"></i> 
          Implementing robust API integrations and ensuring seamless data flow across the stack.
        </p>
       </div>

      <div className="experience1 card-beam">
        <h2 >Gay Developer & Creator</h2>
       <h3 >Self-Employed</h3>
       <p>
         <i className="fa-solid fa-arrow-right"></i> 
         I am a passionate developer born to create digital spaces where technology meets identity.
       </p>
       <p>
         <i className="fa-solid fa-arrow-right"></i> 
         Dedicated to building inclusive user experiences and advocating for diversity within the tech     community.
        </p>
        <p>
         <i className="fa-solid fa-arrow-right"></i> 
          Turning complex code into meaningful connections and beautiful, functional products.
         </p>
       </div>
        </div>  
      </div>    
    </div>






    
    <div id="projects" className="Projects">
      <h1><i className="fa-solid fa-rocket"></i> Projects</h1>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card card-beam">
            <div className="project-icon">
              <i className={project.icon}></i>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <button onClick={() => setSelectedProject(project)} className="project-link">
              View Details <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </div>

    <div id="contact" className="Contact">
      <h1><i className="fa-solid fa-paper-plane"></i> Contact</h1>
      <div className="contact-content">
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=DVgPXsJjSfvjjXjdhkTcdNrQWmmpBhMwhVBLshXghLvsrvqmzsWTWZkjJTwmhGfrphmJLQnfJjCSDjqsxfQDZdbtmBmNmsVLbMmvtnWvqWNDZCsGDMLnRdSSlfgDFbrTXRcfkTSMRQfsjXVhzwzCwqJhDgrbTbwsHvRMXKnfCNVJnSNQgllFZSGktFmdtWTdNdrVNWhxRvJWWLdGHkFqlCRCqqSXtLRRjRktLHqLFWT" className="contact-item card-beam" title="Send an email to Jullian">
          <i className="fa-regular fa-envelope"></i>
          <h2>Email</h2>
          <p>godsoftheyear1@gmail.com</p>
        </a>
        <a href="https://www.linkedin.com/in/jullian-paragoso-63a8103b2/" target="_blank" rel="noopener noreferrer" className="contact-item card-beam" title="Connect on LinkedIn">
          <i className="fa-brands fa-linkedin"></i>
          <h2>LinkedIn</h2>
          <p>Professional Network</p>
        </a>
        <a href="https://www.facebook.com/badomen159/" target="_blank" rel="noopener noreferrer" className="contact-item card-beam" title="Follow on Facebook">
          <i className="fa-brands fa-facebook"></i>
          <h2>Facebook</h2>
          <p>Social Updates</p>
        </a>
      </div>
      <a href="https://www.instagram.com/badomen159/" target="_blank" rel="noopener noreferrer" className="contact-item1 card-beam" title="Follow on Instagram">
        <i className="fa-brands fa-instagram"></i>
          <h2>Instagram</h2>
          <p>Visual Stories</p>
        </a>
        <a href="tel:+9757419859" className="contact-item1 card-beam" title="Call Jullian">
          <i className="fa-solid fa-phone"></i>
          <h2>Phone</h2>
          <p>09357413096</p>
        </a>
        <a href="https://github.com/godsoftheyear1-byte" target="_blank" rel="noopener noreferrer" className="contact-item1 card-beam" title="View GitHub repositories">
          <i className="fa-brands fa-github"></i>
          <h2>GitHub</h2>
          <p>Code Portfolio</p>
        </a>
        <div className="h4">
          <h4><i className="fa-solid fa-heart"></i> © 2024 Jullian Paragoso <i className="fa-solid fa-code"></i> built with Gay power vision <i className="fa-solid fa-rainbow"></i></h4>
        </div>
        
        {/* Scroll to Top Button */}
        <a href="#" className="scroll-to-top">
          <i className="fa-solid fa-arrow-up"></i>
        </a>
        
        {/* Modals */}
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
        <SkillModal 
          skill={selectedSkill} 
          isOpen={!!selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
    </div>
    </div>
  )
}

const FallingLines = () => {
  return (
    <div className="falling-lines">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="line"></div>
      ))}
    </div>
  )
}

const FloatingAIButton = ({ onClick }) => {
  return (
    <button 
      className="floating-ai-button" 
      onClick={onClick} 
      aria-label="Open AI Chat"
      title="Chat with Jullian's AI Assistant"
    >
      <i className="fa-solid fa-robot"></i>
      <span className="ai-pulse"></span>
    </button>
  )
}

const App = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="App">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <FallingLines />
      <Home />
      <Body onOpenAI={() => setIsAIChatOpen(true)} />
      <FloatingAIButton onClick={() => setIsAIChatOpen(true)} />
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default App
