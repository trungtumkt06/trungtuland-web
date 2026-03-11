import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Xác định các khu vực nhạy cảm cần bảo vệ
  // Bạn có thể thêm nhiều đường dẫn vào mảng này
  const protectedPaths = ['/admin', '/quan-tri'];
  
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected) {
    // 2. Kiểm tra thẻ bài (Cookie)
    const authCookie = request.cookies.get('admin_token');

    // Nếu không có cookie hoặc giá trị không khớp
    if (!authCookie || authCookie.value !== 'authenticated_success') {
      // Tạo URL để đá về trang login
      const loginUrl = new URL('/login', request.url);
      
      // (Tùy chọn) Thêm callbackUrl để sau khi login xong web tự quay lại trang admin đang dở
      // loginUrl.searchParams.set('callbackUrl', pathname);
      
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 3. Cấu hình matcher để Next.js biết khi nào cần gọi Middleware này
// Giúp tối ưu hiệu suất, không gọi Middleware ở những trang công cộng
export const config = {
  matcher: [
    '/admin/:path*', 
    '/quan-tri/:path*'
  ],
};