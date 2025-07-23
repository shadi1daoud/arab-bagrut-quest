# Firestore Database Population Script

This script populates your Firestore database with sample data for the Darsni educational platform.

## 🚀 Quick Start

### Prerequisites

1. **Firebase Project Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Set up security rules (initially allow read/write for testing)

2. **Service Account Key**
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Rename it to `serviceAccountKey.json`
   - Place it in the `scripts/` directory

3. **Install Dependencies**
   ```bash
   cd scripts
   npm install
   ```

### Running the Script

```bash
# Navigate to scripts directory
cd scripts

# Run the population script
npm run populate
# or
node populate-firestore.js
```

## 📊 Data Structure

The script creates the following collections:

### Core Collections
- **`users`** - User profiles and authentication data
- **`courses`** - Course information and metadata
- **`units`** - Individual lesson units with video content
- **`quizzes`** - Quiz questions and answers

### Progress Tracking
- **`userCourses`** - User enrollment and course progress
- **`userUnits`** - Individual unit completion status
- **`userQuizAttempts`** - Quiz attempt history

### Gamification
- **`achievements`** - Available achievements and requirements
- **`userAchievements`** - User achievement unlocks
- **`userStreaks`** - Daily login streak tracking

### Social Features
- **`friends`** - Friend relationships and requests
- **`leaderboards`** - Weekly/monthly leaderboards
- **`communityPosts`** - Community discussions and questions

### Virtual Economy
- **`shopItems`** - Available items in the shop
- **`userInventory`** - User's purchased items
- **`transactions`** - Coin transaction history

### Admin Features
- **`adminAnalytics`** - Platform usage statistics

## 🔧 Configuration

### Customizing Data

Edit the `sampleData` object in `populate-firestore.js` to:

1. **Add more users** - Add entries to the `users` collection
2. **Create courses** - Add course data to the `courses` collection
3. **Add units** - Create lesson units in the `units` collection
4. **Customize achievements** - Modify achievement requirements and rewards

### Sample Data Included

The script includes sample data for:

- **3 Users**: 2 students, 1 admin
- **3 Courses**: Math, English, Physics
- **2 Units**: Algebra introduction and quadratic equations
- **1 Quiz**: Basic algebra quiz with 2 questions
- **3 Achievements**: First course, week streak, five courses
- **3 Shop Items**: XP booster, progress booster, study summary
- **Sample Progress**: User course and unit progress
- **Social Data**: Friends, leaderboards, community posts

## 🛡️ Security Rules

After populating your database, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read courses
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users can read/write their own progress
    match /userCourses/{docId} {
      allow read, write: if request.auth != null && 
        docId.matches(request.auth.uid + '.*');
    }
    
    // Similar rules for other collections...
  }
}
```

## 🔄 Running Multiple Times

The script uses `set()` which overwrites existing documents. To run multiple times:

1. **Clear existing data** (optional):
   ```javascript
   // Add this function to clear collections
   async function clearCollection(collectionName) {
     const snapshot = await db.collection(collectionName).get();
     const batch = db.batch();
     snapshot.docs.forEach((doc) => {
       batch.delete(doc.ref);
     });
     await batch.commit();
   }
   ```

2. **Or use `update()`** instead of `set()` to merge data

## 📝 Logging

The script provides detailed logging:

- ✅ Success messages for each document created
- ❌ Error messages for failed operations
- 📊 Summary of created collections and document counts

## 🚨 Troubleshooting

### Common Issues

1. **Service Account Error**
   ```
   Error: The file at ./serviceAccountKey.json does not exist
   ```
   - Ensure `serviceAccountKey.json` is in the scripts directory
   - Check file permissions

2. **Permission Error**
   ```
   Error: 7 PERMISSION_DENIED
   ```
   - Verify service account has Firestore permissions
   - Check Firestore security rules

3. **Timestamp Error**
   ```
   Error: Invalid timestamp
   ```
   - Ensure using `admin.firestore.Timestamp.now()`
   - Check date format in data

### Debug Mode

Add debug logging:

```javascript
// Add at the top of the script
process.env.DEBUG = 'firebase-admin:*';
```

## 📈 Performance

For large datasets:

1. **Use batch writes** for better performance
2. **Limit concurrent operations** to avoid rate limits
3. **Add delays** between batches if needed

## 🔗 Integration

After populating the database:

1. **Update your React app** to use Firebase instead of mock data
2. **Test authentication** with the created users
3. **Verify course navigation** works with real data
4. **Check gamification features** (XP, achievements, etc.)

## 📞 Support

If you encounter issues:

1. Check Firebase Console for errors
2. Verify service account permissions
3. Test with smaller datasets first
4. Review Firestore security rules

---

**Note**: This script is for development/testing purposes. For production, implement proper data validation and security measures. 