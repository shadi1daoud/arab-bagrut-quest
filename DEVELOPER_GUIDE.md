
# Darsni Developer Guide

Welcome to the Darsni platform development team! This guide will help you understand the codebase, development practices, and contribution guidelines.

## 🏗 Architecture Overview

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom theme extensions
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **State Management**: React Context + TanStack Query for server state
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion + CSS animations
- **Icons**: Lucide React icon library

### Project Structure Deep Dive

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base design system components
│   ├── course/         # Course-specific functionality
│   ├── widgets/        # Dashboard widgets
│   └── friends/        # Social features
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── layouts/            # Page layout templates
├── pages/              # Route components
│   ├── admin/          # Admin panel pages
│   └── student/        # Student interface pages
├── types/              # TypeScript type definitions
├── lib/                # Utilities and configuration
├── styles/             # Global styles and themes
└── assets/             # Static assets
```

## 🎨 Design System

### Color Palette
The platform uses a cosmic/gaming theme with these primary colors:

```css
/* Primary Brand Colors */
--game-primary: #FF4B1A;     /* Primary orange */
--game-secondary: #FF794B;   /* Secondary orange */
--cosmic-primary: #00D4FF;   /* Cosmic blue */

/* Background Colors */
--background: #0E0E0E;       /* Deep space black */
--surface: #1A1A1A;         /* Elevated surfaces */
--card-bg: rgba(26,26,26,0.9); /* Card backgrounds */

/* Text Colors */
--text-primary: #FFFFFF;     /* Primary text */
--text-secondary: #A1A1AA;   /* Secondary text */
--text-muted: #71717A;       /* Muted text */
```

### Typography
- **Arabic Text**: Noto Sans Arabic, Changa for headings
- **English Text**: Inter, system fonts as fallback
- **Monospace**: Share Tech Mono for technical displays (XP, levels)

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */ 
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd darsni-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5173
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🧱 Component Development

### Component Architecture
Follow these patterns when creating new components:

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  /** Primary prop description */
  title: string;
  /** Optional prop with default */
  variant?: 'default' | 'secondary';
  /** Event handlers */
  onClick?: () => void;
  /** Style customization */
  className?: string;
  /** Children for composition */
  children?: React.ReactNode;
}

/**
 * Component description and usage notes
 * 
 * @param props Component properties
 * @returns JSX.Element
 */
const Component = ({ 
  title, 
  variant = 'default',
  onClick,
  className,
  children
}: ComponentProps) => {
  return (
    <div 
      className={cn(
        "base-styles",
        variant === 'secondary' && "variant-styles",
        className
      )}
      onClick={onClick}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Component;
```

### Styling Guidelines

#### CSS Class Naming
```typescript
// ✅ Good - Semantic and descriptive
className="course-progress-card bg-cosmic-primary"

// ❌ Avoid - Generic or unclear
className="card-1 blue-bg"
```

#### Responsive Design
```typescript
// Mobile-first approach
className="
  w-full p-4 text-sm
  md:w-1/2 md:p-6 md:text-base
  lg:w-1/3 lg:p-8 lg:text-lg
"
```

#### RTL Support
```typescript
// Support Arabic text direction
className="
  text-right rtl:text-right ltr:text-left
  mr-4 rtl:mr-4 rtl:ml-0 ltr:ml-4 ltr:mr-0
"
```

## 📊 State Management

### Context Pattern
```typescript
// Create context with proper typing
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### TanStack Query Usage
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['courses', userId],
  queryFn: () => fetchUserCourses(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutations
const mutation = useMutation({
  mutationFn: updateCourseProgress,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['courses'] });
  },
});
```

## 🎯 Performance Best Practices

### React Optimization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// Memoize components with React.memo
const MemoizedComponent = React.memo(Component);

// Optimize re-renders with useCallback
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);
```

### Bundle Optimization
```typescript
// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));

// Code splitting with React.lazy
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/course/:id" element={<CourseDetail />} />
  </Routes>
