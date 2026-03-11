import connectMongoDB from '@/lib/mongodb';
import Project from '@/models/Project';
import ProjectCard from '@/components/ProjectCard';

// Bắt buộc Next.js luôn lấy dữ liệu mới nhất từ Database
export const dynamic = 'force-dynamic';

export default async function AllProjectsPage() {
  // 1. Kết nối cơ sở dữ liệu
  await connectMongoDB();
  
  // 2. Lấy toàn bộ dự án, mặc định sắp xếp mới nhất lên đầu
  const rawProjects = await Project.find().sort({ createdAt: -1 });

  // 3. Chuẩn hóa dữ liệu
  const projects = rawProjects.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.name,
    location: doc.location,
    price: doc.price,
    area: doc.area || "",
    status: doc.status,
    imageUrl: (doc.images && doc.images.length > 0) 
      ? doc.images[0] 
      : (doc.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"),
  }));

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Bộ sưu tập dự án Trung Tự Land"
          />
          <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 mt-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Bộ Sưu Tập <span className="text-yellow-500">Dự Án</span>
          </h1>
          <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto italic leading-relaxed">
            Khám phá danh mục bất động sản cao cấp được phân phối chính thức bởi TRUNGTỰ LAND. Nơi hội tụ tinh hoa của kiến trúc và lối sống thượng lưu.
          </p>
        </div>
      </section>

      {/* 2. LƯỚI DỰ ÁN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        
        {/* Thanh Thống kê cực kỳ tối giản */}
        <div className="mb-10 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center sm:text-left">
          <p className="text-gray-600 text-lg">
            Đang hiển thị <span className="font-extrabold text-yellow-600 text-xl">{projects.length}</span> dự án bất động sản
          </p>
        </div>

        {/* Danh sách thẻ dự án */}
        {projects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🏙️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Chưa có dự án nào</h3>
            <p className="text-gray-500 max-w-md mx-auto">Giám đốc chưa đăng tải dự án nào lên hệ thống. Vui lòng truy cập trang Quản Trị để thêm dự án mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}