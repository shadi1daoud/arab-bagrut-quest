
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Pencil, Trash2, Search, Filter, BookOpen, Users, Clock 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample courses data
const COURSES_DATA = [
  {
    id: '1',
    title: 'رياضيات',
    subject: 'رياضيات',
    grade: 'الثاني عشر',
    units: 5,
    lessons: 8,
    students: 189,
    lastUpdated: '2023-11-15',
    icon: '🧮',
    color: 'bg-blue-600',
  },
  {
    id: '2',
    title: 'إنجليزي',
    subject: 'لغات',
    grade: 'الثاني عشر',
    units: 5,
    lessons: 12,
    students: 156,
    lastUpdated: '2023-11-10',
    icon: '🔤',
    color: 'bg-green-600',
  },
  {
    id: '3',
    title: 'فيزياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    lessons: 10,
    students: 98,
    lastUpdated: '2023-11-05',
    icon: '⚛️',
    color: 'bg-purple-600',
  },
  {
    id: '4',
    title: 'كيمياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    lessons: 9,
    students: 76,
    lastUpdated: '2023-10-28',
    icon: '🧪',
    color: 'bg-red-600',
  },
  {
    id: '5',
    title: 'أحياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    lessons: 7,
    students: 65,
    lastUpdated: '2023-10-20',
    icon: '🔬',
    color: 'bg-teal-600',
  },
  {
    id: '6',
    title: 'تاريخ',
    subject: 'إنسانيات',
    grade: 'الثاني عشر',
    units: 3,
    lessons: 8,
    students: 42,
    lastUpdated: '2023-10-15',
    icon: '📜',
    color: 'bg-yellow-600',
  },
];

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [courses, setCourses] = useState(COURSES_DATA);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.includes(searchTerm) || 
                          course.subject.includes(searchTerm);
    const matchesSubject = filterSubject === 'all' || course.subject === filterSubject;
    const matchesGrade = filterGrade === 'all' || course.grade === filterGrade;
    
    return matchesSearch && matchesSubject && matchesGrade;
  });
  
  // Get unique subjects and grades for filters
  const subjects = [...new Set(courses.map(course => course.subject))];
  const grades = [...new Set(courses.map(course => course.grade))];
  
  // Handle delete course
  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter(course => course.id !== courseToDelete));
      toast({
        title: "تم حذف الكورس",
        description: "تم حذف الكورس بنجاح",
      });
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة الكورسات</h1>
          <p className="text-gray-400 mt-1">عرض وتعديل وحذف الكورسات</p>
        </div>
        
        <Link 
          to="/admin/courses/upload"
          className="game-btn flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          رفع كورس جديد
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="py-2 px-4 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="ابحث عن كورس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="py-2 px-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">جميع المواد</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="py-2 px-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">جميع الصفوف</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Courses Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-right">
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الكورس</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">المادة / الصف</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الدروس</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الطلاب</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">آخر تحديث</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-md ${course.color} flex items-center justify-center`}>
                        <span className="text-xl">{course.icon}</span>
                      </div>
                      <span className="font-medium text-white">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div>
                      <span className="text-white">{course.subject}</span>
                      <span className="text-gray-400 text-xs block">{course.grade} • {course.units} وحدات</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{course.lessons}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{course.students}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(course.lastUpdated).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link 
                        to={`/admin/courses/edit/${course.id}`}
                        className="p-1.5 bg-blue-600/20 text-blue-500 rounded hover:bg-blue-600/30 transition-colors"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(course.id)}
                        className="p-1.5 bg-red-600/20 text-red-500 rounded hover:bg-red-600/30 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">لم يتم العثور على كورسات مطابقة</p>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-semibold text-white mb-4">تأكيد الحذف</h3>
            <p className="text-gray-400 mb-6">
              هل أنت متأكد من رغبتك في حذف هذا الكورس؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
