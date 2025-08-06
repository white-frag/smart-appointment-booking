# Smart Appointment Booking System

A modern, responsive appointment booking system built with React, TypeScript, and Supabase.

## Features

- 📅 Easy appointment booking with real-time availability
- 👤 User authentication and admin portal
- 📱 Mobile-responsive design
- 🔔 Email notifications and reminders
- 🎨 Modern UI with smooth animations
- 📊 Admin dashboard for appointment management

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (optional - app works in demo mode without it)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-appointment-booking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Demo Mode

The application runs in demo mode by default when Supabase credentials are not configured. In demo mode:

- You can use demo credentials: `admin@example.com` / `admin123`
- Appointments are stored locally (not persisted to database)
- All features work but data is not saved permanently

## Supabase Setup (Optional)

To enable full functionality with database persistence:

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the database migrations in the `supabase/migrations/` folder

4. Restart the development server

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── lib/               # Utility functions and configurations
├── pages/             # Page components
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 