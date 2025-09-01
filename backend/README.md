# Darsni Backend API

A robust Node.js/Express backend for the Darsni Educational Platform, built with TypeScript and Firebase.

## 🚀 Features

- **Authentication & Authorization**: JWT + Firebase Auth integration
- **Role-based Access Control**: Student, Teacher, and Admin roles
- **Comprehensive API**: RESTful endpoints with Swagger documentation
- **Security**: Rate limiting, CORS, Helmet, input validation
- **Logging**: Winston-based logging with file and console output
- **Error Handling**: Centralized error handling with custom error classes
- **File Upload**: Multer integration for file handling
- **Database**: Firebase Firestore integration with Admin SDK

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Admin SDK credentials
- Redis (optional, for caching)

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Required environment variables:**
   ```bash
   JWT_SECRET=your-super-secret-jwt-key-here
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   ```

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > Service Accounts
4. Generate new private key
5. Download the JSON file and extract the values to your `.env` file

### Environment Variables

See `env.example` for all available configuration options.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Other Commands
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm test              # Run tests
npm run db:migrate    # Run database migrations
npm run db:seed       # Seed database with sample data
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/health`

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── database/         # Database connection and utilities
├── middleware/       # Express middleware
├── models/           # Data models and schemas
├── routes/           # API route definitions
├── services/         # Business logic
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── index.ts          # Main application entry point
```

## 🔐 Authentication

The API uses Firebase Authentication with JWT tokens:

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. **Refresh Token**: `POST /api/auth/refresh`
4. **Protected Routes**: Include `Authorization: Bearer <token>` header

## 🛡️ Security Features

- **Rate Limiting**: Configurable request limits
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Express-validator integration
- **JWT Verification**: Token-based authentication
- **Role-based Access**: Different permission levels

## 📊 Database

### Collections

- `users` - User profiles and data
- `courses` - Course information
- `units` - Course units/lessons
- `progress` - User learning progress
- `leaderboards` - User rankings
- `enrollments` - Course enrollments
- `quizzes` - Assessment data
- `submissions` - Quiz/assignment submissions

### Database Utilities

```typescript
import { db } from '../database/connection.js';

// Query users
const users = await db.users().where('role', '==', 'student').get();

// Create document
await db.users().doc(uid).set(userData);

// Update document
await db.users().doc(uid).update(updates);

// Delete document
await db.users().doc(uid).delete();
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- --testPathPattern=auth.test.ts
```

## 📝 Logging

Logs are written to:
- Console (development)
- `logs/app.log` (all levels)
- `logs/error.log` (errors only)
- `logs/combined.log` (all levels)

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/search` - Search users
- `GET /api/users/:uid` - Get user by ID
- `DELETE /api/users/:uid` - Delete user (admin only)

### Courses (coming soon)
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## 🚨 Error Handling

The API uses centralized error handling with custom error classes:

```typescript
import { AppError } from '../middleware/errorHandler.js';

throw new AppError('User not found', 404, 'USER_NOT_FOUND');
```

## 🔧 Development

### Adding New Routes

1. Create route file in `src/routes/`
2. Import and add to `src/index.ts`
3. Add Swagger documentation
4. Implement proper error handling

### Adding New Middleware

1. Create middleware file in `src/middleware/`
2. Export middleware function
3. Import and use in routes or main app

### Database Operations

Use the `db` utility for all Firestore operations:

```typescript
import { db } from '../database/connection.js';

// Batch operations
const batch = db.batch();
batch.set(db.users().doc(uid), userData);
batch.update(db.courses().doc(courseId), { studentCount: db.increment(1) });
await batch.commit();

// Transactions
await db.runTransaction(async (transaction) => {
  // Your transaction logic here
});
```

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production Firebase credentials
3. Set secure JWT secret
4. Configure CORS origins

### Process Management
Use PM2 or similar process manager:

```bash
npm install -g pm2
pm2 start dist/index.js --name "darsni-api"
pm2 save
pm2 startup
```

## 🤝 Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Include Swagger documentation
4. Add error handling
5. Write tests for new features

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check the logs for error details
- Verify Firebase configuration
- Ensure all environment variables are set
- Check API documentation at `/api-docs`
