const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample data extracted from the codebase
const sampleData = {
  // Users Collection
  users: {
    'student-1': {
      id: 'student-1',
      name: 'شادي داود',
      email: 'student@darsni.com',
      role: 'student',
      avatar: '/assets/avatars/student.png',
      grade: 'الثاني عشر',
      city: 'مار إلياس',
      level: 3,
      xp: 8966,
      streak: 20,
      coins: 450,
      createdAt: admin.firestore.Timestamp.now(),
      lastActive: admin.firestore.Timestamp.now(),
      isBlocked: false,
      preferences: {
        notifications: true,
        language: 'ar',
        theme: 'dark'
      },
      stats: {
        totalStudyTime: 45,
        coursesCompleted: 2,
        totalXP: 8966,
        achievements: ['first_course', 'week_streak']
      }
    },
    'admin-1': {
      id: 'admin-1',
      name: 'مدرسة ليلى',
      email: 'admin@darsni.com',
      role: 'admin',
      avatar: '/assets/avatars/admin.png',
      level: 1,
      xp: 0,
      streak: 0,
      coins: 0,
      createdAt: admin.firestore.Timestamp.now(),
      lastActive: admin.firestore.Timestamp.now(),
      isBlocked: false,
      preferences: {
        notifications: true,
        language: 'ar',
        theme: 'dark'
      },
      stats: {
        totalStudyTime: 0,
        coursesCompleted: 0,
        totalXP: 0,
        achievements: []
      }
    },
    'student-2': {
      id: 'student-2',
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      role: 'student',
      avatar: '👦',
      grade: 'الثاني عشر',
      city: 'الناصرة',
      level: 5,
      xp: 12500,
      streak: 15,
      coins: 320,
      createdAt: admin.firestore.Timestamp.now(),
      lastActive: admin.firestore.Timestamp.now(),
      isBlocked: false,
      preferences: {
        notifications: true,
        language: 'ar',
        theme: 'dark'
      },
      stats: {
        totalStudyTime: 78,
        coursesCompleted: 3,
        totalXP: 12500,
        achievements: ['first_course', 'week_streak', 'five_courses']
      }
    }
  },

  // Courses Collection
  courses: {
    'course-1': {
      id: 'course-1',
      title: 'رياضيات',
      subject: 'رياضيات',
      grade: 'الثاني عشر',
      description: 'كورس شامل للرياضيات للصف الثاني عشر يغطي جميع مواضيع البجروت بشكل مفصل وتفاعلي.',
      icon: '🧮',
      color: 'bg-blue-600',
      xpReward: 1500,
      totalUnits: 5,
      totalLessons: 8,
      students: 189,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      isPublished: true,
      createdBy: 'admin-1',
      thumbnail: '/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png',
      stats: {
        totalEnrollments: 189,
        averageProgress: 65,
        completionRate: 23
      }
    },
    'course-2': {
      id: 'course-2',
      title: 'إنجليزي',
      subject: 'لغات',
      grade: 'الثاني عشر',
      description: 'كورس شامل للغة الإنجليزية للصف الثاني عشر',
      icon: '🔤',
      color: 'bg-green-600',
      xpReward: 1200,
      totalUnits: 5,
      totalLessons: 12,
      students: 156,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      isPublished: true,
      createdBy: 'admin-1',
      thumbnail: '/lovable-uploads/fb2240e4-c664-43fd-896d-20f9cac3ca33.png',
      stats: {
        totalEnrollments: 156,
        averageProgress: 58,
        completionRate: 18
      }
    },
    'course-3': {
      id: 'course-3',
      title: 'فيزياء',
      subject: 'علوم',
      grade: 'الثاني عشر',
      description: 'كورس شامل للفيزياء للصف الثاني عشر',
      icon: '⚛️',
      color: 'bg-[#FF4800]',
      xpReward: 1800,
      totalUnits: 5,
      totalLessons: 10,
      students: 98,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      isPublished: true,
      createdBy: 'admin-1',
      thumbnail: '/lovable-uploads/cf18a2e0-832e-4784-8739-89c3d0b07ac8.png',
      stats: {
        totalEnrollments: 98,
        averageProgress: 72,
        completionRate: 31
      }
    }
  },

  // Units Collection
  units: {
    'unit-1': {
      id: 'unit-1',
      courseId: 'course-1',
      number: 1,
      title: 'مقدمة في الجبر',
      duration: '18 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      notes: 'ملاحظات حول الدرس الأول...',
      hasQuiz: true,
      xpReward: 100,
      chapters: [
        { time: 15, title: 'تعريف المصفوفات' },
        { time: 45, title: 'جمع المصفوفات' },
        { time: 72, title: 'ضرب المصفوفات' }
      ],
      faqs: [
        {
          question: 'ما هي المصفوفة؟',
          answer: 'المصفوفة هي مجموعة من الأعداد أو الرموز مرتبة في صفوف وأعمدة.',
          timestamps: [
            { time: 15, label: 'تعريف المصفوفة (0:15)' }
          ]
        },
        {
          question: 'كيف نضرب مصفوفتين؟',
          answer: 'لضرب مصفوفتين، يجب أن يكون عدد أعمدة المصفوفة الأولى مساويًا لعدد صفوف المصفوفة الثانية.',
          timestamps: [
            { time: 72, label: 'شرح الضرب (1:12)' }
          ]
        }
      ]
    },
    'unit-2': {
      id: 'unit-2',
      courseId: 'course-1',
      number: 2,
      title: 'المعادلات التربيعية',
      duration: '22 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      notes: '',
      hasQuiz: true,
      xpReward: 120,
      chapters: [
        { time: 20, title: 'القانون العام' },
        { time: 60, title: 'طرق الحل' },
        { time: 90, title: 'تطبيقات' }
      ],
      faqs: [
        {
          question: 'ما هو القانون العام لحل المعادلة التربيعية؟',
          answer: 'القانون العام هو x = [-b ± √(b² - 4ac)] / 2a حيث المعادلة على الشكل ax² + bx + c = 0',
          timestamps: [
            { time: 20, label: 'القانون العام (0:20)' }
          ]
        }
      ]
    }
  },

  // Quizzes Collection
  quizzes: {
    'quiz-1': {
      id: 'quiz-1',
      unitId: 'unit-1',
      courseId: 'course-1',
      title: 'اختبار الجبر الأساسي',
      description: 'اختبر معرفتك في الجبر والمصفوفات',
      questions: [
        {
          id: 'q1',
          question: 'ما هو الناتج من ضرب المصفوفة [1, 2; 3, 4] في المصفوفة [0, 1; 1, 0]؟',
          options: ['[1, 2; 3, 4]', '[2, 1; 4, 3]', '[1, 0; 0, 1]', '[0, 0; 0, 0]'],
          correctAnswer: 1,
          type: 'multiple-choice',
          xpReward: 30
        },
        {
          id: 'q2',
          question: 'المصفوفة الوحدة هي مصفوفة مربعة تكون فيها جميع القيم الموجودة على القطر الرئيسي تساوي 1، وباقي القيم تساوي 0.',
          options: ['صحيح', 'خطأ'],
          correctAnswer: 0,
          type: 'true-false',
          xpReward: 20
        }
      ],
      totalXP: 50,
      timeLimit: 600, // 10 minutes
      passingScore: 70
    }
  },

  // User Course Progress
  userCourses: {
    'student-1_course-1': {
      userId: 'student-1',
      courseId: 'course-1',
      progress: 35,
      currentUnitId: 'unit-2',
      completedUnits: ['unit-1'],
      totalXP: 100,
      startedAt: admin.firestore.Timestamp.now(),
      lastAccessed: admin.firestore.Timestamp.now()
    },
    'student-1_course-2': {
      userId: 'student-1',
      courseId: 'course-2',
      progress: 0,
      currentUnitId: null,
      completedUnits: [],
      totalXP: 0,
      startedAt: admin.firestore.Timestamp.now(),
      lastAccessed: admin.firestore.Timestamp.now()
    }
  },

  // User Unit Progress
  userUnits: {
    'student-1_unit-1': {
      userId: 'student-1',
      unitId: 'unit-1',
      courseId: 'course-1',
      status: 'completed',
      progress: 100,
      timeSpent: 1080, // 18 minutes in seconds
      completedAt: admin.firestore.Timestamp.now(),
      xpEarned: 100
    },
    'student-1_unit-2': {
      userId: 'student-1',
      unitId: 'unit-2',
      courseId: 'course-1',
      status: 'in-progress',
      progress: 45,
      timeSpent: 600, // 10 minutes in seconds
      xpEarned: 0
    }
  },

  // User Quiz Attempts
  userQuizAttempts: {
    'student-1_quiz-1_attempt-1': {
      userId: 'student-1',
      quizId: 'quiz-1',
      unitId: 'unit-1',
      courseId: 'course-1',
      score: 2,
      maxScore: 2,
      percentage: 100,
      answers: [
        {
          questionId: 'q1',
          selectedAnswer: 1,
          isCorrect: true
        },
        {
          questionId: 'q2',
          selectedAnswer: 0,
          isCorrect: true
        }
      ],
      timeSpent: 300, // 5 minutes
      xpEarned: 50,
      completedAt: admin.firestore.Timestamp.now()
    }
  },

  // Achievements Collection
  achievements: {
    'first_course': {
      id: 'first_course',
      title: 'أول كورس',
      description: 'أكمل أول كورس في المنصة',
      icon: '📚',
      category: 'courses',
      requirement: {
        type: 'courses_completed',
        value: 1
      },
      xpReward: 100,
      coinReward: 50
    },
    'week_streak': {
      id: 'week_streak',
      title: 'أسبوع مميز',
      description: 'حافظ على التتابع لمدة 7 أيام',
      icon: '🔥',
      category: 'streak',
      requirement: {
        type: 'streak_days',
        value: 7
      },
      xpReward: 200,
      coinReward: 100
    },
    'five_courses': {
      id: 'five_courses',
      title: 'متعلم نشط',
      description: 'أكمل 5 كورسات مختلفة',
      icon: '🎓',
      category: 'courses',
      requirement: {
        type: 'courses_completed',
        value: 5
      },
      xpReward: 500,
      coinReward: 250
    }
  },

  // User Achievements
  userAchievements: {
    'student-1_first_course': {
      userId: 'student-1',
      achievementId: 'first_course',
      earnedAt: admin.firestore.Timestamp.now(),
      xpEarned: 100,
      coinsEarned: 50
    },
    'student-1_week_streak': {
      userId: 'student-1',
      achievementId: 'week_streak',
      earnedAt: admin.firestore.Timestamp.now(),
      xpEarned: 200,
      coinsEarned: 100
    }
  },

  // User Streaks
  userStreaks: {
    'student-1': {
      userId: 'student-1',
      currentStreak: 20,
      longestStreak: 25,
      lastLoginDate: admin.firestore.Timestamp.now(),
      streakHistory: [
        {
          date: admin.firestore.Timestamp.now(),
          xpEarned: 25
        }
      ]
    }
  },

  // Shop Items
  shopItems: {
    'booster-1': {
      id: 'booster-1',
      name: 'مضاعف XP',
      description: 'يضاعف نقاط الخبرة المكتسبة لمدة يوم',
      image: '⚡',
      price: 400,
      category: 'boosters',
      rarity: 'epic',
      effect: 'مضاعفة XP لمدة 24 ساعة',
      isActive: true
    },
    'booster-2': {
      id: 'booster-2',
      name: 'معزز التقدم',
      description: 'تقدم أسرع في الكورسات لمدة ساعتين',
      image: '🚀',
      price: 350,
      category: 'boosters',
      rarity: 'rare',
      effect: 'تقدم مضاعف لمدة ساعتين',
      isActive: true
    },
    'study-1': {
      id: 'study-1',
      name: 'ملخص الدرس',
      description: 'الحصول على ملخص ذكي لأي درس',
      image: '📚',
      price: 250,
      category: 'study',
      rarity: 'rare',
      effect: '3 ملخصات متاحة',
      isActive: true
    }
  },

  // User Inventory
  userInventory: {
    'student-1_booster-1': {
      userId: 'student-1',
      itemId: 'booster-1',
      quantity: 2,
      purchasedAt: admin.firestore.Timestamp.now()
    }
  },

  // Transactions
  transactions: {
    'transaction-1': {
      id: 'transaction-1',
      userId: 'student-1',
      type: 'purchase',
      itemId: 'booster-1',
      amount: -400,
      balanceBefore: 850,
      balanceAfter: 450,
      description: 'شراء مضاعف XP',
      timestamp: admin.firestore.Timestamp.now()
    },
    'transaction-2': {
      id: 'transaction-2',
      userId: 'student-1',
      type: 'reward',
      amount: 100,
      balanceBefore: 450,
      balanceAfter: 550,
      description: 'مكافأة إنجاز أسبوع مميز',
      timestamp: admin.firestore.Timestamp.now()
    }
  },

  // Friends System
  friends: {
    'student-1_student-2': {
      userId: 'student-1',
      friendId: 'student-2',
      status: 'accepted',
      requestedAt: admin.firestore.Timestamp.now(),
      acceptedAt: admin.firestore.Timestamp.now()
    }
  },

  // Leaderboards
  leaderboards: {
    'weekly_xp': {
      period: 'weekly',
      category: 'xp',
      entries: [
        {
          userId: 'student-2',
          rank: 1,
          score: 12500,
          name: 'أحمد محمود',
          avatar: '👦'
        },
        {
          userId: 'student-1',
          rank: 2,
          score: 8966,
          name: 'شادي داود',
          avatar: '/assets/avatars/student.png'
        }
      ],
      updatedAt: admin.firestore.Timestamp.now()
    }
  },

  // Community Posts
  communityPosts: {
    'post-1': {
      id: 'post-1',
      userId: 'student-1',
      title: 'كيف أحسن مستوى اللغة الإنجليزية؟',
      content: 'أريد تحسين مهارات اللغة الإنجليزية للتحضير لامتحان التوفل، ما هي أفضل الطرق؟',
      category: 'question',
      tags: ['لغة إنجليزية', 'توفل', 'نصائح'],
      likes: 12,
      replies: 4,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    }
  },

  // Admin Analytics
  adminAnalytics: {
    '2024-01-15': {
      date: '2024-01-15',
      totalUsers: 246,
      activeUsers: 187,
      newRegistrations: 15,
      courseCompletions: 23,
      totalXP: 124560
    }
  }
};

