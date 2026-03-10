import connectMongoDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  // Lấy ID từ thanh địa chỉ
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  // 1. BẢO MẬT: Kiểm tra xem ID có đúng định dạng của MongoDB không
  // (Nếu ai đó gõ bậy bạ URL như /du-an/123, web sẽ không bị sập mà chuyển sang trang 404)
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return notFound();
  }

  // 2. KẾT NỐI: Lấy dữ liệu dự án từ MongoDB dựa vào ID
  await connectMongoDB();
  const project = await Project.findById(projectId);

  // Nếu tìm không thấy dự án trong Database
  if (!project) {
    return notFound();
  }

  // 3. HIỂN THỊ: Đổ dữ liệu thật ra giao diện
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
              {/* project.description có thể có dấu xuống dòng, dùng class whitespace-pre-wrap để hiển thị đúng */}
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
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
                <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors text-lg shadow-md">
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