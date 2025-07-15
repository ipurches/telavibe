import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music } from 'lucide-react';

export function MusicPlayer() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 bg-israeli-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            🎵 {t('music.title')} 🎵
          </h2>
          <p className="text-xl text-blue-100">{t('music.subtitle')}</p>
        </div>
        
        <div className="music-player bg-white/10 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                  <Music className="text-israeli-blue text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t('music.now_playing')}</h3>
                  <p className="text-blue-100">{t('music.traditional_song')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full w-1/3"></div>
                </div>
                <span className="text-white text-sm">2:45 / 4:12</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150" 
                alt="Traditional musical instruments" 
                className="rounded-lg object-cover w-full h-32" 
              />
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150" 
                alt="Greek traditional instruments" 
                className="rounded-lg object-cover w-full h-32" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
