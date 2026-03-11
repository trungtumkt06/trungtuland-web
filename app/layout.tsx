import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import file Navbar và Footer
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

// ĐÃ NÂNG CẤP BỘ SEO BẢN PREMIUM TẠI ĐÂY
export const metadata: Metadata = {
  title: "TRUNGTỰ LAND - Bất Động Sản Cao Cấp",
  description: "Giải pháp bất động sản cao cấp, minh bạch pháp lý và sinh lời bền vững.",
  openGraph: {
    title: "TRUNGTỰ LAND - Bất Động Sản Cao Cấp",
    description: "Khám phá bộ sưu tập bất động sản đẳng cấp nhất. Hỗ trợ pháp lý minh bạch, sinh lời vượt trội.",
    url: "https://trungtumkt06.github.io/my-profile/", // Có thể thay bằng link Vercel thực tế của web bất động sản sau
    siteName: "TRUNGTỰ LAND",
    images: [
      {
        // Ảnh bìa sang trọng khi chia sẻ link lên mạng xã hội
        url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200", 
        width: 1200,
        height: 630,
        alt: "Ảnh bìa TRUNGTỰ LAND",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Thanh điều hướng xuất hiện ở mọi trang */}
        <Navbar />
        
        {/* Nội dung chính của web sẽ đẩy phần Footer xuống dưới cùng */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Chân trang xuất hiện ở mọi trang */}
        <Footer />
        {/* Nút liên hệ nổi */}
        <FloatingContact />
      </body>
    </html>
  );
}