'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (!response.ok) {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">System Settings</h2>
            <p className="text-gray-600">Configure system parameters and settings</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Logs</h2>
            <p className="text-gray-600">View system and application logs</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">API Keys</h2>
            <p className="text-gray-600">Manage API keys and access tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
}