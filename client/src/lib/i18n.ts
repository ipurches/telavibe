import { createContext, useContext } from 'react';

export type Language = 'en' | 'he';

export interface TranslationContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const translations = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Mediterranean Celebrations',
    'hero.subtitle': 'Premier Israeli & Greek cultural event planning in Cyprus. Creating authentic Mediterranean celebrations that honor your heritage while celebrating life\'s special moments.',
    'hero.book_event': 'Book Your Event',
    'hero.watch_story': 'Watch Our Story',
    
    // Services
    'services.title': 'Our Cultural Services',
    'services.subtitle': 'From intimate gatherings to grand celebrations, we bring authentic Israeli and Greek traditions to life in beautiful Cyprus.',
    'services.weddings': 'Cultural Weddings',
    'services.corporate': 'Corporate Events',
    'services.celebrations': 'Cultural Celebrations',
    'services.kosher_certified': 'Kosher Certified',
    'services.learn_more': 'Learn More',
    
    // Gallery
    'gallery.title': 'Event Gallery',
    'gallery.subtitle': 'Witness the magic of our cultural celebrations through stunning photography capturing authentic moments of joy and tradition.',
    
    // Team
    'team.title': 'Meet Our Team',
    'team.subtitle': 'Our passionate team brings together decades of experience in cultural event planning, ensuring every celebration is authentic and memorable.',
    
    // Contact
    'contact.title': 'Let\'s Plan Your Celebration',
    'contact.subtitle': 'Ready to create an unforgettable cultural celebration? Contact us today to start planning your perfect Mediterranean event.',
    'contact.get_in_touch': 'Get In Touch',
    'contact.first_name': 'First Name',
    'contact.last_name': 'Last Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.event_type': 'Event Type',
    'contact.message': 'Message',
    'contact.send_message': 'Send Message',
    'contact.office_location': 'Office Location',
    'contact.business_hours': 'Business Hours',
    'contact.follow_us': 'Follow Us',
    
    // Footer
    'footer.description': 'Creating authentic Mediterranean celebrations that honor your heritage while celebrating life\'s special moments in beautiful Cyprus.',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 TEL AVIBE Cyprus. All rights reserved. | Creating authentic Mediterranean celebrations since 2010.',
    
    // Music Player
    'music.title': 'Traditional Music Experience',
    'music.subtitle': 'Listen to authentic Israeli and Greek melodies that bring our celebrations to life',
    'music.now_playing': 'Now Playing: Hava Nagila',
    'music.traditional_song': 'Traditional Israeli Wedding Song',
    
    // Cultural Calendar
    'calendar.title': 'Cultural Calendar',
    'calendar.subtitle': 'Stay connected with important Israeli and Greek holidays and cultural celebrations throughout the year.',
    
    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'Don\'t just take our word for it - hear from the families and organizations who trusted us with their most important celebrations.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
  },
  he: {
    // Navigation
    'nav.services': 'שירותים',
    'nav.gallery': 'גלריה',
    'nav.team': 'הצוות',
    'nav.contact': 'צור קשר',
    
    // Hero Section
    'hero.title': 'חגיגות ים תיכוניות',
    'hero.subtitle': 'תכנון אירועים תרבותיים ישראליים ויווניים מובילים בקפריסין. יוצרים חגיגות ים תיכוניות אותנטיות המכבדות את המורשת שלכם תוך חגיגת הרגעים המיוחדים של החיים.',
    'hero.book_event': 'הזמן את האירוע שלך',
    'hero.watch_story': 'צפה בסיפור שלנו',
    
    // Services
    'services.title': 'השירותים התרבותיים שלנו',
    'services.subtitle': 'מהתכנסויות אינטימיות ועד חגיגות גדולות, אנו מחיים מסורות ישראליות ויווניות אותנטיות בקפריסין היפה.',
    'services.weddings': 'חתונות תרבותיות',
    'services.corporate': 'אירועים עסקיים',
    'services.celebrations': 'חגיגות תרבותיות',
    'services.kosher_certified': 'כשר מוסמך',
    'services.learn_more': 'למד עוד',
    
    // Gallery
    'gallery.title': 'גלריית אירועים',
    'gallery.subtitle': 'חזו בקסם של החגיגות התרבותיות שלנו דרך צילומים מדהימים הלוכדים רגעים אותנטיים של שמחה ומסורת.',
    
    // Team
    'team.title': 'הכירו את הצוות שלנו',
    'team.subtitle': 'הצוות המלא תשוקה שלנו מביא יחד עשרות שנים של ניסיון בתכנון אירועים תרבותיים, מבטיח שכל חגיגה תהיה אותנטית ובלתי נשכחת.',
    
    // Contact
    'contact.title': 'בואו נתכנן את החגיגה שלכם',
    'contact.subtitle': 'מוכנים ליצור חגיגה תרבותית בלתי נשכחת? צרו איתנו קשר היום כדי להתחיל לתכנן את האירוע הים תיכוני המושלם שלכם.',
    'contact.get_in_touch': 'צרו קשר',
    'contact.first_name': 'שם פרטי',
    'contact.last_name': 'שם משפחה',
    'contact.email': 'אימייל',
    'contact.phone': 'טלפון',
    'contact.event_type': 'סוג אירוע',
    'contact.message': 'הודעה',
    'contact.send_message': 'שלח הודעה',
    'contact.office_location': 'מיקום המשרד',
    'contact.business_hours': 'שעות עבודה',
    'contact.follow_us': 'עקבו אחרינו',
    
    // Footer
    'footer.description': 'יוצרים חגיגות ים תיכוניות אותנטיות המכבדות את המורשת שלכם תוך חגיגת הרגעים המיוחדים של החיים בקפריסין היפה.',
    'footer.services': 'שירותים',
    'footer.contact': 'צור קשר',
    'footer.copyright': '© 2024 TEL AVIBE Cyprus. כל הזכויות שמורות. | יוצרים חגיגות ים תיכוניות אותנטיות מאז 2010.',
    
    // Music Player
    'music.title': 'חוויה מוזיקלית מסורתית',
    'music.subtitle': 'האזינו למנגינות ישראליות ויווניות אותנטיות המעניקות חיים לחגיגות שלנו',
    'music.now_playing': 'מושמע כעת: הבה נגילה',
    'music.traditional_song': 'שיר חתונה ישראלי מסורתי',
    
    // Cultural Calendar
    'calendar.title': 'לוח תרבותי',
    'calendar.subtitle': 'הישארו מחוברים לחגים ישראליים ויווניים חשובים ולחגיגות תרבותיות לאורך השנה.',
    
    // Testimonials
    'testimonials.title': 'המלצות לקוחות',
    'testimonials.subtitle': 'אל תסתפקו במילים שלנו - שמעו מהמשפחות והארגונים שסמכו עלינו עם החגיגות החשובות ביותר שלהם.',
    
    // Common
    'common.loading': 'טוען...',
    'common.error': 'אירעה שגיאה',
    'common.success': 'הצלחה!',
  },
};
