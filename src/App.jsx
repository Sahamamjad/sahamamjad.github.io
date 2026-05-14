import { useState, useEffect, useRef } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

const SKILLS = {
  "Languages": ["Python", "Java", "SQL", "JavaScript", "HTML", "CSS"],
  "Frameworks & Libraries": ["FastAPI", "TensorFlow", "Scikit-learn", "React.js", "TypeScript", "Tailwind CSS", "Streamlit", "boto3"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Nginx", "PM2", "Linux VPS"],
  "Databases": ["MySQL", "PostgreSQL", "SQLite"],
  "Concepts & Other": ["OOP", "Data Structures", "Machine Learning", "Cloud Security", "DevSecOps", "Testing & Automation", "Windows", "Linux"],
};

const PROJECTS = [
  {
    title: "SecureDeploy",
    description:
      "A full-stack DevSecOps security dashboard that scans public GitHub repositories for exposed secrets, Python SAST (Bandit), dependency risks, and Dockerfile misconfigurations — using static analysis only in an isolated clone. Surfaces severity-based findings, security scores, scan history, and JSON/PDF exports through a React + TypeScript UI backed by FastAPI and SQLite.",
    tech: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "Docker"],
    github: "https://github.com/Sahamamjad/securedeploy",
    highlight: false,
  },
  {
    title: "Cloud Security Misconfiguration Scanner (AWS)",
    description:
      "A defensive, read-only tool that audits common AWS misconfigurations across S3, IAM, EC2 security groups, RDS, and CloudTrail — then scores risk and exports JSON, CSV, and HTML reports. Includes a Streamlit dashboard with an offline sample scan (no credentials required) plus optional live scans using least-privilege boto3 APIs only.",
    tech: ["Python", "Streamlit", "boto3", "AWS", "Docker"],
    github: "https://github.com/sahamamjad/cloud-misconfiguration-scanner",
    highlight: false,
  },
  {
    title: "Phishing URL Detection System",
    description:
      "A cybersecurity and machine learning web app that classifies URLs as legitimate or phishing using hand-crafted lexical features and a trained scikit-learn ensemble. Includes a React dashboard, Flask REST API with explainable per-feature scores, and model artefacts for reproducible training — useful for triage workflows and security education.",
    tech: ["Python", "Flask", "scikit-learn", "React.js", "Tailwind CSS", "Joblib"],
    github: "https://github.com/sahamamjad/phishing-url-detection",
    highlight: false,
  },
  {
    title: "AI-Powered Autism Detection System",
    description:
      "A deep-learning system for detecting Autism Spectrum Disorder (ASD) from facial images. Compared CNN, VGG16, VGG19, EfficientNetB3 and EfficientNetB4, achieving 97.44% accuracy with the best model. Includes a full-stack web app with PDF report generation.",
    tech: ["Python", "TensorFlow", "Keras", "EfficientNet", "React.js", "Tailwind CSS", "OpenCV", "Scikit-learn"],
    github: "https://github.com/Sahamamjad/AI-Powered-Autism-Detection-System-Using-Facial-Analysis",
    highlight: true,
  },
  {
    title: "AI Resume Analyser",
    description:
      "A resume analysis API built with Python and FastAPI. Extracts text from PDF and DOCX resumes, detects skills and scores candidates automatically. Deployed on a Linux VPS using Nginx and PM2 for production-grade reliability.",
    tech: ["Python", "FastAPI", "PDF/DOCX Parsing", "Nginx", "PM2", "Linux VPS"],
    github: "https://github.com/Sahamamjad/ai-resume-analyzer",
    highlight: false,
  },
  {
    title: "Classification of Malwares Using Machine Learning Models and Sandbox Based Methodology",
    description:
      "Traditional antiviruses and signature-based solutions cannot keep pace with the proliferation of modern malware — Panda Labs reported 18 million new samples in Q3 2017 alone (~200,000/day). This project addresses that gap with an AI-driven malware analysis and classification system that goes beyond reactive, heuristic defences. It leverages machine learning to detect and categorise malware at scale, tackling a challenge that makes manual security-analyst review practically impossible.",
    tech: ["Python", "Machine Learning", "Scikit-learn", "Static Analysis", "Dynamic Analysis", "Cybersecurity"],
    github: "https://github.com/Sahamamjad/malware-classification",
    highlight: false,
  },
  {
    title: "Tudo App",
    description:
      "A clean, responsive task management application built with JavaScript. Features task creation, completion tracking, filtering, and local persistence — helping users stay organised with a minimal interface.",
    tech: ["JavaScript", "HTML", "CSS", "LocalStorage API"],
    github: "https://github.com/Sahamamjad/Tudo_app",
    highlight: false,
  },
];

