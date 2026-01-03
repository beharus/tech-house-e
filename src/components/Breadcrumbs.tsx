import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-2 mb-6">
      <Link
        to="/"
        className="px-4 py-2 rounded-full bg-card text-sm font-medium hover:bg-accent transition-colors"
      >
        {t('home')}
      </Link>
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        {t('back')}
      </button>
    </nav>
  );
};

export default Breadcrumbs;
