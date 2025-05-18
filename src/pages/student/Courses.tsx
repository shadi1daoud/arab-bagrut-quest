
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Languages, Atom, FlaskConical, 
  Microscope, Scroll, ChevronRight, Info, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define realm data structure
interface Realm {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  courses: number;
  image: string;
}

// Define realms data
const REALMS: Realm[] = [
  {
    id: 'math',
    name: 'رياضيات',
    description: 'استكشف عالم الرياضيات وحل المعادلات المعقدة',
    icon: <Calculator size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-blue-700 to-blue-500',
    courses: 5,
    image: "/lovable-uploads/f24ee729-d5df-4160-b98a-a3b6ff99272e.png"
  },
  {
    id: 'languages',
    name: 'لغات',
    description: 'تعلم لغات جديدة وتواصل مع العالم',
    icon: <Languages size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-green-700 to-green-500',
    courses: 3,
    image: "/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png"
  },
  {
    id: 'physics',
    name: 'فيزياء',
    description: 'اكتشف أسرار الكون والقوى الطبيعية',
    icon: <Atom size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-purple-700 to-purple-500',
    courses: 4,
    image: "/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png"
  },
  {
    id: 'chemistry',
    name: 'كيمياء',
    description: 'اخلط العناصر واكتشف التفاعلات الكيميائية',
    icon: <FlaskConical size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-red-700 to-red-500',
    courses: 3,
    image: "/lovable-uploads/cf18a2e0-832e-4784-8739-89c3d0b07ac8.png"
  },
  {
    id: 'biology',
    name: 'أحياء',
    description: 'استكشف الكائنات الحية والأنظمة البيولوجية',
    icon: <Microscope size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-teal-700 to-teal-500',
    courses: 4,
    image: "/lovable-uploads/883e84cb-3765-41fc-acde-905616ee0377.png"
  },
  {
    id: 'history',
    name: 'تاريخ',
    description: 'سافر عبر الزمن واستكشف التاريخ البشري',
    icon: <Scroll size={48} color="#FFFFFF" strokeWidth={1.5} />,
    color: 'from-yellow-700 to-yellow-500',
    courses: 3,
    image: "/lovable-uploads/7d6a3b3b-a0be-4ec3-8796-51da0a277b60.png"
  }
];

const Courses: React.FC = () => {
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [hoverRealm, setHoverRealm] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check viewport size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Animation variants for the portal container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Animation variants for each portal
  const portalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 300
      }
    }
  };

  // Animation variants for the floating effect
  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  // Animation variants for portal particles
  const particleVariants = {
    animate: (i: number) => ({
      x: [0, Math.random() * 20 - 10],
      y: [0, Math.random() * 20 - 10],
      opacity: [0.7, 0.2, 0.7],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3 + i % 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: "loop" as const
      }
    })
  };

  // Function to generate random particles for portals
  const generateParticles = (realmId: string) => {
    const particles = [];
    const count = hoverRealm === realmId ? 8 : 5;
    
    for (let i = 0; i < count; i++) {
      particles.push(
        <motion.div
          key={`${realmId}-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(255, 255, 255, 0.8)`
          }}
          custom={i}
          variants={particleVariants}
          animate="animate"
        />
      );
    }
    
    return particles;
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Page title */}
      <div className="mb-4 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-outfit bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">
          عوالم المعرفة 🌌
        </h1>
        <p className="text-gray-400 text-sm font-lexend">
          اختر عالماً لاستكشاف الكورسات المتاحة
        </p>
      </div>
      
      {/* Main fullscreen portal container */}
      <motion.div 
        className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 p-1 md:p-2 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {REALMS.map(realm => (
          <motion.div
            key={realm.id}
            className="relative"
            variants={portalVariants}
            whileHover="hover"
            onMouseEnter={() => setHoverRealm(realm.id)}
            onMouseLeave={() => setHoverRealm(null)}
            onClick={() => setSelectedRealm(realm.id)}
          >
            <motion.div 
              variants={floatVariants}
              animate="animate"
              className="h-full"
            >
              <div className={`relative w-full h-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-sm cursor-pointer`}>
                {/* Portal background with overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${realm.color} opacity-90`} />
                
                {/* Portal image */}
                {realm.image && (
                  <div className="absolute inset-0 mix-blend-overlay opacity-30">
                    <img 
                      src={realm.image} 
                      alt={realm.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Glowing portal border */}
                <div className="absolute inset-0 border-2 md:border-4 border-white/20 rounded-2xl md:rounded-3xl glow-effect" />
                
                {/* Portal content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4">
                  {/* Icon */}
                  <div className="relative mb-4 rounded-full bg-white/10 p-3 md:p-4 backdrop-blur-sm">
                    <div className="animate-pulse-glow">
                      {realm.icon}
                    </div>
                    
                    {/* Orbital ring effect */}
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-border-rotate" />
                  </div>
                  
                  {/* Realm name */}
                  <h3 className="text-white font-bold text-lg md:text-xl text-center font-outfit mb-1 md:mb-2">
                    {realm.name}
                  </h3>
                  
                  {/* Courses count badge */}
                  <div className="px-2 py-1 bg-black/20 rounded-full text-white text-xs md:text-sm font-lexend backdrop-blur-sm border border-white/10">
                    {realm.courses} كورسات
                  </div>
                </div>
                
                {/* Hover overlay with description and button */}
                <AnimatePresence>
                  {hoverRealm === realm.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center"
                    >
                      <h3 className="text-white font-bold text-xl mb-2 font-outfit">
                        {realm.name}
                      </h3>
                      <p className="text-white/90 text-sm mb-4 font-lexend line-clamp-2 md:line-clamp-none">
                        {realm.description}
                      </p>
                      <Link to={`/courses/${realm.id}`}>
                        <Button 
                          variant="default" 
                          className="animate-pulse-glow"
                          size="sm"
                        >
                          دخول العالم
                          <ChevronRight className="h-4 w-4 mr-1" />
                        </Button>
                      </Link>
                      
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setInfoModal(realm.id); 
                        }}
                        className="absolute top-2 right-2 bg-white/10 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/20"
                      >
                        <Info size={16} className="text-white" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Animated particles */}
                {generateParticles(realm.id)}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Info modal for realm details */}
      <AnimatePresence>
        {infoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setInfoModal(null)}
          >
            {REALMS.map(realm => {
              if (realm.id === infoModal) {
                return (
                  <motion.div
                    key={`modal-${realm.id}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`bg-gradient-to-br ${realm.color} relative rounded-2xl overflow-hidden max-w-md w-full`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {realm.image && (
                      <div className="absolute inset-0 mix-blend-overlay opacity-30">
                        <img 
                          src={realm.image} 
                          alt={realm.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="relative p-6 flex flex-col items-center">
                      <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm mb-4">
                        {realm.icon}
                      </div>
                      
                      <h2 className="text-white text-2xl font-bold mb-2 font-outfit">
                        {realm.name}
                      </h2>
                      
                      <p className="text-white/90 mb-6 text-center font-lexend">
                        {realm.description}
                      </p>
                      
                      <div className="flex items-center justify-between gap-4 w-full">
                        <Button 
                          variant="outline" 
                          onClick={() => setInfoModal(null)}
                          className="flex-1"
                        >
                          إغلاق
                        </Button>
                        <Link to={`/courses/${realm.id}`} className="flex-1">
                          <Button className="w-full">
                            تصفح الكورسات
                            <ChevronRight className="h-4 w-4 mr-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Extra background particles for atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-[-1]">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 6 + 2}px rgba(255, 255, 255, 0.6)`
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
              transition: {
                duration: 5 + i % 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse" as const
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
