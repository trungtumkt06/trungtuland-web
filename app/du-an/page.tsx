import connectMongoDB from '@/lib/mongodb';
import Project from '@/models/Project';
import ProjectCard from '@/components/ProjectCard';

// Dòng này báo cho Next.js biết luôn lấy dữ liệu mới nhất, không dùng bộ nhớ đệm (cache)
export const dynamic = 'force-dynamic';

export default async function AllProjectsPage() {
  // 1. Kết nối cơ sở dữ liệu
  await connectMongoDB();
  
  // 2. Lấy toàn bộ dự án, sắp xếp mới nhất lên đầu
  const rawProjects = await Project.find().sort({ createdAt: -1 });

  // 3. Chuẩn hóa dữ liệu cho Component ProjectCard
  const projects = rawProjects.map((doc) => ({
    _id: doc._id.toString(), // ✅ ĐÃ SỬA: Đổi 'id' thành '_id' cho khớp với ProjectCard
    name: doc.name,
    location: doc.location,
    price: doc.price,
    status: doc.status,
    imageUrl: doc.imageUrl,
  }));

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Phần Header Tiêu Đề */}
      <section className="bg-gray-900 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Bộ Sưu Tập Dự Án
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Khám phá danh mục các bất động sản cao cấp được phân phối chính thức bởi TRUNGTỰ LAND. Từ căn hộ trung tâm đến biệt thự nghỉ dưỡng đẳng cấp.
        </p>
      </section>

      {/* Phần Lưới Hiển Thị Dự Án */}
      <section className="container mx-auto px-6 mt-16">
        <div className="mb-8 flex justify-between items-center border-b pb-4">
          <p className="text-gray-600 font-medium">
            Tìm thấy <span className="font-bold text-blue-600">{projects.length}</span> dự án
          </p>
          {/* Chỗ này sau này chúng ta có thể làm thêm bộ lọc (Filter) */}
          <div className="text-sm text-gray-500">
            Sắp xếp theo: <span className="font-semibold text-gray-800">Mới nhất</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Hiện tại chưa có dự án nào được đăng tải.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              // ✅ ĐÃ SỬA: Dùng project._id làm key
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}