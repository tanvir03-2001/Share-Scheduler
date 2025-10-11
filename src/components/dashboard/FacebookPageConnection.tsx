'use client';

import { apiClient, FacebookPage } from '@/lib/api';
import { useEffect, useState } from 'react';

interface FacebookPageConnectionProps {
    onPagesConnected?: (pages: FacebookPage[]) => void;
}

export default function FacebookPageConnection({ onPagesConnected }: FacebookPageConnectionProps) {
    const [connectedPages, setConnectedPages] = useState<FacebookPage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    // Load connected pages on component mount
    useEffect(() => {
        loadConnectedPages();
    }, []);

    const loadConnectedPages = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.getConnectedFacebookPages();
            
            if (response.success && response.data) {
                setConnectedPages(response.data.pages);
                onPagesConnected?.(response.data.pages);
            } else {
                setError(response.error || 'Failed to load connected pages');
            }
        } catch (err) {
            setError('Failed to load connected pages');
            console.error('Error loading connected pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnectPages = async () => {
        try {
            setIsConnecting(true);
            setError(null);
            
            const response = await apiClient.generateFacebookAuthUrl();
            
            if (response.success && response.data) {
                // Redirect to Facebook OAuth
                window.location.href = response.data.authUrl;
            } else {
                setError(response.error || 'Failed to generate Facebook auth URL');
            }
        } catch (err) {
            setError('Failed to connect Facebook pages');
            console.error('Error connecting Facebook pages:', err);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleRefreshPages = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiClient.refreshFacebookPages();
            
            if (response.success && response.data) {
                setConnectedPages(response.data.pages);
                onPagesConnected?.(response.data.pages);
            } else {
                setError(response.error || 'Failed to refresh pages');
            }
        } catch (err) {
            setError('Failed to refresh pages');
            console.error('Error refreshing pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnectPages = async () => {
        if (!confirm('Are you sure you want to disconnect all Facebook pages? This action cannot be undone.')) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await apiClient.disconnectFacebookPages();
            
            if (response.success) {
                setConnectedPages([]);
                onPagesConnected?.([]);
            } else {
                setError(response.error || 'Failed to disconnect pages');
            }
        } catch (err) {
            setError('Failed to disconnect pages');
            console.error('Error disconnecting pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatFollowersCount = (count?: number) => {
        if (!count) return 'N/A';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Facebook Pages</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Connect your Facebook pages to manage and schedule posts
                    </p>
                </div>
                <div className="flex gap-3">
                    {connectedPages.length > 0 && (
                        <>
                            <button
                                onClick={handleRefreshPages}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Refreshing...' : 'Refresh'}
                            </button>
                            <button
                                onClick={handleDisconnectPages}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                Disconnect All
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {connectedPages.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Facebook pages connected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Connect your Facebook pages to start managing and scheduling posts.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleConnectPages}
                            disabled={isConnecting}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isConnecting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Connect Facebook Pages
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {connectedPages.map((page) => (
                            <div key={page.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-3">
                                    {page.picture ? (
                                        <img
                                            src={page.picture}
                                            alt={page.name}
                                            className="h-12 w-12 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                            <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">
                                            {page.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {page.category}
                                        </p>
                                        <div className="mt-2 flex items-center text-xs text-gray-500">
                                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                            </svg>
                                            {formatFollowersCount(page.followersCount)} followers
                                        </div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            Connected {formatDate(page.connectedAt)}
                                        </div>
                                    </div>
                                </div>
                                {page.tasks && page.tasks.length > 0 && (
                                    <div className="mt-3">
                                        <div className="flex flex-wrap gap-1">
                                            {page.tasks.slice(0, 3).map((task, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {task}
                                                </span>
                                            ))}
                                            {page.tasks.length > 3 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    +{page.tasks.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={handleConnectPages}
                            disabled={isConnecting}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isConnecting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg className="-ml-1 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Connect More Pages
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