const EXPERIENCE = [
  {
    role: "Software Developer — Freelance / Personal Projects",
    company: "Self-Employed (GitHub)",
    period: "2023 – Present",
    bullets: [
      "Designed and built AI-powered full-stack applications from concept to deployment.",
      "Developed an AI Autism Detection System achieving 97.44% accuracy using EfficientNet and TensorFlow.",
      "Built an AI Resume Analyser API using Python and FastAPI, deployed on Linux VPS with Nginx and PM2.",
      "Created a malware classification system using ML models and Cuckoo Sandbox achieving high detection accuracy.",
      "Shipped a phishing URL detection lab (React, Flask, scikit-learn) with explainable features and REST inference.",
      "Delivered a read-only AWS misconfiguration scanner (Streamlit, boto3) with CIS-oriented findings and exportable reports.",
      "Built SecureDeploy — a DevSecOps repo scanner (FastAPI, React, SQLite) with secrets/SAST/Dockerfile checks and exportable reports.",
    ],
  },
  {
    role: "Head of IT Support",
    company: "Estate Asset Pvt Ltd",
    period: "March 2023 – August 2024 | Islamabad, Pakistan",
    bullets: [
      "Designed, developed, and maintained software solutions across cross-functional teams.",
      "Created, tested, and deployed high-quality software applications ensuring performance, scalability, and security.",
      "Collaborated with business stakeholders to align technical solutions with client requirements.",
    ],
  },
  {
    role: "Head of IT Support",
    company: "Wirasat Real Estate",
    period: "January 2019 – March 2023 | Islamabad, Pakistan",
    bullets: [
      "Designed and maintained internal software tools using Python and SQL.",
      "Improved operational efficiency through automation and system optimisation.",
      "Provided technical support and maintained IT infrastructure for the organisation.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "MSc Computing",
    grade: "Distinction",
    institution: "University of Huddersfield, UK",
    period: "2024 – 2025",
    notes: "Modules: Data Mining, Machine Learning, Software Development, Web and Network Services, Databases for Large Datasets, Semantic Web, Autonomous & Autonomic Intelligent Systems, Individual Project.",
  },
  {
    degree: "BS Computer Science",
    grade: "Graduate",
    institution: "Iqra University, Islamabad",
    period: "2013 – 2018",
    notes: "Modules: Programming Fundamentals, OOP, Web Development, DBMS, Advanced ML, Introduction to AI. Final Year Project: Classification of Malwares Using Machine Learning Models and Sandbox Based Methodology.",
  },
];

// ── Utility hooks ─────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Tiny components ────────────────────────────────────────────────────────

function Tag({ label }) {
  return (
    <span className="tag">
      {label}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="section-title-wrapper">
      <h2 className="section-title">{children}</h2>
      <div className="section-line" />
    </div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <a href="#hero" className="navbar__logo">SA</a>

      {/* Desktop links */}
      <ul className="navbar__links">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className={`navbar__link ${active === l.toLowerCase() ? "navbar__link--active" : ""}`}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile burger */}
      <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`burger-line ${open ? "burger-line--1-open" : ""}`} />
        <span className={`burger-line ${open ? "burger-line--2-open" : ""}`} />
        <span className={`burger-line ${open ? "burger-line--3-open" : ""}`} />
      </button>

      {open && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="navbar__mobile-link"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="hero__content">
        <p className="hero__greeting">Hello, I'm</p>
        <h1 className="hero__name">Saham<br />Amjad</h1>
        <p className="hero__title">Software Engineer</p>
        <p className="hero__bio">
          MSc Computing (Distinction) graduate with hands-on experience in IT support, software development,
          and system troubleshooting. Passionate about building impactful software and AI solutions.
          Based in Huddersfield, UK — actively seeking IT Support or Software Engineer roles.
        </p>

        <div className="hero__cta">
          <a href="https://github.com/sahamamjad" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <GithubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/saham-amjad-787a92126" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href="#contact" className="btn btn--outline">
            Contact Me
          </a>
          <a href="#" className="btn btn--ghost">
            ↓ Resume
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="section">
      <div className="container">
        <FadeIn><SectionTitle>About Me</SectionTitle></FadeIn>
        <div
          ref={ref}
          className="about__grid"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <div className="about__avatar">
            <div className="avatar-ring">
              <div className="avatar-inner">SA</div>
            </div>
          </div>

          <div className="about__text">
            <p>
              I'm <strong>Saham Amjad</strong>, an MSc Computing graduate with{" "}
              <span className="highlight">Distinction</span> from the University of Huddersfield, UK.
              I have hands-on experience in IT support, software development, and system troubleshooting
              gained across multiple roles in Pakistan and the UK.
            </p>
            <p>
              I'm experienced in supporting users, maintaining systems, and developing applications
              using Python, SQL, and web technologies. My projects span machine learning, AI-powered
              tools, and full-stack development — all built with a focus on real-world impact.
            </p>
            <p>
              I'm actively seeking an IT Support or Software Engineer role in the UK where I can
              grow, contribute from day one, and keep pushing my skills forward.
            </p>
            <p>
              🌐 <strong>Languages:</strong> Urdu (native) · English (professional) &nbsp;|&nbsp;
              🏅 <strong>Certifications:</strong> Level 2 Door Supervisor (SIA) · Emergency First Aid at Work
            </p>
            <div className="about__stats">
              {[
                { value: "MSc", label: "Distinction — Huddersfield" },
                { value: "5+", label: "Years Experience" },
                { value: "AI", label: "ML & Full-Stack" },
              ].map(({ value, label }) => (
                <div key={label} className="stat-card">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <FadeIn><SectionTitle>Skills</SectionTitle></FadeIn>
        <div className="skills__grid">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.07}>
              <div className="skill-card">
                <h3 className="skill-card__title">{category}</h3>
                <div className="skill-card__tags">
                  {items.map((s) => <Tag key={s} label={s} />)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p className="skills__note">
            ✏️ <strong>Tip:</strong> Update the skills list in the <code>SKILLS</code> constant at the top of the file to reflect your exact tech stack.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <FadeIn><SectionTitle>Projects</SectionTitle></FadeIn>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className={`project-card ${p.highlight ? "project-card--featured" : ""}`}>
                {p.highlight && <span className="project-card__badge">Featured</span>}
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.description}</p>
                <div className="project-card__tags">
                  {p.tech.map((t) => <Tag key={t} label={t} />)}
                </div>
                <div className="project-card__links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <GithubIcon /> GitHub
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <FadeIn><SectionTitle>Experience</SectionTitle></FadeIn>
        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="timeline__item">
                <div className="timeline__dot" />
                <div className="timeline__card">
                  <div className="timeline__header">
                    <div>
                      <h3 className="timeline__role">{exp.role}</h3>
                      <p className="timeline__company">{exp.company}</p>
                    </div>
                    <span className="timeline__period">{exp.period}</span>
                  </div>
                  <ul className="timeline__bullets">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <FadeIn><SectionTitle>Education</SectionTitle></FadeIn>
        <div className="edu__grid">
          {EDUCATION.map((e, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="edu-card">
                <div className="edu-card__icon">🎓</div>
                <div>
                  <h3 className="edu-card__degree">{e.degree}</h3>
                  <p className="edu-card__grade">{e.grade}</p>
                  <p className="edu-card__institution">{e.institution}</p>
                  <p className="edu-card__period">{e.period}</p>
                  <p className="edu-card__notes">{e.notes}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xbdwoerd", {        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <FadeIn><SectionTitle>Get In Touch</SectionTitle></FadeIn>
        <div className="contact__grid">
          <FadeIn delay={0}>
            <div className="contact__info">
              <p className="contact__intro">
                Whether you have a role, a project idea, or just want to connect — my inbox is always open.
              </p>
              <div className="contact__links">
                <a href="mailto:saham.amjad333@hotmail.com" className="contact__item">
                  <EmailIcon /> saham.amjad333@hotmail.com
                </a>
                <a href="https://www.linkedin.com/in/saham-amjad-787a92126" target="_blank" rel="noopener noreferrer" className="contact__item">
                  <LinkedinIcon /> linkedin.com/in/saham-amjad-787a92126
                </a>
                <a href="https://github.com/sahamamjad" target="_blank" rel="noopener noreferrer" className="contact__item">
                  <GithubIcon /> github.com/sahamamjad
                </a>
              </div>
            
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form className="contact__form" onSubmit={submit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handle}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={5}
                />
              </div>
              <button type="submit" className="btn btn--primary btn--full" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : status === "error" ? "❌ Try Again" : "Send Message →"}
              </button>
              {status === "sent" && <p style={{ color: "#4f9eff", fontSize: "0.85rem", textAlign: "center" }}>Thanks! I'll get back to you soon.</p>}
              {status === "error" && <p style={{ color: "#ff6b6b", fontSize: "0.85rem", textAlign: "center" }}>Something went wrong. Email me directly at saham.amjad333@hotmail.com</p>}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Designed & built by <strong>Saham Amjad</strong></p>
      <p className="footer__sub">© {new Date().getFullYear()} — All rights reserved</p>
    </footer>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0f19;
    --bg-alt: #0f1420;
    --surface: #151c2c;
    --surface-2: #1c2538;
    --border: rgba(255,255,255,0.07);
    --accent: #4f9eff;
    --accent-dim: rgba(79,158,255,0.12);
    --accent-glow: rgba(79,158,255,0.35);
    --gold: #f5c842;
    --text: #e8ecf4;
    --muted: #7a8599;
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --radius: 12px;
    --radius-lg: 18px;
    --shadow: 0 4px 30px rgba(0,0,0,0.4);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.7;
    overflow-x: hidden;
  }

  a { color: inherit; text-decoration: none; }
  strong { color: var(--text); font-weight: 600; }
  code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent); background: var(--accent-dim); padding: 2px 6px; border-radius: 4px; }

  /* ── Container ───────────────────────────── */
  .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

  /* ── Section ─────────────────────────────── */
  .section { padding: 96px 0; }
  .section--alt { background: var(--bg-alt); }

  .section-title-wrapper { margin-bottom: 52px; }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.8rem);
    color: var(--text);
    display: inline-block;
  }
  .section-line {
    width: 48px; height: 3px;
    background: var(--accent);
    margin-top: 10px;
    border-radius: 2px;
  }

  /* ── Navbar ──────────────────────────────── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 40px;
    transition: background 0.3s, border-bottom 0.3s;
  }
  .navbar--scrolled {
    background: rgba(11,15,25,0.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .navbar__logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .navbar__links { list-style: none; display: flex; gap: 36px; }
  .navbar__link { font-size: 0.88rem; font-weight: 500; color: var(--muted); letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.2s; }
  .navbar__link:hover, .navbar__link--active { color: var(--text); }
  .navbar__link--active { color: var(--accent); }

  .navbar__burger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
  .burger-line { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: transform 0.25s, opacity 0.25s; }
  .burger-line--1-open { transform: translateY(7px) rotate(45deg); }
  .burger-line--2-open { opacity: 0; }
  .burger-line--3-open { transform: translateY(-7px) rotate(-45deg); }

  .navbar__mobile {
    position: absolute; top: 100%; left: 0; right: 0;
    background: rgba(11,15,25,0.97);
    border-bottom: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 16px 0;
  }
  .navbar__mobile-link { padding: 12px 32px; font-size: 0.95rem; color: var(--muted); }
  .navbar__mobile-link:hover { color: var(--text); }

  /* ── Buttons ─────────────────────────────── */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: 8px;
    font-family: var(--font-body); font-size: 0.9rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; border: none;
    white-space: nowrap;
  }
  .btn--primary { background: var(--accent); color: #fff; }
  .btn--primary:hover { background: #6babff; box-shadow: 0 0 20px var(--accent-glow); }
  .btn--outline { background: transparent; color: var(--text); border: 1.5px solid var(--border); }
  .btn--outline:hover { border-color: var(--accent); color: var(--accent); }
  .btn--ghost { background: transparent; color: var(--muted); border: none; font-size: 0.85rem; }
  .btn--ghost:hover { color: var(--text); }
  .btn--full { width: 100%; justify-content: center; }

  /* ── Hero ────────────────────────────────── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    padding: 120px 40px 80px;
    max-width: 1080px; margin: 0 auto;
    overflow: hidden;
  }
  .hero__bg-grid {
    position: fixed; inset: 0; z-index: -2;
    background-image:
      linear-gradient(rgba(79,158,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79,158,255,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero__glow {
    position: absolute; border-radius: 50%;
    filter: blur(100px); z-index: -1; pointer-events: none;
  }
  .hero__glow--1 { width: 500px; height: 500px; background: rgba(79,158,255,0.08); top: -100px; right: -100px; }
  .hero__glow--2 { width: 350px; height: 350px; background: rgba(245,200,66,0.05); bottom: 0; left: -80px; }

  .hero__content { max-width: 680px; }
  .hero__greeting { font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent); letter-spacing: 0.08em; margin-bottom: 12px; }
  .hero__name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 9vw, 7rem);
    line-height: 1;
    color: var(--text);
    margin-bottom: 16px;
  }
  .hero__title {
    font-family: var(--font-mono); font-size: 1.1rem;
    color: var(--muted); letter-spacing: 0.1em; margin-bottom: 24px;
  }
  .hero__bio { color: var(--muted); max-width: 520px; font-size: 1.05rem; margin-bottom: 40px; }

  .hero__cta { display: flex; flex-wrap: wrap; gap: 12px; }

  .hero__scroll-hint {
    position: absolute; bottom: 40px; left: 40px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .hero__scroll-bar {
    width: 1.5px; height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(0.6); } }

  /* ── About ───────────────────────────────── */
  .about__grid { display: grid; grid-template-columns: 220px 1fr; gap: 60px; align-items: start; }
  .about__avatar { display: flex; justify-content: center; padding-top: 8px; }
  .avatar-ring {
    width: 160px; height: 160px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--gold));
    padding: 3px; flex-shrink: 0;
  }
  .avatar-inner {
    width: 100%; height: 100%; border-radius: 50%;
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 2.8rem; color: var(--accent);
  }
  .about__text p { color: var(--muted); margin-bottom: 16px; }
  .highlight { color: var(--gold); font-weight: 600; }
  .about__stats { display: flex; gap: 20px; margin-top: 28px; flex-wrap: wrap; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 24px;
    display: flex; flex-direction: column; align-items: center;
    min-width: 100px;
  }
  .stat-value { font-family: var(--font-display); font-size: 1.6rem; color: var(--accent); }
  .stat-label { font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 2px; }

  /* ── Skills ──────────────────────────────── */
  .skills__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px; }
  .skill-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .skill-card:hover { border-color: var(--accent); box-shadow: 0 0 24px var(--accent-dim); }
  .skill-card__title { font-size: 0.78rem; font-weight: 600; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px; }
  .skill-card__tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    background: var(--surface-2); border: 1px solid var(--border);
    color: var(--text); font-size: 0.8rem; font-family: var(--font-mono);
    padding: 4px 10px; border-radius: 6px;
    transition: background 0.2s, border-color 0.2s;
  }
  .skill-card:hover .tag { border-color: rgba(79,158,255,0.25); }

  .skills__note {
    background: rgba(245,200,66,0.06); border: 1px solid rgba(245,200,66,0.2);
    border-radius: var(--radius); padding: 14px 18px;
    font-size: 0.85rem; color: var(--muted);
  }

  /* ── Projects ────────────────────────────── */
  .projects__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .project-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 28px;
    display: flex; flex-direction: column; gap: 14px;
    position: relative; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }
  .project-card:hover { border-color: var(--accent); box-shadow: 0 0 32px var(--accent-dim); transform: translateY(-3px); }
  .project-card--featured { border-color: rgba(79,158,255,0.3); }
  .project-card__badge {
    position: absolute; top: -11px; left: 24px;
    background: var(--accent); color: #fff;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 99px;
  }
  .project-card__title { font-family: var(--font-display); font-size: 1.2rem; color: var(--text); }
  .project-card__desc { font-size: 0.9rem; color: var(--muted); flex: 1; }
  .project-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .project-card__links { display: flex; gap: 16px; flex-wrap: wrap; padding-top: 6px; }
  .project-link {
    font-size: 0.85rem; font-weight: 500; color: var(--accent);
    display: inline-flex; align-items: center; gap: 5px;
    transition: opacity 0.2s;
  }
  .project-link:hover { opacity: 0.75; }

  /* ── Timeline ────────────────────────────── */
  .timeline { position: relative; padding-left: 32px; margin-bottom: 24px; }
  .timeline::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 1.5px; background: var(--border); }
  .timeline__item { position: relative; margin-bottom: 40px; }
  .timeline__dot {
    position: absolute; left: -28px; top: 6px;
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 10px var(--accent-glow);
    border: 2px solid var(--bg-alt);
  }
  .timeline__card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px 28px;
    transition: border-color 0.25s;
  }
  .timeline__card:hover { border-color: rgba(79,158,255,0.3); }
  .timeline__header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .timeline__role { font-size: 1.05rem; font-weight: 600; color: var(--text); }
  .timeline__company { font-size: 0.87rem; color: var(--accent); margin-top: 2px; }
  .timeline__period { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); white-space: nowrap; background: var(--surface-2); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border); }
  .timeline__bullets { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  .timeline__bullets li { font-size: 0.9rem; color: var(--muted); padding-left: 16px; position: relative; }
  .timeline__bullets li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); font-size: 0.7rem; top: 4px; }

  /* ── Education ───────────────────────────── */
  .edu__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
  .edu-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 28px;
    display: flex; gap: 20px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .edu-card:hover { border-color: rgba(79,158,255,0.3); box-shadow: 0 0 24px var(--accent-dim); }
  .edu-card__icon { font-size: 1.8rem; flex-shrink: 0; padding-top: 2px; }
  .edu-card__degree { font-family: var(--font-display); font-size: 1.2rem; color: var(--text); }
  .edu-card__grade { font-size: 0.82rem; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 0.06em; margin: 4px 0; }
  .edu-card__institution { font-size: 0.9rem; color: var(--accent); margin-bottom: 4px; }
  .edu-card__period { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); margin-bottom: 8px; }
  .edu-card__notes { font-size: 0.87rem; color: var(--muted); }

  /* ── Contact ─────────────────────────────── */
  .contact__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .contact__intro { font-size: 1.05rem; color: var(--muted); margin-bottom: 28px; }
  .contact__links { display: flex; flex-direction: column; gap: 14px; }
  .contact__item { display: inline-flex; align-items: center; gap: 10px; color: var(--muted); font-size: 0.92rem; transition: color 0.2s; }
  .contact__item:hover { color: var(--accent); }

  .contact__form { display: flex; flex-direction: column; gap: 18px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .form-input {
    background: var(--surface); border: 1.5px solid var(--border);
    color: var(--text); border-radius: 8px;
    padding: 11px 14px; font-family: var(--font-body); font-size: 0.95rem;
    outline: none; transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-input::placeholder { color: var(--muted); opacity: 0.6; }
  .form-textarea { resize: vertical; min-height: 130px; }

  /* ── Footer ──────────────────────────────── */
  .footer {
    padding: 40px; text-align: center;
    border-top: 1px solid var(--border);
    color: var(--muted); font-size: 0.85rem;
  }
  .footer__sub { margin-top: 4px; font-size: 0.78rem; opacity: 0.6; }
  footer strong { color: var(--text); }

  /* ── Responsive ──────────────────────────── */
  @media (max-width: 900px) {
    .hero { padding: 100px 24px 80px; }
    .about__grid { grid-template-columns: 1fr; }
    .about__avatar { justify-content: flex-start; }
    .contact__grid { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (max-width: 640px) {
    .navbar { padding: 14px 20px; }
    .navbar__links { display: none; }
    .navbar__burger { display: flex; }
    .hero__scroll-hint { display: none; }
    .section { padding: 72px 0; }
    .about__stats { flex-direction: column; }
    .timeline { padding-left: 24px; }
    .timeline__header { flex-direction: column; }
  }
`;
