// API Configuration and Helper Functions
// This file contains the API integration layer for authentication

import { RetryUtil } from './retry.util';

// Configure API base URL for separate frontend/backend hosting
const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // In browser, check if we're in production
        const host = window.location.hostname;
        const protocol = window.location.protocol;

        // Check if we're in production (Vercel deployment)
        if (host.includes('vercel.app') || host.includes('netlify.app') || process.env.NODE_ENV === 'production') {
            // In production, use the separate backend URL
            // Replace this with your actual backend Vercel URL
            return process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-app.vercel.app/api';
        } else {
            // In development, use HTTP with port 5000 //
            const port = '5000';
            return `http://${host}:${port}/api`;
        }
    }
    // Fallback for server-side rendering
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

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

interface FacebookUser {
    facebookId: string
    facebookName: string
    facebookEmail?: string
    profilePicture?: string
    connectedAt: string
}

interface FacebookPage {
    pageId: string
    pageName: string
    category: string
    picture?: string
    followersCount?: number
    isDefaultActive: boolean
    connectedAt: string
}

interface FacebookConnectionStatus {
    isConnected: boolean
    facebookUser: FacebookUser | null
    pages: FacebookPage[]
    totalPages: number
}

interface FacebookPagesResponse {
    pages: FacebookPage[]
    totalPages: number
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

        return RetryUtil.executeWithRetry(async () => {
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
        }, {
            maxRetries: 2,
            baseDelay: 1000,
            retryCondition: (error) => {
                // Retry on network errors only
                return RetryUtil.isNetworkError(error);
            }
        }).catch((error) => {
            // If all retries failed, return a user-friendly error
            return {
                success: false,
                error: RetryUtil.getUserFriendlyErrorMessage(error),
            }
        });
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

    // Facebook API methods
    async generateFacebookUserAuthUrl(reconnect: boolean = false): Promise<ApiResponse<{ authUrl: string }>> {
        const url = reconnect ? '/facebook/user/auth-url?reconnect=true' : '/facebook/user/auth-url';
        return this.request<{ authUrl: string }>(url, {
            method: 'GET',
        })
    }

    async generateFacebookPageAuthUrl(): Promise<ApiResponse<{ authUrl: string }>> {
        return this.request<{ authUrl: string }>('/facebook/page/auth-url', {
            method: 'GET',
        })
    }

    async getFacebookConnectionStatus(): Promise<ApiResponse<FacebookConnectionStatus>> {
        return this.request<FacebookConnectionStatus>('/facebook/status', {
            method: 'GET',
        })
    }

    async getConnectedFacebookPages(): Promise<ApiResponse<FacebookPagesResponse>> {
        return this.request<FacebookPagesResponse>('/facebook/pages', {
            method: 'GET',
        })
    }

    async refreshFacebookPages(): Promise<ApiResponse<FacebookPagesResponse>> {
        return this.request<FacebookPagesResponse>('/facebook/pages/refresh', {
            method: 'POST',
        })
    }

