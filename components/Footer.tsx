import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div>
            <Link href="/" className="text-3xl font-bold tracking-wider text-white block mb-6">
              TRUNGTỰ<span className="text-blue-500">LAND</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Đối tác tin cậy của bạn trong lĩnh vực đầu tư và tư vấn bất động sản cao cấp. Chúng tôi cam kết mang lại giá trị thực và sự thịnh vượng bền vững.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
              <li><Link href="/ve-chung-toi" className="hover:text-blue-400 transition-colors">Về Chúng Tôi</Link></li>
              <li><Link href="/du-an" className="hover:text-blue-400 transition-colors">Dự Án Đang Bán</Link></li>
              <li><Link href="/ky-gui" className="hover:text-blue-400 transition-colors">Ký Gửi Bất Động Sản</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-blue-400 transition-colors">Tin Tức & Thị Trường</Link></li>
            </ul>
          </div>

          {/* Cột 3: Dịch vụ */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Dịch Vụ</h4>
            <ul className="space-y-3">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tư Vấn Đầu Tư</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Quản Lý Tài Sản</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Hỗ Trợ Pháp Lý BĐS</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Thẩm Định Giá</li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-blue-500">📍</span>
                <span>Tầng 15, Tòa nhà Landmark, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">📞</span>
                <span>0909 123 456 (Hotline 24/7)</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">✉️</span>
                <span>contact@trungtuland.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} TRUNGTỰ LAND. Tất cả các quyền được bảo lưu.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-white cursor-pointer">Chính sách bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}