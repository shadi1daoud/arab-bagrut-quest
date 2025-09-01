
# Darsni Platform

A comprehensive educational platform built with React frontend and Node.js backend.

## 🏗️ Project Structure

```
arab-bagrut-quest/
├── frontend/          # React + Vite frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── env.example   # Frontend environment variables
├── backend/           # Node.js + Express backend API
│   ├── src/          # Source code
│   ├── package.json  # Backend dependencies
│   └── env.example   # Backend environment variables
└── README.md         # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
cp env.example .env
# Edit .env with your Firebase credentials
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
cp env.example .env
npm install
npm run dev
```

## 🔧 Development

- **Backend**: Runs on `http://localhost:5000`
- **Frontend**: Runs on `http://localhost:5173` (Vite default)
- **API**: Available at `http://localhost:5000/api/*`

## 📚 Features

- **User Authentication** with Firebase Auth
- **Course Management** system
- **Progress Tracking** for students
- **Admin Panel** for content management
- **Real-time Updates** with Firebase
- **Responsive Design** with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui components
- Firebase Web SDK

### Backend
- Node.js + Express
- TypeScript
- Firebase Admin SDK
- JWT authentication
- RESTful API design

## 📖 Documentation

- [Backend README](./backend/README.md) - Backend setup and API docs
- [Frontend README](./frontend/README.md) - Frontend development guide
- [Developer Guide](./DEVELOPER_GUIDE.md) - General development guidelines
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

## 🔐 Environment Variables

### Backend (.env)
- Firebase Admin SDK credentials
- Server configuration
- JWT secrets

### Frontend (.env)
- Firebase Web SDK credentials
- API endpoints
- App configuration

## 🚀 Deployment

- **Frontend**: Deploy to Vercel, Netlify, or similar
- **Backend**: Deploy to Vercel, Railway, or similar
- **Database**: Firebase Firestore (hosted)
- **Storage**: Firebase Storage (hosted)

## 📝 License

This project is licensed under the MIT License.
