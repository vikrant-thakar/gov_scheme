// Optimized imports for better performance
import dynamic from 'next/dynamic';

// Lazy load heavy components
export const SchemesSidebar = dynamic(() => import('./SchemesSidebar'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-96 rounded-lg" />,
  ssr: false
});

export const FilterPreferences = dynamic(() => import('./FilterPreferences'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-64 rounded-lg" />,
  ssr: false
});

export const FullPageLoader = dynamic(() => import('./FullPageLoader'), {
  ssr: false
});

// Lazy load pages
export const SchemesPage = dynamic(() => import('../app/schemes/page'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-screen" />
});

export const AboutPage = dynamic(() => import('../app/about/page'), {
  loading: () => <div className="animate-pulse bg-gray-700 h-screen" />
});

// Optimize icon imports - only import what you need
export const IconImport = {
  // Use lucide-react for better performance
  // import { User, Bell } from 'lucide-react'
  // Or use the lightweight icon component we created
}; 