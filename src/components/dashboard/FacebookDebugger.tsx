'use client';

import { apiClient } from '@/lib/api';
import { useState } from 'react';

interface DebugInfo {
  environment: {
    hasAppId: boolean;
    hasApiUrl: boolean;
    appId: string;
    apiUrl: string;
  };
  connection: {
    status: 'checking' | 'connected' | 'error' | 'not_connected';
    error?: string;
    userInfo?: any;
    pages?: any[];
  };
  facebookApp: {
    status: 'checking' | 'valid' | 'invalid' | 'error';
    error?: string;
    appInfo?: any;
  };
}

export default function FacebookDebugger() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    environment: {
      hasAppId: false,
      hasApiUrl: false,
      appId: '',
      apiUrl: ''
    },
    connection: {
      status: 'checking'
    },
    facebookApp: {
      status: 'checking'
    }
  });
  const [isDebugging, setIsDebugging] = useState(false);

  const runDiagnostics = async () => {
    setIsDebugging(true);
    
    // Check environment variables
    const envInfo = {
      hasAppId: !!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      hasApiUrl: !!process.env.NEXT_PUBLIC_API_URL,
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'Not set',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'Not set'
    };

    setDebugInfo(prev => ({
      ...prev,
      environment: envInfo
    }));

    // Check Facebook connection status
    try {
      const connectionResponse = await apiClient.getFacebookConnectionStatus();
      setDebugInfo(prev => ({
        ...prev,
        connection: {
          status: connectionResponse.success ? 'connected' : 'not_connected',
          error: connectionResponse.error,
          userInfo: connectionResponse.data?.facebookUser,
          pages: connectionResponse.data?.pages
        }
      }));
    } catch (error: any) {
      setDebugInfo(prev => ({
        ...prev,
        connection: {
          status: 'error',
          error: error.message || 'Failed to check connection status'
        }
      }));
    }

    // Check Facebook app configuration
    try {
      const appResponse = await apiClient.getFacebookAppInfo();
      setDebugInfo(prev => ({
        ...prev,
        facebookApp: {
          status: appResponse.success ? 'valid' : 'invalid',
          error: appResponse.error,
          appInfo: appResponse.data
        }
      }));
    } catch (error: any) {
      setDebugInfo(prev => ({
        ...prev,
        facebookApp: {
          status: 'error',
          error: error.message || 'Failed to check app configuration'
        }
      }));
    }

    setIsDebugging(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'valid':
        return 'text-green-600 bg-green-100';
      case 'error':
      case 'invalid':
        return 'text-red-600 bg-red-100';
      case 'not_connected':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'valid':
        return '✓';
      case 'error':
      case 'invalid':
        return '✗';
      case 'not_connected':
        return '⚠';
      default:
        return '?';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Facebook Connection Debugger</h3>
        <button
          onClick={runDiagnostics}
          disabled={isDebugging}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDebugging ? 'Running Diagnostics...' : 'Run Diagnostics'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Environment Configuration */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Environment Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(debugInfo.environment.hasAppId ? 'valid' : 'invalid')}`}>
                {getStatusIcon(debugInfo.environment.hasAppId ? 'valid' : 'invalid')}
              </span>
              <span className="text-sm text-gray-600">Facebook App ID</span>
            </div>
            <div className="text-sm text-gray-500 font-mono">
              {debugInfo.environment.appId}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(debugInfo.environment.hasApiUrl ? 'valid' : 'invalid')}`}>
                {getStatusIcon(debugInfo.environment.hasApiUrl ? 'valid' : 'invalid')}
              </span>
              <span className="text-sm text-gray-600">API URL</span>
            </div>
            <div className="text-sm text-gray-500 font-mono">
              {debugInfo.environment.apiUrl}
            </div>
          </div>
        </div>

        {/* Facebook Connection Status */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Facebook Connection Status</h4>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(debugInfo.connection.status)}`}>
              {getStatusIcon(debugInfo.connection.status)}
            </span>
            <span className="text-sm text-gray-600 capitalize">
              {debugInfo.connection.status.replace('_', ' ')}
            </span>
          </div>
          
          {debugInfo.connection.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
              <p className="text-sm text-red-600 font-medium">Error:</p>
              <p className="text-sm text-red-500">{debugInfo.connection.error}</p>
            </div>
          )}

          {debugInfo.connection.userInfo && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
              <p className="text-sm text-green-600 font-medium">Connected User:</p>
              <p className="text-sm text-green-500">{debugInfo.connection.userInfo.facebookName}</p>
            </div>
          )}

          {debugInfo.connection.pages && debugInfo.connection.pages.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-600 font-medium">Connected Pages:</p>
              <ul className="text-sm text-blue-500 mt-1">
                {debugInfo.connection.pages.map((page: any, index: number) => (
                  <li key={index}>• {page.pageName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Facebook App Configuration */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Facebook App Configuration</h4>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(debugInfo.facebookApp.status)}`}>
              {getStatusIcon(debugInfo.facebookApp.status)}
            </span>
            <span className="text-sm text-gray-600 capitalize">
              {debugInfo.facebookApp.status}
            </span>
          </div>
          
          {debugInfo.facebookApp.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600 font-medium">Error:</p>
              <p className="text-sm text-red-500">{debugInfo.facebookApp.error}</p>
            </div>
          )}

          {debugInfo.facebookApp.appInfo && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-600 font-medium">App Info:</p>
              <pre className="text-sm text-green-500 mt-1 overflow-x-auto">
                {JSON.stringify(debugInfo.facebookApp.appInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Common Solutions */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Common Solutions</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">1.</span>
              <div>
                <p className="font-medium">Environment Variables Missing:</p>
                <p>Make sure you have created <code className="bg-gray-100 px-1 rounded">.env.local</code> file in client directory with:</p>
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
{`NEXT_PUBLIC_FACEBOOK_APP_ID=your-app-id
NEXT_PUBLIC_API_URL=http://localhost:5000/api`}
                </pre>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">2.</span>
              <div>
                <p className="font-medium">Facebook App Configuration:</p>
                <p>Check your Facebook Developer Console:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>App ID and Secret are correct</li>
                  <li>Redirect URI is set to: <code className="bg-gray-100 px-1 rounded">http://localhost:5000/api/facebook/callback</code></li>
                  <li>App is in Development mode</li>
                  <li>Required permissions are added</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">3.</span>
              <div>
                <p className="font-medium">Server Configuration:</p>
                <p>Make sure your server has the correct environment variables in <code className="bg-gray-100 px-1 rounded">.env</code> file:</p>
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
{`FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/facebook/callback
CLIENT_URL=http://localhost:3000`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
