import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Church, Star, VenetianMask } from 'lucide-react';
import type { Event } from '@shared/schema';

export function CulturalCalendar() {
  const { t } = useTranslation();
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const getEventIcon = (cultural: string) => {
    switch (cultural) {
      case 'israeli':
        return <Star className="h-6 w-6 text-white" />;
      case 'greek':
        return <Church className="h-6 w-6 text-white" />;
      default:
        return <VenetianMask className="h-6 w-6 text-white" />;
    }
  };

  const getEventColor = (cultural: string) => {
    switch (cultural) {
      case 'israeli':
        return 'bg-israeli-blue';
      case 'greek':
        return 'bg-greek-blue';
      default:
        return 'bg-orange';
    }
  };

  const getEventEmojis = (cultural: string) => {
    switch (cultural) {
      case 'israeli':
        return ['🍷', '🍞', '✡️'];
      case 'greek':
        return ['🥚', '🕯️', '☦️'];
      default:
        return ['🎭', '🎵', '🌊'];
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            {t('calendar.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('calendar.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events?.map((event) => (
            <Card key={event.id} className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${getEventColor(event.cultural)} rounded-full flex items-center justify-center`}>
                    {getEventIcon(event.cultural)}
                  </div>
                  <div>
                    <h3 className={`font-bold ${event.cultural === 'israeli' ? 'text-israeli-blue' : event.cultural === 'greek' ? 'text-greek-blue' : 'text-orange'}`}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex items-center space-x-2">
                  {getEventEmojis(event.cultural).map((emoji, index) => (
                    <span key={index} className="text-2xl">{emoji}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
