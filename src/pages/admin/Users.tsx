
import { useState } from 'react';
import { Search, Filter, Award, CheckCircle, AlertTriangle, Users, Lock, LockOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample users data
const USERS_DATA = [
  {
    id: 's1',
    name: 'أحمد محمود',
    email: 'ahmed@example.com',
    avatar: '👦',
    grade: 'الثاني عشر',
    city: 'الناصرة',
    registerDate: '2023-09-10',
    lastActive: '2023-11-20',
    xp: 12500,
    level: 5,
    streak: 15,
    coursesEnrolled: 3,
    coursesCompleted: 1,
    isBlocked: false,
  },
  {
    id: 's2',
    name: 'سارة حسن',
    email: 'sara@example.com',
    avatar: '👧',
    grade: 'الثاني عشر',
    city: 'حيفا',
    registerDate: '2023-08-15',
    lastActive: '2023-11-20',
    xp: 14200,
    level: 6,
    streak: 30,
    coursesEnrolled: 4,
    coursesCompleted: 2,
    isBlocked: false,
  },
  {
    id: 's3',
    name: 'محمد علي',
    email: 'mohammed@example.com',
    avatar: '👨',
    grade: 'الحادي عشر',
    city: 'عكا',
    registerDate: '2023-10-05',
    lastActive: '2023-11-18',
    xp: 7800,
    level: 4,
    streak: 5,
    coursesEnrolled: 2,
    coursesCompleted: 0,
    isBlocked: false,
  },
  {
    id: 's4',
    name: 'ليلى عمر',
    email: 'layla@example.com',
    avatar: '👩',
    grade: 'الثاني عشر',
    city: 'يافا',
    registerDate: '2023-07-20',
    lastActive: '2023-11-19',
    xp: 16300,
    level: 7,
    streak: 25,
    coursesEnrolled: 5,
    coursesCompleted: 3,
    isBlocked: false,
  },
  {
    id: 's5',
    name: 'شادي داود',
    email: 'student@darsni.com',
    avatar: '👨‍🎓',
    grade: 'الثاني عشر',
    city: 'مار إلياس',
    registerDate: '2023-11-01',
    lastActive: '2023-11-20',
    xp: 8966,
    level: 3,
    streak: 20,
    coursesEnrolled: 2,
    coursesCompleted: 0,
    isBlocked: false,
  },
  {
    id: 's6',
    name: 'رنا محمود',
    email: 'rana@example.com',
    avatar: '👧',
    grade: 'العاشر',
    city: 'الرملة',
    registerDate: '2023-10-10',
    lastActive: '2023-11-15',
    xp: 5200,
    level: 2,
    streak: 8,
    coursesEnrolled: 1,
    coursesCompleted: 0,
    isBlocked: true,
  },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'blocked'
  const [users, setUsers] = useState(USERS_DATA);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const { toast } = useToast();
  
  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchTerm) || 
                          user.email.includes(searchTerm) ||
                          user.city.includes(searchTerm);
    const matchesGrade = filterGrade === 'all' || user.grade === filterGrade;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && !user.isBlocked) ||
                          (filterStatus === 'blocked' && user.isBlocked);
    
    return matchesSearch && matchesGrade && matchesStatus;
  });
  
  // Get unique grades for filters
  const grades = [...new Set(users.map(user => user.grade))];
  
  // Handle reset password
  const handleResetPassword = (userId: string) => {
    setSelectedUserId(userId);
    setIsResetModalOpen(true);
  };
  
  const confirmResetPassword = () => {
    if (selectedUserId) {
      toast({
        title: "تم إعادة تعيين كلمة المرور",
        description: "تم إرسال رابط إعادة التعيين إلى بريد الطالب الإلكتروني",
      });
      setIsResetModalOpen(false);
      setSelectedUserId(null);
    }
  };
  
  // Handle block/unblock user
  const handleToggleBlock = (userId: string, currentStatus: boolean) => {
    setSelectedUserId(userId);
    setIsBlocking(!currentStatus);
    setIsBlockModalOpen(true);
  };
  
  const confirmToggleBlock = () => {
    if (selectedUserId) {
      setUsers(users.map(user => 
        user.id === selectedUserId ? { ...user, isBlocked: isBlocking } : user
      ));
      
      toast({
        title: isBlocking ? "تم حظر المستخدم" : "تم إلغاء حظر المستخدم",
        description: isBlocking ? 
                    "تم حظر المستخدم من الوصول إلى المنصة" : 
                    "تم إلغاء حظر المستخدم ويمكنه الآن الوصول إلى المنصة",
      });
      
      setIsBlockModalOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة المستخدمين</h1>
          <p className="text-gray-400 mt-1">عرض وإدارة طلاب المنصة</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            إجمالي الطلاب: {users.length}
          </span>
        </div>
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
              placeholder="ابحث عن طالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
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
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2 px-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="blocked">محظور</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-right">
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الطالب</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">المستوى</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الصف / المدينة</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الكورسات</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">آخر نشاط</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الحالة</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-400">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-xl border border-gray-600">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-white">المستوى {user.level}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {user.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white">{user.grade}</div>
                    <div className="text-xs text-gray-400">{user.city}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-white">{user.coursesEnrolled}</span>
                      <span className="text-xs text-gray-400">مسجل</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <span>{user.coursesCompleted}</span>
                      <span>مكتمل</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(user.lastActive).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-4 py-3">
                    {user.isBlocked ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-900/20 text-red-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        محظور
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-900/20 text-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        نشط
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleResetPassword(user.id)}
                        className="p-1.5 bg-blue-600/20 text-blue-500 rounded hover:bg-blue-600/30 transition-colors"
                        title="إعادة تعيين كلمة المرور"
                      >
                        <Lock className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleBlock(user.id, user.isBlocked)}
                        className={`p-1.5 rounded transition-colors ${
                          user.isBlocked 
                            ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30' 
                            : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
                        }`}
                        title={user.isBlocked ? 'إلغاء الحظر' : 'حظر المستخدم'}
                      >
                        {user.isBlocked ? (
                          <LockOpen className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">لم يتم العثور على طلاب مطابقين</p>
          </div>
        )}
      </div>
      
      {/* Reset Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-semibold text-white mb-4">إعادة تعيين كلمة المرور</h3>
            <p className="text-gray-400 mb-6">
              هل أنت متأكد من رغبتك في إعادة تعيين كلمة المرور لهذا المستخدم؟ سيتم إرسال رابط إعادة التعيين إلى بريده الإلكتروني.
            </p>
            
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmResetPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Block/Unblock Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-semibold text-white mb-4">
              {isBlocking ? 'حظر المستخدم' : 'إلغاء حظر المستخدم'}
            </h3>
            <p className="text-gray-400 mb-6">
              {isBlocking 
                ? 'هل أنت متأكد من رغبتك في حظر هذا المستخدم؟ لن يتمكن من الوصول إلى المنصة حتى يتم إلغاء الحظر.'
                : 'هل أنت متأكد من رغبتك في إلغاء حظر هذا المستخدم؟ سيتمكن من الوصول إلى المنصة مرة أخرى.'
              }
            </p>
            
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => setIsBlockModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmToggleBlock}
                className={`px-4 py-2 text-white rounded ${
                  isBlocking 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } transition-colors`}
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
