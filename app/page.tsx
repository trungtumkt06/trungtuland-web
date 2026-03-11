"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 1. Lấy dữ liệu từ API khi tải trang
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        const formattedProjects = (data.projects || []).map((p: any) => ({
          ...p,
          imageUrl: (p.images && p.images.length > 0) 
            ? p.images[0] 
            : (p.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"),
        }));

        setProjects(formattedProjects);
        setFilteredProjects(formattedProjects);
      } catch (error) {
        console.error("Lỗi fetch dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Logic tìm kiếm (Đã thêm chức năng TỰ ĐỘNG CUỘN TRANG)
  const handleSearch = () => {
    const result = projects.filter((p: any) => {
      const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === "" || (p.type && p.type.toLowerCase().includes(filterType.toLowerCase()));
      return matchName && matchType;
    });
    setFilteredProjects(result);

    // Lệnh cuộn trang mượt mà (Smooth Scroll) xuống phần kết quả
    setTimeout(() => {
      const section = document.getElementById("danh-sach-du-an");
      if (section) {
        // block: "start" giúp cuộn mép trên của section sát lên đỉnh màn hình
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Đợi 0.1 giây để React cập nhật danh sách xong mới cuộn
  };

  // Gọi API lấy danh mục
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(err => console.error("Lỗi tải danh mục:", err));
  }, []);

  return (
    <main className="bg-white">
      {/* SECTION 1: HERO & SEARCH BAR */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            TRUNGTỰ <span className="text-yellow-500">LAND</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Nơi khơi nguồn hạnh phúc - Đầu tư vững bền cho tương lai
          </p>
          
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch gap-2 backdrop-blur-sm bg-white/95">
            <div className="flex-grow flex items-center px-4 group">
              <span className="text-gray-400 group-focus-within:text-yellow-600 transition-colors text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="Bạn muốn tìm dự án nào..." 
                className="w-full px-3 py-4 outline-none text-gray-800 text-lg placeholder:text-gray-400 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="hidden md:block w-[1px] bg-gray-200 my-3"></div>
            
            {/* DROPDOWN CHỌN LOẠI HÌNH (ĐỒNG BỘ TRONG SUỐT VỚI KHUNG TÌM KIẾM) */}
            <div className="flex items-center px-4 group relative z-50">
              
              {/* Lưới tàng hình đóng menu khi click ra ngoài */}
              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
              )}

              {/* Icon Tòa nhà */}
              <span className="text-gray-400 text-xl mr-2 group-hover:text-blue-500 transition-colors relative z-50">🏢</span>
              
              {/* Nút Bấm (Đã làm trong suốt, bỏ viền) */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative z-50 flex items-center justify-between cursor-pointer py-4 min-w-[160px] bg-transparent outline-none"
              >
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors select-none">
                  {filterType ? categories.find(c => c.name === filterType)?.name || filterType : "Tất cả loại hình"}
                </span>
                {/* Mũi tên */}
                <svg 
                  className={`w-5 h-5 ml-2 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-blue-500'}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Danh sách xổ xuống (Vẫn giữ thiết kế nổi bật, rớt xuống bên dưới) */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-[240px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2 z-50"
                  >
                    <div 
                      className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 ${!filterType ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-blue-600 hover:pl-7'}`}
                      onClick={() => { 
                        setFilterType(""); 
                        setIsDropdownOpen(false); 
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors ${!filterType ? 'bg-blue-600' : 'bg-transparent group-hover:bg-blue-300'}`}></div>
                      Tất cả loại hình
                    </div>

                    {categories.filter(c => c.type === 'project').map((cat) => (
                      <div 
                        key={cat._id}
                        className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 ${filterType === cat.name ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-blue-600 hover:pl-7'}`}
                        onClick={() => { 
                          setFilterType(cat.name); 
                          setIsDropdownOpen(false); 
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full transition-colors ${filterType === cat.name ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        {cat.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-sm">Giá Trị Cốt Lõi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">Vì Sao Chọn TRUNGTỰ LAND</h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
              Chúng tôi không chỉ trao cho bạn một ngôi nhà, mà còn mang đến sự an tâm tuyệt đối và tiềm năng sinh lời vượt trội.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
                <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Pháp Lý Minh Bạch</h3>
              <p className="text-gray-600 leading-relaxed">
                An tâm tuyệt đối với 100% sản phẩm đã được kiểm duyệt khắt khe, đầy đủ sổ hồng riêng và quy hoạch 1/500 rõ ràng trước khi mở bán.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
                <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Sinh Lời Vượt Trội</h3>
              <p className="text-gray-600 leading-relaxed">
                Lựa chọn những vị trí đắc địa nhất, đón đầu các quy hoạch hạ tầng giao thông trọng điểm, đảm bảo biên độ tăng giá bền vững cho nhà đầu tư.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 group-hover:bg-yellow-500 transition-colors duration-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0">
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

      {/* SECTION 3: DANH SÁCH DỰ ÁN NỔI BẬT (Đã gắn ID để tự động cuộn xuống) */}
      <section id="danh-sach-du-an" className="py-20 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-yellow-600 font-bold tracking-widest uppercase text-sm">Sản phẩm tốt nhất</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Dự Án Đang Mở Bán</h2>
              <div className="h-1.5 w-24 bg-yellow-600 mt-4"></div>
            </div>
            {!isLoading && (
              <p className="text-gray-500 mt-4 md:mt-0 font-medium">Tìm thấy <span className="text-yellow-600 font-bold">{filteredProjects.length}</span> dự án phù hợp</p>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Đang tải dữ liệu dự án...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
              <span className="text-5xl block mb-4">🔍</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy dự án</h3>
              <p className="text-gray-500 italic">Rất tiếc, chưa có dự án nào khớp với yêu cầu tìm kiếm của bạn.</p>
              <button onClick={() => {setSearchTerm(""); setFilterType(""); setFilteredProjects(projects);}} className="mt-6 text-yellow-600 font-bold hover:underline">
                Xem tất cả dự án
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: ĐỐI TÁC CHIẾN LƯỢC */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">
            Đối Tác Chiến Lược Của Chúng Tôi
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/9/9d/Vietcombank_Logo.svg/1280px-Vietcombank_Logo.svg.png" alt="Vietcombank" className="w-full h-full object-contain"/>
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Techcombank_logo.png" alt="Techcombank" className="w-full h-full object-contain"/>
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinhomes.png" alt="Vinhomes" className="w-full h-full object-contain"/>
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Novaland_Logo.svg/960px-Novaland_Logo.svg.png" alt="Novaland" className="w-full h-full object-contain"/>
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://khangdiensaigon.com.vn/wp-content/uploads/2021/03/logo-masterise.png" alt="Masterise" className="w-full h-full object-contain"/>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" alt="Biệt thự sang trọng" className="w-full h-full object-cover"/>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Bạn Có Bất Động Sản Cần <span className="text-yellow-500">Ký Gửi?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Với tệp khách hàng VIP sẵn có và đội ngũ marketing chuyên nghiệp, TRUNGTỰ LAND cam kết thanh khoản nhanh chóng tài sản của bạn với mức giá tốt nhất thị trường.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/ky-gui"
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-600/30 text-lg text-center"
            >
              Đăng Ký Ký Gửi
            </Link>
            <Link 
              href="/lien-he"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 text-lg text-center"
            >
              Tư Vấn Đầu Tư
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Hoặc gọi trực tiếp Hotline 24/7: <a href="tel:0776910286" className="text-yellow-500 font-bold text-xl hover:text-white transition-colors ml-1">077.691.0286</a>
          </p>
        </div>
      </section>
    </main>
  );
}