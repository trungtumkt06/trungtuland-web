"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
  images?: string[]; // Mảng ảnh mới
  imageUrl?: string; // Tương thích với link ảnh cũ
}

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) return setProject(null);
        const data = await res.json();
        setProject(data.project);
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Yêu cầu của bạn đã được gửi. Chúng tôi sẽ liên hệ sớm nhất!");
  };

  if (loading) return <div className="text-center py-20 text-lg text-gray-500 font-medium">Đang tải dữ liệu...</div>;
  if (!project) return notFound();

  // 👉 BƯỚC XỬ LÝ ẢNH THÔNG MINH: 
  // Lấy mảng images, nếu không có thì lấy imageUrl bọc trong mảng, nếu không có nữa thì trả về mảng rỗng []
  const galleryImages = (project.images && project.images.length > 0) 
    ? project.images 
    : (project.imageUrl ? [project.imageUrl] : []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* THƯ VIỆN ẢNH (SLIDE) */}
      <div className="w-full h-[50vh] md:h-[65vh] relative bg-gray-200">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="h-full w-full"
        >
          {galleryImages.length > 0 ? (
            galleryImages.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                >
                   <div className="absolute inset-0 bg-black/30"></div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
               <div className="flex items-center justify-center h-full text-gray-500 font-medium bg-gray-200">
                 Chưa có ảnh dự án
               </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Tiêu đề đè lên Slide */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent z-[10]">
          <div className="container mx-auto">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block shadow-sm">
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
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <p className="text-gray-500 text-sm">Giá Bán</p>
                <p className="text-xl font-bold text-red-600">{project.price}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Diện Tích</p>
                <p className="text-lg font-bold text-gray-800">{project.area}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Loại Hình</p>
                <p className="text-lg font-bold text-gray-800">{project.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Chủ Đầu Tư</p>
                <p className="text-lg font-bold text-gray-800">{project.developer}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">Tổng Quan Dự Án</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>

          {/* Cột phải: Form Liên hệ (Sticky) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhận Bảng Giá & Tư Vấn</h3>
              <p className="text-gray-500 text-sm mb-6">Để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ trong 15 phút.</p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input type="text" placeholder="Họ và tên *" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
                <input type="tel" placeholder="Số điện thoại *" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-all text-lg shadow-md">
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