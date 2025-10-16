'use client';

import { apiClient, FacebookConnectionStatus, FacebookPage } from '@/lib/api';
import { AlertCircle, CheckCircle, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FacebookBusinessConnectionProps {
    onPagesConnected?: (pages: FacebookPage[]) => void;
    showTitle?: boolean;
    compact?: boolean;
}

export default function FacebookBusinessConnection({ 
    onPagesConnected, 
    showTitle = true, 
    compact = false 
}: FacebookBusinessConnectionProps) {
    const [connectionStatus, setConnectionStatus] = useState<FacebookConnectionStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    // Load connection status on component mount
    useEffect(() => {
        loadConnectionStatus();
    }, []);

    const loadConnectionStatus = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.getFacebookConnectionStatus();
            
            if (response.success && response.data) {
                setConnectionStatus(response.data);
                onPagesConnected?.(response.data.pages);
            } else {
                setError(response.error || 'Failed to load connection status');
            }
        } catch (err) {
            setError('Failed to load connection status');
            console.error('Error loading connection status:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnectFacebook = async () => {
        try {
            setIsConnecting(true);
            setError(null);
            
            // Use Facebook Business OAuth for user login
            const response = await apiClient.generateFacebookUserAuthUrl();
            
            if (response.success && response.data) {
                // Redirect to Facebook Business OAuth
                window.location.href = response.data.authUrl;
            } else {
                setError(response.error || 'Failed to generate Facebook auth URL');
            }
        } catch (err) {
            setError('Failed to connect Facebook account');
            console.error('Error connecting Facebook:', err);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleReconnectFacebook = async () => {
        try {
            setIsConnecting(true);
            setError(null);
            
            // Use Facebook Business OAuth for user reconnection
            const response = await apiClient.generateFacebookUserAuthUrl(true);
            
            if (response.success && response.data) {
                // Redirect to Facebook Business OAuth for reconnection
                window.location.href = response.data.authUrl;
            } else {
                setError(response.error || 'Failed to generate Facebook reconnect URL');
            }
        } catch (err) {
            setError('Failed to reconnect Facebook account');
            console.error('Error reconnecting Facebook:', err);
        } finally {
            setIsConnecting(false);
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

    if (compact) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                {!connectionStatus?.isConnected ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Facebook className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Facebook Account</h3>
                                <p className="text-xs text-gray-500">Not connected</p>
                            </div>
                        </div>
                        <button
                            onClick={handleConnectFacebook}
                            disabled={isConnecting}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isConnecting ? 'Connecting...' : 'Connect'}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Facebook Account</h3>
                                <p className="text-xs text-gray-500">
                                    {connectionStatus.pages.length} page(s) connected
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleReconnectFacebook}
                                disabled={isConnecting}
                                className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isConnecting ? 'Reconnecting...' : 'Reconnect'}
                            </button>
                            <span className="text-xs text-green-600 font-medium">Connected</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {showTitle && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Facebook Business Integration</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Connect your Facebook Business account to manage and schedule posts
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {!connectionStatus?.isConnected ? (
                <div className="text-center py-8">
                    <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Facebook className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Facebook Business Account</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Connect your Facebook Business account to start managing and scheduling posts across all your pages.
                    </p>
                    <button
                        onClick={handleConnectFacebook}
                        disabled={isConnecting}
                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
                                <Facebook className="-ml-1 mr-2 h-5 w-5" />
                                Connect Facebook Business Account
                            </>
                        )}
                    </button>
                    <p className="text-xs text-gray-400 mt-3">
                        We'll only access your business pages, not your personal profile
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Facebook User Info */}
                    {connectionStatus.facebookUser && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                {connectionStatus.facebookUser.profilePicture ? (
                                    <img
                                        src={connectionStatus.facebookUser.profilePicture}
                                        alt={connectionStatus.facebookUser.facebookName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                                        <Facebook className="h-6 w-6 text-green-600" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-green-900">
                                        {connectionStatus.facebookUser.facebookName}
                                    </h3>
                                    <p className="text-xs text-green-700">
                                        Connected {formatDate(connectionStatus.facebookUser.connectedAt)}
                                    </p>
                                </div>
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    )}

                    {/* Facebook Pages */}
                    {connectionStatus.pages.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                                Connected Pages ({connectionStatus.pages.length})
                            </h3>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {connectionStatus.pages.map((page) => (
                                    <div key={page.pageId} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            {page.picture ? (
                                                <img
                                                    src={page.picture}
                                                    alt={page.pageName}
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <Facebook className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {page.pageName}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {page.category}
                                                </p>
                                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                                    <span>{formatFollowersCount(page.followersCount)} followers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center pt-4 space-x-3">
                        <button
                            onClick={handleReconnectFacebook}
                            disabled={isConnecting}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isConnecting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Reconnecting...
                                </>
                            ) : (
                                <>
                                    <Facebook className="-ml-1 mr-2 h-4 w-4" />
                                    Reconnect Account
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleConnectFacebook}
                            disabled={isConnecting}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <Facebook className="-ml-1 mr-2 h-4 w-4" />
                            Add More Pages
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
