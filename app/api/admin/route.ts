import { NextResponse } from 'next/server';

const USERNAME = process.env.ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new NextResponse('Unsupported Media Type', { status: 415 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return new NextResponse('Missing credentials', { status: 400 });
    }

    if (username === USERNAME && password === PASSWORD) {
      const response = NextResponse.redirect(new URL('/admin-panel', request.url));
      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
      });
      return response;
    }

    return new NextResponse('Unauthorized', { status: 401 });
  } catch (error) {
    console.error('Authentication error:', error);
    return new NextResponse('Bad Request', { status: 400 });
  }
}
