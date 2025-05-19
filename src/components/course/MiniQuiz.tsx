
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'true-false';
}

interface MiniQuizProps {
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete: (score: number) => void;
}

const MiniQuiz = ({ questions, onClose, onComplete }: MiniQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    } else {
      // Shake effect for wrong answer
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
    // Auto proceed to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        // Quiz completed
        setShowResults(true);
        const finalScore = correct ? score + 1 : score;
        const isPerfect = finalScore === questions.length;
        
        if (isPerfect) {
          // Perfect score celebration
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          
          toast({
            title: "مبروك! إجابات مثالية",
            description: `لقد حصلت على علامة كاملة ${finalScore}/${questions.length}!`,
            variant: "default",
          });
        }
        
        onComplete(finalScore);
      }
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-[640px] bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A] rounded-xl border border-white/10 shadow-lg overflow-hidden"
      >
        {!showResults ? (
          <>
            {/* Quiz header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-white font-['Changa']">اختبار سريع</h2>
                <div className="px-3 py-1 bg-[#FF4B1A]/10 rounded-full border border-[#FF4B1A]/20">
                  <span className="text-sm font-['Share_Tech_Mono'] text-[#FF4B1A]">
                    {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
            
            {/* Question */}
            <motion.div 
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="p-6"
            >
              <h3 className="text-xl text-white font-['Changa'] mb-6 leading-relaxed">
                {question.question}
              </h3>
              
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-3 rounded-lg text-left flex justify-between items-center border ${
                      selectedAnswer === index
                        ? isAnswerCorrect
                          ? 'bg-green-500/20 border-green-500/30'
                          : 'bg-red-500/20 border-red-500/30'
                        : 'bg-black/40 border-white/10 hover:bg-black/60'
                    } transition-colors`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    animate={shake && selectedAnswer === index ? {
                      rotate: [0, -3, 3, -3, 3, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white font-['Noto_Sans_Arabic']">{option}</span>
                    
                    {selectedAnswer === index && (
                      isAnswerCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          /* Results screen */
          <div className="p-6 text-center">
            <div className="flex flex-col items-center mb-6">
              <Award className="h-16 w-16 text-[#FF4B1A] mb-4" />
              <h2 className="text-2xl font-bold text-white font-['Changa']">نتائج الاختبار</h2>
              <p className="text-gray-400 font-['Noto_Sans_Arabic']">
                لقد أكملت الاختبار السريع
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg border border-white/10 p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300 font-['Noto_Sans_Arabic']">الدرجة النهائية:</span>
                <span className="text-xl font-['Share_Tech_Mono'] text-white">
                  {score}/{questions.length}
                </span>
              </div>
              
              <Progress 
                value={(score / questions.length) * 100} 
                className="h-3"
                indicatorClassName={score === questions.length ? "bg-green-500" : "bg-[#FF4B1A]"} 
              />
              
              <p className="mt-3 text-sm text-center text-gray-400 font-['Noto_Sans_Arabic']">
                {score === questions.length 
                  ? "ممتاز! إجابات مثالية"
                  : score >= questions.length / 2
                  ? "جيد! يمكنك فعل أفضل في المرة القادمة"
                  : "حاول مرة أخرى لتحسين درجتك"
                }
              </p>
            </div>
            
            {score === questions.length && (
              <div className="bg-[#FF4B1A]/10 border border-[#FF4B1A]/20 rounded-lg p-3 mb-6 flex items-center justify-center">
                <span className="text-[#FF4B1A] font-['Share_Tech_Mono'] mr-2">+80 XP</span>
                <span className="text-white font-['Noto_Sans_Arabic']">مكافأة للإجابة الكاملة!</span>
              </div>
            )}
            
            <Button onClick={onClose} className="w-full font-['Noto_Sans_Arabic']">
              إغلاق
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MiniQuiz;
