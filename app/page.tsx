import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import connectMongoDB from '@/lib/mongodb';
import Project from '@/models/Project';

export default async function Home() {
  // 1. Kết nối cơ sở dữ liệu và lấy dữ liệu thật
  await connectMongoDB();
  
  // Lấy danh sách dự án từ MongoDB, sắp xếp theo thời gian mới nhất (createdAt: -1)
  const rawProjects = await Project.find().sort({ createdAt: -1 });

  // 2. Định dạng lại dữ liệu một chút để thẻ ProjectCard hiểu được (_id của MongoDB chuyển thành id)
  const realProjects = rawProjects.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    location: doc.location,
    price: doc.price,
    status: doc.status,
    imageUrl: doc.imageUrl,
  }));

  return (
    <main className="flex min-h-screen flex-col">
      {/* Phần Banner Chính */}
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

      {/* Phần Danh Sách Dự Án Thực Tế */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dự Án Nổi Bật</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tuyển tập những dự án bất động sản có vị trí đắc địa, thiết kế đẳng cấp và tiềm năng tăng giá trị cao nhất hiện nay.
            </p>
          </div>

          {/* Kiểm tra xem có dự án nào không */}
          {realProjects.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">Chưa có dự án nào. Hãy vào trang Quản trị để thêm mới!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
          
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