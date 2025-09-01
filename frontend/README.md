# Frontend - Darsni Platform

React frontend application for the Darsni educational platform.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

- **Firebase Web SDK** credentials
- **API endpoints** for backend communication
- **App configuration** and feature flags

### Firebase Setup

The frontend uses Firebase for:
- Authentication
- Real-time database
- File storage
- Hosting

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── course/         # Course-specific components
│   ├── friends/        # Social features components
│   └── widgets/        # Dashboard widgets
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── layouts/            # Page layout components
├── pages/              # Route components
│   ├── admin/          # Admin panel pages
│   └── student/        # Student dashboard pages
├── styles/             # Global styles and themes
├── types/              # TypeScript type definitions
└── lib/                # Utility functions and configurations
    ├── firebase.ts     # Firebase configuration
    ├── firebaseUtils.ts # Real-time analytics and data functions
    └── authUtils.ts    # Authentication utilities
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** for animations and themes
- **Responsive design** for all screen sizes
- **Dark theme** with cosmic/gaming aesthetic

## 🔌 Backend Integration

The frontend communicates with the backend API for:
- User authentication
- Course management
- Progress tracking
- Admin operations

## 📱 Responsive Design

- **Desktop**: Full feature experience (1024px+)
- **Tablet**: Adapted layouts (768px - 1023px)
- **Mobile**: Mobile-first approach (320px - 767px)

## 🧪 Development

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Hot reload** for fast development

## 🚀 Deployment

Build the project:
```bash
npm run build
```

Deploy the `dist/` folder to:
- Vercel
- Netlify
- Firebase Hosting
- Any static hosting service
