"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // 1. Lấy dữ liệu từ API khi tải trang
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        // Chuẩn hóa dữ liệu ngay khi nhận về từ API
        const formattedProjects = (data.projects || []).map((p: any) => ({
          ...p,
          // Rút ảnh đầu tiên trong mảng images ra để làm ảnh đại diện
          imageUrl: (p.images && p.images.length > 0) 
            ? p.images[0] 
            : (p.imageUrl || "https://placehold.co/600x400/eeeeee/999999?text=Chua+co+anh"),
        }));

        setProjects(formattedProjects);
        setFilteredProjects(formattedProjects); // Mặc định hiển thị tất cả
      } catch (error) {
        console.error("Lỗi fetch dữ liệu:", error);
      }
    };
    fetchProjects();
  }, []);

  // 2. Logic tìm kiếm (Chỉ chạy khi bấm nút hoặc ấn Enter)
  const handleSearch = () => {
    const result = projects.filter((p: any) => {
      const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === "" || p.type === filterType;
      return matchName && matchType;
    });
    setFilteredProjects(result);
  };

  return (
    <main className="bg-white">
      {/* SECTION 1: HERO & SEARCH BAR */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        {/* Ảnh nền phủ mờ */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Nội dung Hero */}
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            TRUNGTỰ <span className="text-yellow-500">LAND</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Nơi khơi nguồn hạnh phúc - Đầu tư vững bền cho tương lai
          </p>
          {/* Thanh Tìm Kiếm Đa Năng - Luxury Version */}
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch gap-2 backdrop-blur-sm bg-white/95">
            {/* Ô Nhập Tên/Khu Vực */}
            <div className="flex-grow flex items-center px-4 group">
              <span className="text-gray-400 group-focus-within:text-yellow-600 transition-colors text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="Bạn muốn tìm dự án nào..." 
                className="w-full px-3 py-4 outline-none text-gray-800 text-lg placeholder:text-gray-400 bg-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            {/* Đường kẻ dọc ngăn cách (Chỉ hiện trên desktop) */}
            <div className="hidden md:block w-[1px] bg-gray-200 my-3"></div>
            {/* Chọn Loại Hình */}
            <div className="flex items-center px-4 group">
              <span className="text-gray-400 text-xl">🏢</span>
              <select 
                className="px-3 py-4 outline-none text-gray-700 bg-transparent cursor-pointer min-w-[160px] text-lg font-medium"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Tất cả loại hình</option>
                <option value="Căn hộ">Căn hộ</option>
                <option value="Biệt thự">Biệt thự</option>
                <option value="Đất nền">Đất nền</option>
                <option value="Nhà phố">Nhà phố</option>
              </select>
            </div>
            {/* Nút Tìm Kiếm */}
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-12 py-4 rounded-xl font-bold transition-all duration-300 text-lg shadow-lg hover:shadow-yellow-600/20 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Tìm Kiếm</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: DỊCH VỤ & UY TÍN */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛡️</div>
              <h3 className="text-xl font-bold mb-4">Pháp Lý Minh Bạch</h3>
              <p className="text-gray-500">Mọi sản phẩm đều được kiểm duyệt kỹ lưỡng về sổ hồng và quy hoạch 1/500.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📉</div>
              <h3 className="text-xl font-bold mb-4">Giá Trị Tăng Trưởng</h3>
              <p className="text-gray-500">Lựa chọn các vị trí đắc địa, đón đầu quy hoạch hạ tầng giao thông trọng điểm.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">💎</div>
              <h3 className="text-xl font-bold mb-4">Dịch Vụ Đặc Quyền</h3>
              <p className="text-gray-500">Hỗ trợ khách hàng từ khâu tư vấn, vay vốn ngân hàng đến khi nhận bàn giao nhà.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DANH SÁCH DỰ ÁN */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-yellow-600 font-bold tracking-widest uppercase text-sm">Sản phẩm tốt nhất</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Dự Án Đang Mở Bán</h2>
              <div className="h-1.5 w-24 bg-yellow-600 mt-4"></div>
            </div>
            <p className="text-gray-500 mt-4 md:mt-0">Tìm thấy {filteredProjects.length} dự án phù hợp</p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <p className="text-gray-400 text-xl italic">Rất tiếc, không tìm thấy dự án nào khớp với yêu cầu của bạn.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}