    async disconnectFacebookPages(): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/facebook/pages/disconnect', {
            method: 'DELETE',
        })
    }

    async disconnectFacebookUser(): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>('/facebook/user/disconnect', {
            method: 'DELETE',
        })
    }

    async getPageAccessToken(pageId: string): Promise<ApiResponse<{ pageId: string; accessToken: string; pageName: string }>> {
        return this.request<{ pageId: string; accessToken: string; pageName: string }>(`/facebook/pages/${pageId}/access-token`, {
            method: 'GET',
        })
    }

    async getFacebookAppInfo(): Promise<ApiResponse<{ appId: string; redirectUri: string; scopes: string[] }>> {
        return this.request<{ appId: string; redirectUri: string; scopes: string[] }>('/facebook/app-info', {
            method: 'GET',
        })
    }

    async setActiveFacebookPage(pageId: string): Promise<ApiResponse<{ pageId: string; pageName: string; message: string }>> {
        return this.request<{ pageId: string; pageName: string; message: string }>(`/facebook/pages/${pageId}/set-active`, {
            method: 'PUT',
        })
    }

    // Instagram/Reels API methods
    async getInstagramAccounts(pageId: string): Promise<ApiResponse<{ pageId: string; pageName: string; instagramAccounts: any[] }>> {
        return this.request<{ pageId: string; pageName: string; instagramAccounts: any[] }>(`/facebook/pages/${pageId}/instagram-accounts`, {
            method: 'GET',
        })
    }

    async uploadInstagramReel(data: { instagramAccountId: string; videoUrl: string; caption?: string }): Promise<ApiResponse<{ mediaId: string; instagramAccountId: string; caption?: string }>> {
        return this.request<{ mediaId: string; instagramAccountId: string; caption?: string }>('/facebook/instagram/reel/upload', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async uploadInstagramPhoto(data: { instagramAccountId: string; imageUrl: string; caption?: string }): Promise<ApiResponse<{ mediaId: string; instagramAccountId: string; caption?: string }>> {
        return this.request<{ mediaId: string; instagramAccountId: string; caption?: string }>('/facebook/instagram/photo/upload', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getInstagramMediaInsights(mediaId: string): Promise<ApiResponse<{ mediaId: string; insights: any }>> {
        return this.request<{ mediaId: string; insights: any }>(`/facebook/instagram/media/${mediaId}/insights`, {
            method: 'GET',
        })
    }

    async getInstagramAccountInsights(instagramAccountId: string): Promise<ApiResponse<{ instagramAccountId: string; insights: any }>> {
        return this.request<{ instagramAccountId: string; insights: any }>(`/facebook/instagram/account/${instagramAccountId}/insights`, {
            method: 'GET',
        })
    }

    // Content API methods
    async createContent(data: {
        postType: string;
        content: string;
        hashtags?: string;
        platforms: string[];
        publishMode: 'now' | 'schedule';
        scheduleDate?: string;
        scheduleTimes?: string[];
    }, files?: File[]): Promise<ApiResponse<{ contentId: string; scheduledPosts?: any[] }>> {
        const formData = new FormData();

        // Add text data
        formData.append('postType', data.postType);
        formData.append('content', data.content);
        formData.append('platforms', JSON.stringify(data.platforms));
        formData.append('publishMode', data.publishMode);

        if (data.hashtags) {
            formData.append('hashtags', data.hashtags);
        }

        if (data.publishMode === 'schedule') {
            if (data.scheduleDate) {
                formData.append('scheduleDate', data.scheduleDate);
            }
            if (data.scheduleTimes) {
                formData.append('scheduleTimes', JSON.stringify(data.scheduleTimes));
            }
        }

        // Add files if provided
        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('mediaFiles', file);
            });
        }

        const url = `${this.baseURL}/content`;

        return RetryUtil.executeWithRetry(async () => {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const responseData = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: responseData.message || 'Failed to create content',
                    message: responseData.message,
                };
            }

            return {
                success: responseData.success,
                data: responseData.data,
                message: responseData.message,
            };
        }, {
            maxRetries: 2,
            baseDelay: 1000,
            retryCondition: (error) => RetryUtil.isNetworkError(error)
        }).catch((error) => ({
            success: false,
            error: RetryUtil.getUserFriendlyErrorMessage(error),
        }));
    }

    async updateContent(contentId: string, data: {
        content?: string;
        hashtags?: string;
        platforms?: string[];
        publishMode?: 'now' | 'schedule';
        scheduleDate?: string;
        scheduleTimes?: string[];
    }, files?: File[]): Promise<ApiResponse<any>> {
        const formData = new FormData();

        // Add text data
        if (data.content !== undefined) formData.append('content', data.content);
        if (data.hashtags !== undefined) formData.append('hashtags', data.hashtags);
        if (data.platforms !== undefined) formData.append('platforms', JSON.stringify(data.platforms));
        if (data.publishMode !== undefined) formData.append('publishMode', data.publishMode);

        if (data.publishMode === 'schedule') {
            if (data.scheduleDate) {
                formData.append('scheduleDate', data.scheduleDate);
            }
            if (data.scheduleTimes) {
                formData.append('scheduleTimes', JSON.stringify(data.scheduleTimes));
            }
        }

        // Add files if provided
        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('mediaFiles', file);
            });
        }

        const url = `${this.baseURL}/content/${contentId}`;

        return RetryUtil.executeWithRetry(async () => {
            const response = await fetch(url, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });

            const responseData = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: responseData.message || 'Failed to update content',
                    message: responseData.message,
                };
            }

            return {
                success: responseData.success,
                data: responseData.data,
                message: responseData.message,
            };
        }, {
            maxRetries: 2,
            baseDelay: 1000,
            retryCondition: (error) => RetryUtil.isNetworkError(error)
        }).catch((error) => ({
            success: false,
            error: RetryUtil.getUserFriendlyErrorMessage(error),
        }));
    }

    async getUserContent(page: number = 1, limit: number = 10, status?: string, postType?: string): Promise<ApiResponse<any>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status) params.append('status', status);
        if (postType) params.append('postType', postType);

        return this.request(`/content?${params.toString()}`);
    }

    async deleteContent(contentId: string): Promise<ApiResponse<any>> {
        return this.request(`/content/${contentId}`, { method: 'DELETE' });
    }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export types for use in components
export type {
    ApiResponse, AuthResponse, FacebookConnectionStatus, FacebookPage, FacebookPagesResponse, FacebookUser, ForgotPasswordRequest, LoginRequest, OTPRequest, ResendVerificationRequest, ResetPasswordRequest, SignupRequest, UpdateProfileRequest, User, VerifyEmailRequest
};

