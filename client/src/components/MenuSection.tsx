import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Utensils, ChefHat } from 'lucide-react';
import type { MenuItem } from '@shared/schema';

export function MenuSection() {
  const { t } = useTranslation();
  
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  const getItemIcon = (category: string) => {
    switch (category) {
      case 'appetizer':
        return <Utensils className="h-5 w-5" />;
      case 'main':
        return <ChefHat className="h-5 w-5" />;
      case 'dessert':
        return <Star className="h-5 w-5" />;
      default:
        return <Utensils className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'appetizer':
        return 'text-green-600';
      case 'main':
        return 'text-israeli-blue';
      case 'dessert':
        return 'text-orange';
      case 'salad':
        return 'text-green-500';
      default:
        return 'text-gray-600';
    }
  };

  const groupedItems = menuItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            🍽️ Authentic Mediterranean Cuisine 🍽️
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of traditional Israeli and Greek dishes, featuring fresh ingredients and authentic flavors with kosher options available.
          </p>
        </div>

        {Object.entries(groupedItems || {}).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-israeli-blue mb-8 capitalize flex items-center">
              <span className={`mr-3 ${getCategoryColor(category)}`}>
                {getItemIcon(category)}
              </span>
              {category.replace('_', ' ')}s
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {item.isKosher && (
                        <Badge className="kosher-badge text-israeli-blue">
                          ✓ Kosher
                        </Badge>
                      )}
                      <Badge variant={item.cultural === 'israeli' ? 'default' : 'secondary'}>
                        {item.cultural === 'israeli' ? '🇮🇱 Israeli' : '🇬🇷 Greek'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg text-israeli-blue">{item.name}</h4>
                      <span className="text-xl font-bold text-gold">{item.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getCategoryColor(category)} capitalize`}>
                        {category.replace('_', ' ')}
                      </span>
                      {item.isKosher && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-gold fill-current" />
                          <span className="text-sm text-gold font-medium">Kosher Certified</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16">
          <div className="bg-warm-gray rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-israeli-blue mb-4">
              🏖️ Beach Front Dining Experience 🏖️
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy our delicious Mediterranean cuisine with stunning ocean views at our beach front location in Larnaca, Cyprus. Perfect for romantic dinners and special celebrations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="text-israeli-blue border-israeli-blue">
                🌊 Ocean Views
              </Badge>
              <Badge variant="outline" className="text-greek-blue border-greek-blue">
                🍷 Wine Pairings
              </Badge>
              <Badge variant="outline" className="text-orange border-orange">
                🌅 Sunset Dining
              </Badge>
              <Badge variant="outline" className="text-gold border-gold">
                ✨ Special Events
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}