</Suspense>
```

### Image Optimization
```typescript
// Use appropriate formats and sizes
<img 
  src="/images/course-thumbnail.webp"
  alt="Course thumbnail"
  width={300}
  height={200}
  loading="lazy"
  className="object-cover rounded-lg"
/>
```

## 🧪 Testing Strategy

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing
```typescript
// Test user flows
describe('Course Enrollment Flow', () => {
  it('allows user to enroll in course', async () => {
    render(<CourseDetailPage courseId="math-101" />);
    
    const enrollButton = screen.getByText('Enroll Now');
    fireEvent.click(enrollButton);
    
    await waitFor(() => {
      expect(screen.getByText('Enrolled Successfully')).toBeInTheDocument();
    });
  });
});
```

## 🚀 Deployment & DevOps

### Build Configuration
The project uses Vite with these optimizations:
- Tree shaking for smaller bundles
- Code splitting for faster loading
- Asset optimization (images, fonts)
- Environment-specific builds

### Environment Variables
```bash
# Development
VITE_API_BASE_URL=http://localhost:3000
VITE_ENVIRONMENT=development

# Production
VITE_API_BASE_URL=https://api.darsni.com
VITE_ENVIRONMENT=production
```

### Deployment Checklist
- [ ] Run type checking: `npm run type-check`
- [ ] Run linting: `npm run lint`
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Verify responsive design on multiple devices
- [ ] Test Arabic text rendering
- [ ] Check performance with Lighthouse
- [ ] Validate accessibility compliance

## 🤝 Contributing Guidelines

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/course-progress-tracking

# Make changes and commit
git add .
git commit -m "feat: add course progress tracking component"

# Push and create pull request
git push origin feature/course-progress-tracking
```

### Commit Message Format
```
type(scope): description

feat(auth): add password reset functionality
fix(ui): resolve button hover state issue  
docs(api): update authentication documentation
style(components): improve button component styling
refactor(hooks): optimize useAuth hook performance
```

### Code Review Checklist
- [ ] Code follows TypeScript best practices
- [ ] Components are properly typed
- [ ] Responsive design implemented
- [ ] Arabic text displays correctly
- [ ] Performance optimizations applied
- [ ] Accessibility standards met
- [ ] Documentation updated

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Responsive design verified

## Screenshots
[Include relevant screenshots]

## Checklist
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🔍 Debugging Tips

### Common Issues

#### Arabic Text Not Displaying
```css
/* Ensure proper font loading */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');

/* Set text direction */
html[dir="rtl"] {
  direction: rtl;
}
```

#### Styling Not Applied
```typescript
// Check class name conflicts
import { cn } from '@/lib/utils';

// Use cn utility for conditional classes
className={cn(
  "base-classes",
  isActive && "active-classes",
  className // Allow prop override
)}
```

#### Performance Issues
```typescript
// Identify re-render causes
import { useWhyDidYouUpdate } from '@/hooks/useWhyDidYouUpdate';

const Component = (props) => {
  useWhyDidYouUpdate('ComponentName', props);
  // Component logic
};
```

### Development Tools
- **React Developer Tools**: Component tree inspection
- **Tailwind CSS IntelliSense**: Class name autocomplete
- **TypeScript Error Lens**: Inline error display
- **Prettier**: Code formatting
- **ESLint**: Code quality checking

## 📚 Learning Resources

### Platform-Specific
- [Component Documentation](./src/components/README.md)
- [Type Definitions](./src/types/)
- [Utility Functions](./src/lib/helpers.ts)

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Framer Motion](https://www.framer.com/motion/)

## 🆘 Getting Help

1. **Check Documentation**: Start with this guide and component docs
2. **Search Issues**: Look for existing solutions in project issues
3. **Team Chat**: Reach out in development channels
4. **Code Review**: Request feedback on complex implementations
5. **Pair Programming**: Schedule sessions for complex features

---

Happy coding! 🎓✨
