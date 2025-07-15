import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-israeli-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl font-bold text-white">TEL AVIBE</div>
              <div className="text-2xl">🇮🇱🇬🇷</div>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                asChild
              >
                <a href="#" aria-label="Instagram">
                  <span className="text-lg">📷</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                asChild
              >
                <a href="#" aria-label="Facebook">
                  <span className="text-lg">📘</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                asChild
              >
                <a href="#" aria-label="TikTok">
                  <span className="text-lg">🎵</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                asChild
              >
                <a href="#" aria-label="YouTube">
                  <span className="text-lg">📺</span>
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-gold transition-colors">Cultural Weddings</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Corporate Events</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cultural Celebrations</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Kosher Catering</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Venue Planning</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-blue-100">
              <li>Larnaca, Cyprus</li>
              <li>+357 XX XXX XXX</li>
              <li>telavibes4@gmail.com</li>
              <li>Mon-Sun: 9:00-22:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
