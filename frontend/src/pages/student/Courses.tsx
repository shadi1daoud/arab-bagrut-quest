
import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getCourses, Course as FirebaseCourse } from '@/lib/firebaseUtils';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<FirebaseCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<FirebaseCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch courses from Firebase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const allCourses = await getCourses();
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on search and subject
  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(course => course.subject === selectedSubject);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedSubject, courses]);

  // Get unique subjects for filter
  const subjects = ['all', ...Array.from(new Set(courses.map(course => course.subject)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">الكورسات المتاحة</h1>
          <p className="text-gray-400">اكتشف مجموعة متنوعة من الكورسات التعليمية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="ابحث عن كورس..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject === 'all' ? 'الكل' : subject}
            </Button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-black/40 border border-white/10 hover:border-[#FF4800]/30 transition-all duration-300 group cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: course.color }}
                  >
                    {course.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg group-hover:text-[#FF4800] transition-colors">
                      {course.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">{course.subject}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-[#FF4800]/20 text-[#FF4800]">
                  {course.grade}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.totalLessons} درس</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} طالب</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-[#FF4800]" />
                  <span>{course.xpReward} XP</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <span className="text-[#FF4800] font-bold">{course.totalUnits}</span> وحدة
                </div>
                <Button size="sm" className="bg-[#FF4800] hover:bg-[#FF4800]/90">
                  ابدأ الكورس
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">لا توجد كورسات</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || selectedSubject !== 'all' 
              ? 'جرب تغيير معايير البحث' 
              : 'لا توجد كورسات متاحة حالياً'
            }
          </p>
          {(searchTerm || selectedSubject !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
              }}
            >
              إعادة تعيين الفلاتر
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
