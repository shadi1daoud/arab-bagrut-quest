
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Share2, Check, Brain } from 'lucide-react';

// Sample data (would be fetched from API in production)
const COURSE_DATA = {
  id: '1',
  title: 'رياضيات',
  progress: 35,
  totalXP: 1500,
  totalUnits: 24,
  units: [
    { id: 'unit1', number: 1, title: 'مقدمة في الجبر', status: 'done', duration: '18 دقيقة', hasStreak: true },
    { id: 'unit2', number: 2, title: 'المعادلات التربيعية', status: 'current', duration: '22 دقيقة' },
    { id: 'unit3', number: 3, title: 'حساب المثلثات', status: 'idle', duration: '25 دقيقة' },
    { id: 'unit4', number: 4, title: 'التفاضل والتكامل', status: 'idle', duration: '30 دقيقة' },
    { id: 'unit5', number: 5, title: 'الوحدات المركبة', status: 'idle', duration: '20 دقيقة' }
  ],
  currentUnit: 2
};

const NewCourseView = () => {
  const { id } = useParams<{ id: string }>();
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [currentUnit, setCurrentUnit] = useState(COURSE_DATA.currentUnit);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle nav toggle
  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  };
  
  // Handle tab switching
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Handle unit navigation
  const goToUnit = (unitNumber: number) => {
    if (unitNumber > 0 && unitNumber <= COURSE_DATA.totalUnits) {
      setCurrentUnit(unitNumber);
    }
  };
  
  // Pomodoro timer functions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw timer ring
    const drawTimer = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate progress
      const totalTime = 25 * 60; // 25 minutes in seconds
      const progress = pomodoroTime / totalTime;
      
      // Draw background circle
      ctx.beginPath();
      ctx.arc(90, 90, 70, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 8;
      ctx.stroke();
      
      // Draw progress arc
      ctx.beginPath();
      ctx.arc(90, 90, 70, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress));
      ctx.strokeStyle = '#FF4B1A';
      ctx.lineWidth = 8;
      ctx.stroke();
      
      // Draw time text
      const minutes = Math.floor(pomodoroTime / 60);
      const seconds = pomodoroTime % 60;
      ctx.font = 'bold 24px "Share Tech Mono"';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, 90, 90);
    };
    
    // Initial draw
    drawTimer();
    
    // Timer interval
    let interval: number | null = null;
    
    if (pomodoroRunning && pomodoroTime > 0) {
      interval = window.setInterval(() => {
        setPomodoroTime(prev => {
          const newTime = prev - 1;
          return newTime > 0 ? newTime : 0;
        });
      }, 1000);
    }
    
    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroTime, pomodoroRunning]);
  
  // Update canvas when time changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw timer ring
    const drawTimer = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate progress
      const totalTime = 25 * 60; // 25 minutes in seconds
      const progress = pomodoroTime / totalTime;
      
      // Draw background circle
      ctx.beginPath();
      ctx.arc(90, 90, 70, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 8;
      ctx.stroke();
      
      // Draw progress arc
      ctx.beginPath();
      ctx.arc(90, 90, 70, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress));
      ctx.strokeStyle = '#FF4B1A';
      ctx.lineWidth = 8;
      ctx.stroke();
      
      // Draw time text
      const minutes = Math.floor(pomodoroTime / 60);
      const seconds = pomodoroTime % 60;
      ctx.font = 'bold 24px "Share Tech Mono"';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, 90, 90);
    };
    
    drawTimer();
  }, [pomodoroTime]);
  
  // Toggle Pomodoro timer
  const togglePomodoro = () => {
    setPomodoroRunning(!pomodoroRunning);
  };
  
  // Reset Pomodoro timer
  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setPomodoroTime(25 * 60);
  };
  
  return (
    <div className="darsni-course-view">
      <style jsx>{`
        /* Base Styles */
        .darsni-course-view {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(#0E0E0E 0%, #141414 100%);
          color: #E3E3E3;
          font-family: 'Lexend', sans-serif;
          font-size: 15px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 1fr;
          gap: 24px;
          padding: 24px;
        }
        
        a:focus, button:focus {
          outline: 2px solid #FF4B1A;
        }
        
        /* UnitNav Styles */
        .UnitNav {
          grid-column: 1 / 3;
          width: 250px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          padding: 16px;
          transition: width 250ms ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .UnitNav.collapsed {
          width: 72px;
        }
        
        .UnitNav h3 {
          font-family: 'Outfit', sans-serif;
          font-weight: bold;
          margin-bottom: 24px;
          text-align: center;
          transition: opacity 200ms ease;
        }
        
        .UnitNav.collapsed h3 {
          opacity: 0;
        }
        
        .UnitNav .toggle {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .UnitNav.collapsed .toggle {
          left: 16px;
          right: auto;
        }
        
        .UnitNav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-y: auto;
          flex: 1;
        }
        
        .UnitNav li {
          padding: 12px 8px;
          margin-bottom: 8px;
          border-radius: 8px;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 200ms ease;
        }
        
        .UnitNav li:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .UnitNav li span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2A2A2A;
          margin-right: 12px;
          font-family: 'Share Tech Mono', monospace;
        }
        
        .UnitNav.collapsed li {
          padding: 12px 0;
          justify-content: center;
        }
        
        .UnitNav.collapsed li span {
          margin-right: 0;
        }
        
        .UnitNav li.current {
          background-color: rgba(255, 75, 26, 0.1);
        }
        
        .UnitNav li.current::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #FF4B1A;
          border-radius: 0 4px 4px 0;
        }
        
        .UnitNav li.current span {
          border: 2px solid #FF4B1A;
          position: relative;
        }
        
        .UnitNav li.current span::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgba(255, 75, 26, 0.3);
          animation: pulse 2s infinite;
        }
        
        .UnitNav li.done span {
          background-color: #FF4B1A;
          position: relative;
        }
        
        .UnitNav small {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 4px;
        }
        
        .UnitNav.collapsed small,
        .UnitNav.collapsed .unit-title {
          display: none;
        }
        
        /* Lesson Styles */
        .Lesson {
          grid-column: 3 / 11;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .Lesson .progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Share Tech Mono', monospace;
          margin-bottom: 16px;
        }
        
        .Lesson .progress .bar {
          flex: 1;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin: 0 16px;
          overflow: hidden;
        }
        
        .Lesson .progress .bar div {
          height: 100%;
          background: linear-gradient(to right, #FF4B1A, #FF794B);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        
        .Lesson .progress .bar div::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 2s infinite;
        }
        
        .Lesson .hero16x9 {
          aspect-ratio: 16/9;
          border-radius: 14px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
          width: 100%;
          background-color: #000;
          object-fit: cover;
        }
        
        .Lesson .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .Lesson .tabs button {
          padding: 8px 20px;
          border-radius: 8px;
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E3E3E3;
          font-family: 'Noto Sans Arabic', sans-serif;
          transition: all 200ms ease;
          cursor: pointer;
        }
        
        .Lesson .tabs button:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .Lesson .tabs button.on {
          background-color: rgba(255, 75, 26, 0.1);
          border-color: rgba(255, 75, 26, 0.3);
          color: #FF4B1A;
        }
        
        .Lesson .tabBody {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 24px;
          height: calc(100vh - 400px);
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          transition: transform 250ms ease, opacity 250ms ease;
        }
        
        .tabBody.slide-right {
          transform: translateX(20px);
          opacity: 0;
        }
        
        .tabBody.slide-left {
          transform: translateX(-20px);
          opacity: 0;
        }
        
        /* SidePanel Styles */
        .SidePanel {
          grid-column: 11 / 13;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .SidePanel button.full {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          font-family: 'Noto Sans Arabic', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 200ms ease;
          cursor: pointer;
        }
        
        .SidePanel button.accent {
          background-color: #FF4B1A;
          color: #111;
          border: none;
        }
        
        .SidePanel button.ghost {
          background-color: transparent;
          border: 1px solid rgba(255, 75, 26, 0.3);
          color: #FF4B1A;
        }
        
        .SidePanel button:hover {
          box-shadow: 0 0 8px rgba(255, 75, 26, 0.33);
          transform: translateY(-2px);
        }
        
        .SidePanel .pomodoro {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .SidePanel .pomodoro h4 {
          font-family: 'Noto Sans Arabic', sans-serif;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .SidePanel .pomodoro .timer-controls {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
        
        .SidePanel .pomodoro .timer-controls button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 200ms ease;
        }
        
        .SidePanel .pomodoro .timer-controls button.play {
          background-color: rgba(255, 75, 26, 0.2);
          border: none;
          color: #FF4B1A;
        }
        
        .SidePanel .pomodoro .timer-controls button.reset {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E3E3E3;
        }
        
        .SidePanel .pomodoro .timer-controls button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 8px rgba(255, 75, 26, 0.2);
        }
        
        /* Footer Styles */
        .stepper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: rgba(14, 14, 14, 0.8);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 100;
        }
        
        .stepper .unit-count {
          display: flex;
          align-items: center;
          font-family: 'Share Tech Mono', monospace;
        }
        
        .stepper button {
          padding: 8px 20px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E3E3E3;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Noto Sans Arabic', sans-serif;
          transition: all 200ms ease;
          cursor: pointer;
        }
        
        .stepper button:hover {
          background-color: rgba(255, 75, 26, 0.1);
          border-color: rgba(255, 75, 26, 0.3);
          box-shadow: 0 0 8px rgba(255, 75, 26, 0.2);
        }
        
        /* Animations */
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Mobile Styles ≤768px */
        @media (max-width: 768px) {
          .darsni-course-view {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            height: auto;
            overflow-y: auto;
            padding: 16px;
            gap: 16px;
          }
          
          .UnitNav {
            grid-column: 1;
            grid-row: 1;
            width: 100%;
            height: auto;
            padding: 12px;
          }
          
          .UnitNav.collapsed {
            width: 100%;
          }
          
          .UnitNav ul {
            display: none;
          }
          
          .UnitNav h3 {
            margin-bottom: 0;
            opacity: 1 !important;
          }
          
          .UnitNav .toggle {
            display: none;
          }
          
          .UnitNav select {
            display: block;
            width: 100%;
            padding: 8px;
            background-color: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #E3E3E3;
            margin-top: 12px;
          }
          
          .Lesson {
            grid-column: 1;
            grid-row: 2;
            gap: 12px;
          }
          
          .Lesson .progress {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .Lesson .progress .bar {
            width: 100%;
            margin: 8px 0;
          }
          
          .Lesson .tabBody {
            height: auto;
            max-height: 400px;
          }
          
          .SidePanel {
            grid-column: 1;
            grid-row: 3;
            display: none;
          }
          
          .mobile-fab {
            position: fixed;
            bottom: 80px;
            right: 16px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #FF4B1A;
            color: #111;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            z-index: 101;
            cursor: pointer;
          }
          
          .mobile-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 80%;
            background-color: #141414;
            z-index: 200;
            border-radius: 16px 16px 0 0;
            padding: 24px;
            transform: translateY(100%);
            transition: transform 300ms ease;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
            overflow-y: auto;
          }
          
          .mobile-sheet.open {
            transform: translateY(0);
          }
          
          .mobile-sheet-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 199;
            opacity: 0;
            pointer-events: none;
            transition: opacity 300ms ease;
          }
          
          .mobile-sheet-backdrop.open {
            opacity: 1;
            pointer-events: auto;
          }
        }
      `}</style>
      
      {/* Unit Navigation */}
      <nav className={`UnitNav ${navCollapsed ? 'collapsed' : ''}`}>
        <button className="toggle" onClick={toggleNav}>
          {navCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
        <h3>الوحدات التعليمية</h3>
        
        {/* Mobile dropdown (only displayed in mobile view) */}
        <select 
          className="mobile-only" 
          style={{ display: 'none' }} 
          onChange={(e) => goToUnit(parseInt(e.target.value))}
          value={currentUnit}
        >
          {COURSE_DATA.units.map((unit) => (
            <option key={unit.id} value={unit.number}>
              {unit.number}. {unit.title}
            </option>
          ))}
        </select>
        
        {/* Desktop unit list */}
        <ul>
          {COURSE_DATA.units.map((unit) => (
            <li 
              key={unit.id}
              className={unit.status}
              onClick={() => goToUnit(unit.number)}
            >
              <span>{unit.number}</span>
              <div>
                <div className="unit-title">{unit.title}</div>
                <small>{unit.duration}</small>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Lesson Content */}
      <section className="Lesson">
        <header className="progress">
          <div>التقدم الإجمالي</div>
          <div className="bar">
            <div style={{ width: `${COURSE_DATA.progress}%` }}></div>
          </div>
          <div>{COURSE_DATA.totalXP} XP</div>
        </header>
        
        <video 
          ref={videoRef}
          className="hero16x9" 
          controls 
          poster="/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png"
          src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        ></video>
        
        <nav className="tabs">
          <button 
            className={activeTab === 'summary' ? 'on' : ''} 
            onClick={() => switchTab('summary')}
          >
            ملخص PDF
          </button>
          <button 
            className={activeTab === 'notes' ? 'on' : ''} 
            onClick={() => switchTab('notes')}
          >
            ملاحظاتي
          </button>
          <button 
            className={activeTab === 'faq' ? 'on' : ''} 
            onClick={() => switchTab('faq')}
          >
            الأسئلة المتكررة
          </button>
        </nav>
        
        <article className={`tabBody ${activeTab === 'summary' ? '' : 'hidden'}`}>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe 
              src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
              title="PDF Viewer"
            ></iframe>
          </div>
        </article>
        
        <article className={`tabBody ${activeTab === 'notes' ? '' : 'hidden'}`}>
          <textarea 
            placeholder="اكتب ملاحظاتك هنا..."
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '16px',
              color: '#E3E3E3',
              fontFamily: 'Noto Sans Arabic, sans-serif',
              resize: 'none'
            }}
          ></textarea>
        </article>
        
        <article className={`tabBody ${activeTab === 'faq' ? '' : 'hidden'}`}>
          <div className="faq-list">
            <div className="faq-item" style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
              <h4 style={{ color: '#FF4B1A', marginBottom: '8px', fontFamily: 'Noto Sans Arabic, sans-serif' }}>ما هي المصفوفة؟</h4>
              <p style={{ color: '#E3E3E3', fontSize: '14px', lineHeight: '1.6', fontFamily: 'Noto Sans Arabic, sans-serif' }}>
                المصفوفة هي مجموعة من الأعداد أو الرموز مرتبة في صفوف وأعمدة.
              </p>
            </div>
            <div className="faq-item" style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
              <h4 style={{ color: '#FF4B1A', marginBottom: '8px', fontFamily: 'Noto Sans Arabic, sans-serif' }}>كيف نضرب مصفوفتين؟</h4>
              <p style={{ color: '#E3E3E3', fontSize: '14px', lineHeight: '1.6', fontFamily: 'Noto Sans Arabic, sans-serif' }}>
                لضرب مصفوفتين، يجب أن يكون عدد أعمدة المصفوفة الأولى مساويًا لعدد صفوف المصفوفة الثانية.
              </p>
            </div>
          </div>
        </article>
      </section>
      
      {/* Side Panel */}
      <aside className="SidePanel">
        <button className="accent full">
          <Check size={16} /> Quiz سريع
        </button>
        
        <button className="ghost full">
          <Brain size={16} /> اسأل D-Bot
        </button>
        
        <button className="ghost full">
          <Share2 size={16} /> مشاركة
        </button>
        
        <section className="pomodoro">
          <h4>مؤقت بومودورو</h4>
          <canvas ref={canvasRef} width="180" height="180"></canvas>
          
          <div className="timer-controls">
            <button className="play" onClick={togglePomodoro}>
              {pomodoroRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button className="reset" onClick={resetPomodoro}>
              <RotateCcw size={18} />
            </button>
          </div>
        </section>
      </aside>
      
      {/* Mobile Fab and Bottom Sheet */}
      <div className="mobile-fab" style={{ display: 'none' }}>+</div>
      <div className="mobile-sheet-backdrop"></div>
      <div className="mobile-sheet"></div>
      
      {/* Footer */}
      <footer className="stepper">
        <button onClick={() => goToUnit(currentUnit - 1)} disabled={currentUnit <= 1}>
          <ChevronRight size={16} /> السابق
        </button>
        
        <div className="unit-count">
          {currentUnit} / {COURSE_DATA.totalUnits}
        </div>
        
        <button onClick={() => goToUnit(currentUnit + 1)} disabled={currentUnit >= COURSE_DATA.totalUnits}>
          التالي <ChevronLeft size={16} />
        </button>
      </footer>
    </div>
  );
};

export default NewCourseView;
