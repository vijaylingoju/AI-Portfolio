'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // Track in both development and production
    fetch('/api/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }, []);

  return null; // This component doesn't render anything
}
