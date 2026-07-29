# Himalya Sparsh - Premium Water Device Website

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Database**: MongoDB with Mongoose
- **Image/Video**: Cloudinary
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **Hosting**: Vercel-ready

## Features

### Public Website
- Hero section with Himalayan background
- About Us (Introduction + Leadership)
- Device Science & Components
- How It Works (with 3D animation support)
- Testimonials & Lab Reports
- Product Purchase Page
- Founder Delivery
- Business Opportunity (Distributor + Partnership)
- Contact Us with form
- SEO optimized
- Fully responsive

### Admin Panel
- Secure authentication (Super Admin role)
- Content management for all sections
- Order management
- Enquiry management
- Lab report uploads
- Testimonial management
- Product management
- Settings management
- File upload to Cloudinary

## Setup Instructions

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in values
3. Run development server: `npm run dev`
4. Visit http://localhost:3000
5. Admin login: http://localhost:3000/admin/login

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Database

MongoDB collections are auto-created on first connection.

## Admin Credentials

- Email: `admin@himalyaspersh.com`
- Password: `change-this-password` (change after first login)