// Function to recursively create documents and subcollections
async function createDocumentWithSubcollections(collectionPath, docId, data) {
  try {
    const docRef = db.collection(collectionPath).doc(docId);
    
    // Remove any nested collection data before writing the document
    const documentData = { ...data };
    const subcollections = {};
    
    // Extract subcollections (if any)
    Object.keys(documentData).forEach(key => {
      if (typeof documentData[key] === 'object' && documentData[key] !== null && !Array.isArray(documentData[key])) {
        // Check if this might be a subcollection
        if (documentData[key].constructor === Object && Object.keys(documentData[key]).length > 0) {
          const firstKey = Object.keys(documentData[key])[0];
          if (typeof documentData[key][firstKey] === 'object' && documentData[key][firstKey].id) {
            // This looks like a subcollection
            subcollections[key] = documentData[key];
            delete documentData[key];
          }
        }
      }
    });
    
    // Write the main document
    await docRef.set(documentData);
    console.log(`✅ Created document: ${collectionPath}/${docId}`);
    
    // Create subcollections
    for (const [subcollectionName, subcollectionData] of Object.entries(subcollections)) {
      for (const [subDocId, subDocData] of Object.entries(subcollectionData)) {
        await createDocumentWithSubcollections(
          `${collectionPath}/${docId}/${subcollectionName}`,
          subDocId,
          subDocData
        );
      }
    }
  } catch (error) {
    console.error(`❌ Error creating document ${collectionPath}/${docId}:`, error);
  }
}

// Main function to populate the database
async function populateFirestore() {
  console.log('🚀 Starting Firestore population...');
  
  try {
    // Loop through each collection
    for (const [collectionName, documents] of Object.entries(sampleData)) {
      console.log(`\n📁 Creating collection: ${collectionName}`);
      
      // Create each document in the collection
      for (const [docId, docData] of Object.entries(documents)) {
        await createDocumentWithSubcollections(collectionName, docId, docData);
      }
    }
    
    console.log('\n🎉 Firestore population completed successfully!');
    console.log('\n📊 Summary of created data:');
    
    // Print summary
    for (const [collectionName, documents] of Object.entries(sampleData)) {
      console.log(`  • ${collectionName}: ${Object.keys(documents).length} documents`);
    }
    
  } catch (error) {
    console.error('❌ Error populating Firestore:', error);
  } finally {
    // Close the Firebase app
    await admin.app().delete();
    console.log('\n🔒 Firebase connection closed.');
  }
}

// Run the population script
if (require.main === module) {
  populateFirestore().catch(console.error);
}

module.exports = { populateFirestore, sampleData }; 