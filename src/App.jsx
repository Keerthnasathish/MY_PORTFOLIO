import React, { useEffect, useState, useRef } from 'react';
import Hyperspeed from './components/Hyperspeed';
import Shuffle from './components/Shuffle';
import LogoLoop from './components/LogoLoop';
import MagicBento from './components/MagicBento';
import GridScan from './components/GridScan';
import { 
  SiPython, SiMysql, SiReact, SiDjango, SiTensorflow, SiNumpy, SiPandas, 
  SiC, SiJupyter, SiOpencv 
} from 'react-icons/si';
import { FaLinkedinIn, FaGithub, FaGraduationCap, FaBriefcase, FaAward, FaAws, FaCloud } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

import './App.css';

const projectsData = [
  {
    title: "Flora AI",
    label: "Deep Learning · CV",
    description: "CNN-based plant health diagnostic system with >90% accuracy using TensorFlow and OpenCV. Detects anomalies and diseases early.",
    tags: ["Python", "TensorFlow", "OpenCV", "NumPy"]
  },
  {
    title: "THOL",
    label: "Medical AI · Multimodal",
    description: "Hybrid CNN–ViT skin classifier for Indian skin tones with 7+ language voice interface to serve rural populations.",
    tags: ["PyTorch", "ViT", "STT", "TTS", "NLP"]
  },
  {
    title: "Weather Chatbot",
    label: "RAG · LLM",
    description: "RAG-based AI chatbot for real-time weather insights and climate trend predictions, integrating live APIs.",
    tags: ["React JS", "Django", "Python", "SpaCy"]
  }
];

