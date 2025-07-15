import { 
  users, 
  contacts, 
  events, 
  gallery, 
  testimonials,
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Event,
  type InsertEvent,
  type Gallery,
  type InsertGallery,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private events: Map<number, Event>;
  private gallery: Map<number, Gallery>;
  private testimonials: Map<number, Testimonial>;
  currentUserId: number;
  currentContactId: number;
  currentEventId: number;
  currentGalleryId: number;
  currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.events = new Map();
    this.gallery = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentEventId = 1;
    this.currentGalleryId = 1;
    this.currentTestimonialId = 1;
    
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
        title: "Sophia & Andreas Wedding",
        description: "Traditional Greek Orthodox ceremony with 200 guests",
        imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "wedding",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Israeli Cultural Festival",
        description: "Community celebration with traditional music and dance",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "cultural",
        createdAt: new Date()
      },
      {
        id: this.currentGalleryId++,
        title: "Kosher Catering",
        description: "Authentic Mediterranean cuisine with kosher certification",
        imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "catering",
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
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
