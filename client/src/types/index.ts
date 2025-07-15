export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  culture: 'israeli' | 'greek';
  duration: string;
  url: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
  price?: string;
  capacity?: string;
}
