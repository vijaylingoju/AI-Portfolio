import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const adminAuth = request.headers.get('cookie')?.split('; ').find(row => row.startsWith('admin-auth'));
  console.log("adminAuth", adminAuth);
  if (!adminAuth) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
}