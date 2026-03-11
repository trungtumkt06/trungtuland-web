import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-bold tracking-wider text-white block">
              TRUNGTỰ<span className="text-blue-500">LAND</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Đối tác tin cậy trong lĩnh vực đầu tư và tư vấn bất động sản. Chúng tôi cam kết mang lại giá trị thực, sự minh bạch và sự thịnh vượng bền vững cho khách hàng.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ve-chung-toi" className="hover:text-blue-400 transition-colors">Về Chúng Tôi</Link></li>
              <li><Link href="/du-an" className="hover:text-blue-400 transition-colors">Dự Án Đang Bán</Link></li>
              <li><Link href="/ky-gui" className="hover:text-blue-400 transition-colors">Ký Gửi Bất Động Sản</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-blue-400 transition-colors">Tin Tức & Thị Trường</Link></li>
            </ul>
          </div>

          {/* Cột 3: Dịch vụ */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Dịch Vụ</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tư Vấn Đầu Tư</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Quản Lý Tài Sản</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Hỗ Trợ Pháp Lý BĐS</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Thẩm Định Giá</li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ (Đã cập nhật số thật của bạn) */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <span className="mr-3 text-blue-500 mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span>Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP. HCM</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <a href="tel:0776910286" className="hover:text-blue-400 font-bold transition-colors">077.691.0286 (24/7)</a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <span>contact@trungtuland.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} TRUNGTỰ LAND. Tất cả các quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Điều khoản sử dụng</span>
            <span className="hover:text-white cursor-pointer transition-colors">Chính sách bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}