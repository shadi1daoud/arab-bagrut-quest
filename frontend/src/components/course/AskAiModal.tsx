
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Brain, SendHorizontal, XCircle } from 'lucide-react';

interface AskAiModalProps {
  onClose: () => void;
}

const AskAiModal = ({ onClose }: AskAiModalProps) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai'; content: string}[]>([
    {
      role: 'ai',
      content: 'مرحباً! أنا D-Bot، مساعدك التعليمي. كيف يمكنني مساعدتك في هذا الدرس؟'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = {
        role: 'ai' as const,
        content: getAiResponse(query)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple mock responses for demo purposes
  const getAiResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('مصفوفات') || lowerQuery.includes('matrix')) {
      return 'المصفوفة هي مجموعة من الأرقام مرتبة في صفوف وأعمدة. يمكن استخدامها لحل أنظمة المعادلات الخطية وتطبيقات أخرى في الرياضيات.';
    }
    
    if (lowerQuery.includes('معادلات') || lowerQuery.includes('equation')) {
      return 'المعادلات الخطية هي معادلات من الدرجة الأولى. يمكن تمثيلها بشكل ax + b = 0، حيث a و b هي ثوابت، و x هو المتغير.';
    }
    
    if (lowerQuery.includes('كيف') || lowerQuery.includes('شرح')) {
      return 'يمكنك العودة إلى محتوى الفيديو في الدقيقة 5:30 حيث يتم شرح هذا المفهوم بالتفصيل. أو يمكنك مراجعة الملخص PDF المرفق.';
    }
    
    return 'هذا سؤال مثير للاهتمام! يمكنك الرجوع إلى المحتوى التعليمي أو طرح سؤال أكثر تحديداً للحصول على إجابة أفضل.';
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-[500px] bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A] rounded-xl border border-white/10 shadow-lg overflow-hidden h-[500px] flex flex-col"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/30">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#FF4B1A]/20 flex items-center justify-center mr-3">
              <Brain className="h-4 w-4 text-[#FF4B1A]" />
            </div>
            <h3 className="text-white font-bold font-['Changa']">D-Bot AI</h3>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.role === 'user' 
                    ? 'bg-[#FF4B1A] text-white' 
                    : 'bg-black/40 border border-white/10 text-white'
                }`}
              >
                <p className="text-sm font-['Noto_Sans_Arabic']">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 bg-black/30 border border-white/10 rounded-l-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FF4B1A]/30 focus:border-[#FF4B1A]/30 font-['Noto_Sans_Arabic']"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-[#FF4B1A] hover:bg-[#FF4B1A]/90 rounded-r-lg rounded-l-none px-4"
              disabled={!query.trim() || isLoading}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AskAiModal;
