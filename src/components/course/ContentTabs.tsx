
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  File, 
  ChevronDown, 
  ChevronUp,
  SkipForward
} from 'lucide-react';
import { cn } from "@/lib/utils";

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
        <TabsList className="bg-black/40 border border-white/5 p-1 mb-4 w-full grid grid-cols-3">
          <TabsTrigger
            value="summary"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            ملخص PDF
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white"
          >
            <File className="h-4 w-4 mr-2" />
            ملاحظاتي
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="font-['Noto_Sans_Arabic'] data-[state=active]:bg-[#FF4B1A] data-[state=active]:text-white"
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            الأسئلة المتكررة
          </TabsTrigger>
        </TabsList>

        {/* PDF Summary Tab */}
        <TabsContent value="summary" className="mt-0">
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            {pdfUrl ? (
              <div className="relative h-[500px] mb-4">
                <iframe 
                  src={pdfUrl} 
                  className="w-full h-full rounded-lg" 
                  title="PDF Viewer"
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2 flex items-center bg-black/70"
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
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="اكتب ملاحظاتك هنا..."
              className="w-full h-[300px] bg-black/50 border border-white/10 rounded-lg p-4 text-white font-['Noto_Sans_Arabic'] resize-none focus:outline-none focus:ring-1 focus:ring-[#FF4B1A]/30 focus:border-[#FF4B1A]/30"
            />
            <p className="text-xs text-gray-500 mt-2 font-['Noto_Sans_Arabic'] text-center">
              يتم حفظ الملاحظات تلقائيًا
            </p>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-0">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-black/30 border border-white/10 rounded-xl overflow-hidden transition-all",
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
                
                {expandedFaq === index && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-300 font-['Noto_Sans_Arabic']">
                      {faq.answer}
                    </p>
                    
                    {faq.timestamps && faq.timestamps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {faq.timestamps.map((stamp, i) => (
                          <button
                            key={i}
                            className="inline-flex items-center px-3 py-1 text-xs bg-[#FF4B1A]/10 text-[#FF4B1A] rounded-full border border-[#FF4B1A]/20 hover:bg-[#FF4B1A]/20 transition-colors"
                            onClick={() => onJumpToTimestamp(stamp.time)}
                          >
                            <SkipForward className="h-3 w-3 mr-1" />
                            {stamp.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
