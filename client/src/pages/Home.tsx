import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Gallery } from '@/components/Gallery';
import { CulturalCalendar } from '@/components/CulturalCalendar';
import { TeamSection } from '@/components/TeamSection';
import { Testimonials } from '@/components/Testimonials';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <MusicPlayer />
      <Gallery />
      <CulturalCalendar />
      <TeamSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
