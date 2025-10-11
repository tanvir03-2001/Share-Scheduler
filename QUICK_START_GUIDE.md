# 🚀 Quick Start Guide

## ✅ Environment Files Created!

আমি আপনার জন্য environment files তৈরি করে দিয়েছি। এখন server start হবে।

## 📁 Created Files:

### Backend Environment (`server/.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/facebook-auto-post

# JWT Configuration
JWT_SECRET=temp-jwt-secret-change-in-production
JWT_REFRESH_SECRET=temp-refresh-secret-change-in-production
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Client Configuration
CLIENT_URL=http://localhost:3000

# Facebook App Configuration (Temporary - Replace with real values)
FACEBOOK_APP_ID=temp-facebook-app-id
FACEBOOK_APP_SECRET=temp-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/facebook/callback

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourapp.com
```

### Frontend Environment (`client/.env.local`):
```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🔧 Next Steps:

### 1. Server Start করুন:
```bash
cd server
npm run dev
```

### 2. Client Start করুন (নতুন terminal এ):
```bash
cd client
npm run dev
```

### 3. Facebook App Setup করুন:

#### Facebook Developer App তৈরি করুন:
1. [Facebook Developers](https://developers.facebook.com/) এ যান
2. "Create App" বাটনে ক্লিক করুন
3. "Consumer" type select করুন
4. App name দিন
5. App ID এবং App Secret copy করুন

#### Environment Variables Update করুন:
`server/.env` file এ:
```env
FACEBOOK_APP_ID=your-real-facebook-app-id
FACEBOOK_APP_SECRET=your-real-facebook-app-secret
```

#### Facebook App Configuration:
1. Facebook Login product যোগ করুন
2. Valid OAuth Redirect URIs এ যোগ করুন:
   ```
   http://localhost:5000/api/facebook/callback
   ```
3. Required permissions add করুন:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
   - `pages_manage_metadata`
   - `pages_read_user_content`

## 🎯 Test করুন:

1. Browser এ `http://localhost:3000` এ যান
2. Sign up/Login করুন
3. Dashboard > Schedule page এ যান
4. "Connect Facebook Pages" বাটনে ক্লিক করুন
5. Facebook authorization complete করুন

## 🚨 Important Notes:

1. **Temporary values** এখন server start করার জন্য আছে
2. **Real Facebook App** তৈরি করে actual values replace করুন
3. **MongoDB** running আছে কিনা check করুন
4. **Ports** 3000 এবং 5000 available আছে কিনা check করুন

## 🆘 Troubleshooting:

### যদি Server Start না হয়:
1. MongoDB running আছে কিনা check করুন
2. Port 5000 available আছে কিনা check করুন
3. Node modules install আছে কিনা: `npm install`

### যদি Client Start না হয়:
1. Port 3000 available আছে কিনা check করুন
2. Node modules install আছে কিনা: `npm install`

### যদি Facebook Connection কাজ না করে:
1. Facebook App ID এবং Secret সঠিক আছে কিনা
2. Redirect URI Facebook app এ set আছে কিনা
3. Required permissions add আছে কিনা

## 📞 Support:

যদি কোনো সমস্যা হয়:
1. Error messages check করুন
2. Console logs দেখুন
3. Facebook app configuration verify করুন

---

**🎉 এখন আপনার server start হবে এবং Facebook integration ready!**
