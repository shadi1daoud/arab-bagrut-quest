import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, BookOpen, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";

// Sample course data
const activeCourses = [
  {
    id: 1,
    name: "الرياضيات",
    icon: "/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png",
    progress: 68,
    unitsCompleted: 24,
    totalUnits: 36,
    level: "متوسط",
    levelCode: 804
  },
  {
    id: 2,
    name: "الفيزياء",
    icon: "/lovable-uploads/cf18a2e0-832e-4784-8739-89c3d0b07ac8.png",
    progress: 45,
    unitsCompleted: 18,
    totalUnits: 40,
    level: "متقدم",
    levelCode: 905
  },
  {
    id: 3,
    name: "الكيمياء",
    icon: "/lovable-uploads/f848c528-dd58-411a-8aa1-e90bfdb6a8c6.png",
    progress: 92,
    unitsCompleted: 22,
    totalUnits: 24,
    level: "أساسي",
    levelCode: 702
  },
  {
    id: 4,
    name: "اللغة الإنجليزية",
    icon: "/lovable-uploads/fb2240e4-c664-43fd-896d-20f9cac3ca33.png",
    progress: 32,
    unitsCompleted: 8,
    totalUnits: 25,
    level: "متوسط",
    levelCode: 803
  }
];

const completedCourses = [
  {
    id: 5,
    name: "الأحياء",
    icon: "/lovable-uploads/883e84cb-3765-41fc-acde-905616ee0377.png",
    progress: 100,
    unitsCompleted: 20,
    totalUnits: 20,
    level: "أساسي",
    levelCode: 705,
    completedDate: "12 مايو 2025"
  },
  {
    id: 6,
    name: "الحاسب الآلي",
    icon: "/lovable-uploads/7d6a3b3b-a0be-4ec3-8796-51da0a277b60.png",
    progress: 100,
    unitsCompleted: 15,
    totalUnits: 15,
    level: "متقدم",
    levelCode: 906,
    completedDate: "8 أبريل 2025"
  }
];

// Daily quotes
const motivationalQuotes = [
  "المعرفة كنز، والممارسة مفتاحها",
  "الوقت الذي يضيع في التعلم لا يضيع أبداً",
  "أول خطوات النجاح هي الإيمان بقدرتك على تحقيقه",
  "التعلم كالتجديف عكس التيار، إن توقفت تراجعت"
];

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Get a random motivational quote
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="flex flex-col min-h-full w-full py-4 px-1 md:px-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-['Changa'] text-white leading-tight">
              كورساتي
            </h1>
            <p className="text-[var(--color-text-muted)] font-['Noto_Sans_Arabic'] text-sm">
              استعرض وتابع تقدمك في الكورسات التعليمية
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2 bg-[rgba(255,72,0,0.1)] border border-[rgba(255,72,0,0.2)] rounded-full py-2 px-4 animate-pulse-glow"
          >
            <Sparkles className="h-4 w-4 text-[#FF4800]" />
            <span className="text-sm font-['Noto_Sans_Arabic'] text-white">
              {quote}
            </span>
          </motion.div>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.03)] p-4 rounded-xl flex items-center justify-between border border-white/5 mt-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF4800]/20 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#FF4800]" />
            </div>
            <div>
              <p className="text-white font-['Noto_Sans_Arabic'] text-sm">هدف اليوم</p>
              <p className="font-['Share_Tech_Mono'] text-[#FF4800] font-bold">300 XP</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={60} className="w-32 md:w-48 h-2.5" />
            <span className="font-['Share_Tech_Mono'] text-white">180/300</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue="active"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-black/40 border border-white/5 p-1">
            <TabsTrigger
              value="active"
              className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4800] data-[state=active]:text-white"
            >
              كورساتي النشطة
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4800] data-[state=active]:text-white"
            >
              كورسات مكتملة
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRecommendations(true)}
            className="font-['Noto_Sans_Arabic'] text-sm"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            اقتراحات لك
          </Button>
        </div>

        {/* Active Courses Tab */}
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activeCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        {/* Completed Courses Tab */}
        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} isCompleted />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Section - Updated to remove the link to /courses */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-6 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 bg-[rgba(255,72,0,0.1)] border border-[rgba(255,72,0,0.2)] rounded-full py-2 px-4"
        >
          <GraduationCap className="h-5 w-5 text-[#FF4800]" />
          <span className="text-sm font-['Noto_Sans_Arabic'] text-white">
            اكمل دورة جديدة لتحصل على 300 XP إضافي!
          </span>
        </motion.div>
      </div>
      
      {/* Recommendations Modal - Placeholder */}
      {showRecommendations && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/90 p-6 rounded-xl border border-white/10 w-11/12 max-w-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-['Changa'] text-white">اقتراحات لك</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowRecommendations(false)}>
                ✕
              </Button>
            </div>
            <div className="text-center py-12">
              <p className="text-[var(--color-text-muted)] font-['Noto_Sans_Arabic']">
                سيتم إضافة اقتراحات الكورسات قريبًا...
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, isCompleted = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-[rgba(255,72,0,0.1)] flex items-center justify-center p-1">
                <img 
                  src={course.icon} 
                  alt={course.name} 
                  className="h-full w-full object-contain" 
                />
              </div>
              <CardTitle>{course.name}</CardTitle>
            </div>
            <div className="flex items-center bg-black/40 py-0.5 px-2 rounded-full border border-white/10">
              <span className="text-xs font-['Share_Tech_Mono'] text-[#FF4800]">{course.levelCode}</span>
              <span className="mx-1 text-white/30">|</span>
              <span className="text-xs font-['Noto_Sans_Arabic'] text-white/70">{course.level}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-2 flex-1">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-white/70">
              <span className="font-['Noto_Sans_Arabic']">
                {isCompleted ? 'تم الإكمال' : 'التقدم'}
              </span>
              <span className="font-['Share_Tech_Mono']">
                {course.progress}%
              </span>
            </div>
            <Progress 
              value={course.progress} 
              className={isCompleted ? "bg-[rgba(255,72,0,0.2)]" : ""} 
            />

            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[var(--color-text-muted)]" />
                <span className="text-xs text-[var(--color-text-muted)] font-['Noto_Sans_Arabic']">
                  الوحدات المكتملة
                </span>
              </div>
              <span className="text-xs font-['Share_Tech_Mono'] text-white">
                {course.unitsCompleted}/{course.totalUnits}
              </span>
            </div>

            {isCompleted && (
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[var(--color-text-muted)] font-['Noto_Sans_Arabic']">
                  تاريخ الإكمال
                </span>
                <span className="text-xs font-['Noto_Sans_Arabic'] text-white">
                  {course.completedDate}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-auto">
          <Button 
            variant={isCompleted ? "secondary" : "default"} 
            className="w-full font-['Noto_Sans_Arabic']"
          >
            {isCompleted ? 'عرض الشهادة' : 'تابع الكورس'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MyCourses;
