const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample leaderboard data
const leaderboardData = [
  {
    userId: 'user1',
    rank: 1,
    score: 2840,
    name: 'أحمد محمد',
    avatar: '👨‍🎓'
  },
  {
    userId: 'user2', 
    rank: 2,
    score: 2650,
    name: 'فاطمة علي',
    avatar: '👩‍🎓'
  },
  {
    userId: 'user3',
    rank: 3, 
    score: 2420,
    name: 'عمر خالد',
    avatar: '👨‍🎓'
  },
  {
    userId: 'user4',
    rank: 4,
    score: 2180,
    name: 'سارة أحمد',
    avatar: '👩‍🎓'
  },
  {
    userId: 'user5',
    rank: 5,
    score: 1950,
    name: 'محمد حسن',
    avatar: '👨‍🎓'
  },
  {
    userId: 'user6',
    rank: 6,
    score: 1720,
    name: 'نور الدين',
    avatar: '👨‍🎓'
  },
  {
    userId: 'user7',
    rank: 7,
    score: 1580,
    name: 'ليلى محمود',
    avatar: '👩‍🎓'
  },
  {
    userId: 'user8',
    rank: 8,
    score: 1450,
    name: 'يوسف عبدالله',
    avatar: '👨‍🎓'
  },
  {
    userId: 'user9',
    rank: 9,
    score: 1320,
    name: 'مريم سعيد',
    avatar: '👩‍🎓'
  },
  {
    userId: 'user10',
    rank: 10,
    score: 1200,
    name: 'علي رضا',
    avatar: '👨‍🎓'
  }
];

// Sample motivational quotes data
const motivationalQuotes = [
  {
    id: 'quote1',
    text: 'النجاح هو نتيجة التحضير والعمل الجاد والتعلم من الفشل',
    author: 'نابليون هيل',
    category: 'success',
    language: 'ar'
  },
  {
    id: 'quote2',
    text: 'كل يوم فرصة جديدة للتعلم والنمو',
    author: 'مجهول',
    category: 'growth',
    language: 'ar'
  },
  {
    id: 'quote3',
    text: 'الثقة بالنفس هي أول سر من أسرار النجاح',
    author: 'نابليون هيل',
    category: 'confidence',
    language: 'ar'
  },
  {
    id: 'quote4',
    text: 'التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم',
    author: 'نيلسون مانديلا',
    category: 'education',
    language: 'ar'
  },
  {
    id: 'quote5',
    text: 'لا تخف من النمو ببطء، خف فقط من البقاء واقفاً',
    author: 'كونفوشيوس',
    category: 'perseverance',
    language: 'ar'
  },
  {
    id: 'quote6',
    text: 'العقل مثل العضلة، كلما استخدمته أكثر كلما أصبح أقوى',
    author: 'ألبرت أينشتاين',
    category: 'mind',
    language: 'ar'
  },
  {
    id: 'quote7',
    text: 'الحلم بدون خطة مجرد أمنية، والخطة بدون حلم مجرد عمل',
    author: 'تومي لاسوردا',
    category: 'planning',
    language: 'ar'
  },
  {
    id: 'quote8',
    text: 'النجاح ليس نهائياً، والفشل ليس قاتلاً، ما يهم هو الشجاعة للاستمرار',
    author: 'ونستون تشرشل',
    category: 'perseverance',
    language: 'ar'
  },
  {
    id: 'quote9',
    text: 'التعلم لا ينتهي أبداً، والمعرفة لا حدود لها',
    author: 'مجهول',
    category: 'learning',
    language: 'ar'
  },
  {
    id: 'quote10',
    text: 'أفضل استثمار يمكنك القيام به هو في نفسك',
    author: 'وارن بافيت',
    category: 'investment',
    language: 'ar'
  }
];

// Sample weekly and monthly leaderboards
const weeklyLeaderboard = leaderboardData.map((entry, index) => ({
  ...entry,
  period: 'weekly',
  weekKey: '2024-W01', // Current week
  timestamp: admin.firestore.Timestamp.now()
}));

const monthlyLeaderboard = leaderboardData.map((entry, index) => ({
  ...entry,
  period: 'monthly',
  monthKey: '2024-01', // Current month
  timestamp: admin.firestore.Timestamp.now()
}));

async function populateData() {
  try {
    console.log('🚀 Starting to populate leaderboard and quotes data...');

    // Add leaderboard entries
    console.log('📊 Adding weekly leaderboard data...');
    for (const entry of weeklyLeaderboard) {
      await db.collection('leaderboards').add(entry);
    }

    console.log('📊 Adding monthly leaderboard data...');
    for (const entry of monthlyLeaderboard) {
      await db.collection('leaderboards').add(entry);
    }

    // Add motivational quotes
    console.log('💬 Adding motivational quotes...');
    for (const quote of motivationalQuotes) {
      await db.collection('motivationalQuotes').doc(quote.id).set(quote);
    }

    console.log('✅ Successfully populated leaderboard and quotes data!');
    console.log(`📊 Added ${weeklyLeaderboard.length} weekly leaderboard entries`);
    console.log(`📊 Added ${monthlyLeaderboard.length} monthly leaderboard entries`);
    console.log(`💬 Added ${motivationalQuotes.length} motivational quotes`);

  } catch (error) {
    console.error('❌ Error populating data:', error);
  } finally {
    process.exit(0);
  }
}

populateData(); 