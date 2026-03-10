import Link from 'next/link';
import { notFound } from 'next/navigation';

const projectsData = [
  {
    id: "du-an-1",
    name: "Khu Đô Thị Sinh Thái Riverside",
    location: "Quận 2, TP. Hồ Chí Minh",
    price: "6.5 Tỷ VNĐ",
    area: "120 - 250 m²",
    type: "Biệt thự, Shophouse",
    status: "Đang Mở Bán",
    developer: "Tập đoàn Vạn Phát",
    description: "Khu đô thị sinh thái kiểu mẫu ven sông, mang đến không gian sống xanh mát, trong lành cùng hệ thống tiện ích đẳng cấp 5 sao dành riêng cho giới tinh hoa.",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "du-an-2",
    name: "Tổ Hợp Căn Hộ Cao Cấp Sky View",
    location: "Quận Cầu Giấy, Hà Nội",
    price: "3.2 Tỷ VNĐ",
    area: "65 - 105 m²",
    type: "Căn hộ cao cấp",
    status: "Sắp Bàn Giao",
    developer: "Công ty CP Đầu Tư Thủ Đô",
    description: "Dự án căn hộ cao cấp ngay trung tâm thủ đô, tầm nhìn panorama tuyệt đẹp nhìn ra toàn cảnh thành phố. Tiện ích nội khu bao gồm trung tâm thương mại, bể bơi bốn mùa, rạp chiếu phim...",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "du-an-3",
    name: "Biệt Thự Biển Ocean Park",
    location: "Cam Lâm, Khánh Hòa",
    price: "15 Tỷ VNĐ",
    area: "300 - 500 m²",
    type: "Biệt thự nghỉ dưỡng",
    status: "Giữ Chỗ",
    developer: "Tập đoàn Biển Xanh",
    description: "Tổ hợp biệt thự nghỉ dưỡng đẳng cấp quốc tế tọa lạc tại bãi biển đẹp nhất hành tinh. Cơ hội đầu tư sinh lời vượt trội với cam kết lợi nhuận 10%/năm từ chủ đầu tư.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  }
];

// THAY ĐỔI Ở ĐÂY: Thêm async và Promise
export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  
  // THAY ĐỔI Ở ĐÂY: Dùng await để lấy id ra khỏi params
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Banner Dự Án */}
      <div 
        className="w-full h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              {project.status}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-xl text-gray-200">📍 {project.location}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cột trái: Thông tin chi tiết */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-8 mb-8">
              <div>
                <p className="text-gray-500 text-sm">Giá Bán</p>
                <p className="text-2xl font-bold text-red-600">{project.price}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Diện Tích</p>
                <p className="text-xl font-bold text-gray-800">{project.area}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Loại Hình</p>
                <p className="text-xl font-bold text-gray-800">{project.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Chủ Đầu Tư</p>
                <p className="text-xl font-bold text-gray-800">{project.developer}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">Tổng Quan Dự Án</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>
          </div>

          {/* Cột phải: Form Liên hệ */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhận Bảng Giá & Tư Vấn</h3>
              <p className="text-gray-500 text-sm mb-6">Để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ với bạn trong vòng 15 phút.</p>
              
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Họ và tên của bạn *" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <input type="tel" placeholder="Số điện thoại *" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <input type="email" placeholder="Email (Không bắt buộc)" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors text-lg shadow-md">
                  Gửi Yêu Cầu
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}