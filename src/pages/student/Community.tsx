
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Users, MessageCircle, Book, 
  Badge, PieChart, ChevronRight, ThumbsUp,
  PlusCircle, Search, ChevronUp, ChevronDown, Heart
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Leaderboard from '@/components/Leaderboard';
import StudentOfWeek from '@/components/StudentOfWeek';
import WeeklyQuiz from '@/components/WeeklyQuiz';

// Student of the Week Data
const STUDENT_OF_WEEK = {
  name: 'سارة الخالدي',
  avatar: '👧',
  reason: 'أكملت ٥ كورسات هذا الأسبوع',
  xp: 12500,
  level: 18,
  badge: 'متميزة',
  badgeIcon: '🏆'
};

// Leaderboard Data
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

// Quiz Data
const WEEKLY_QUIZZES = [
  {
    id: 1,
    title: 'الرياضيات',
    description: 'اختبر معلوماتك في الرياضيات واكسب نقاط الخبرة',
    reward: 150,
    participants: 247,
    questions: [
      {
        id: 1,
        question: 'ما هو ناتج 9 × 8 + 12 ÷ 4?',
        options: [
          { id: 1, text: '72' },
          { id: 2, text: '75' },
          { id: 3, text: '69' },
          { id: 4, text: '78' }
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'إذا كان محيط مربع 20 سم، فما هي مساحته؟',
        options: [
          { id: 1, text: '25 سم²' },
          { id: 2, text: '16 سم²' },
          { id: 3, text: '20 سم²' },
          { id: 4, text: '100 سم²' }
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'ما هي قيمة س في المعادلة: 3س + 7 = 22',
        options: [
          { id: 1, text: '5' },
          { id: 2, text: '15' },
          { id: 3, text: '7.33' },
          { id: 4, text: '4' }
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: 'العلوم',
    description: 'اختبر معلوماتك في العلوم العامة واكسب نقاط الخبرة',
    reward: 120,
    participants: 183,
    questions: [
      {
        id: 1,
        question: 'أي من العناصر التالية ليس من المعادن؟',
        options: [
          { id: 1, text: 'الحديد' },
          { id: 2, text: 'الكربون' },
          { id: 3, text: 'الألومنيوم' },
          { id: 4, text: 'النحاس' }
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'ما اسم الغاز الذي تستخدمه النباتات لصنع الغذاء؟',
        options: [
          { id: 1, text: 'النيتروجين' },
          { id: 2, text: 'الأكسجين' },
          { id: 3, text: 'ثاني أكسيد الكربون' },
          { id: 4, text: 'الهيدروجين' }
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'ما هي الوحدة الأساسية لقياس التيار الكهربائي؟',
        options: [
          { id: 1, text: 'فولت' },
          { id: 2, text: 'واط' },
          { id: 3, text: 'أمبير' },
          { id: 4, text: 'أوم' }
        ],
        correctAnswer: 3
      }
    ]
  }
];

// Ask Darsni Data
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

// Subject Hubs Data
const SUBJECT_HUBS = [
  { id: 1, name: 'الرياضيات', icon: '🧮', summaries: 24, questions: 37, backgroundColor: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
  { id: 2, name: 'الفيزياء', icon: '⚛️', summaries: 18, questions: 29, backgroundColor: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
  { id: 3, name: 'الكيمياء', icon: '🧪', summaries: 15, questions: 24, backgroundColor: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' },
  { id: 4, name: 'الأحياء', icon: '🧬', summaries: 12, questions: 19, backgroundColor: 'from-red-500/20 to-orange-500/20', borderColor: 'border-red-500/30' },
  { id: 5, name: 'اللغة العربية', icon: '📝', summaries: 20, questions: 15, backgroundColor: 'from-amber-500/20 to-yellow-500/20', borderColor: 'border-amber-500/30' },
  { id: 6, name: 'اللغة الإنجليزية', icon: '🔤', summaries: 16, questions: 22, backgroundColor: 'from-indigo-500/20 to-violet-500/20', borderColor: 'border-indigo-500/30' }
];

// Roles & Badges Data
const ROLES_BADGES = [
  { id: 1, title: 'متألق', icon: '✨', requirement: 'حقق 1000 نقطة خبرة', isEarned: true, color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' },
  { id: 2, title: 'مساعد', icon: '💬', requirement: '10 إجابات مفيدة', isEarned: true, color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
  { id: 3, title: 'مستكشف', icon: '🔍', requirement: 'أكمل 5 كورسات مختلفة', isEarned: false, color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
  { id: 4, title: 'متفوق', icon: '🏆', requirement: 'احصل على العلامة الكاملة في 3 اختبارات', isEarned: false, color: 'bg-orange-500/20 border-orange-500/30 text-orange-400' },
  { id: 5, title: 'مواظب', icon: '🔥', requirement: 'سلسلة نشاط 7 أيام متتالية', isEarned: true, color: 'bg-red-500/20 border-red-500/30 text-red-400' },
  { id: 6, title: 'محترف', icon: '⭐', requirement: 'أكمل مسار تعليمي كامل', isEarned: false, color: 'bg-green-500/20 border-green-500/30 text-green-400' }
];

// Poll Data
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
  // State for interactive components
  const [activeTimeRange, setActiveTimeRange] = useState<'week' | 'month'>('week');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1); // First question expanded by default
  const [pollVote, setPollVote] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Animation variants
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

  // Handle poll vote
  const handleVote = (optionId: number) => {
    if (!hasVoted) {
      setPollVote(optionId);
      setHasVoted(true);
    }
  };
  
  // Toggle question expansion
  const toggleQuestionExpansion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">
        مجتمع دارسني
      </h1>
      
      {/* Main Tabbed Interface */}
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="w-full justify-between mb-6">
          <TabsTrigger value="main">الرئيسية</TabsTrigger>
          <TabsTrigger value="challenges">الاختبارات</TabsTrigger>
          <TabsTrigger value="community">المجتمع</TabsTrigger>
          <TabsTrigger value="leaderboard">المتصدرون</TabsTrigger>
        </TabsList>
        
        {/* Main Tab - Student of the Week and Featured Content */}
        <TabsContent value="main">
          <div className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants}>
                <StudentOfWeek student={STUDENT_OF_WEEK} />
              </motion.div>
            </motion.div>
            
            {/* Roles & Badges section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
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
                              <span className="text-sm text-white font-share-tech">{option.percentage}%</span>
                            </div>
                            <div className="h-8 w-full bg-white/5 rounded-md overflow-hidden">
                              <div 
                                className={`h-full ${
                                  option.id === pollVote 
                                    ? 'bg-[#FF4B1A]' 
                                    : 'bg-white/10'
                                } transition-all duration-1000 ease-out`}
                                style={{ width: `${option.percentage}%` }}
                              >
                                {option.id === pollVote && (
                                  <div className="h-full w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                                  </div>
                                )}
                              </div>
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
        
        {/* Challenges Tab - Weekly Quizzes */}
        <TabsContent value="challenges">
          <div className="space-y-6">
            <WeeklyQuiz quizzes={WEEKLY_QUIZZES} />
          </div>
        </TabsContent>
        
        {/* Community Tab - Q&A and Subject Hubs */}
        <TabsContent value="community">
          <div className="space-y-6">
            {/* Ask Darsni section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
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
                              <div className="h-8 w-8 rounded-full bg-game-card-bg flex items-center justify-center text-xl">
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
                        
                        {/* Answers Section */}
                        {expandedQuestion === question.id && (
                          <div className="border-t border-white/5 bg-white/5 p-3 space-y-3">
                            {question.answersData && question.answersData.length > 0 ? (
                              question.answersData.map(answer => (
                                <div key={answer.id} className="flex gap-2">
                                  <div className="h-7 w-7 rounded-full bg-game-card-bg flex items-center justify-center text-lg">
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
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
                            <span className="text-white font-share-tech">{subject.summaries}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-300">الأسئلة الأسبوعية</span>
                            <span className="text-white font-share-tech">{subject.questions}</span>
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
        
        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <div className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
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
