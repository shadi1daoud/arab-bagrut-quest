
# Components Documentation

This directory contains all reusable UI components for the Darsni platform.

## Directory Structure

```
components/
├── ui/              # Base UI components (shadcn/ui)
├── course/          # Course-specific components  
├── friends/         # Social features components
├── widgets/         # Dashboard widgets
└── README.md        # This file
```

## Component Categories

### Base UI Components (`ui/`)
Core design system components based on Radix UI and shadcn/ui:
- **Button**: Primary interactive element with variants
- **Card**: Content container with consistent styling
- **Progress**: Progress bars and indicators
- **Dialog/Modal**: Overlay components for forms and actions
- **Input/Form**: Form controls with validation

### Course Components (`course/`)
Specialized components for course content and navigation:
- **VideoPlayer**: Custom video player with chapters
- **UnitsList**: Course unit navigation sidebar
- **CourseHeader**: Course page header with progress
- **CourseFooter**: Navigation controls between units
- **ContentTabs**: Tabbed interface for course materials

### Widget Components (`widgets/`)
Dashboard widgets for student analytics and engagement:
- **StatsCard**: Display key metrics and statistics
- **WeeklyChart**: Performance visualization
- **LeaderBoard**: Competition and ranking display
- **DailyQuest**: Gamification challenges

## Component Guidelines

### File Structure
Each component should follow this pattern:
```typescript
// ComponentName.tsx
import React from 'react';
import { ComponentNameProps } from '@/types/ui';

/**
 * ComponentName - Brief description
 * 
 * @param props - Component properties
 * @returns JSX.Element
 */
const ComponentName = ({ ...props }: ComponentNameProps) => {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Follow the cosmic/gaming theme color palette
- Implement responsive design (mobile-first)
- Add hover states and smooth transitions
- Support RTL text for Arabic content

### Accessibility
- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Maintain sufficient color contrast
- Add focus indicators for interactive elements

### Performance
- Use React.memo() for components with expensive renders
- Implement lazy loading for large components
- Optimize images and animations
- Minimize re-renders with proper prop design

## Usage Examples

### Basic Button
```typescript
import { Button } from '@/components/ui/button';

<Button variant="default" onClick={handleClick}>
  النقر هنا
</Button>
```

### Course Progress Card
```typescript
import CourseProgress from '@/components/course/CourseProgress';

<CourseProgress
  title="الرياضيات - الجبر"
  progress={75}
  totalXP={1200}
  currentUnit={8}
  totalUnits={12}
/>
```

### Stats Widget
```typescript
import StatsCard from '@/components/widgets/StatsCard';

<StatsCard
  title="النقاط المكتسبة"
  value={8966}
  change="+15%"
  isPositive={true}
  icon={TrendingUp}
/>
```

## Testing

Components should be tested for:
- Proper rendering with different props
- User interaction handlers
- Responsive behavior
- Accessibility compliance
- Arabic text rendering

## Contributing

When adding new components:
1. Create TypeScript interfaces in `/src/types/`
2. Follow existing naming conventions
3. Add proper documentation comments
4. Implement responsive design
5. Test with Arabic content
6. Update this README if adding new categories
