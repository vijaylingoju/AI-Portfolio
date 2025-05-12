import { NextResponse } from 'next/server';
import { incrementVisitorCount, getVisitorStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getVisitorStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor stats' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const updatedStats = await incrementVisitorCount();
    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor count' },
      { status: 500 }
    );
  }
}