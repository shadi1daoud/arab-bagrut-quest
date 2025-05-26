
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Users, MessageCircle, Book, 
  Badge, PieChart, ChevronRight, ThumbsUp,
  PlusCircle, Search, ChevronUp, ChevronDown, Heart,
  Star, Trophy, ExternalLink
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Student of the Week Component (inline since it might not exist)
const StudentOfWeek = ({ student }: { student: any }) => {
  return (
    <Card className="bg-gradient-to-br from-[#FF4B1A]/20 to-[#FFA56E]/10 border-[#FF4B1A]/30 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-[#FF4B1A]/30 flex items-center justify-center text-3xl ring-2 ring-[#FF4B1A]/50 shadow-[0_0_15px_rgba(255,75,26,0.4)]">
                {student.avatar}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FF4B1A] flex items-center justify-center text-white text-xs">
                  {student.badgeIcon}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#FF4B1A]" />
                <h2 className="text-xl font-bold text-white">طالب الأسبوع</h2>
              </div>
              <h3 className="text-lg font-bold text-white">{student.name}</h3>
              <p className="text-sm text-gray-300">{student.reason}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-[#FF4B1A]" />
                <span className="text-white font-mono text-lg">{student.xp.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white font-mono">Lv {student.level}</span>
              </div>
            </div>
            
            <Button className="text-sm">
              عرض الملف
              <ExternalLink className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Leaderboard Component (inline)
const Leaderboard = ({ data, filter, onFilterChange }: { data: any[], filter: string, onFilterChange: (filter: string) => void }) => {
  return (
    <Card className="bg-black/40 border border-white/10 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">المتصدرون</h3>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onFilterChange('week')}
            >
              الأسبوع
            </Button>
            <Button 
              variant={filter === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onFilterChange('month')}
            >
              الشهر
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {data.slice(0, 10).map((student) => (
            <div key={student.id} className={`flex items-center gap-3 p-3 rounded-lg ${student.isCurrentUser ? 'bg-[#FF4B1A]/10 border border-[#FF4B1A]/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  student.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  student.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                  student.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-white/10 text-white'
                }`}>
                  {student.rank}
                </div>
                
                <div className="text-xl">{student.avatar}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{student.name}</span>
                    {student.isCurrentUser && (
                      <span className="text-xs bg-[#FF4B1A] text-white px-2 py-1 rounded-full">أنت</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Level {student.level} • {student.xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
              
              {student.streak > 0 && (
                <div className="flex items-center gap-1 text-orange-400">
                  <span className="text-sm">🔥</span>
                  <span className="text-sm font-mono">{student.streak}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Weekly Quiz Component (inline)
const WeeklyQuiz = ({ quizzes }: { quizzes: any[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-green-400" />
          الاختبارات الأسبوعية
        </h2>
      </div>
      
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="bg-black/40 border border-white/10 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{quiz.title}</h3>
                  <p className="text-gray-300 text-sm">{quiz.description}</p>
                </div>
                <div className="flex items-center bg-[#FF4B1A]/10 text-[#FF4B1A] rounded-full px-3 py-1 text-sm">
                  <Award className="h-4 w-4 mr-1" />
                  +{quiz.reward} XP
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {quiz.participants} مشارك
                </div>
                <Button size="sm">
                  بدء الاختبار
                  <ChevronRight className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Data definitions
const STUDENT_OF_WEEK = {
  name: 'سارة الخالدي',
  avatar: '👧',
  reason: 'أكملت ٥ كورسات هذا الأسبوع',
  xp: 12500,
  level: 18,
  badge: 'متميزة',
  badgeIcon: '🏆'
};

const LEADERBOARD_DATA = [
  { id: 1, name: 'رامي سعيد', avatar: '👨‍🎓', level: 21, xp: 28950, streak: 14, badge: 'legendary', rank: 1 },
  { id: 2, name: 'ليان خالد', avatar: '👩‍🎓', level: 19, xp: 25600, streak: 8, badge: 'expert', rank: 2 },
  { id: 3, name: 'سارة الخالدي', avatar: '👧', level: 18, xp: 24100, streak: 12, badge: 'master', rank: 3, isCurrentUser: true },
  { id: 4, name: 'أحمد محمود', avatar: '👦', level: 16, xp: 19500, streak: 5, badge: null, rank: 4 },
  { id: 5, name: 'محمد علي', avatar: '👨', level: 15, xp: 18200, streak: 0, badge: null, rank: 5 },
  { id: 6, name: 'شادي داود', avatar: '👨‍💻', level: 14, xp: 16800, streak: 7, badge: null, rank: 6 },
  { id: 7, name: 'لينا كريم', avatar: '👩', level: 13, xp: 15350, streak: 3, badge: null, rank: 7 },
  { id: 8, name: 'يوسف أحمد', avatar: '👨‍🎓', level: 12, xp: 12900, streak: 0, badge: null, rank: 8 },
  { id: 9, name: 'نور ماجد', avatar: '👧', level: 10, xp: 11500, streak: 9, badge: null, rank: 9 },
  { id: 10, name: 'عمر سامي', avatar: '👦', level: 9, xp: 10200, streak: 4, badge: null, rank: 10 },
];

const WEEKLY_QUIZZES = [
  {
    id: 1,
    title: 'الرياضيات',
    description: 'اختبر معلوماتك في الرياضيات واكسب نقاط الخبرة',
    reward: 150,
    participants: 247
  },
  {
    id: 2,
    title: 'العلوم',
    description: 'اختبر معلوماتك في العلوم العامة واكسب نقاط الخبرة',
    reward: 120,
    participants: 183
  }
];

const ASK_DARSNI_DATA = [
  {
    id: 1,
    title: 'كيف أحسن مستوى اللغة الإنجليزية؟',
    content: 'أريد تحسين مهارات اللغة الإنجليزية للتحضير لامتحان التوفل، ما هي أفضل الطرق؟',
    author: 'أحمد محمود',
    authorAvatar: '👦',
    time: 'منذ 3 ساعات',
    xpReward: 30,
    votes: 12,
    answers: 4,
    isExpanded: true,
    answersData: [
      { id: 101, author: 'ليان خالد', avatar: '👩‍🎓', content: 'أنصح بممارسة اللغة يومياً مع شخص يتحدث الإنجليزية، واستخدام تطبيقات مثل Duolingo للتمرين المستمر.', votes: 8 },
      { id: 102, author: 'محمد علي', avatar: '👨', content: 'مشاهدة الأفلام والمسلسلات باللغة الإنجليزية مع ترجمة إنجليزية ساعدتني كثيراً!', votes: 5 }
    ]
  },
  {
    id: 2,
    title: 'نصائح للدراسة الفعالة قبل الاختبارات؟',
    content: 'ما هي أفضل الطرق للدراسة قبل الاختبارات النهائية؟ أشعر دائماً بالتوتر وعدم القدرة على التركيز.',
    author: 'سارة حسن',
    authorAvatar: '👧',
    time: 'منذ يوم',
    xpReward: 25,
    votes: 18,
    answers: 6,
    isExpanded: false,
    answersData: []
  }
];

const SUBJECT_HUBS = [
  { id: 1, name: 'الرياضيات', icon: '🧮', summaries: 24, questions: 37, backgroundColor: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
  { id: 2, name: 'الفيزياء', icon: '⚛️', summaries: 18, questions: 29, backgroundColor: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
  { id: 3, name: 'الكيمياء', icon: '🧪', summaries: 15, questions: 24, backgroundColor: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' },
  { id: 4, name: 'الأحياء', icon: '🧬', summaries: 12, questions: 19, backgroundColor: 'from-red-500/20 to-orange-500/20', borderColor: 'border-red-500/30' },
  { id: 5, name: 'اللغة العربية', icon: '📝', summaries: 20, questions: 15, backgroundColor: 'from-amber-500/20 to-yellow-500/20', borderColor: 'border-amber-500/30' },
  { id: 6, name: 'اللغة الإنجليزية', icon: '🔤', summaries: 16, questions: 22, backgroundColor: 'from-indigo-500/20 to-violet-500/20', borderColor: 'border-indigo-500/30' }
];

const ROLES_BADGES = [
  { id: 1, title: 'متألق', icon: '✨', requirement: 'حقق 1000 نقطة خبرة', isEarned: true, color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' },
  { id: 2, title: 'مساعد', icon: '💬', requirement: '10 إجابات مفيدة', isEarned: true, color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
  { id: 3, title: 'مستكشف', icon: '🔍', requirement: 'أكمل 5 كورسات مختلفة', isEarned: false, color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
  { id: 4, title: 'متفوق', icon: '🏆', requirement: 'احصل على العلامة الكاملة في 3 اختبارات', isEarned: false, color: 'bg-orange-500/20 border-orange-500/30 text-orange-400' },
  { id: 5, title: 'مواظب', icon: '🔥', requirement: 'سلسلة نشاط 7 أيام متتالية', isEarned: true, color: 'bg-red-500/20 border-red-500/30 text-red-400' },
  { id: 6, title: 'محترف', icon: '⭐', requirement: 'أكمل مسار تعليمي كامل', isEarned: false, color: 'bg-green-500/20 border-green-500/30 text-green-400' }
];

const POLL_DATA = {
  question: 'ما هو الموضوع الأصعب بالنسبة لك؟',
  options: [
    { id: 1, text: 'الرياضيات', votes: 42, percentage: 35 },
    { id: 2, text: 'الفيزياء', votes: 38, percentage: 31 },
    { id: 3, text: 'الكيمياء', votes: 24, percentage: 20 },
    { id: 4, text: 'اللغة الإنجليزية', votes: 18, percentage: 14 }
  ],
  totalVotes: 122,
  voted: false,
  selectedOption: null,
  refreshDate: 'استطلاع جديد كل يوم أحد'
};

const CommunityPage = () => {
  const [activeTimeRange, setActiveTimeRange] = useState<'week' | 'month'>('week');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);
  const [pollVote, setPollVote] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleVote = (optionId: number) => {
    if (!hasVoted) {
      setPollVote(optionId);
      setHasVoted(true);
    }
  };
  
  const toggleQuestionExpansion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-xl font-bold text-white bg-gradient-to-r from-[#FF4800] to-[#FFA56E] bg-clip-text text-transparent">
        مجتمع دارسني
      </h1>
      
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="w-full justify-between mb-6">
          <TabsTrigger value="main">الرئيسية</TabsTrigger>
          <TabsTrigger value="challenges">الاختبارات</TabsTrigger>
          <TabsTrigger value="community">المجتمع</TabsTrigger>
          <TabsTrigger value="leaderboard">المتصدرون</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <div className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.div variants={itemVariants}>
                <StudentOfWeek student={STUDENT_OF_WEEK} />
              </motion.div>
            </motion.div>
            
            {/* Roles & Badges section */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Badge className="h-5 w-5 text-purple-400" />
                  الأدوار والشارات
                </h2>
              </div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-black/40 border border-white/10 overflow-hidden">
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {ROLES_BADGES.map((badge) => (
                        <div 
                          key={badge.id} 
                          className={`p-2 rounded-lg border ${badge.color} ${!badge.isEarned ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="text-xl">{badge.icon}</div>
                            <div>
                              <div className="text-white font-medium text-sm">{badge.title}</div>
                              <div className="text-gray-400 text-xs">{badge.requirement}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            
            {/* Quick Poll section */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-cyan-400" />
                  استطلاع سريع
                </h2>
              </div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-black/40 border border-white/10 overflow-hidden">
                  <CardContent className="p-3">
                    <h3 className="text-white font-bold text-lg mb-3">{POLL_DATA.question}</h3>
                    
                    {!hasVoted ? (
                      <div className="space-y-2">
                        {POLL_DATA.options.map((option) => (
                          <button
                            key={option.id}
                            className="w-full p-2.5 text-left bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors flex justify-between items-center"
                            onClick={() => handleVote(option.id)}
                          >
                            <span className="text-white">{option.text}</span>
                            <div className="h-5 w-5 rounded-full border border-white/30"></div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {POLL_DATA.options.map((option) => (
                          <div key={option.id} className="relative">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-white">{option.text}</span>
                              <span className="text-sm text-white font-mono">{option.percentage}%</span>
                            </div>
                            <div className="h-8 w-full bg-white/5 rounded-md overflow-hidden">
                              <div 
                                className={`h-full ${
                                  option.id === pollVote 
                                    ? 'bg-[#FF4B1A]' 
                                    : 'bg-white/10'
                                } transition-all duration-1000 ease-out`}
                                style={{ width: `${option.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        
                        <div className="text-center text-xs text-gray-400 mt-3">
                          {POLL_DATA.totalVotes} صوت • {POLL_DATA.refreshDate}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges">
          <div className="space-y-6">
            <WeeklyQuiz quizzes={WEEKLY_QUIZZES} />
          </div>
        </TabsContent>
        
        <TabsContent value="community">
          <div className="space-y-6">
            {/* Ask Darsni section */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  اسأل دارسني
                </h2>
                <Button variant="outline" size="sm" className="text-xs">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  طرح سؤال
                </Button>
              </div>
              
              <div className="grid gap-4 grid-cols-1">
                {ASK_DARSNI_DATA.map((question) => (
                  <motion.div key={question.id} variants={itemVariants}>
                    <Card className="bg-black/40 border border-white/10 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-3">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-xl">
                                {question.authorAvatar}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-white">{question.author}</span>
                                <span className="text-xs text-gray-400 block">{question.time}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center bg-[#FF4B1A]/10 text-[#FF4B1A] rounded-full px-2 py-1 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              +{question.xpReward} XP
                            </div>
                          </div>
                          
                          <h3 className="text-white font-bold mt-2">{question.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{question.content}</p>
                          
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{question.votes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <MessageCircle className="h-3 w-3" />
                                <span>{question.answers} إجابات</span>
                              </div>
                            </div>
                            
                            <button 
                              className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
                              onClick={() => toggleQuestionExpansion(question.id)}
                            >
                              {expandedQuestion === question.id ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  <span>إخفاء الإجابات</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  <span>عرض الإجابات</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {expandedQuestion === question.id && (
                          <div className="border-t border-white/5 bg-white/5 p-3 space-y-3">
                            {question.answersData && question.answersData.length > 0 ? (
                              question.answersData.map((answer: any) => (
                                <div key={answer.id} className="flex gap-2">
                                  <div className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-lg">
                                    {answer.avatar}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium text-white">{answer.author}</span>
                                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <Heart className="h-3 w-3" />
                                        <span>{answer.votes}</span>
                                      </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1">{answer.content}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-gray-400 text-sm py-2">لا توجد إجابات بعد. كن أول من يجيب!</p>
                            )}
                            
                            <Button variant="outline" size="sm" className="w-full text-sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              أجب واكسب النقاط
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Subject Hubs section */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Book className="h-5 w-5 text-green-400" />
                  الأقسام التعليمية
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Search className="h-3 w-3 mr-1" />
                    بحث
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SUBJECT_HUBS.map((subject) => (
                  <motion.div key={subject.id} variants={itemVariants}>
                    <Card className={`border bg-gradient-to-br ${subject.backgroundColor} ${subject.borderColor} h-full`}>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="text-3xl mb-2">{subject.icon}</div>
                        <h3 className="text-white font-bold text-lg">{subject.name}</h3>
                        
                        <div className="w-full mt-3 space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-300">الملخصات</span>
                            <span className="text-white font-mono">{subject.summaries}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-300">الأسئلة الأسبوعية</span>
                            <span className="text-white font-mono">{subject.questions}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          دخول
                          <ChevronRight className="h-4 w-4 mr-1 rtl:rotate-180" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <div className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  المتصدرون
                </h2>
              </div>
              
              <motion.div variants={itemVariants}>
                <Leaderboard 
                  data={LEADERBOARD_DATA} 
                  filter={activeTimeRange} 
                  onFilterChange={(filter) => setActiveTimeRange(filter as 'week' | 'month')} 
                />
              </motion.div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
