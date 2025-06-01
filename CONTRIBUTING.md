
# Contributing to Darsni Platform

Thank you for your interest in contributing to the Darsni educational platform! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

### Code Contributions
- **Bug Fixes**: Fix issues and improve stability
- **New Features**: Add educational tools and gamification elements
- **UI/UX Improvements**: Enhance user experience and accessibility
- **Performance Optimizations**: Improve loading times and responsiveness
- **Documentation**: Update guides and component documentation

### Non-Code Contributions
- **Translation**: Help with Arabic localization
- **User Testing**: Provide feedback on usability and educational effectiveness
- **Content Creation**: Suggest course structures and learning materials
- **Design Assets**: Create icons, illustrations, and educational graphics

## 🚀 Getting Started

### Development Environment Setup

1. **Prerequisites**
   ```bash
   node --version  # Requires Node.js 18+
   npm --version   # npm 8+ recommended
   git --version   # Git for version control
   ```

2. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub
   git clone https://github.com/YOUR_USERNAME/darsni-platform.git
   cd darsni-platform
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:5173
   - Test with demo accounts:
     - Student: `student@darsni.com`
     - Admin: `admin@darsni.com`

### Project Familiarization

1. **Read Documentation**
   - [README.md](./README.md) - Project overview
   - [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Technical details
   - [Component Documentation](./src/components/README.md)

2. **Explore Codebase**
   ```bash
   # Key directories to understand
   src/components/     # UI components
   src/pages/          # Application pages  
   src/contexts/       # State management
   src/types/          # Type definitions
   ```

3. **Test Features**
   - Navigate through student dashboard
   - Explore course content and progress tracking
   - Test admin panel functionality
   - Verify responsive design on mobile

## 📋 Contribution Process

### 1. Find or Create an Issue

**Existing Issues**
- Browse [GitHub Issues](https://github.com/organization/darsni-platform/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Comment on issues you'd like to work on

**New Issues**
- Use appropriate issue templates
- Provide clear descriptions and reproduction steps
- Include screenshots for UI-related issues
- Add labels for better categorization

### 2. Create Feature Branch

```bash
# Create descriptive branch name
git checkout -b feature/course-progress-visualization
git checkout -b fix/arabic-text-alignment
git checkout -b docs/component-documentation
```

### 3. Development Guidelines

#### Code Style
```typescript
// Use TypeScript for all new files
interface ComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// Add JSDoc comments for complex functions
/**
 * Calculate user progress across all enrolled courses
 * @param courses - Array of user's courses
 * @returns Progress percentage (0-100)
 */
const calculateOverallProgress = (courses: Course[]): number => {
  // Implementation
};

// Use semantic CSS classes
className="course-card bg-cosmic-primary hover:bg-cosmic-primary/80"
```

#### Component Guidelines
```typescript
// Follow established patterns
const NewComponent = ({ title, children, className }: Props) => {
  return (
    <div className={cn("base-styles", className)}>
      <h2 className="text-lg font-changa text-white">{title}</h2>
      {children}
    </div>
  );
};

export default NewComponent;
```

#### Responsive Design
```typescript
// Mobile-first approach with Arabic support
className="
  w-full p-4 text-sm text-right
  md:w-1/2 md:p-6 md:text-base
  lg:w-1/3 lg:p-8 lg:text-lg
  rtl:text-right ltr:text-left
"
```

### 4. Testing Your Changes

#### Manual Testing
- [ ] Test functionality across different screen sizes
- [ ] Verify Arabic text renders correctly
- [ ] Check both student and admin user flows
- [ ] Test with demo accounts
- [ ] Validate form submissions and error handling

#### Performance Testing
- [ ] Check for console errors
- [ ] Verify smooth animations
- [ ] Test loading states
- [ ] Validate responsive images

#### Accessibility Testing
- [ ] Ensure keyboard navigation works
- [ ] Verify screen reader compatibility
- [ ] Check color contrast ratios
- [ ] Test focus indicators

### 5. Commit Your Changes

#### Commit Message Format
```
type(scope): description

Examples:
feat(courses): add video chapter navigation
fix(auth): resolve login form validation
docs(api): update course progress endpoints
style(ui): improve button hover animations
refactor(components): extract reusable course card
perf(dashboard): optimize chart rendering
test(auth): add login flow test coverage
```

#### Commit Best Practices
```bash
# Make atomic commits
git add src/components/NewFeature.tsx
git commit -m "feat(components): add new feature component"

# Separate concerns
git add src/styles/
git commit -m "style(ui): update button styling"

git add docs/
git commit -m "docs(components): add usage examples"
```

### 6. Create Pull Request

#### Pull Request Checklist
- [ ] Clear, descriptive title
- [ ] Detailed description of changes
- [ ] Link to related issues
- [ ] Screenshots for UI changes
- [ ] Test coverage information
- [ ] Documentation updates if needed

#### Pull Request Template
```markdown
## 📝 Description
Brief summary of changes and motivation

## 🔗 Related Issues
Closes #123
Related to #456

## 🧪 Type of Change
- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that causes existing functionality to change)
- [ ] 📚 Documentation update
- [ ] 🎨 Style update (formatting, renaming)
- [ ] ♻️ Code refactor (no functional changes)
- [ ] ⚡ Performance improvement

## 🧪 Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] Arabic text rendering checked
- [ ] Cross-browser compatibility tested
- [ ] Performance impact assessed

## 📱 Screenshots
[Include before/after screenshots for UI changes]

## 📋 Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Changes tested on mobile devices
```

## 🎯 Contribution Areas

### High-Priority Areas
- **Arabic Localization**: Improve RTL support and translations
- **Mobile Experience**: Enhance mobile responsiveness and touch interactions
- **Accessibility**: Implement WCAG 2.1 AA compliance
- **Performance**: Optimize loading times and animations
- **Educational Tools**: Add interactive learning components

### Feature Requests
- **AI-Powered Tutoring**: Integrate educational AI assistance
- **Offline Learning**: Enable offline course content access
- **Social Learning**: Expand collaborative features
- **Advanced Analytics**: Detailed progress tracking and insights
- **Gamification**: Additional achievement systems and rewards

### Technical Improvements
- **Testing Infrastructure**: Add comprehensive test coverage
- **CI/CD Pipeline**: Improve automated testing and deployment
- **Code Quality**: Enhance TypeScript usage and documentation
- **Security**: Implement security best practices
- **API Integration**: Prepare for backend API integration

## 🌍 Internationalization

### Arabic Language Support
- Use proper RTL (right-to-left) text direction
- Implement Arabic numeral formatting
- Support Arabic date and time formats
- Ensure proper font loading for Arabic text

```typescript
// Example: Arabic text handling
const formatArabicDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
```

### Cultural Considerations
- Respect cultural sensitivities in content
- Use appropriate imagery and examples
- Consider local educational standards
- Implement culturally relevant gamification elements

## 🏆 Recognition

### Contributor Recognition
- Contributors listed in project README
- Special thanks in release notes
- Invitation to contributor events
- Potential collaboration opportunities

### Contribution Types
- **🐛 Bug Hunters**: Find and fix critical issues
- **✨ Feature Builders**: Create new educational tools
- **🎨 Design Contributors**: Improve UI/UX
- **📚 Documentation Writers**: Enhance project documentation
- **🌍 Localization Heroes**: Improve Arabic language support

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Technical questions and bug reports
- **GitHub Discussions**: Feature discussions and general questions
- **Developer Guide**: Technical documentation reference
- **Code Review**: Request feedback on implementation approaches

### Mentorship
New contributors can request mentorship for:
- First-time open source contributions
- React/TypeScript development guidance
- Educational platform design principles
- Arabic localization best practices

### Response Times
- **Issues**: Response within 2-3 business days
- **Pull Requests**: Initial review within 1 week
- **Questions**: Community response within 24-48 hours

## 📜 Code of Conduct

### Our Standards
- **Respectful Communication**: Treat all contributors with respect
- **Inclusive Environment**: Welcome contributors from all backgrounds
- **Constructive Feedback**: Provide helpful and actionable feedback
- **Educational Focus**: Keep discussions centered on improving education
- **Cultural Sensitivity**: Respect cultural differences and perspectives

### Unacceptable Behavior
- Harassment or discriminatory language
- Personal attacks or trolling
- Spam or off-topic discussions
- Violation of privacy
- Any behavior that creates an unwelcoming environment

### Enforcement
Community leaders will:
- Address reported violations promptly
- Take appropriate corrective action
- Maintain confidentiality regarding incident reports
- Focus on education and improvement rather than punishment

## 🎓 Educational Impact

Your contributions to Darsni directly impact:
- **Student Success**: Helping students prepare for Bagrut exams
- **Educational Accessibility**: Making quality education more accessible
- **Learning Innovation**: Advancing educational technology
- **Cultural Preservation**: Supporting Arabic language education
- **Community Building**: Fostering collaborative learning environments

Thank you for contributing to the future of education! 🌟

---

## Quick Links
- [Issues](https://github.com/organization/darsni-platform/issues)
- [Pull Requests](https://github.com/organization/darsni-platform/pulls)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Component Documentation](./src/components/README.md)
