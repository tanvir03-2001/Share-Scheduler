# Backend API Specification for Authentication System

## Overview
This document outlines the required backend API endpoints for the ShareScheduler authentication system. The backend should be implemented as a separate server (Node.js/Express, Python/Django, etc.) and handle all authentication logic, database operations, and security measures.

## Base URL
```
http://localhost:3001/api
```

## Authentication Endpoints

### 1. User Registration
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (Success - 201)**
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email.",
  "data": {
    "userId": "user_123",
    "email": "john@example.com"
  }
}
```

**Response (Error - 400)**
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "EMAIL_EXISTS"
}
```

**Validation Rules:**
- Name: 2-50 characters, required
- Email: Valid email format, unique, required
- Password: 8+ characters, 1 uppercase, 1 lowercase, 1 number, required

### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "isVerified": true,
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401)**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

### 3. OTP Verification
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "otp": "123456"
}
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "isVerified": true,
      "avatar": null,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400)**
```json
{
  "success": false,
  "message": "Invalid or expired OTP",
  "error": "INVALID_OTP"
}
```

### 4. Resend OTP
```http
POST /auth/resend-otp
Content-Type: application/json
Authorization: Bearer <token>
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### 5. Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Response (Error - 404)**
```json
{
  "success": false,
  "message": "Email not found",
  "error": "EMAIL_NOT_FOUND"
}
```

### 6. Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_here",
  "password": "NewSecurePass123"
}
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Response (Error - 400)**
```json
{
  "success": false,
  "message": "Invalid or expired reset token",
  "error": "INVALID_TOKEN"
}
```

### 7. Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response (Success - 200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "isVerified": true,
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

**Response (Error - 401)**
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}
```

### 8. Update Profile
```http
PUT /auth/profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "John Smith",
  "bio": "Software Developer",
  "company": "Tech Corp",
  "website": "https://johnsmith.com",
  "avatar": "data:image/jpeg;base64,..."
}
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Smith",
      "email": "john@example.com",
      "isVerified": true,
      "bio": "Software Developer",
      "company": "Tech Corp",
      "website": "https://johnsmith.com",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  }
}
```

### 9. Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

**Response (Success - 200)**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url VARCHAR(500),
  bio TEXT,
  company VARCHAR(100),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### OTP Table
```sql
CREATE TABLE otps (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  code VARCHAR(6) NOT NULL,
  type ENUM('email_verification', 'password_reset') NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Password Reset Tokens Table
```sql
CREATE TABLE password_reset_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Requirements

### Password Hashing
- Use bcrypt with salt rounds of 12+
- Never store plain text passwords
- Implement password history to prevent reuse

### JWT Token Configuration
```javascript
{
  algorithm: 'HS256',
  expiresIn: '7d',
  issuer: 'sharescheduler.com',
  audience: 'sharescheduler-users'
}
```

### Rate Limiting
- Login attempts: 5 per 15 minutes per IP
- Signup attempts: 3 per hour per IP
- OTP requests: 3 per hour per user
- Password reset: 3 per hour per email

### Email Service Integration
- Use services like SendGrid, AWS SES, or Nodemailer
- HTML email templates for OTP and password reset
- Email delivery tracking and error handling

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "details": {
    "field": "Specific field error if applicable"
  }
}
```

### Common Error Codes
- `EMAIL_EXISTS` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `INVALID_OTP` - Wrong or expired OTP
- `INVALID_TOKEN` - Invalid or expired JWT
- `EMAIL_NOT_FOUND` - Email doesn't exist
- `RATE_LIMITED` - Too many requests
- `VALIDATION_ERROR` - Input validation failed

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sharescheduler
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sharescheduler
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Service
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@sharescheduler.com

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Sample Implementation (Node.js/Express)

```javascript
// Example route implementation
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    const validation = validateSignupInput({ name, email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
        error: 'VALIDATION_ERROR'
      });
    }
    
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
        error: 'EMAIL_EXISTS'
      });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({
      id: generateUUID(),
      name,
      email,
      password_hash: passwordHash,
      is_verified: false
    });
    
    // Generate and send OTP
    const otp = generateOTP();
    await OTP.create({
      id: generateUUID(),
      user_id: user.id,
      code: otp,
      type: 'email_verification',
      expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });
    
    await sendOTPEmail(email, otp);
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please verify your email.',
      data: {
        userId: user.id,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'INTERNAL_ERROR'
    });
  }
});
```

## Testing

### Unit Tests
- Test all validation functions
- Test password hashing and verification
- Test JWT token generation and verification
- Test OTP generation and validation

### Integration Tests
- Test complete signup flow
- Test login with various scenarios
- Test password reset flow
- Test profile update functionality

### API Tests
- Test all endpoints with valid data
- Test error scenarios and edge cases
- Test rate limiting functionality
- Test authentication middleware

## Deployment Considerations

### Security Checklist
- [ ] HTTPS enabled in production
- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Logging configured for security events

### Performance Optimization
- [ ] Database indexes on frequently queried fields
- [ ] Connection pooling configured
- [ ] Caching for frequently accessed data
- [ ] Email queue for async processing
- [ ] Monitoring and alerting setup

This specification provides a complete foundation for implementing the backend authentication system that will work seamlessly with the frontend components provided.
