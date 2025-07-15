import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2"
    >
      <span>{language === 'en' ? '🇬🇧' : '🇮🇱'}</span>
      <span>{language === 'en' ? 'EN' : 'עב'}</span>
    </Button>
  );
}
