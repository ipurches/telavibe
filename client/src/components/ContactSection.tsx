import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSchema } from '@shared/schema';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { z } from 'zod';

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  eventType: z.string().min(1, 'Event type is required'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventType: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest('POST', '/api/contacts', data);
    },
    onSuccess: () => {
      toast({
        title: t('common.success'),
        description: 'Your message has been sent successfully!',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error) => {
      toast({
        title: t('common.error'),
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-israeli-blue mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="bg-warm-gray">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-israeli-blue mb-6">
                {t('contact.get_in_touch')}
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.first_name')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.last_name')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="telavibes4@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+357 XX XXX XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.event_type')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="cultural">Cultural Celebration</SelectItem>
                            <SelectItem value="private">Private Party</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your event vision..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-israeli-blue hover:bg-blue-700" 
                    disabled={contactMutation.isPending}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {contactMutation.isPending ? t('common.loading') : t('contact.send_message')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-israeli-blue text-white">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">{t('contact.contact')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-israeli-blue" />
                    </div>
                    <div>
                      <div className="font-semibold">{t('contact.office_location')}</div>
                      <div className="text-blue-100">Beach Front, Larnaca, Cyprus</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-israeli-blue" />
                    </div>
                    <div>
                      <div className="font-semibold">{t('contact.phone')}</div>
                      <div className="text-blue-100">+357 XX XXX XXX</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-israeli-blue" />
                    </div>
                    <div>
                      <div className="font-semibold">{t('contact.email')}</div>
                      <div className="text-blue-100">telavibes4@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-israeli-blue" />
                    </div>
                    <div>
                      <div className="font-semibold">{t('contact.business_hours')}</div>
                      <div className="text-blue-100">Mon-Sun: 9:00 AM - 10:00 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-warm-gray">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-israeli-blue mb-6">
                  {t('contact.follow_us')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl text-pink-500">📷</div>
                    <div>
                      <div className="font-semibold">Instagram</div>
                      <div className="text-sm text-gray-600">@telavibe_cyprus</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl text-blue-600">📘</div>
                    <div>
                      <div className="font-semibold">Facebook</div>
                      <div className="text-sm text-gray-600">TEL AVIBE Cyprus</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl text-black">🎵</div>
                    <div>
                      <div className="font-semibold">TikTok</div>
                      <div className="text-sm text-gray-600">@telavibe</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl text-red-600">📺</div>
                    <div>
                      <div className="font-semibold">YouTube</div>
                      <div className="text-sm text-gray-600">TEL AVIBE Cyprus</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
