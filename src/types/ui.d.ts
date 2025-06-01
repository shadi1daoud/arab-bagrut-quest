
/**
 * UI Component and Layout Types
 * 
 * Type definitions for user interface components,
 * layout structures, and interactive elements.
 */

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button variant style */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export interface ProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styling */
  style?: React.CSSProperties;
}

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Navigation and Menu Types
 */
export interface NavigationItem {
  /** Display label (Arabic) */
  label: string;
  /** Navigation path */
  href: string;
  /** Icon component */
  icon?: React.ComponentType<any>;
  /** Whether item is currently active */
  active?: boolean;
  /** Badge content (e.g., notification count) */
  badge?: string | number;
}

export interface SidebarProps {
  /** Whether sidebar is open on mobile */
  isOpen: boolean;
  /** Function to toggle sidebar */
  onToggle: () => void;
  /** Navigation items */
  items: NavigationItem[];
}

/**
 * Modal and Dialog Types
 */
export interface ModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Function to close modal */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Form and Input Types
 */
export interface FormFieldProps {
  /** Field label */
  label: string;
  /** Field name/id */
  name: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Field value */
  value: string | number;
  /** Change handler */
  onChange: (value: string | number) => void;
  /** Error message */
  error?: string;
  /** Additional props */
  [key: string]: any;
}

/**
 * Animation and Effect Types
 */
export interface AnimationProps {
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation easing function */
  easing?: string;
  /** Whether animation should repeat */
  repeat?: boolean;
}

export interface ParticleEffectProps {
  /** Number of particles */
  count?: number;
  /** Particle colors */
  colors?: string[];
  /** Effect origin point */
  origin?: { x: number; y: number };
  /** Particle spread angle */
  spread?: number;
}
