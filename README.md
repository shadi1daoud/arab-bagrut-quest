
# درسني - Darsni Educational Platform

منصة تعليمية تفاعلية للتحضير لامتحانات البجروت مع واجهة ألعاب تحفيزية

An interactive educational platform for Bagrut exam preparation with gamified learning interface.

## 🚀 Project Overview

Darsni is a modern educational platform built with React and TypeScript that provides:
- **Gamified Learning Experience**: XP, levels, streaks, and achievements
- **Interactive Course Content**: Video lessons, quizzes, and practice materials
- **Student Dashboard**: Progress tracking and performance analytics
- **Admin Panel**: Course management and user administration
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS animations
- **UI Components**: Radix UI (shadcn/ui)
- **Routing**: React Router DOM
- **State Management**: React Context, TanStack Query
- **Animations**: Framer Motion, Canvas Confetti
- **Charts**: Recharts
- **Development**: ESLint, TypeScript strict mode

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
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Test Accounts

**Student Account:**
- Email: `student@darsni.com`
- Password: Any password
- Features: Course access, progress tracking, gamification

**Admin Account:**
- Email: `admin@darsni.com`
- Password: Any password  
- Features: Course management, user administration

## 🎮 Key Features

### For Students
- **Interactive Courses**: Video lessons with chapters and notes
- **Progress Tracking**: XP system, levels, and achievement streaks
- **Gamified Learning**: Coins, leaderboards, and weekly challenges
- **Social Features**: Friends, study groups, and community interaction
- **Responsive Design**: Seamless experience across devices

### For Administrators
- **Course Management**: Upload, edit, and organize course content
- **User Administration**: Monitor student progress and engagement
- **Analytics Dashboard**: Platform usage and performance metrics
- **Content Tools**: Bulk upload and content organization features

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow React functional components with hooks
- Implement proper error boundaries where needed
- Use Tailwind CSS for styling with semantic class names
- Follow the existing file naming conventions

### Component Structure
```typescript
// Component template
import React from 'react';
import { ComponentProps } from '@/types/component';

interface ComponentNameProps {
  // Define props with proper types
}

const ComponentName = ({ ...props }: ComponentNameProps) => {
  // Component logic
  
  return (
    <div className="semantic-class-names">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Adding New Features
1. Create types in `/src/types/` if needed
2. Build reusable components in `/src/components/`
3. Add pages to appropriate `/src/pages/` subdirectory
4. Update routing in `App.tsx`
5. Add proper TypeScript interfaces
6. Test across different screen sizes

## 🎨 Theming

The platform uses a custom cosmic/gaming theme with:
- **Dark Background**: Deep space aesthetic
- **Accent Colors**: Orange/red gradient (`#FF4B1A` to `#FF794B`)
- **Typography**: Arabic support with Noto Sans Arabic, Changa fonts
- **Animations**: Smooth transitions and particle effects

### Color Palette
```css
--game-primary: #FF4B1A;    /* Primary orange */
--game-accent: #FF794B;     /* Secondary orange */
--cosmic-primary: #00D4FF;  /* Cyan blue */
--background: #0E0E0E;      /* Dark background */
```

## 📱 Responsive Design

The platform is optimized for:
- **Desktop**: Full feature experience (1024px+)
- **Tablet**: Adapted layouts (768px - 1023px)
- **Mobile**: Mobile-first approach (320px - 767px)

## 🧪 Testing

Currently using manual testing. Future improvements:
- Unit tests with Jest and React Testing Library
- Integration tests for user flows
- End-to-end testing with Playwright

## 🚀 Deployment

### Lovable Platform
1. Click "Publish" in the Lovable editor
2. Your app will be deployed to `yoursite.lovable.app`

### Custom Domain
1. Navigate to Project > Settings > Domains
2. Connect your custom domain
3. Follow DNS configuration instructions

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types for new features
3. Test on multiple screen sizes
4. Update documentation for new features
5. Ensure Arabic text displays correctly

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## 📄 License

All rights reserved © 2023 Darsni Educational Platform

---

## 🆘 Need Help?

- Check the [troubleshooting guide](https://docs.lovable.dev/tips-tricks/troubleshooting)
- Review component documentation in `/src/components/`
- Examine existing code patterns for reference
- Test with the provided demo accounts

**Happy coding! 🎓**
