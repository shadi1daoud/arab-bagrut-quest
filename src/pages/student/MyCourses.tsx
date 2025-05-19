
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseProgress from '@/components/CourseProgress';

const MyCourses = () => {
  // Sample courses data
  const courses = [
    {
      id: '1',
      title: 'رياضيات',
      description: 'كورس شامل للرياضيات للصف الثاني عشر',
      progress: 35,
      level: 'الثاني عشر',
      instructor: 'أ. محمد أحمد',
      totalXP: 1500,
      thumbnail: '/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png'
    },
    {
      id: '2',
      title: 'الفيزياء',
      description: 'مفاهيم الفيزياء الأساسية والمتقدمة',
      progress: 68,
      level: 'الثاني عشر',
      instructor: 'أ. سارة محمود',
      totalXP: 1200,
      thumbnail: '/lovable-uploads/fd288540-ffc0-448a-a6b9-3aee7a09267a.png'
    },
    {
      id: '3',
      title: 'اللغة العربية',
      description: 'تعلم قواعد اللغة العربية والبلاغة',
      progress: 12,
      level: 'الثاني عشر',
      instructor: 'أ. فاطمة علي',
      totalXP: 800,
      thumbnail: '/lovable-uploads/cf18a2e0-832e-4784-8739-89c3d0b07ac8.png'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">الكورسات الخاصة بي</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <CardTitle className="text-xl font-['Outfit'] text-white truncate">{course.title}</CardTitle>
                  <CardDescription className="text-gray-300 font-['Noto_Sans_Arabic'] line-clamp-2">{course.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-['Noto_Sans_Arabic'] text-sm text-white/60">المستوى</div>
                <div className="font-['Noto_Sans_Arabic'] text-sm">{course.level}</div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-['Noto_Sans_Arabic'] text-sm text-white/60">المعلم</div>
                <div className="font-['Noto_Sans_Arabic'] text-sm">{course.instructor}</div>
              </div>
              <CourseProgress progress={course.progress} className="mb-3" />
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4 py-3">
              <div className="text-[#FF4B1A] font-['Share_Tech_Mono'] font-bold bg-[#FF4B1A]/10 px-3 py-1 rounded-full">
                {course.totalXP} XP
              </div>
              <div className="flex gap-2">
                {/* Link to current CourseDetail */}
                <Link to={`/courses/${course.id}`}>
                  <Button variant="secondary" size="sm">
                    متابعة
                  </Button>
                </Link>
                
                {/* Link to the new CourseView */}
                <Link to={`/courses/${course.id}/new`}>
                  <Button variant="default" size="sm">
                    العرض الجديد
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
