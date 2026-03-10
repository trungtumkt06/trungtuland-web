import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import file Navbar và Footer
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TRUNGTỰ LAND - Bất Động Sản Cao Cấp",
  description: "Giải pháp bất động sản cao cấp, minh bạch pháp lý và sinh lời bền vững.",
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