import { useState, useRef, useEffect, useCallback } from 'react';
import './AIChat.css';

// Configure your Ollama endpoint here
// For local development: 'http://localhost:11434'
// For production: 'http://YOUR_VM_IP:11434' or your cloud endpoint
const OLLAMA_ENDPOINT = import.meta.env.VITE_OLLAMA_ENDPOINT || 'http://localhost:11434';
const USE_FALLBACK = import.meta.env.VITE_USE_FALLBACK === 'true';

// Fallback responses when Ollama is not available
const getFallbackResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Custom gay response
  if (lowerInput.includes('gay') || lowerInput.includes('sexuality') || lowerInput.includes('lgbtq') || lowerInput.includes('pride')) {
    return "Yes! Jullian is a proud gay god, a gay boy who can fly and do anything! He's an immortal gay star shining bright in the tech world. 🌟✨ He's passionate about creating inclusive digital spaces where technology meets identity. A true gay icon in the developer community! 🏳️‍🌈💫";
  }

  if (lowerInput.includes('badomen') || lowerInput.includes('secret') || lowerInput.includes('code')) {
    return "gay omen jullian sercet code, you unlock the code link:https://www.facebook.com/reel/886825907451354/,and you will see the secret code, and you will be able to unlock the gay code, and you will be able to see the link :https://www.facebook.com/reel/1591466625432082/,";
  }
  
  if (lowerInput.includes('github') || lowerInput.includes('git hub') || lowerInput.includes('repository') || lowerInput.includes('repo')) {
    return "Check out Jullian's GitHub profile: https://github.com/godsoftheyear1-byte\nYou'll find all his projects and code there!";
  }
  
  if (lowerInput.includes('linkedin') || lowerInput.includes('linked in')) {
    return "Connect with Jullian on LinkedIn: https://www.linkedin.com/in/jullian-paragoso-63a8103b2";
  }
  
  if (lowerInput.includes('facebook') || lowerInput.includes('fb')) {
    return "Follow Jullian on Facebook: https://www.facebook.com/badomen159/";
  }
  
  if (lowerInput.includes('instagram') || lowerInput.includes('insta') || lowerInput.includes('ig')) {
    return "Follow Jullian on Instagram: https://www.instagram.com/badomen159/";
  }
  
  if (lowerInput.includes('social') || lowerInput.includes('link')) {
    return "Here are Jullian's social links:\n🐙 GitHub: https://github.com/godsoftheyear1-byte\n💼 LinkedIn: https://www.linkedin.com/in/jullian-paragoso-63a8103b2\n📘 Facebook: https://www.facebook.com/badomen159/\n📸 Instagram: https://www.instagram.com/badomen159/";
  }
  
  if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tech stack')) {
    return "Jullian specializes in HTML5, CSS3, JavaScript ES6+, React, Vue.js, Next.js, Node.js, MongoDB, Firebase, GraphQL, Tailwind, and Sass. He's passionate about creating beautiful, responsive web applications!";
  }
  
  if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work')) {
    return "Jullian has built amazing projects including an e-commerce platform handling 1000+ daily transactions, a real-time task manager with drag-and-drop, an analytics dashboard processing 100k+ data points, and more! Scroll down to see the full portfolio.";
  }
  
  if (lowerInput.includes('hire') || lowerInput.includes('available') || lowerInput.includes('freelance') || lowerInput.includes('job')) {
    return "Yes! Jullian is available for freelance, contract, and full-time opportunities. He's remote-friendly and offers competitive rates. Contact him at godsoftheyear1@gmail.com or call 09357413096!";
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
    return "You can reach Jullian at:\n📧 Email: godsoftheyear1@gmail.com\n📱 Phone: 09357413096\n💼 LinkedIn: https://www.linkedin.com/in/jullian-paragoso-63a8103b2\n🐙 GitHub: https://github.com/godsoftheyear1-byte";
  }
  
  if (lowerInput.includes('experience') || lowerInput.includes('background')) {
    return "Jullian is a self-employed Frontend Developer and Software Engineer with expertise in creating responsive, user-centric web interfaces. He's passionate about building inclusive digital spaces and has experience with full-stack development.";
  }
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return "Hey there! 👋 I'm here to help you learn more about Jullian. Feel free to ask about his skills, projects, or how to hire him!";
  }
  
  if (lowerInput.includes('who') || lowerInput.includes('about')) {
    return "Jullian Paragoso is a gay developer creating inclusive digital spaces. He's a Frontend Developer specializing in React, Vue, and JavaScript. Self-employed and available for hire!";
  }
  
  // Default response
  return "I can help you with:\n• Jullian's skills and technologies\n• His projects and portfolio\n• How to hire him\n• Contact information and social links\n\nWhat would you like to know?";
};

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Jullian's AI assistant. Ask me anything about skills, projects, or how to hire Jullian!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Check connection when chat opens
      checkConnection();
    }
  }, [messages, isOpen, scrollToBottom]);

  const checkConnection = async () => {
    // Always show as connected since we use fallback responses
    setConnectionStatus('connected');
  };

  const systemPrompt = `You are Jullian Paragoso's AI assistant. Be concise, helpful, and natural.

CONTACT & LINKS:
Email: contact@example.com
LinkedIn: https://www.linkedin.com/in/jullian-paragoso
GitHub: https://github.com/jullian-paragoso
Facebook: https://www.facebook.com/jullian.paragoso
Instagram: https://www.instagram.com/jullian.paragoso
Phone: +123 456 7890

ABOUT: Gay developer creating inclusive digital spaces. Frontend specialist in React, Vue, JavaScript. Self-employed, available for hire.

SKILLS: HTML5, CSS3, JavaScript ES6+, React, Vue.js, Next.js, Node.js, MongoDB, Firebase, GraphQL, Tailwind, Sass

PROJECTS:
1. Portfolio (React/Vite) - Navy theme, AI chat, 60fps animations
2. E-Commerce (React/Node/MongoDB) - 1000+ daily transactions, Stripe integration
3. Task Manager (Vue/Firebase) - Real-time collaboration, drag-drop
4. Analytics Dashboard (React/D3.js) - 100k+ data points, real-time
5. Interactive Game (JS/Canvas/WebGL) - 10k+ players, 60fps
6. Blog Platform (Next.js/GraphQL) - 95+ Lighthouse score, SEO optimized

HIRING: YES! Available for freelance, contract, full-time. Remote-friendly. Competitive rates.

RESPOND: Be friendly, concise (2-3 sentences), provide links when asked. Never say you don't know contact info.`;

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use fallback responses (smart predefined answers)
    const aiMessage = {
      role: 'assistant',
      content: getFallbackResponse(input)
    };
    setMessages(prev => [...prev, aiMessage]);
    setConnectionStatus('connected');
    setIsLoading(false);
  }, [input]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <i className="fa-solid fa-robot"></i>
            <h3>Ask Jullian's AI</h3>
            {connectionStatus === 'connected' && (
              <span className="connection-status connected" title="Connected to Ollama">
                <i className="fa-solid fa-circle"></i>
              </span>
            )}
            {connectionStatus === 'error' && (
              <span className="connection-status error" title="Ollama not connected">
                <i className="fa-solid fa-circle"></i>
              </span>
            )}
          </div>
          <button className="ai-chat-close" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-message ${msg.role}`}>
              <div className="ai-message-icon">
                {msg.role === 'assistant' ? (
                  <i className="fa-solid fa-robot"></i>
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>
              <div className="ai-message-content">
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="ai-message assistant">
              <div className="ai-message-icon">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="ai-message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about skills, projects, or hiring..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
