'use client';
 
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global Error:', error);
  }, [error]);
 
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-lg w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Application Error
              </h1>
              <div className="text-gray-600 mb-6">
                {process.env.NODE_ENV === 'development' && (
                  <div className="text-left p-4 bg-gray-100 rounded-lg mb-4 overflow-auto">
                    <p className="font-mono text-sm">
                      {error.message || 'A critical error occurred'}
                    </p>
                    <p className="font-mono text-sm mt-2 text-gray-500">
                      {error.digest && `Error Digest: ${error.digest}`}
                    </p>
                  </div>
                )}
                <p>
                  We apologize, but something went seriously wrong. Our team has been notified.
                </p>
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => reset()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}