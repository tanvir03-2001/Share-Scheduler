# Test Login Credentials

## Fixed Login Credentials for Testing

The authentication system now includes fixed login credentials for testing purposes. This allows you to test the complete authentication flow without needing a backend server.

### 🔑 Login Credentials

```
Email:    admin@sharescheduler.com
Password: admin123
```

### 🚀 How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the login page:**
   ```
   http://localhost:3000/auth/login
   ```

3. **Use the test credentials:**
   - Enter the email: `admin@sharescheduler.com`
   - Enter the password: `admin123`
   - Click "Sign in"

4. **Alternative - Quick Login:**
   - Click the "Quick Login" button in the blue credentials box
   - This will automatically fill and submit the form

### ✅ What You Can Test

- **Login Flow:** Complete login process with fixed credentials
- **Dashboard Access:** Access to protected dashboard page
- **User Information:** View user details in the dashboard
- **Logout Functionality:** Test logout and session clearing
- **Navigation:** Test authenticated navigation in the navbar
- **Session Persistence:** Refresh the page to test session persistence

### 🔧 Features Included

- **Mock Authentication:** Simulates real authentication without backend
- **Session Management:** Uses cookies to maintain login state
- **User Profile:** Mock user data with verified status
- **Protected Routes:** Dashboard is protected and requires authentication
- **Responsive UI:** Works on all device sizes
- **Error Handling:** Shows appropriate error messages for invalid credentials

### 📱 User Interface

The login page now includes:
- **Credentials Display Box:** Shows the test credentials with copy buttons
- **Quick Login Button:** One-click login for easy testing
- **Form Validation:** Real-time validation feedback
- **Loading States:** Visual feedback during login process
- **Success/Error Messages:** Toast notifications for user feedback

### 🔄 Authentication Flow

```
Login Page → Enter Credentials → Authentication Check → Dashboard
     ↓              ↓                    ↓              ↓
Show Credentials → Quick Login → Mock Token → Protected Content
```

### 🛠️ Technical Details

- **Mock Token:** Generates a mock JWT token for session management
- **Cookie Storage:** Uses secure HTTP-only cookies for token storage
- **User State:** Maintains user information in React Context
- **Route Protection:** Automatically redirects unauthenticated users
- **Session Persistence:** Maintains login state across page refreshes

### 🚨 Important Notes

- These are **test credentials only** - not for production use
- The system will work with any backend once implemented
- Mock authentication is automatically detected and handled
- Real backend integration will override the mock system
- All security features are maintained for production use

### 🔄 Switching to Backend

When you're ready to use a real backend:

1. Implement the backend API endpoints as specified in `BACKEND_API_SPECIFICATION.md`
2. Set the `NEXT_PUBLIC_API_URL` environment variable
3. The system will automatically use the real backend instead of mock authentication

### 🎯 Next Steps

1. Test the login functionality with the provided credentials
2. Explore the dashboard and protected routes
3. Test logout and session management
4. Implement your backend API when ready
5. Customize the user interface as needed

---

**Happy Testing! 🎉**

Use these credentials to explore the complete authentication system and see how it works before implementing your backend server.
