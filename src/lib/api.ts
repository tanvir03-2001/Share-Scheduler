// API Configuration and Helper Functions
// This file contains the API integration layer for authentication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface ApiResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

interface LoginRequest {
    email: string
    password: string
}

interface SignupRequest {
    name: string
    email: string
    password: string
    acceptPrivacyPolicy: boolean
}

interface User {
    id: string
    name: string
    email: string
    role: string
    isEmailVerified: boolean
    createdAt: string
    updatedAt: string
}

interface AuthResponse {
    user: User
    accessToken: string
    refreshToken: string
}

interface OTPRequest {
    otp: string
}

interface VerifyEmailRequest {
    token: string
}

interface ResendVerificationRequest {
    email: string
}

interface ForgotPasswordRequest {
    email: string
}

interface ResetPasswordRequest {
    token: string
    newPassword: string
}

interface UpdateProfileRequest {
    name?: string
    email?: string
    bio?: string
    company?: string
    website?: string
    avatar?: string
}

class ApiClient {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Include cookies in requests
            ...options,
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || 'An error occurred',
                    message: data.message,
                }
            }

            return {
                success: data.success,
                data: data.data,
                message: data.message,
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Network error',
            }
        }
    }

    // Authentication API methods
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    }

    async signup(userData: SignupRequest): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    }

    async verifyOTP(otpData: OTPRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify(otpData),
        })
    }

    async forgotPassword(emailData: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify(emailData),
        })
    }

    async resetPassword(resetData: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify(resetData),
        })
    }

    async resendOTP(): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/resend-otp', {
            method: 'POST',
        })
    }

    async verifyEmail(tokenData: VerifyEmailRequest): Promise<ApiResponse<{ user: User; message: string }>> {
        return this.request<{ user: User; message: string }>('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify(tokenData),
        })
    }

    async resendVerificationEmail(emailData: ResendVerificationRequest): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/resend-verification', {
            method: 'POST',
            body: JSON.stringify(emailData),
        })
    }

    async verifyToken(token: string): Promise<ApiResponse<User>> {
        return this.request<User>('/auth/profile', {
            method: 'GET',
        })
    }

    async updateProfile(
        profileData: UpdateProfileRequest,
        token: string
    ): Promise<ApiResponse<{ user: User }>> {
        return this.request<{ user: User }>('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        })
    }

    async logout(refreshToken: string): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/auth/logout', {
            method: 'POST',
        })
    }

    async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
        return this.request<{ accessToken: string; refreshToken: string }>('/auth/refresh-token', {
            method: 'POST',
        })
    }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export types for use in components
export type {
    ApiResponse, AuthResponse, ForgotPasswordRequest, LoginRequest, OTPRequest, ResendVerificationRequest, ResetPasswordRequest, SignupRequest, UpdateProfileRequest, User, VerifyEmailRequest
}

