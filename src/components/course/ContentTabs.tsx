
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  File, 
  ChevronDown, 
  ChevronUp,
  SkipForward
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
  timestamps?: { time: number; label: string }[];
}

interface ContentTabsProps {
  pdfUrl?: string;
  faqs: FAQ[];
  notes: string;
  onNotesChange: (notes: string) => void;
  onJumpToTimestamp: (time: number) => void;
}

const ContentTabs = ({ pdfUrl, faqs, notes, onNotesChange, onJumpToTimestamp }: ContentTabsProps) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="w-full mt-4">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-black/40 backdrop-blur-sm border border-white/5 p-1 mb-4 w-full grid grid-cols-3 overflow-visible">
          <TabsTrigger
            value="summary"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white transition-all duration-300 relative"
          >
            <FileText className="h-4 w-4 mr-2" />
            ملخص PDF
            {activeTab === "summary" && (
              <motion.div 
                layoutId="tabIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF4B1A]" 
              />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white transition-all duration-300 relative"
          >
            <File className="h-4 w-4 mr-2" />
            ملاحظاتي
            {activeTab === "notes" && (
              <motion.div 
                layoutId="tabIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF4B1A]" 
              />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white transition-all duration-300 relative"
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            الأسئلة المتكررة
            {activeTab === "faq" && (
              <motion.div 
                layoutId="tabIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF4B1A]" 
              />
            )}
          </TabsTrigger>
        </TabsList>

        {/* PDF Summary Tab */}
        <TabsContent value="summary" className="mt-0">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]">
            {pdfUrl ? (
              <div className="relative h-[500px] max-h-[60vh] mb-4">
                <iframe 
                  src={pdfUrl} 
                  className="w-full h-full rounded-lg" 
                  title="PDF Viewer"
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2 flex items-center bg-black/70 hover:shadow-[0_0_8px_rgba(255,75,26,0.33)] transition-all duration-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  تحميل PDF
                </Button>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p className="text-center font-['Noto_Sans_Arabic']">
                  لم يتم توفير ملف PDF لهذه الوحدة
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-0">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]">
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="اكتب ملاحظاتك هنا..."
              className="w-full h-[300px] max-h-[60vh] bg-black/50 border border-white/10 rounded-lg p-4 text-white font-['Noto_Sans_Arabic'] resize-none focus:outline-none focus:ring-1 focus:ring-[#FF4B1A]/30 focus:border-[#FF4B1A]/30"
            />
            <p className="text-xs text-gray-500 mt-2 font-['Noto_Sans_Arabic'] text-center">
              يتم حفظ الملاحظات تلقائيًا
            </p>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-0">
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-3 pb-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]",
                    expandedFaq === index ? "border-[#FF4B1A]/20" : ""
                  )}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h4 className="text-white font-['Noto_Sans_Arabic'] font-medium">
                      {faq.question}
                    </h4>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0">
                          <p className="text-gray-300 font-['Noto_Sans_Arabic']">
                            {faq.answer}
                          </p>
                          
                          {faq.timestamps && faq.timestamps.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {faq.timestamps.map((stamp, i) => (
                                <button
                                  key={i}
                                  className="inline-flex items-center px-3 py-1 text-xs bg-[#FF4B1A]/10 text-[#FF4B1A] rounded-full border border-[#FF4B1A]/20 hover:bg-[#FF4B1A]/20 transition-colors hover:shadow-[0_0_8px_rgba(255,75,26,0.33)] transition-all duration-300"
                                  onClick={() => onJumpToTimestamp(stamp.time)}
                                >
                                  <SkipForward className="h-3 w-3 mr-1" />
                                  {stamp.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
