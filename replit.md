# TEL AVIBE Cyprus - Israeli & Greek Cultural Events Platform

## Overview

TEL AVIBE Cyprus is a full-stack web application for a cultural event planning company that specializes in Israeli and Greek celebrations in Cyprus. The platform serves as both a marketing website and a business management system, featuring a modern React frontend with a Node.js/Express backend and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color themes for Israeli and Greek branding
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: Custom i18n solution supporting English and Hebrew (RTL)

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database (DatabaseStorage implementation)
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for schema validation and type safety
- **Session Management**: Express sessions with PostgreSQL store

### Key Components

#### Database Schema
The application uses five main tables:
- **users**: Admin user authentication
- **contacts**: Contact form submissions from potential clients
- **events**: Cultural events calendar (Israeli, Greek, and mixed celebrations)
- **gallery**: Image gallery with categorized event photos
- **testimonials**: Client testimonials with ratings and optional photos

#### API Structure
RESTful API endpoints:
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Admin: retrieve all contacts
- `GET /api/events` - Retrieve cultural events calendar
- `POST /api/events` - Admin: create new events
- `GET /api/gallery` - Retrieve gallery images
- `GET /api/testimonials` - Retrieve client testimonials

#### Cultural Theme System
- **Israeli Theme**: Blue color scheme (#004499) with Hebrew language support
- **Greek Theme**: Greek blue (#0066cc) with Orthodox cultural elements
- **Mixed Theme**: Gold accents (#ffd700) for combined celebrations

## Data Flow

1. **Client Requests**: React frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests with Zod validation
3. **Database Operations**: Drizzle ORM performs type-safe database queries
4. **Response Handling**: JSON responses with proper error handling and status codes
5. **State Management**: React Query caches and manages server state on the frontend

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database connection
- **@radix-ui/***: Comprehensive UI component library
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **react-hook-form**: Form handling with validation
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and development tooling
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon PostgreSQL serverless database
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database Migrations**: Drizzle Kit manages schema migrations
- **Static Assets**: Express serves built frontend from `dist/public`

### Key Features
- **Cultural Authenticity**: Dedicated sections for Israeli and Greek traditions
- **Multilingual Support**: English and Hebrew with RTL text support
- **Mobile Responsive**: Fully responsive design optimized for all devices
- **Contact Management**: Form submissions stored in database for admin review
- **Event Calendar**: Cultural events with categorization by tradition type
- **Gallery System**: Categorized photo gallery showcasing past events
- **Testimonials**: Client reviews with star ratings and photos
- **Music Integration**: Cultural music player component (UI only)

The architecture prioritizes type safety, performance, and cultural authenticity while maintaining a clean separation between frontend presentation and backend business logic.

## Recent Changes

### Database Migration (July 15, 2025)
- **Migration**: Successfully migrated from in-memory storage (MemStorage) to PostgreSQL database (DatabaseStorage)
- **Implementation**: Created database connection with Neon serverless PostgreSQL using Drizzle ORM
- **Schema**: All existing tables (users, contacts, events, gallery, testimonials, menuItems, musicTracks) migrated to PostgreSQL
- **Seeding**: Database populated with sample data for all sections including authentic Mediterranean menu items, traditional music tracks, and cultural event data
- **API Integration**: All API endpoints now use persistent database storage with proper error handling
- **Performance**: Database queries optimized with proper indexing and type safety through Drizzle ORM