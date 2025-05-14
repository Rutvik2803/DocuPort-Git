import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import './Welcome.css';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Welcome() {
  const navigate = useNavigate();
  const contactRef = useRef(null);
  const socialsRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSocials = () => {
    socialsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Formspree logic
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const FORM_ENDPOINT = 'https://formspree.io/f/xovdyabo'; // Replace with your actual Formspree endpoint

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="welcome-layout">
      {/* Sidebar (Fixed) */}
      <div className="sidebar">
        <h1>DocuPort</h1><br />
        <p>Document storage made <br /><span style={{ color: '#118ab2' }}>Simple !</span></p><br />
        <p>Login with otp. Just upload, store and access, anytime & anywhere.</p>
        <br />
        <div class="nav-list-bar">
            <div class="nav-list">
              <ul className="nav-list">
                <li>📂<br /> Instant <br />Access</li>
              </ul>
            </div>

            <div class="nav-list">
              <ul className="nav-list">
                <li>📊<br /> Ease of <br /> Usage</li>
              </ul>
            </div>

            <div class="nav-list">
              <ul className="nav-list">
                <li>🔒<br /> Secure <br />Storage</li>
              </ul>
            </div>
        </div>

        <button onClick={() => navigate('/login')}>Login</button>
        <ul className="nav-list2">
          <li className="link" onClick={scrollToContact}>📞 Contact</li>
          <li className="link" onClick={scrollToSocials}>📱 Socials</li>
        </ul>
      </div>

      {/* Right Scrollable Content */}
      <div className="scrollable-content">
        {/* Hero Section */}
        <div className="hero-section">
          <img src="Docuport.png" alt="Intro visual" />
        </div><br />
        <p class="description">We help you store personal documents<br /> with us securely</p>

        {/* Spacer Section */}
        <div className="spacer-section">
          <h2>Features</h2>
          <p>📁 Upload files instantly</p>
          <p>📊 View real-time analytics</p>
          <p>🔐 Securely store your portfolio documents</p>
          <p>🌐 Access anywhere, anytime</p>
          <p>📄 Supports all file types</p>
          <p>🧠 AI-powered search (coming soon)</p>
          <p style={{ marginBottom: '500px' }}>📈 Organize projects by tags and categories</p>
        </div>

        {/* Contact Section */}
        <div ref={contactRef} className="contact-section">
          <h2>Contact Us</h2><br />
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send</button>
            {submitted && <p className="success-msg">Thanks! We'll be in touch soon.</p>}
          </form>
        </div>

        {/* Socials Section */}
        <div ref={socialsRef} className="socials-section">
          <h2>Connect with us</h2><br />
          <div className="social-icons">
            <a href="https://www.instagram.com/rutvviik?igsh=YzRibWN6dGMzbXl1" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/rutvik-pradhan-59040724b/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://x.com/Rutvikkkkkkkkk?t=AraxdfgJo4Y-veaehvPo7Q&s=09" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
