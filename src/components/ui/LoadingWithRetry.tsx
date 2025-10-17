'use client';

import { RetryUtil } from '@/lib/retry.util';
import React, { useCallback, useState } from 'react';

interface LoadingWithRetryProps {
    onRetry: () => Promise<void>;
    error?: string | null;
    isLoading: boolean;
    children: React.ReactNode;
    maxRetries?: number;
    retryDelay?: number;
}

export default function LoadingWithRetry({
    onRetry,
    error,
    isLoading,
    children,
    maxRetries = 3,
    retryDelay = 2000
}: LoadingWithRetryProps) {
    const [retryCount, setRetryCount] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = useCallback(async () => {
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);

        try {
            await RetryUtil.executeWithRetry(onRetry, {
                maxRetries: 0, // We handle retries manually
                baseDelay: retryDelay
            });
        } catch (error) {
            console.error('Retry failed:', error);
        } finally {
            setIsRetrying(false);
        }
    }, [onRetry, retryDelay]);

    const canRetry = retryCount < maxRetries && !isLoading && !isRetrying;
    const isRetryableError = error && (
        RetryUtil.isRateLimitError({ message: error }) ||
        RetryUtil.isNetworkError({ message: error }) ||
        RetryUtil.isFacebookApiError({ message: error })
    );

    if (isLoading || isRetrying) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-sm text-gray-600">
                    {isRetrying ? 'Retrying...' : 'Loading...'}
                </p>
                {isRetrying && retryCount > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                        Attempt {retryCount + 1} of {maxRetries + 1}
                    </p>
                )}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className="mx-auto h-12 w-12 text-red-500 mb-4">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
                <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                    {RetryUtil.getUserFriendlyErrorMessage({ message: error })}
                </p>
                
                {isRetryableError && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md max-w-md">
                        <p className="text-sm text-yellow-800">
                            <strong>This appears to be a temporary issue.</strong> You can try again.
                        </p>
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                    {canRetry && (
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRetrying ? 'Retrying...' : 'Try Again'}
                        </button>
                    )}
                    
                    {!canRetry && retryCount >= maxRetries && (
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">
                                Maximum retry attempts reached.
                            </p>
                            <button
                                onClick={() => {
                                    setRetryCount(0);
                                    handleRetry();
                                }}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Reset and Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

