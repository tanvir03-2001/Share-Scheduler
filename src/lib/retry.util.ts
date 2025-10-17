/**
 * Client-side retry utility for handling API failures and rate limiting
 */

export interface RetryOptions {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    retryCondition?: (error: any) => boolean;
}

export class RetryUtil {
    private static readonly DEFAULT_OPTIONS: Required<RetryOptions> = {
        maxRetries: 3,
        baseDelay: 1000, // 1 second
        maxDelay: 30000, // 30 seconds
        backoffMultiplier: 2,
        retryCondition: (error: any) => {
            // Retry on network errors and transient errors only
            if (error.message) {
                const message = error.message.toLowerCase();
                return (
                    message.includes('temporary') ||
                    message.includes('transient') ||
                    message.includes('network') ||
                    message.includes('timeout') ||
                    message.includes('fetch')
                );
            }
            return false;
        }
    };

    /**
     * Execute a function with retry logic and exponential backoff
     */
    static async executeWithRetry<T>(
        fn: () => Promise<T>,
        options: RetryOptions = {}
    ): Promise<T> {
        const opts = { ...this.DEFAULT_OPTIONS, ...options };
        let lastError: any;

        for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;

                // Don't retry if it's the last attempt or if retry condition is not met
                if (attempt === opts.maxRetries || !opts.retryCondition(error)) {
                    throw error;
                }

                // Calculate delay with exponential backoff and jitter
                const delay = Math.min(
                    opts.baseDelay * Math.pow(opts.backoffMultiplier, attempt) + Math.random() * 1000,
                    opts.maxDelay
                );

                console.log(`Retry attempt ${attempt + 1}/${opts.maxRetries} after ${Math.round(delay)}ms delay. Error: ${error.message}`);

                await this.sleep(delay);
            }
        }

        throw lastError;
    }

    /**
     * Check if an error is a rate limit error (deprecated - no longer used)
     */
    static isRateLimitError(error: any): boolean {
        // Always return false since we removed rate limiting
        return false;
    }

    /**
     * Check if an error is a network error
     */
    static isNetworkError(error: any): boolean {
        if (!error.message) return false;

        const message = error.message.toLowerCase();
        return (
            message.includes('network') ||
            message.includes('timeout') ||
            message.includes('fetch') ||
            message.includes('connection') ||
            message.includes('econnreset') ||
            message.includes('enotfound')
        );
    }

    /**
     * Check if an error is a Facebook API error
     */
    static isFacebookApiError(error: any): boolean {
        if (!error.message) return false;

        const message = error.message.toLowerCase();
        return (
            message.includes('facebook') ||
            message.includes('oauth') ||
            message.includes('application request limit') ||
            message.includes('fbtrace_id')
        );
    }

    /**
     * Get user-friendly error message
     */
    static getUserFriendlyErrorMessage(error: any): string {
        if (!error.message) return 'An unexpected error occurred. Please try again.';

        const message = error.message.toLowerCase();

        // Rate limiting removed - no longer show rate limit messages

        if (this.isNetworkError(error)) {
            return 'Network connection issue. Please check your internet connection and try again.';
        }

        if (this.isFacebookApiError(error)) {
            if (message.includes('application request limit')) {
                return 'Facebook API rate limit reached. Please wait a few minutes and try again.';
            }
            if (message.includes('oauth')) {
                return 'Facebook authentication error. Please try connecting again.';
            }
            return 'Facebook API error. Please try again in a few minutes.';
        }

        return error.message || 'An unexpected error occurred. Please try again.';
    }

    /**
     * Sleep for specified milliseconds
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

