# Authentication Flow Diagram

## Complete User Authentication Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │    │   Sign Up       │    │   Login         │
│                 │    │   Form          │    │   Form          │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │                      ▼                      │
          │              ┌─────────────────┐            │
          │              │  Backend API    │            │
          │              │  /auth/signup   │            │
          │              └─────────┬───────┘            │
          │                        │                    │
          │                        ▼                    │
          │              ┌─────────────────┐            │
          │              │  Email OTP      │            │
          │              │  Sent           │            │
          │              └─────────┬───────┘            │
          │                        │                    │
          │                        ▼                    │
          │              ┌─────────────────┐            │
          │              │  OTP            │            │
          │              │  Verification   │            │
          │              └─────────┬───────┘            │
          │                        │                    │
          │                        ▼                    │
          │              ┌─────────────────┐            │
          │              │  Profile        │            │
          │              │  Setup          │            │
          │              │  (Optional)     │            │
          │              └─────────┬───────┘            │
          │                        │                    │
          │                        ▼                    │
          │              ┌─────────────────┐            │
          │              │  Dashboard      │            │
          │              │  (Protected)    │            │
          │              └─────────────────┘            │
          │                                             │
          │                      ┌─────────────────────┘
          │                      │
          │                      ▼
          │              ┌─────────────────┐
          │              │  Backend API    │
          │              │  /auth/login    │
          │              └─────────┬───────┘
          │                        │
          │                        ▼
          │              ┌─────────────────┐
          │              │  JWT Token      │
          │              │  Generated      │
          │              └─────────┬───────┘
          │                        │
          │                        ▼
          └─────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  Dashboard      │
              │  (Protected)    │
              └─────────────────┘
```

## Password Reset Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Forgot         │    │  Email          │    │  Reset          │
│  Password       │    │  Link           │    │  Password       │
│  Form           │    │  Clicked        │    │  Form           │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Backend API    │    │  Token          │    │  Backend API    │
│  /forgot-pwd    │    │  Validation     │    │  /reset-pwd     │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Reset Email    │    │  Valid Token    │    │  Password       │
│  Sent           │    │  Confirmed      │    │  Updated        │
└─────────────────┘    └─────────────────┘    └─────────┬───────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │  Login          │
                                              │  Redirect       │
                                              └─────────────────┘
```

## Navigation Flow

```
┌─────────────────┐
│  App Start      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Auth Check     │
│  (Token Valid?) │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌───────┐  ┌─────────┐
│  Yes  │  │   No    │
└───┬───┘  └────┬────┘
    │           │
    ▼           ▼
┌───────┐  ┌─────────┐
│Dashboard│ │ Login   │
│        │ │ Page    │
└────────┘ └─────────┘
```

## Component Hierarchy

```
App (Layout)
├── AuthProvider (Context)
│   ├── Navbar (Conditional Auth UI)
│   ├── Main Content
│   │   ├── Public Pages
│   │   │   ├── Home
│   │   │   ├── Features
│   │   │   └── Pricing
│   │   └── Auth Pages
│   │       ├── Login
│   │       ├── Signup
│   │       ├── OTP Verification
│   │       ├── Forgot Password
│   │       ├── Reset Password
│   │       └── Profile Setup
│   └── Protected Pages
│       └── Dashboard (ProtectedRoute)
└── Toaster (Notifications)
```

## State Management Flow

```
AuthContext State:
├── user: User | null
├── isLoading: boolean
├── isAuthenticated: boolean
└── Methods:
    ├── login()
    ├── signup()
    ├── logout()
    ├── verifyOTP()
    ├── forgotPassword()
    ├── resetPassword()
    ├── resendOTP()
    └── updateProfile()
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
├─────────────────────────────────────────────────────────┤
│ 1. Client-Side Validation                               │
│    ├── Form validation with react-hook-form            │
│    ├── Password strength requirements                   │
│    └── Email format validation                         │
├─────────────────────────────────────────────────────────┤
│ 2. API Layer Security                                   │
│    ├── HTTPS requests only                             │
│    ├── Request/response validation                      │
│    └── Error handling and sanitization                 │
├─────────────────────────────────────────────────────────┤
│ 3. Token Management                                     │
│    ├── JWT tokens with expiration                      │
│    ├── Secure cookie storage                           │
│    └── Automatic token refresh                         │
├─────────────────────────────────────────────────────────┤
│ 4. Backend Security (Server-side)                      │
│    ├── Password hashing (bcrypt)                       │
│    ├── Rate limiting                                   │
│    ├── CSRF protection                                 │
│    └── Input sanitization                              │
└─────────────────────────────────────────────────────────┘
```
