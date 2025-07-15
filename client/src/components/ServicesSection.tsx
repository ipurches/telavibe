import { useTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Building2, Music, Tag, Users, Clock } from 'lucide-react';

export function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: t('services.weddings'),
      description: 'Traditional Jewish and Greek Orthodox ceremonies with authentic customs, kosher catering, and Mediterranean music.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      color: 'text-israeli-blue',
      bgColor: 'bg-israeli-blue',
      features: ['Kosher Certified', 'Traditional Customs', 'Mediterranean Music']
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: t('services.corporate'),
      description: 'Professional gatherings with cultural entertainment, team building activities, and authentic Mediterranean dining experiences.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      color: 'text-greek-blue',
      bgColor: 'bg-greek-blue',
      features: ['10-500 guests', 'Full service', 'Cultural Entertainment']
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: t('services.celebrations'),
      description: 'Holiday celebrations, cultural festivals, and traditional ceremonies with authentic music, dance, and culinary experiences.',
      image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      color: 'text-orange',
      bgColor: 'bg-orange',
      features: ['Traditional Music', 'Dance Performances', 'Authentic Cuisine']
    }
  ];

  return (
    <section id="services" className="py-16 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-8">
                <h3 className={`font-display text-2xl font-bold mb-4 ${service.color} flex items-center`}>
                  <span className="text-orange mr-2">{service.icon}</span>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                {index === 0 && (
                  <div className="kosher-badge rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-israeli-blue" />
                      <span className="font-semibold text-israeli-blue">{t('services.kosher_certified')}</span>
                    </div>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gold" />
                      <span className="text-sm font-medium">10-500 guests</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gold" />
                      <span className="text-sm font-medium">Full service</span>
                    </div>
                  </div>
                )}
                
                {index === 2 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="text-2xl">🎭</div>
                    <div className="text-2xl">🎵</div>
                    <div className="text-2xl">🍽️</div>
                    <div className="text-2xl">💃</div>
                  </div>
                )}
                
                <Button className={`w-full ${service.bgColor} hover:opacity-90 text-white`}>
                  {t('services.learn_more')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
