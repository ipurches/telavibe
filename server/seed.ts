import { db } from "./db";
import { 
  users, 
  contacts, 
  events, 
  gallery, 
  testimonials, 
  menuItems, 
  musicTracks 
} from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(musicTracks);
  await db.delete(menuItems);
  await db.delete(testimonials);
  await db.delete(gallery);
  await db.delete(events);
  await db.delete(contacts);
  await db.delete(users);

  // Seed users
  const sampleUsers = [
    {
      username: "admin",
      password: "password123"
    }
  ];

  for (const user of sampleUsers) {
    await db.insert(users).values(user);
  }

  // Seed events
  const sampleEvents = [
    {
      title: "Passover",
      description: "Traditional Jewish celebration of freedom and liberation",
      date: new Date("2024-04-15"),
      type: "religious",
      cultural: "israeli" as const
    },
    {
      title: "Greek Orthodox Easter",
      description: "Celebrate the resurrection with traditional Greek customs",
      date: new Date("2024-05-05"),
      type: "religious",
      cultural: "greek" as const
    },
    {
      title: "Independence Day Celebration",
      description: "Israel's Independence Day with music, food, and festivities",
      date: new Date("2024-05-14"),
      type: "national",
      cultural: "israeli" as const
    }
  ];

  for (const event of sampleEvents) {
    await db.insert(events).values(event);
  }

  // Seed gallery
  const sampleGallery = [
    {
      title: "Beach Front Greek Wedding",
      description: "Beautiful Greek wedding ceremony by the sea",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      category: "wedding"
    },
    {
      title: "Israeli Bar Mitzvah",
      description: "Traditional Bar Mitzvah celebration with family and friends",
      imageUrl: "https://images.unsplash.com/photo-1502780402662-acc01917949e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      category: "celebration"
    },
    {
      title: "Greek Dance Performance",
      description: "Traditional Greek folk dance performance at sunset",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      category: "entertainment"
    }
  ];

  for (const galleryItem of sampleGallery) {
    await db.insert(gallery).values(galleryItem);
  }

  // Seed testimonials
  const sampleTestimonials = [
    {
      name: "Sarah & Dimitri",
      role: "Wedding Couple",
      content: "TEL AVIBE created the most magical wedding experience! The combination of Israeli and Greek traditions was perfect.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Rachel Cohen",
      role: "Bar Mitzvah Mother",
      content: "The authentic kosher menu and beautiful beach setting made our son's Bar Mitzvah unforgettable. Highly recommended!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Andreas Papadopoulos",
      role: "Business Owner",
      content: "Professional service and attention to Greek cultural details. They made our corporate event a huge success!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    }
  ];

  for (const testimonial of sampleTestimonials) {
    await db.insert(testimonials).values(testimonial);
  }

  // Seed menu items
  const sampleMenuItems = [
    {
      name: "Hummus & Pita",
      description: "Traditional Israeli hummus with warm pita bread and olive oil",
      price: "€8",
      category: "appetizer",
      isKosher: true,
      cultural: "israeli" as const,
      imageUrl: "https://images.unsplash.com/photo-1571197333948-1e771c7c2ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Greek Moussaka",
      description: "Traditional layered casserole with eggplant, meat, and béchamel sauce",
      price: "€16",
      category: "main",
      isKosher: false,
      cultural: "greek" as const,
      imageUrl: "https://images.unsplash.com/photo-1544048632-5ad0db11b0a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Kosher Lamb Kebab",
      description: "Grilled lamb skewers with Mediterranean herbs and spices",
      price: "€18",
      category: "main",
      isKosher: true,
      cultural: "israeli" as const,
      imageUrl: "https://images.unsplash.com/photo-1544464196-6d8d2f7b1e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Baklava",
      description: "Traditional Greek pastry with honey, nuts, and phyllo dough",
      price: "€6",
      category: "dessert",
      isKosher: false,
      cultural: "greek" as const,
      imageUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Kosher Shakshuka",
      description: "Eggs poached in spiced tomato sauce with fresh herbs",
      price: "€12",
      category: "main",
      isKosher: true,
      cultural: "israeli" as const,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Greek Salad",
      description: "Fresh tomatoes, cucumbers, olives, and feta cheese with olive oil",
      price: "€10",
      category: "salad",
      isKosher: false,
      cultural: "greek" as const,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    }
  ];

  for (const menuItem of sampleMenuItems) {
    await db.insert(menuItems).values(menuItem);
  }

  // Seed music tracks
  const sampleMusicTracks = [
    {
      title: "Hava Nagila",
      artist: "Traditional",
      album: "Israeli Folk Songs",
      duration: "4:12",
      cultural: "israeli" as const,
      genre: "folk",
      isTraditional: true
    },
    {
      title: "Zorba the Greek",
      artist: "Mikis Theodorakis",
      album: "Greek Cinema",
      duration: "3:45",
      cultural: "greek" as const,
      genre: "traditional",
      isTraditional: true
    },
    {
      title: "Shir La'ahava",
      artist: "Naomi Shemer",
      album: "Israeli Classics",
      duration: "3:28",
      cultural: "israeli" as const,
      genre: "folk",
      isTraditional: false
    },
    {
      title: "Syrtaki",
      artist: "Traditional Greek",
      album: "Greek Dance Music",
      duration: "5:15",
      cultural: "greek" as const,
      genre: "dance",
      isTraditional: true
    },
    {
      title: "Yerushalayim Shel Zahav",
      artist: "Naomi Shemer",
      album: "Jerusalem of Gold",
      duration: "4:38",
      cultural: "israeli" as const,
      genre: "folk",
      isTraditional: false
    },
    {
      title: "Misirlou",
      artist: "Traditional Greek",
      album: "Mediterranean Melodies",
      duration: "2:52",
      cultural: "greek" as const,
      genre: "traditional",
      isTraditional: true
    }
  ];

  for (const musicTrack of sampleMusicTracks) {
    await db.insert(musicTracks).values(musicTrack);
  }

  console.log("Database seeded successfully!");
}

seedDatabase().catch(console.error);