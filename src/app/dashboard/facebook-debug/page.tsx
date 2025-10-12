'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FacebookDebugger from '@/components/dashboard/FacebookDebugger';

export default function FacebookDebugPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Facebook Connection Debugger</h1>
            <p className="mt-2 text-gray-600">
              Use this tool to diagnose Facebook app connection issues and verify your configuration.
            </p>
          </div>
          
          <FacebookDebugger />
        </div>
      </div>
    </ProtectedRoute>
  );
}
