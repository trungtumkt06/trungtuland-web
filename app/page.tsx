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

      {/* SECTION 2: DỊCH VỤ & UY TÍN (Bản Premium) */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Họa tiết background mờ cho thêm phần sang trọng */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Tiêu đề Section */}
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-sm">Giá Trị Cốt Lõi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">Vì Sao Chọn TRUNGTỰ LAND</h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
              Chúng tôi không chỉ trao cho bạn một ngôi nhà, mà còn mang đến sự an tâm tuyệt đối và tiềm năng sinh lời vượt trội.
            </p>
          </div>

          {/* 3 Khối Dịch Vụ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Thẻ 1: Pháp lý */}
            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
                {/* SVG Icon Khiên */}
                <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Pháp Lý Minh Bạch</h3>
              <p className="text-gray-600 leading-relaxed">
                An tâm tuyệt đối với 100% sản phẩm đã được kiểm duyệt khắt khe, đầy đủ sổ hồng riêng và quy hoạch 1/500 rõ ràng trước khi mở bán.
              </p>
            </div>

            {/* Thẻ 2: Tăng trưởng */}
            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
                {/* SVG Icon Biểu đồ */}
                <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Sinh Lời Vượt Trội</h3>
              <p className="text-gray-600 leading-relaxed">
                Lựa chọn những vị trí đắc địa nhất, đón đầu các quy hoạch hạ tầng giao thông trọng điểm, đảm bảo biên độ tăng giá bền vững cho nhà đầu tư.
              </p>
            </div>

            {/* Thẻ 3: Dịch vụ */}
            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
                {/* SVG Icon Kim cương/VIP */}
                <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.071-1.041.74l-4.72-3.04a.563.563 0 00-.54 0l-4.72 3.04c-.51.33-1.189-.119-1.042-.74l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Dịch Vụ Đặc Quyền</h3>
              <p className="text-gray-600 leading-relaxed">
                Đồng hành cùng khách hàng từ khâu tư vấn chuyên sâu, thiết kế giải pháp vay vốn ngân hàng tối ưu cho đến khi nhận bàn giao nhà hoàn thiện.
              </p>
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