import { 
  users, 
  contacts, 
  events, 
  gallery, 
  testimonials,
  menuItems,
  musicTracks,
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Event,
  type InsertEvent,
  type Gallery,
  type InsertGallery,
  type Testimonial,
  type InsertTestimonial,
  type MenuItem,
  type InsertMenuItem,
  type MusicTrack,
  type InsertMusicTrack
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  getGallery(): Promise<Gallery[]>;
  createGalleryItem(item: InsertGallery): Promise<Gallery>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  getMusicTracks(): Promise<MusicTrack[]>;
  createMusicTrack(track: InsertMusicTrack): Promise<MusicTrack>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private events: Map<number, Event>;
  private gallery: Map<number, Gallery>;
  private testimonials: Map<number, Testimonial>;
  private menuItems: Map<number, MenuItem>;
  private musicTracks: Map<number, MusicTrack>;
  currentUserId: number;
  currentContactId: number;
  currentEventId: number;
  currentGalleryId: number;
  currentTestimonialId: number;
  currentMenuItemId: number;
  currentMusicTrackId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.events = new Map();
    this.gallery = new Map();
    this.testimonials = new Map();
    this.menuItems = new Map();
    this.musicTracks = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentEventId = 1;
    this.currentGalleryId = 1;
    this.currentTestimonialId = 1;
    this.currentMenuItemId = 1;
    this.currentMusicTrackId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample events
    const sampleEvents: Event[] = [
      {
        id: this.currentEventId++,
        title: "Passover",
        description: "Traditional Seder celebrations and holiday catering services available.",
        date: new Date("2024-04-15"),
        type: "holiday",
        cultural: "israeli",
        createdAt: new Date()
      },
      {
        id: this.currentEventId++,
        title: "Easter",
        description: "Orthodox Easter celebrations with traditional Greek customs.",
        date: new Date("2024-05-05"),
        type: "holiday",
        cultural: "greek",
        createdAt: new Date()
      },
      {
        id: this.currentEventId++,
        title: "Independence Day",
        description: "Israeli Independence Day celebrations with cultural activities.",
        date: new Date("2024-05-14"),
        type: "holiday",
        cultural: "israeli",
        createdAt: new Date()
      }
    ];

    sampleEvents.forEach(event => this.events.set(event.id, event));

    // Sample gallery items
    const sampleGallery: Gallery[] = [
      {
        id: this.currentGalleryId++,
        title: "Beach Front Greek Wedding",
        description: "Traditional Greek Orthodox ceremony with 200 guests on Cyprus beach",
        imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "wedding",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Israeli Beach Festival",
        description: "Community celebration with traditional music and dance by the sea",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "cultural",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Kosher Beach Catering",
        description: "Authentic Mediterranean cuisine with kosher certification by the beach",
        imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "catering",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Sunset Beach Celebration",
        description: "Magical evening celebration with Mediterranean sunset views",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "celebration",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Beach Front Corporate Event",
        description: "Professional gathering with stunning ocean views in Larnaca",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "corporate",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Beach Wedding Reception",
        description: "Elegant reception setup with ocean breeze and Mediterranean charm",
        imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "wedding",
        createdAt: new Date()
      }
    ];

    sampleGallery.forEach(item => this.gallery.set(item.id, item));

    // Sample testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: this.currentTestimonialId++,
        name: "Sarah & Dimitri",
        role: "Wedding Clients",
        content: "TEL AVIBE made our wedding absolutely magical. They perfectly blended our Israeli and Greek traditions, creating an unforgettable celebration that honored both our cultures.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60",
        createdAt: new Date()
      },
      {
        id: this.currentTestimonialId++,
        name: "Michael Rosen",
        role: "Tech Company CEO",
        content: "Our corporate event was a huge success thanks to TEL AVIBE. The cultural entertainment and kosher catering exceeded all expectations. Highly recommended!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60",
        createdAt: new Date()
      },
      {
        id: this.currentTestimonialId++,
        name: "Elena Kostas",
        role: "Cultural Event Client",
        content: "The attention to detail and cultural authenticity was incredible. They transformed our venue into a Mediterranean paradise. Every guest was amazed!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60",
        createdAt: new Date()
      }
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));

    // Sample menu items
    const sampleMenuItems: MenuItem[] = [
      {
        id: this.currentMenuItemId++,
        name: "Hummus & Pita",
        description: "Traditional Israeli hummus with warm pita bread and olive oil",
        price: "€8",
        category: "appetizer",
        isKosher: true,
        cultural: "israeli",
        imageUrl: "https://images.unsplash.com/photo-1571197333948-1e771c7c2ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      },
      {
        id: this.currentMenuItemId++,
        name: "Greek Moussaka",
        description: "Traditional layered casserole with eggplant, meat, and béchamel sauce",
        price: "€16",
        category: "main",
        isKosher: false,
        cultural: "greek",
        imageUrl: "https://images.unsplash.com/photo-1544048632-5ad0db11b0a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      },
      {
        id: this.currentMenuItemId++,
        name: "Kosher Lamb Kebab",
        description: "Grilled lamb skewers with Mediterranean herbs and spices",
        price: "€18",
        category: "main",
        isKosher: true,
        cultural: "israeli",
        imageUrl: "https://images.unsplash.com/photo-1544464196-6d8d2f7b1e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      },
      {
        id: this.currentMenuItemId++,
        name: "Baklava",
        description: "Traditional Greek pastry with honey, nuts, and phyllo dough",
        price: "€6",
        category: "dessert",
        isKosher: false,
        cultural: "greek",
        imageUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      },
      {
        id: this.currentMenuItemId++,
        name: "Kosher Shakshuka",
        description: "Eggs poached in spiced tomato sauce with fresh herbs",
        price: "€12",
        category: "main",
        isKosher: true,
        cultural: "israeli",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      },
      {
        id: this.currentMenuItemId++,
        name: "Greek Salad",
        description: "Fresh tomatoes, cucumbers, olives, and feta cheese with olive oil",
        price: "€10",
        category: "salad",
        isKosher: false,
        cultural: "greek",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        createdAt: new Date()
      }
    ];

    sampleMenuItems.forEach(item => this.menuItems.set(item.id, item));

    // Sample music tracks
    const sampleMusicTracks: MusicTrack[] = [
      {
        id: this.currentMusicTrackId++,
        title: "Hava Nagila",
        artist: "Traditional",
        album: "Israeli Folk Songs",
        duration: "4:12",
        cultural: "israeli",
        genre: "folk",
        isTraditional: true,
        createdAt: new Date()
      },
      {
        id: this.currentMusicTrackId++,
        title: "Zorba the Greek",
        artist: "Mikis Theodorakis",
        album: "Greek Cinema",
        duration: "3:45",
        cultural: "greek",
        genre: "traditional",
        isTraditional: true,
        createdAt: new Date()
      },
      {
        id: this.currentMusicTrackId++,
        title: "Shir La'ahava",
        artist: "Naomi Shemer",
        album: "Israeli Classics",
        duration: "3:28",
        cultural: "israeli",
        genre: "folk",
        isTraditional: false,
        createdAt: new Date()
      },
      {
        id: this.currentMusicTrackId++,
        title: "Syrtaki",
        artist: "Traditional Greek",
        album: "Greek Dance Music",
        duration: "5:15",
        cultural: "greek",
        genre: "dance",
        isTraditional: true,
        createdAt: new Date()
      },
      {
        id: this.currentMusicTrackId++,
        title: "Yerushalayim Shel Zahav",
        artist: "Naomi Shemer",
        album: "Jerusalem of Gold",
        duration: "4:38",
        cultural: "israeli",
        genre: "folk",
        isTraditional: false,
        createdAt: new Date()
      },
      {
        id: this.currentMusicTrackId++,
        title: "Misirlou",
        artist: "Traditional Greek",
        album: "Mediterranean Melodies",
        duration: "2:52",
        cultural: "greek",
        genre: "traditional",
        isTraditional: true,
        createdAt: new Date()
      }
    ];

    sampleMusicTracks.forEach(track => this.musicTracks.set(track.id, track));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      createdAt: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async getGallery(): Promise<Gallery[]> {
    return Array.from(this.gallery.values());
  }

  async createGalleryItem(insertItem: InsertGallery): Promise<Gallery> {
    const id = this.currentGalleryId++;
    const item: Gallery = { 
      ...insertItem, 
      id, 
      createdAt: new Date() 
    };
    this.gallery.set(id, item);
    return item;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date(),
      imageUrl: insertTestimonial.imageUrl ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentMenuItemId++;
    const item: MenuItem = { 
      ...insertMenuItem, 
      id, 
      createdAt: new Date(),
      isKosher: insertMenuItem.isKosher ?? false
    };
    this.menuItems.set(id, item);
    return item;
  }

  async getMusicTracks(): Promise<MusicTrack[]> {
    return Array.from(this.musicTracks.values());
  }

  async createMusicTrack(insertMusicTrack: InsertMusicTrack): Promise<MusicTrack> {
    const id = this.currentMusicTrackId++;
    const track: MusicTrack = { 
      ...insertMusicTrack, 
      id, 
      createdAt: new Date(),
      album: insertMusicTrack.album ?? null,
      isTraditional: insertMusicTrack.isTraditional ?? false
    };
    this.musicTracks.set(id, track);
    return track;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  async getGallery(): Promise<Gallery[]> {
    return await db.select().from(gallery);
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<Gallery> {
    const [galleryItem] = await db
      .insert(gallery)
      .values(insertGallery)
      .returning();
    return galleryItem;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const [menuItem] = await db
      .insert(menuItems)
      .values(insertMenuItem)
      .returning();
    return menuItem;
  }

  async getMusicTracks(): Promise<MusicTrack[]> {
    return await db.select().from(musicTracks);
  }

  async createMusicTrack(insertMusicTrack: InsertMusicTrack): Promise<MusicTrack> {
    const [musicTrack] = await db
      .insert(musicTracks)
      .values(insertMusicTrack)
      .returning();
    return musicTrack;
  }
}

export const storage = new DatabaseStorage();
