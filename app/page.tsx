import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  // Dữ liệu mẫu (Mock Data) - Sau này sẽ được thay bằng dữ liệu gọi từ MongoDB
  const featuredProjects = [
    {
      id: "du-an-1",
      name: "Khu Đô Thị Sinh Thái Riverside",
      location: "Quận 2, TP. Hồ Chí Minh",
      price: "6.5 Tỷ VNĐ",
      status: "Đang Mở Bán",
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "du-an-2",
      name: "Tổ Hợp Căn Hộ Cao Cấp Sky View",
      location: "Quận Cầu Giấy, Hà Nội",
      price: "3.2 Tỷ VNĐ",
      status: "Sắp Bàn Giao",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "du-an-3",
      name: "Biệt Thự Biển Ocean Park",
      location: "Cam Lâm, Khánh Hòa",
      price: "15 Tỷ VNĐ",
      status: "Giữ Chỗ",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Phần Banner Chính (Hero Section) */}
      <section className="relative w-full h-[80vh] bg-gray-900 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        ></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Khơi Nguồn Cuộc Sống Thịnh Vượng
          </h1>
          <p className="text-xl text-gray-200 mb-10 drop-shadow-md">
            Chúng tôi cung cấp các giải pháp bất động sản cao cấp, minh bạch pháp lý và mang lại giá trị sinh lời bền vững cho nhà đầu tư.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/du-an" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition-all shadow-lg hover:shadow-blue-600/50">
              Khám Phá Dự Án
            </Link>
            <Link href="/lien-he" className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-3 rounded-md text-lg font-semibold transition-all shadow-lg">
              Liên Hệ Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Phần Danh Sách Dự Án Nổi Bật */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dự Án Nổi Bật</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tuyển tập những dự án bất động sản có vị trí đắc địa, thiết kế đẳng cấp và tiềm năng tăng giá trị cao nhất hiện nay.
            </p>
          </div>

          {/* Lưới hiển thị 3 dự án */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* Nút xem tất cả */}
          <div className="text-center mt-12">
            <Link href="/du-an" className="inline-block bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 font-semibold px-8 py-3 rounded-md transition-all">
              Xem Tất Cả Dự Án
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}