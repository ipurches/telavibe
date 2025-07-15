import { useTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';

export function VideoSection() {
  const { t } = useTranslation();

  const videoId = "agsItmAUZqs";
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="py-16 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            🎬 Experience Our Celebrations 🎬
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch authentic moments from our Mediterranean celebrations and discover the magic we create for every special occasion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <iframe
                src={embedUrl}
                title="TEL AVIBE Cyprus Cultural Celebration"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Card>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl font-bold text-israeli-blue mb-4">
                Authentic Mediterranean Celebrations
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Discover how we blend Israeli and Greek traditions to create unforgettable experiences on the beautiful beaches of Cyprus. From traditional music and dance to authentic cuisine, every detail is crafted with cultural authenticity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-israeli-blue text-white">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">Events Celebrated</div>
                </CardContent>
              </Card>
              <Card className="p-4 bg-greek-blue text-white">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-blue-100">Years Experience</div>
                </CardContent>
              </Card>
              <Card className="p-4 bg-gold text-israeli-blue">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Satisfaction Rate</div>
                </CardContent>
              </Card>
              <Card className="p-4 bg-orange text-white">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-orange-100">Support Available</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-israeli-blue hover:bg-blue-700 text-white"
                onClick={() => window.open(watchUrl, '_blank')}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Full Video
              </Button>
              <Button 
                variant="outline"
                className="border-israeli-blue text-israeli-blue hover:bg-israeli-blue hover:text-white"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Book Your Event
              </Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-israeli-blue mb-3">What Makes Us Special:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-gold mr-2">🏖️</span>
                  Beach front celebrations with ocean views
                </li>
                <li className="flex items-center">
                  <span className="text-israeli-blue mr-2">🍷</span>
                  Kosher certified Mediterranean cuisine
                </li>
                <li className="flex items-center">
                  <span className="text-greek-blue mr-2">🎵</span>
                  Traditional Israeli and Greek music
                </li>
                <li className="flex items-center">
                  <span className="text-orange mr-2">💃</span>
                  Authentic cultural dance performances
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}