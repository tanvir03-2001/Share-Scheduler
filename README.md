# Facebook Auto Post - Client

This is the frontend application for the Facebook Auto Post service, built with Next.js, React, and TypeScript.

## 🚀 Features

- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Login, registration, and profile management
- **Facebook Integration**: Connect Facebook pages and manage posts
- **Dashboard**: Comprehensive dashboard for managing auto-posts
- **Real-time Updates**: Live notifications and status updates
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running (see server README)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` file with your configuration:
   - Set the API URL to your backend server

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Other Commands
```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                  # Next.js 13+ app directory
│   │   ├── auth/            # Authentication pages
│   │   │   ├── login/       # Login page
│   │   │   ├── signup/      # Registration page
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   ├── verify-email/
│   │   │   └── verify-otp/
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── privacy/         # Privacy policy
│   │   ├── terms/           # Terms of service
│   │   ├── data-deletion/   # Data deletion request
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── ui/             # UI components (Modal, Tooltip, etc.)
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   └── ...             # Other components
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Authentication context
│   │   └── SidebarContext.tsx # Sidebar state context
│   └── lib/                # Utility libraries
│       └── api.ts          # API client functions
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── package.json
```

## 🎨 UI Components

### Authentication Components
- **LoginForm**: User login with email/password
- **SignupForm**: User registration
- **ForgotPasswordForm**: Password reset request
- **ResetPasswordForm**: Password reset with token
- **VerifyEmailForm**: Email verification
- **VerifyOTPForm**: OTP verification

### Dashboard Components
- **DashboardLayout**: Main dashboard layout
- **Sidebar**: Navigation sidebar
- **StatsCard**: Statistics display cards
- **PostScheduler**: Post scheduling interface
- **FacebookPages**: Facebook pages management
- **PostHistory**: Post history and analytics

### UI Components
- **Modal**: Reusable modal component
- **Tooltip**: Tooltip component
- **UploadModal**: File upload modal
- **CTA**: Call-to-action component

## 🔐 Authentication Flow

1. **Registration**: User creates account with email/password
2. **Email Verification**: User verifies email address
3. **Login**: User logs in with credentials
4. **Facebook Connection**: User connects Facebook account
5. **Dashboard Access**: User accesses main dashboard

## 🎯 Key Features

### Dashboard
- **Overview**: Statistics and recent activity
- **Post Management**: Create, schedule, and manage posts
- **Facebook Pages**: Connect and manage Facebook pages
- **Analytics**: Post performance and engagement metrics
- **Settings**: Account and application settings

### Post Scheduling
- **Content Creation**: Rich text editor for post content
- **Scheduling**: Set specific times for posts
- **Media Upload**: Upload images and videos
- **Preview**: Preview posts before publishing
- **Bulk Operations**: Manage multiple posts

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Set environment variables

### Manual Deployment
1. Build the application: `npm run build`
2. Export static files: `npm run export` (if needed)
3. Deploy to your hosting provider

## 🎨 Styling

The application uses **Tailwind CSS** for styling with:
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic dark/light mode support
- **Custom Components**: Reusable UI components
- **Animations**: Smooth transitions and hover effects
- **Typography**: Consistent font hierarchy

## 🔧 Configuration

### Next.js Configuration
- **App Router**: Using Next.js 13+ app directory
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing

### Tailwind Configuration
- **Custom Colors**: Brand-specific color palette
- **Responsive Breakpoints**: Mobile, tablet, desktop
- **Custom Utilities**: Project-specific utility classes

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Verify all imports are correct
   - Ensure environment variables are set

2. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check if backend server is running
   - Verify CORS settings on backend

3. **Authentication Issues**
   - Check JWT token handling
   - Verify API endpoints are working
   - Check browser console for errors

4. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS
   - Ensure responsive classes are applied

## 📱 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
