'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function FacebookCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const success = searchParams.get('success');
        const error = searchParams.get('error');
        const message = searchParams.get('message');
        const pages = searchParams.get('pages');

        if (error === 'true') {
          setStatus('error');
          setMessage(message || 'Facebook authorization was cancelled or failed.');
          return;
        }

        if (success === 'true') {
          setStatus('success');
          const pagesCount = pages ? parseInt(pages) : 0;
          setMessage(`Successfully connected ${pagesCount} Facebook page(s)!`);
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard/schedule');
          }, 2000);
          return;
        }

        // If no success or error parameter, show loading and redirect
        setStatus('loading');
        setTimeout(() => {
          router.push('/dashboard/schedule');
        }, 1000);

      } catch (err) {
        setStatus('error');
        setMessage('An error occurred while connecting Facebook pages.');
        console.error('Facebook callback error:', err);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Connecting Facebook Pages</h2>
            <p className="text-sm text-gray-600">Please wait while we connect your Facebook pages...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto h-12 w-12 text-green-500 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Success!</h2>
            <p className="text-sm text-gray-600 mb-4">{message}</p>
            <p className="text-xs text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mx-auto h-12 w-12 text-red-500 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Connection Failed</h2>
            <p className="text-sm text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push('/dashboard/schedule')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function FacebookCallbackPage() {
  return (
    <ProtectedRoute>
      <FacebookCallbackContent />
    </ProtectedRoute>
  );
}