function App() {
  const [typedRole, setTypedRole] = useState('');
  const roles = [
    "Data Analyst", 
    "Data Science Explorer", 
    "FinTech Enthusiast", 
    "AI Builder"
  ];
  
  // Intersection Observer for scroll animations
  const observerRefs = useRef([]);
  const addToObserver = (el) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    observerRefs.current.forEach(ref => {
      observer.observe(ref);
    });

    return () => {
      observerRefs.current.forEach(ref => {
        observer.unobserve(ref);
      });
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;
    
    const type = () => {
      const currentRole = roles[index];
      
      if (isDeleting) {
        setTypedRole(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedRole(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;
        timeout = setTimeout(type, 500);
      } else {
        timeout = setTimeout(type, isDeleting ? 50 : 100);
      }
    };
    
    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app-container">
      
      {/* Sticky Navbar */}
      <nav className="navbar glass-card">
        <div className="nav-content">
          <div className="nav-logo">
            <Shuffle triggerOnHover={true} tag="span" colorFrom="#ffffff" colorTo="#00f5ff" animationMode="evenodd">
              SSMK
            </Shuffle>
          </div>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section" style={{ zIndex: 20, background: '#000000' }}>
        <Hyperspeed
          effectOptions={{"distortion":"turbulentDistortion","length":400,"roadWidth":10,"islandWidth":2,"lanesPerRoad":3,"fov":90,"fovSpeedUp":150,"speedUp":2,"carLightsFade":0.4,"totalSideLightSticks":20,"lightPairsPerRoadWay":40,"shoulderLinesWidthPercentage":0.05,"brokenLinesWidthPercentage":0.1,"brokenLinesLengthPercentage":0.5,"lightStickWidth":[0.12,0.5],"lightStickHeight":[1.3,1.7],"movingAwaySpeed":[60,80],"movingCloserSpeed":[-120,-160],"carLightsLength":[12,80],"carLightsRadius":[0.05,0.14],"carWidthPercentage":[0.3,0.5],"carShiftX":[-0.8,0.8],"carFloorSeparation":[0,5],"colors":{"roadColor":526344,"islandColor":657930,"background":0,"shoulderLines":1250072,"brokenLines":1250072,"leftCars":[14177983,6770850,12732332],"rightCars":[242627,941733,3294549],"sticks":242627}}}
        />
        <div className="hero-content">
          <div className="hero-titles relative">
            <Shuffle 
              tag="h1" 
              className="hero-heading"
              shuffleDirection="right" 
              animationMode="evenodd" 
              triggerOnHover={true} 
              loop={false} 
              colorFrom="#ffffff" 
              colorTo="#00f5ff"
            >
              S S M KEERTHNA
            </Shuffle>
            <h2 className="typewriter-text">{typedRole}<span className="cursor">|</span></h2>
            <p className="hero-subtext">
              Aspiring data Analystwith hands-on experience ,Data science, machine learning, and real-world project development.
            </p>
            <div className="hero-ctas">
              <a href="/keerthna_cv.pdf" target="_blank" className="btn-primary">Download CV</a>
              <a href="#projects" className="btn-secondary">View Projects</a>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed GridScan Background for remaining sections */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost={false}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* About Section */}
      <div className="cyan-divider" />
      <section id="about" className="section full-width fade-in-section" ref={addToObserver}>
        <div className="about-grid">
          <div className="about-text glass-card">
            <h2 className="section-title"><span className="cyan-text">/</span> About Me</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <img src="/profile.jpg" alt="S S M Keerthna profile" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f5ff' }} />
              <div style={{ flex: 1, minWidth: '300px' }}>
                <p>
                  I'm Keerthna, a CSE student at SRM IST-Trichy with a strong interest in Data Analytics, FinTech, and Data Science. I work with data, build analytical models, and apply technology to solve real-world problems. Currently developing expertise in statistical thinking, ML, and emerging financial technologies — committed to continuous growth and innovation.
                </p>
              </div>
            </div>
            <div className="contact-row">
              <span><MdEmail /> keerthnasathishkumar@gmail.com</span>
              <span><MdPhone /> 9786791949</span>
              <span><MdLocationOn /> Trichy, Tamil Nadu</span>
            </div>
            <div className="social-row">
              <a href="https://www.linkedin.com/in/s-s-m-keerthna-3403ba319/" target="_blank" rel="noreferrer" className="btn-icon">
                <FaLinkedinIn size={20} />
              </a>
              <a href="https://github.com/Keerthnasathish" target="_blank" rel="noreferrer" className="btn-icon">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section fade-in-section" ref={addToObserver}>
        <h2 className="section-title"><span className="cyan-text">/</span> Skills & Technologies</h2>
        <div className="skills-loops">
          <LogoLoop speed={80} direction="left" fadeOut={true} fadeOutColor="#0a0a0a" scaleOnHover={true}>
            <div className="skill-node"><SiPython size={40} className="cyan-glow" /> <span>Python</span></div>
            <div className="skill-node"><SiC size={40} /> <span>C</span></div>
            <div className="skill-node"><SiNumpy size={40} className="cyan-glow" /> <span>NumPy</span></div>
            <div className="skill-node"><SiPandas size={40} /> <span>Pandas</span></div>
            <div className="skill-node"><SiTensorflow size={40} className="cyan-glow" /> <span>TensorFlow</span></div>
            <div className="skill-node"><SiMysql size={40} /> <span>SQL</span></div>
            <div className="skill-node"><span>Deep Learning</span></div>
            <div className="skill-node"><span>NLP</span></div>
          </LogoLoop>

          <LogoLoop speed={80} direction="right" fadeOut={true} fadeOutColor="#0a0a0a" scaleOnHover={true}>
            <div className="skill-node"><span>Computer Vision</span></div>
            <div className="skill-node"><span>RAG Models</span></div>
            <div className="skill-node"><span>LLMs</span></div>
            <div className="skill-node"><span>Generative AI</span></div>
            <div className="skill-node"><FaCloud size={40} className="cyan-glow" /> <span>IBM Cloud</span></div>
            <div className="skill-node"><FaAws size={40} /> <span>AWS</span></div>
            <div className="skill-node"><SiDjango size={40} className="cyan-glow" /> <span>Django</span></div>
            <div className="skill-node"><SiReact size={40} /> <span>React JS</span></div>
            <div className="skill-node"><span>Data Analytics</span></div>
          </LogoLoop>
        </div>
      </section>

      {/* Projects Section */}
      <div className="cyan-divider" />
      <section id="projects" className="section fade-in-section" ref={addToObserver}>
        <h2 className="section-title"><span className="cyan-text">/</span> Featured Projects</h2>
        <MagicBento 
          projects={projectsData} 
          enableStars={true} 
          enableSpotlight={true} 
          enableBorderGlow={true} 
          enableTilt={true} 
          enableMagnetism={true} 
          glowColor="0, 245, 255" 
          spotlightRadius={350} 
          particleCount={15}
        />
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="section fade-in-section" ref={addToObserver}>
        <h2 className="section-title"><span className="cyan-text">/</span> Experience & Education</h2>
        <div className="timeline-container">
          
          <div className="timeline-item left">
            <div className="timeline-node" />
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <FaBriefcase className="cyan-text" /> <h3>IBM Cloud</h3>
              </div>
              <span className="timeline-date">Jul – Aug 2025</span>
              <p>Built a cloud-based AI Travel Planner chatbot, deployed on cloud leveraging conversational AI.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-node" />
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <FaBriefcase className="cyan-text" /> <h3>Microsoft</h3>
              </div>
              <span className="timeline-date">May – Jun 2025</span>
              <p>GenAI Intern; orchestrated a personalized learning assistant using advanced transformer-based models.</p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-node" />
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <FaBriefcase className="cyan-text" /> <h3>Elevate Labs</h3>
              </div>
              <span className="timeline-date">Jun – Jul 2025</span>
              <p>SQL Developer Intern; handled database design, complex queries, and backend performance optimization.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-node highlight-node" />
            <div className="glass-card timeline-content educate-card">
              <div className="timeline-header">
                <FaGraduationCap className="cyan-text" /> <h3>SRM IST-Trichy</h3>
              </div>
              <span className="timeline-date">2023 – 2027</span>
              <p>B.Tech Computer Science Engineering</p>
              <span className="grade glass-pill">CGPA: 9.47/10</span>
            </div>
          </div>

        </div>

        {/* Achievements */}
        <div className="achievements-row fade-in-section" ref={addToObserver}>
          <div className="glass-pill achievement-badge"><FaAward /> YUVA 2025 — 2nd Runner Up</div>
          <div className="glass-pill achievement-badge"><FaAward /> GYANITH Hackathon — Finalist</div>
          <div className="glass-pill achievement-badge"><FaAward /> SDG Innovate 2K25 — Top 5</div>
          <div className="glass-pill achievement-badge"><FaAward /> IEEE Paper — Vietnam (Dec 25)</div>
          <div className="glass-pill achievement-badge"><FaAward /> IEEE Paper — Flora AI (Mar 26)</div>
        </div>
      </section>

      {/* Certifications Section */}
      <div className="cyan-divider" />
      <section id="certifications" className="section fade-in-section" ref={addToObserver}>
        <h2 className="section-title"><span className="cyan-text">/</span> Certifications</h2>
        <LogoLoop speed={50} direction="left" duration="30s">
          <div className="glass-pill cert-pill">Introduction to IoT — Swayam</div>
          <div className="glass-pill cert-pill">Database System Eng — IITM</div>
          <div className="glass-pill cert-pill">Intro to AI — IBM</div>
          <div className="glass-pill cert-pill">DB & SQL for Data Science — IBM</div>
          <div className="glass-pill cert-pill">Data Analytics — LinkedIn</div>
          <div className="glass-pill cert-pill">GenAI Foundations — AWS</div>
          <div className="glass-pill cert-pill">Data Science — Forage/BCGX</div>
        </LogoLoop>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in-section" ref={addToObserver}>
        <div className="contact-card glass-card" style={{ gridTemplateColumns: '1fr', textAlign: 'center', placeItems: 'center' }}>
          <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title"><span className="cyan-text">/</span> Let's Connect</h2>
            <p className="contact-desc" style={{ maxWidth: '600px' }}>Ready to build data-driven solutions or explore AI advancements? Reach out to me directly.</p>
            <div className="contact-methods" style={{ alignItems: 'center' }}>
              <div className="contact-method"><MdEmail size={24} className="cyan-text"/> keerthnasathishkumar@gmail.com</div>
              <div className="contact-method"><MdPhone size={24} className="cyan-text"/> +91 9786791949</div>
              <div className="contact-method"><MdLocationOn size={24} className="cyan-text"/> Trichy, Tamil Nadu, India</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section">
        <p>© 2026 S S M Keerthna. Crafted with precision.</p>
        <div className="social-row">
          <a href="https://www.linkedin.com/in/s-s-m-keerthna-3403ba319/" className="cyan-text"><FaLinkedinIn /></a>
          <a href="https://github.com/Keerthnasathish" className="cyan-text"><FaGithub /></a>
        </div>
      </footer>

    </div>
  );
}

export default App;
