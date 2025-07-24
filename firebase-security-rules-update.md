# Firebase Security Rules Update

## Current Issue
The application is getting "Missing or insufficient permissions" errors when trying to:
1. Write to `leaderboards` collection
2. Write to `motivationalQuotes` collection
3. Read from `userActivity` collection

## Updated Security Rules

Add these rules to your Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read most collections
    match /{document=**} {
      allow read: if request.auth != null;
    }
    
    // Allow users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /userCourses/{docId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    match /userUnits/{docId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    match /userInventory/{docId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    // Allow users to read/write their own analytics
    match /userAnalytics/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to write their own activity
    match /userActivity/{docId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    // Allow admin users to write to core collections
    match /courses/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /units/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /quizzes/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /achievements/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /shopItems/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // UPDATED: Allow authenticated users to read/write leaderboards and quotes
    // This allows the Node.js script to populate data
    match /leaderboards/{docId} {
      allow read, write: if request.auth != null;
    }
    
    match /motivationalQuotes/{docId} {
      allow read, write: if request.auth != null;
    }
    
    match /adminAnalytics/{docId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Required Indexes

You also need to create these composite indexes in Firebase Console > Firestore Database > Indexes:

### 1. Leaderboards Index
- Collection: `leaderboards`
- Fields: 
  - `period` (Ascending)
  - `score` (Descending)
  - `__name__` (Ascending)

### 2. User Activity Index
- Collection: `userActivity`
- Fields:
  - `userId` (Ascending)
  - `timestamp` (Descending)
  - `__name__` (Ascending)

## How to Apply

1. Go to Firebase Console
2. Navigate to Firestore Database > Rules
3. Replace the existing rules with the ones above
4. Click "Publish"
5. Go to Firestore Database > Indexes
6. Create the two composite indexes mentioned above
7. Wait for indexes to build (may take a few minutes)

## Testing

After applying the rules and creating indexes:
1. Refresh the application
2. Click the "إضافة بيانات تجريبية" button
3. The leaderboard and quotes should now work properly 