import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Music,
  Shuffle,
  Repeat,
  Heart
} from 'lucide-react';
import type { MusicTrack } from '@shared/schema';

export function MusicPlayer() {
  const { t } = useTranslation();
  
  const { data: tracks, isLoading } = useQuery<MusicTrack[]>({
    queryKey: ['/api/music'],
  });

  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCulture, setCurrentCulture] = useState<'all' | 'israeli' | 'greek'>('all');

  // Set default track when tracks are loaded
  if (tracks && tracks.length > 0 && !currentTrack) {
    setCurrentTrack(tracks[0]);
  }

  const filteredTracks = currentCulture === 'all' 
    ? tracks || []
    : (tracks || []).filter(track => track.cultural === currentCulture);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack || filteredTracks.length === 0) return;
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % filteredTracks.length;
    setCurrentTrack(filteredTracks[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack || filteredTracks.length === 0) return;
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? filteredTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(filteredTracks[prevIndex]);
  };

  const handleTrackSelect = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-israeli-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Skeleton className="h-96 w-full bg-white/20" />
            <Skeleton className="h-96 w-full bg-white/20" />
            <Skeleton className="h-96 w-full bg-white/20" />
          </div>
        </div>
      </section>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <section className="py-16 bg-israeli-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Music className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No Music Available</h2>
            <p>Music tracks will be available soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-israeli-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            🎵 Traditional Mediterranean Music 🎵
          </h2>
          <p className="text-xl text-blue-100">
            Experience the authentic sounds of Israeli and Greek culture
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Player */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-0 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentTrack ? "Now Playing" : "Select a Track"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTrack ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center">
                      <Music className="text-israeli-blue text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{currentTrack.title}</h3>
                      <p className="text-blue-100">{currentTrack.artist}</p>
                      <p className="text-sm text-blue-200">{currentTrack.album}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={currentTrack.cultural === 'israeli' ? 'default' : 'secondary'}>
                        {currentTrack.cultural === 'israeli' ? '🇮🇱 Israeli' : '🇬🇷 Greek'}
                      </Badge>
                      {currentTrack.isTraditional && (
                        <Badge variant="outline" className="text-gold border-gold">
                          Traditional
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={handlePrevious}
                      className="bg-white/20 hover:bg-white/30 text-white"
                      size="icon"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handlePlayPause}
                      className="w-14 h-14 bg-gold rounded-full hover:bg-yellow-400 text-israeli-blue"
                      size="icon"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-white/20 hover:bg-white/30 text-white"
                      size="icon"
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-blue-200">0:00</span>
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-gold h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm text-blue-200">{currentTrack.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Shuffle className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Repeat className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-white" />
                      <div className="w-20 bg-white/20 rounded-full h-2">
                        <div className="bg-gold h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Music className="h-16 w-16 mx-auto mb-4 text-white/50" />
                  <p className="text-white/70">Select a track to start playing</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Playlist */}
          <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Playlist</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={currentCulture === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentCulture('all')}
                  className="text-xs"
                >
                  All
                </Button>
                <Button
                  variant={currentCulture === 'israeli' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentCulture('israeli')}
                  className="text-xs"
                >
                  🇮🇱 Israeli
                </Button>
                <Button
                  variant={currentCulture === 'greek' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentCulture('greek')}
                  className="text-xs"
                >
                  🇬🇷 Greek
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTrack?.id === track.id
                        ? 'bg-gold/20 border border-gold'
                        : 'hover:bg-white/10'
                    }`}
                    onClick={() => handleTrackSelect(track)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{track.title}</h4>
                        <p className="text-xs text-blue-200">{track.artist}</p>
                        <p className="text-xs text-blue-300">{track.genre}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-blue-200">{track.duration}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Badge 
                            variant={track.cultural === 'israeli' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {track.cultural === 'israeli' ? '🇮🇱' : '🇬🇷'}
                          </Badge>
                          {track.isTraditional && (
                            <Badge variant="outline" className="text-xs text-gold border-gold">
                              T
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
