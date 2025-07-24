const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// Go to Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://darsni-platform-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// Sample leaderboard data
const leaderboardData = [
  {
    userId: 'user1',
    rank: 1,
    score: 2840,
    name: 'أحمد محمد',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user2', 
    rank: 2,
    score: 2650,
    name: 'فاطمة علي',
    avatar: '👩‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user3',
    rank: 3, 
    score: 2420,
    name: 'عمر خالد',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user4',
    rank: 4,
    score: 2180,
    name: 'سارة أحمد',
    avatar: '👩‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user5',
    rank: 5,
    score: 1950,
    name: 'محمد حسن',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user6',
    rank: 6,
    score: 1750,
    name: 'نور الدين',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user7',
    rank: 7,
    score: 1620,
    name: 'ليلى أحمد',
    avatar: '👩‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user8',
    rank: 8,
    score: 1480,
    name: 'كريم سعيد',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user9',
    rank: 9,
    score: 1350,
    name: 'مريم علي',
    avatar: '👩‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user10',
    rank: 10,
    score: 1220,
    name: 'ياسر محمد',
    avatar: '👨‍🎓',
    period: 'weekly',
    weekKey: '2024-W01',
    timestamp: admin.firestore.Timestamp.now()
  }
];

// Monthly leaderboard data
const monthlyLeaderboardData = [
  {
    userId: 'user1',
    rank: 1,
    score: 12450,
    name: 'أحمد محمد',
    avatar: '👨‍🎓',
    period: 'monthly',
    monthKey: '2024-01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user2', 
    rank: 2,
    score: 11820,
    name: 'فاطمة علي',
    avatar: '👩‍🎓',
    period: 'monthly',
    monthKey: '2024-01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user3',
    rank: 3, 
    score: 10980,
    name: 'عمر خالد',
    avatar: '👨‍🎓',
    period: 'monthly',
    monthKey: '2024-01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user4',
    rank: 4,
    score: 9850,
    name: 'سارة أحمد',
    avatar: '👩‍🎓',
    period: 'monthly',
    monthKey: '2024-01',
    timestamp: admin.firestore.Timestamp.now()
  },
  {
    userId: 'user5',
    rank: 5,
    score: 8920,
    name: 'محمد حسن',
    avatar: '👨‍🎓',
    period: 'monthly',
    monthKey: '2024-01',
    timestamp: admin.firestore.Timestamp.now()
  }
];

// Sample motivational quotes
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
    text: 'العقل السليم في الجسم السليم',
    author: 'جوفينال',
    category: 'health',
    language: 'ar'
  },
  {
    id: 'quote7',
    text: 'الوقت كالسيف إن لم تقطعه قطعك',
    author: 'مثل عربي',
    category: 'time',
    language: 'ar'
  },
  {
    id: 'quote8',
    text: 'من جد وجد ومن زرع حصد',
    author: 'مثل عربي',
    category: 'effort',
    language: 'ar'
  },
  {
    id: 'quote9',
    text: 'العلم نور والجهل ظلام',
    author: 'مثل عربي',
    category: 'education',
    language: 'ar'
  },
  {
    id: 'quote10',
    text: 'النجاح ليس نهاية، والفشل ليس قاتلاً: ما يهم هو الشجاعة للاستمرار',
    author: 'ونستون تشرشل',
    category: 'perseverance',
    language: 'ar'
  }
];

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...');

    // Add weekly leaderboard data
    console.log('📊 Adding weekly leaderboard data...');
    for (const entry of leaderboardData) {
      await db.collection('leaderboards').add(entry);
    }
    console.log('✅ Added weekly leaderboard data');

    // Add monthly leaderboard data
    console.log('📊 Adding monthly leaderboard data...');
    for (const entry of monthlyLeaderboardData) {
      await db.collection('leaderboards').add(entry);
    }
    console.log('✅ Added monthly leaderboard data');

    // Add motivational quotes
    console.log('💬 Adding motivational quotes...');
    for (const quote of motivationalQuotes) {
      await db.collection('motivationalQuotes').doc(quote.id).set(quote);
    }
    console.log('✅ Added motivational quotes');

    console.log('🎉 Database population completed successfully!');
    console.log(`📊 Added ${leaderboardData.length + monthlyLeaderboardData.length} leaderboard entries`);
    console.log(`💬 Added ${motivationalQuotes.length} motivational quotes`);

  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
populateDatabase(); 