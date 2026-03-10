import Link from 'next/link';

// Định nghĩa kiểu dữ liệu (TypeScript) cho Dự án
interface Project {
  id: string;
  name: string;
  location: string;
  price: string;
  status: string;
  imageUrl: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100">
      {/* Khung chứa ảnh có hiệu ứng zoom nhẹ khi đưa chuột vào */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        ></div>
        
        {/* Nhãn trạng thái (Đang mở bán, Sắp ra mắt...) */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {project.status}
        </div>
      </div>
      
      {/* Thông tin dự án */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <span className="mr-2">📍</span> {project.location}
        </p>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Giá từ</p>
            <p className="text-lg font-bold text-red-600">{project.price}</p>
          </div>
          
          <Link 
            href={`/du-an/${project.id}`} 
            className="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}