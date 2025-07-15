import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Calendar, Play, MapPin, Phone } from 'lucide-react';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-gradient pt-20 pb-16 cultural-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span>{t('hero.title')}</span>
              <div className="text-3xl lg:text-4xl text-gold mt-2">🎉 TEL AVIBE Cyprus 🎉</div>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-gold text-israeli-blue hover:bg-yellow-400 px-8 py-4 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                {t('hero.book_event')}
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-israeli-blue px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                {t('hero.watch_story')}
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Beach Front, Larnaca, Cyprus</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Beautiful beach front celebration in Cyprus" 
              className="rounded-2xl shadow-2xl floating-element w-full" 
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="font-semibold text-israeli-blue">500+ Events</div>
                  <div className="text-sm text-gray-600">Successfully Planned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
