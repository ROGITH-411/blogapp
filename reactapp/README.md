# BlogApp Frontend

A modern, responsive blog application frontend built with React, Vite, and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Clean, professional UI with Tailwind CSS
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast** - Built with Vite for lightning-fast development and builds
- 🔐 **Authentication** - Basic auth integration with the Spring Boot backend
- 📝 **Rich Editor** - Markdown support with live preview
- 🎯 **User Experience** - Loading states, error handling, and smooth transitions
- ♿ **Accessible** - Built with accessibility best practices

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- The Spring Boot backend running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd reactapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE=http://localhost:8080
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.jsx
│   └── LoadingSpinner.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── BlogView.jsx
│   ├── CreateBlog.jsx
│   └── AdminLogin.jsx
├── api/                # API client configuration
│   └── axiosClient.js
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## Features Overview

### Home Page
- Clean blog post listing with pagination
- Professional card design with author avatars
- Loading skeletons and error states
- Empty state handling

### Blog View
- Full article view with professional typography
- Breadcrumb navigation
- Social sharing buttons (UI ready)
- Responsive design

### Create Post
- Split-screen editor with live preview
- Form validation and error handling
- Markdown support with formatting guide
- Professional form design

### Admin Login
- Secure authentication flow
- Form validation and error states
- Demo credentials display
- Professional login form

## Authentication

The app uses HTTP Basic Authentication with the Spring Boot backend:

- **Admin**: `admin` / `adminpass` (can create, edit, delete posts)
- **User**: `user` / `password` (can view posts and comments)

## API Integration

The frontend communicates with the Spring Boot backend through:

- `GET /api/blogs` - Fetch blog posts
- `POST /api/blogs` - Create new blog post
- `GET /api/blogs/{id}` - Fetch single blog post
- `PUT /api/blogs/{id}` - Update blog post
- `DELETE /api/blogs/{id}` - Delete blog post (admin only)

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Static Hosting

The built application can be deployed to any static hosting service like:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.