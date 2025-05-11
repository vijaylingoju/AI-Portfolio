'use client';

import { useEffect, useState } from 'react';

interface VisitorStatsProps {
  initialStats?: {
    totalVisits: number;
    lastVisit: string;
  };
}

export default function VisitorStats({ initialStats }: VisitorStatsProps) {
  const [stats, setStats] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(!initialStats);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visits');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching visitor stats:', err);
        setError('Failed to load visitor statistics');
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialStats) {
      fetchStats();
    }
  }, [initialStats]);

  if (isLoading) return <div>Loading visitor statistics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold">{stats.totalVisits.toLocaleString()}</div>
      <div className="text-sm text-gray-500">
        Last visit: {new Date(stats.lastVisit).toLocaleString()}
      </div>
    </div>
  );
}
