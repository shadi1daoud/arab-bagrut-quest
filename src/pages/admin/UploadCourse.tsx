
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Plus, Trash2, FileVideo, CheckCircle, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  hasQuiz: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

const UploadCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [units, setUnits] = useState('5');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [xpReward, setXpReward] = useState('1000');
  const [sections, setSections] = useState<Section[]>([
    {
      id: `section-${Date.now()}`,
      title: '',
      lessons: [
        {
          id: `lesson-${Date.now()}`,
          title: '',
          videoUrl: '',
          duration: '',
          hasQuiz: false,
        }
      ]
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Handle thumbnail selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Add new section
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${Date.now()}`,
        title: '',
        lessons: [
          {
            id: `lesson-${Date.now()}`,
            title: '',
            videoUrl: '',
            duration: '',
            hasQuiz: false,
          }
        ]
      }
    ]);
  };
  
  // Remove section
  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  // Update section title
  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    ));
  };
  
  // Add new lesson to section
  const addLesson = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: [
          ...section.lessons,
          {
            id: `lesson-${Date.now()}`,
            title: '',
            videoUrl: '',
            duration: '',
            hasQuiz: false,
          }
        ]
      } : section
    ));
  };
  
  // Remove lesson from section
  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
      } : section
    ));
  };
  
  // Update lesson details
  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: string | boolean) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: section.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
        )
      } : section
    ));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Validate form
    if (!title || !description || !subject || !grade || !units) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }
    
    // Validate sections and lessons
    const invalidSections = sections.some(section => !section.title || section.lessons.length === 0);
    const invalidLessons = sections.some(section => 
      section.lessons.some(lesson => !lesson.title || !lesson.videoUrl || !lesson.duration)
    );
    
    if (invalidSections || invalidLessons) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع معلومات الأقسام والدروس",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }
    
    // Simulate upload/processing time
    setTimeout(() => {
      toast({
        title: "تم رفع الكورس بنجاح",
        description: "تم إضافة الكورس إلى المنصة بنجاح",
      });
      setIsUploading(false);
      navigate('/admin/courses');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/courses')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-white">رفع كورس جديد</h1>
            <p className="text-gray-400 mt-1">قم بإنشاء كورس جديد وإضافته للمنصة</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Course Info */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">معلومات الكورس الأساسية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  عنوان الكورس <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="أدخل عنوان الكورس"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  وصف الكورس <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-24 resize-none"
                  placeholder="أدخل وصفاً للكورس"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    المادة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المادة</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="لغات">لغات</option>
                    <option value="علوم">علوم</option>
                    <option value="إنسانيات">إنسانيات</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    الصف <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر الصف</option>
                    <option value="العاشر">العاشر</option>
                    <option value="الحادي عشر">الحادي عشر</option>
                    <option value="الثاني عشر">الثاني عشر</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    عدد الوحدات <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="3">3 وحدات</option>
                    <option value="4">4 وحدات</option>
                    <option value="5">5 وحدات</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    مكافأة النقاط (XP) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    step="100"
                    value={xpReward}
                    onChange={(e) => setXpReward(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                صورة الكورس المصغرة
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center h-48">
                {thumbnailPreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-400">اضغط هنا لرفع صورة</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">محتوى الكورس</h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              إضافة قسم جديد
            </button>
          </div>
          
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
                        {sectionIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="عنوان القسم"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="p-1 text-red-500 hover:text-red-400 transition-colors"
                    disabled={sections.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Lessons */}
                <div className="space-y-3 mb-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{sectionIndex + 1}.{lessonIndex + 1}</span>
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                            className="w-full px-3 py-1 rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="عنوان الدرس"
                            required
                          />
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removeLesson(section.id, lesson.id)}
                          className="p-1 text-red-500 hover:text-red-400 transition-colors"
                          disabled={section.lessons.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            رابط الفيديو
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <FileVideo className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={lesson.videoUrl}
                              onChange={(e) => updateLesson(section.id, lesson.id, 'videoUrl', e.target.value)}
                              className="w-full px-3 py-1 pr-9 rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="رابط YouTube أو Vimeo"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            مدة الدرس
                          </label>
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(section.id, lesson.id, 'duration', e.target.value)}
                            className="w-full px-3 py-1 rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="مثال: 15 دقيقة"
                            required
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={lesson.hasQuiz}
                              onChange={(e) => updateLesson(section.id, lesson.id, 'hasQuiz', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="relative w-10 h-5 bg-gray-500 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 rtl:peer-checked:after:translate-x-[-1.25rem] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                            <span className="text-xs text-gray-400">إضافة اختبار</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => addLesson(section.id)}
                  className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  إضافة درس
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tips */}
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-500 mb-1">نصائح لإنشاء كورس ناجح</h3>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mr-4">
                <li>قم بتقسيم المحتوى إلى أقسام ودروس منطقية ومتسلسلة</li>
                <li>الدروس القصيرة (10-20 دقيقة) أكثر فعالية من الدروس الطويلة</li>
                <li>أضف اختبارات قصيرة بعد كل درس لتعزيز فهم الطلاب</li>
                <li>استخدم عنوان جذاب ووصف واضح للكورس</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`game-btn flex items-center gap-2 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
            {isUploading ? 'جاري الرفع...' : 'رفع الكورس'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCourse;
