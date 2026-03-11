import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Chỉ bảo vệ các đường dẫn bắt đầu bằng /admin hoặc /quan-tri
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Kiểm tra xem khách đã đăng nhập chưa (qua cookie)
    const authCookie = request.cookies.get('admin_token');

    if (!authCookie || authCookie.value !== 'authenticated_success') {
      // Nếu chưa đăng nhập, đá họ về trang login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*', // Áp dụng cho toàn bộ thư mục admin
};