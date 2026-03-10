import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Doanh Nghiệp */}
        <Link href="/" className="text-3xl font-bold tracking-wider text-gray-900">
          TRUNGTỰ<span className="text-blue-600">LAND</span>
        </Link>
        
        {/* Menu Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
            Trang Chủ
          </Link>
          <Link href="/ve-chung-toi" className="hover:text-blue-600 transition-colors duration-200">
            Về Chúng Tôi
          </Link>
          <Link href="/du-an" className="hover:text-blue-600 transition-colors duration-200">
            Dự Án
          </Link>
          <Link href="/ky-gui" className="hover:text-blue-600 transition-colors duration-200">
            Ký Gửi
          </Link>
          <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors duration-200">
            Tin Tức
          </Link>
        </div>

        {/* Nút Gọi Hành Động (CTA) */}
        <div className="hidden md:block">
          <Link href="/lien-he" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold transition-colors shadow-lg hover:shadow-xl">
            Nhận Tư Vấn
          </Link>
        </div>
      </div>
    </nav>
  );
}