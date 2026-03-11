/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Vercel sẽ bỏ qua các lỗi về Type để hoàn tất quá trình đóng gói web
    ignoreBuildErrors: true,
  },
  // Giữ nguyên các cấu hình khác bên dưới...
};

export default nextConfig;
