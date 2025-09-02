
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id: number;
  question: string;
  options: { id: number; text: string }[];
  correctAnswer: number;
}

interface WeeklyQuizProps {
  quizzes: {
    id: number;
    title: string;
    description: string;
    reward: number;
    questions: QuizQuestion[];
    participants: number;
  }[];
}

export const WeeklyQuiz: React.FC<WeeklyQuizProps> = ({ quizzes }) => {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeQuiz = quizzes[activeQuizIndex];
  const currentQuestion = activeQuiz?.questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionId: number) => {
    if (isCorrect !== null) return; // Already answered
    
    setSelectedOption(optionId);
    const correct = optionId === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        // Quiz completed
        setQuizCompleted(true);
      }
    }, 1500);
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const switchQuiz = (index: number) => {
    setActiveQuizIndex(index);
    resetQuiz();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white font-changa flex items-center gap-2">
          <Award className="h-5 w-5 text-[#FF4B1A]" />
          الاختبارات الأسبوعية
        </h2>
        <span className="text-xs text-gray-400">تحديثات جديدة كل أسبوع</span>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {quizzes.map((quiz, index) => (
          <Button 
            key={quiz.id}
            variant={activeQuizIndex === index ? "default" : "outline"} 
            size="sm"
            onClick={() => switchQuiz(index)}
            className="whitespace-nowrap"
          >
            {quiz.title}
          </Button>
        ))}
      </div>
      
      <Card className="bg-black/40 border border-white/10">
        <CardContent className="p-4">
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{activeQuiz.title}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-gray-400">سؤال</span>
                  <span className="text-white font-bold">{currentQuestionIndex + 1}/{activeQuiz.questions.length}</span>
                </div>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <p className="text-white text-lg mb-6">{currentQuestion.question}</p>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full p-3 text-right rounded-lg border transition-colors ${
                        selectedOption === option.id
                          ? option.id === currentQuestion.correctAnswer
                            ? "bg-green-500/20 border-green-500/50 text-white"
                            : "bg-red-500/20 border-red-500/50 text-white"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isCorrect !== null}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {isCorrect !== null && (
                <div className={`p-3 rounded-lg text-center ${
                  isCorrect ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {isCorrect ? "إجابة صحيحة! أحسنت." : "إجابة خاطئة. حاول مرة أخرى في السؤال القادم."}
                </div>
              )}
            </div>
          ) : (
            <motion.div 
              className="flex flex-col items-center gap-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF4B1A] to-yellow-500 flex items-center justify-center">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center text-white">أكملت الاختبار!</h3>
              <p className="text-center text-gray-300">
                حصلت على <span className="text-[#FF4B1A] font-bold">{score}</span> من <span className="text-white">{activeQuiz.questions.length}</span> نقاط
              </p>
              <p className="text-center text-gray-400 text-sm">{activeQuiz.description}</p>
              
              <div className="flex items-center gap-2 bg-[#FF4B1A]/20 text-[#FF4B1A] rounded-full px-3 py-1.5 text-sm mt-4">
                <Star className="h-4 w-4" />
                <span>+{Math.round((score / activeQuiz.questions.length) * activeQuiz.reward)} XP</span>
              </div>
              
              <Button className="mt-4" onClick={resetQuiz}>
                حاول مرة أخرى
              </Button>
            </motion.div>
          )}
          
          <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
            <span>{activeQuiz.participants} مشارك في هذا الاختبار</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyQuiz;
