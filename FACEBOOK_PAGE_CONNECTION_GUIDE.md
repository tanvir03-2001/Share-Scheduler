# Facebook Page Connection System

This guide provides details for connecting Facebook Pages with the Facebook Developer App.

## 🚀 Features

- ✅ Facebook OAuth 2.0 authentication
- ✅ Multiple Facebook pages connection
- ✅ Page access token management
- ✅ Auto post permissions
- ✅ Page insights and analytics
- ✅ Token verification and refresh
- ✅ Secure user authentication
- ✅ Modern React frontend
- ✅ Express.js backend with TypeScript

## 📋 Prerequisites

1. **Facebook Developer Account**: https://developers.facebook.com/
2. **Node.js** (v16 or higher)
3. **MongoDB** database
4. **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd facebook-auto-post
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/facebook-auto-post

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourapp.com

# Facebook App Configuration
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/facebook/auth/callback

# Security
BCRYPT_ROUNDS=12
```

## 🔧 Facebook Developer App Setup

### 1. Create Facebook App
1. Go to Facebook Developer Console: https://developers.facebook.com/
2. Click "Create App"
3. Select App Type: "Business"
4. Enter App Name and Contact Email

### 2. Configure Facebook Login
1. Click "Add Product" in App Dashboard
2. Add "Facebook Login"
3. Go to "Settings" → "Facebook Login" → "Valid OAuth Redirect URIs" and add:
   ```
   http://localhost:5000/api/facebook/auth/callback
   ```

### 3. App Review & Permissions
Go to App Review and request these permissions:

**Required Permissions:**
- `pages_manage_posts` - Post to pages
- `pages_read_engagement` - Read page engagement
- `pages_show_list` - Show user's pages
- `pages_manage_metadata` - Manage page metadata
- `pages_read_user_content` - Read user content
- `pages_manage_ads` - Manage page ads
- `pages_manage_instant_articles` - Manage instant articles
- `pages_messaging` - Page messaging
- `pages_messaging_subscriptions` - Messaging subscriptions
- `pages_manage_events` - Manage page events
- `pages_read_insights` - Read page insights

### 4. Get App Credentials
1. Go to App Dashboard → "Settings" → "Basic"
2. Copy **App ID** and **App Secret**
3. Add to environment variables

## 🚀 Running the Application

### 1. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 2. Start Backend Server
```bash
cd server
npm run dev
```
Server will run on: http://localhost:5000

### 3. Start Frontend
```bash
cd client
npm run dev
```
Frontend will run on: http://localhost:3000

## 📱 How to Use

### 1. User Registration/Login
1. Sign up/login on the frontend
2. Complete email verification

### 2. Connect Facebook Page
1. Go to Dashboard → Schedule page
2. Click "Add Page" button
3. Facebook OAuth popup will open
4. Login to Facebook and grant permissions
5. Your pages will be automatically connected

### 3. Manage Connected Pages
- View connected pages in the dashboard
- Disconnect pages if needed
- View page insights

## 🔌 API Endpoints

### Public Endpoints
```
GET /api/facebook/auth/url - Generate Facebook OAuth URL
GET /api/facebook/auth/callback - Handle OAuth callback
```

### Protected Endpoints (Authentication Required)
```
GET /api/facebook/pages - Get user's connected pages
DELETE /api/facebook/pages/:pageId - Disconnect a page
POST /api/facebook/pages/:pageId/post - Post to a page
GET /api/facebook/pages/:pageId/insights - Get page insights
POST /api/facebook/verify-tokens - Verify and refresh tokens
```

## 🗄️ Database Schema

### User Model
```typescript
{
  email: string
  name: string
  password: string
  role: 'user' | 'admin'
  isEmailVerified: boolean
  facebookConnected: boolean
  facebookConnectedAt?: Date
  // ... other fields
}
```

### FacebookPage Model
```typescript
{
  pageId: string
  pageName: string
  category: string
  accessToken: string
  userAccessToken: string
  picture?: string
  followersCount?: number
  isActive: boolean
  connectedAt: Date
  lastUsed?: Date
  userId: ObjectId
  permissions: string[]
  expiresAt?: Date
}
```

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcryptjs for password security
3. **CORS Protection**: Configured for specific origins
4. **Helmet**: Security headers
5. **Input Validation**: Express-validator for request validation
6. **Token Verification**: Facebook token validation
7. **State Parameter**: CSRF protection in OAuth flow

## 🎨 Frontend Components

### FacebookPageManager
- Page connection interface
- Connected pages display
- Page management (connect/disconnect)
- Real-time status updates

### Dashboard Integration
- Schedule page এ integrated
- Responsive design
- Loading states
- Error handling

## 🚨 Troubleshooting

### Common Issues

1. **Facebook OAuth Error**
   - Check redirect URI configuration
   - Verify App ID and Secret
   - Ensure permissions are approved

2. **Database Connection Error**
   - Check MongoDB is running
   - Verify connection string
   - Check network connectivity

3. **Token Expired Error**
   - Use token verification endpoint
   - Re-authenticate if needed
   - Check token expiration settings

4. **Permission Denied**
   - Verify Facebook app permissions
   - Check user has admin access to pages
   - Ensure app is in production mode

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm run dev
```

## 📈 Production Deployment

### 1. Environment Variables
Set production environment variables:
- Strong JWT secrets
- Production database URL
- Production Facebook app credentials
- Secure email configuration

### 2. Facebook App Production
- Complete App Review
- Enable production mode
- Update valid OAuth redirect URIs

### 3. Server Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review Facebook Developer documentation

---

**Note**: This system uses Facebook Graph API v18.0. Regular updates may be required for Facebook API changes.
