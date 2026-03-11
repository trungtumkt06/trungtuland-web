"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU
interface ProjectDetailType {
  _id: string;
  name: string;
  location: string;
  price: string;
  area: string;
  type: string;
  developer: string;
  status: string;
  description: string;
  images?: string[]; 
  imageUrl?: string; 
}

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  // State cho Form Tư Vấn
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    message: "" // Ẩn nhưng sẽ tự động điền tên dự án vào
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) return setProject(null);
        const data = await res.json();
        setProject(data.project);
        // Tự động gán tên dự án vào lời nhắn để Admin biết khách đang hỏi dự án nào
        setFormData(prev => ({ ...prev, message: `Tôi muốn nhận bảng giá và tư vấn dự án: ${data.project.name}` }));
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  // Xử lý gửi Form lên Telegram (Sử dụng chung API ky-gui)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/ky-gui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Thêm cờ isProjectPage để phân loại tin nhắn
        body: JSON.stringify({ ...formData, isProjectPage: true }),
      });

      if (res.ok) {
        setShowSuccessPopup(true);
        setFormData(prev => ({ ...prev, fullName: "", phone: "" })); // Giữ lại message
      } else {
        alert("Lỗi khi gửi, vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối server!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium tracking-widest uppercase">Đang tải dữ liệu...</p>
    </div>
  );
  if (!project) return notFound();

  const galleryImages = (project.images && project.images.length > 0) 
    ? project.images 
    : (project.imageUrl ? [project.imageUrl] : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000"]); // Thêm ảnh nền mờ mờ dự phòng

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. THƯ VIỆN ẢNH (SLIDE) - FULL MÀN HÌNH CỰC SANG */}
      <div className="w-full h-[60vh] md:h-[75vh] relative bg-gray-900 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full project-slider"
        >
          {galleryImages.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* Gradient Overlay mượt mà */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Tiêu đề dự án nổi trên Slide */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <span className="bg-yellow-600 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg">
              {project.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{project.name}</h1>
            <p className="text-xl text-gray-300 flex items-center gap-2 drop-shadow-md">
              <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {project.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 2. CỘT TRÁI: THÔNG TIN CHI TIẾT */}
          <div className="lg:w-2/3">
            
            {/* Box Thông số nhanh (Quick Stats) */}
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 -mt-24 relative z-20">
              <div className="text-center md:text-left md:border-r border-gray-100 last:border-0">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Giá Bán</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 tracking-tight">{project.price}</p>
              </div>
              <div className="text-center md:text-left md:border-r border-gray-100 last:border-0">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Diện Tích</p>
                <p className="text-xl font-bold text-gray-900">
                  {project.area.replace(/m2/gi, 'm²')}
                </p>
              </div>
              <div className="text-center md:text-left md:border-r border-gray-100 last:border-0">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Loại Hình</p>
                <p className="text-xl font-bold text-gray-900">{project.type}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Chủ Đầu Tư</p>
                <p className="text-xl font-bold text-gray-900 line-clamp-2">{project.developer}</p>
              </div>
            </div>

            {/* Box Tổng Quan */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-yellow-500 rounded-full"></span> Tổng Quan Dự Án
              </h2>
              <div className="prose max-w-none text-gray-600 leading-loose text-lg whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          </div>

          {/* 3. CỘT PHẢI: FORM LIÊN HỆ ĐẶT CHỖ (STICKY) */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl sticky top-24 text-white relative overflow-hidden group">
              {/* Decor vòng tròn sáng */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-600/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">Đăng Ký Nhận Bảng Giá</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Để lại thông tin, Giám đốc kinh doanh của chúng tôi sẽ gọi lại tư vấn chi tiết về dự án <strong className="text-yellow-500">{project.name}</strong> trong vòng 15 phút.
                </p>
                
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="relative">
                    <input 
                      type="text" name="fullName" value={formData.fullName} onChange={handleChange} id="pf-name" required
                      className="block w-full px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer transition-colors" placeholder=" " 
                    />
                    <label htmlFor="pf-name" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">Họ và tên *</label>
                  </div>

                  <div className="relative pt-2">
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} id="pf-phone" required
                      className="block w-full px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer transition-colors" placeholder=" " 
                    />
                    <label htmlFor="pf-phone" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">Số điện thoại *</label>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-extrabold py-4 rounded-xl transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(202,138,4,0.5)] uppercase tracking-wider flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? "ĐANG XỬ LÝ..." : <>NHẬN TƯ VẤN NGAY 🚀</>}
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                  <p className="text-gray-400 text-sm mb-2">Hoặc gọi trực tiếp Hotline</p>
                  <a href="tel:0776910286" className="text-yellow-500 font-bold text-2xl hover:text-white transition-colors">077.691.0286</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. POPUP THÔNG BÁO GỬI THÀNH CÔNG */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSuccessPopup(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center z-10">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Đăng Ký Thành Công!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Hệ thống đã ghi nhận yêu cầu tư vấn dự án <strong>{project.name}</strong>. Chuyên viên sẽ liên hệ với quý khách trong thời gian sớm nhất.</p>
              <button onClick={() => setShowSuccessPopup(false)} className="w-full bg-gray-900 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest">Tuyệt vời</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}