import { useTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Instagram } from 'lucide-react';

export function TeamSection() {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: 'David Cohen',
      role: 'Founder & Cultural Director',
      description: 'Born in Tel Aviv, David brings 15 years of experience in cultural event planning with deep knowledge of Israeli traditions.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300',
      color: 'text-israeli-blue',
      socialLinks: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      id: 2,
      name: 'Maria Papadopoulos',
      role: 'Senior Event Coordinator',
      description: 'Athens-born Maria specializes in Greek Orthodox ceremonies and traditional celebrations with 12 years of experience.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b734?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300',
      color: 'text-greek-blue',
      socialLinks: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      id: 3,
      name: 'Andreas Stavros',
      role: 'Culinary Director',
      description: 'Master chef specializing in kosher Mediterranean cuisine, ensuring authentic flavors in every celebration.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300',
      color: 'text-israeli-blue',
      socialLinks: {
        linkedin: '#',
        instagram: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            {t('team.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-warm-gray hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className={`font-display text-2xl font-bold mb-2 ${member.color}`}>
                  {member.name}
                </h3>
                <p className="text-orange font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={member.socialLinks.linkedin} className={member.color}>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={member.socialLinks.instagram} className={member.color}>
                      <Instagram className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
