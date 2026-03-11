import { Metadata } from "next";
import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";

// Hàm này sẽ tự động chạy ngầm trên Server để tạo Thẻ SEO trước khi gửi về Zalo/Facebook
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    await connectMongoDB();
    
    // Tìm dự án trong database
    const project = await Project.findById(id);

    // Nếu không tìm thấy dự án
    if (!project) {
      return { title: "Dự án không tồn tại - TRUNGTỰ LAND" };
    }

    // Lấy tấm ảnh ĐẦU TIÊN trong thư viện ảnh để làm ảnh bìa share lên mạng
    const coverImage = project.images && project.images.length > 0 
      ? project.images[0] 
      : "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200"; // Ảnh dự phòng

    return {
      title: `${project.name} | TRUNGTỰ LAND`, // Tiêu đề tab trình duyệt
      description: `${project.type} cao cấp tại ${project.location}. Giá chỉ từ ${project.price}.`,
      openGraph: {
        title: `🔥 Đang Mở Bán: ${project.name}`, // Tít in đậm khi gửi Zalo
        description: `📍 Vị trí: ${project.location} | 💰 Giá: ${project.price}. Bấm xem chi tiết ngay!`, // Dòng mô tả nhỏ
        images: [
          {
            url: coverImage, // Hình tự động lấy từ Database
            width: 1200,
            height: 630,
            alt: project.name,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    return { title: "Chi tiết dự án - TRUNGTỰ LAND" };
  }
}

// Bắt buộc phải có đoạn này để render trang page.tsx ở bên trong
export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}