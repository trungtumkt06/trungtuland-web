import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";
import "quill/dist/quill.snow.css"; 

// --- 1. FETCH DATA ---
const getPost = cache(async (slug: string) => {
  try {
    await connectMongoDB();
    const post = await Post.findOne({ slug }).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    return null;
  }
});

// --- 2. SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Bài viết không tồn tại | Trung Tự Land" };
  
  return { 
    title: `${post.title} | Trung Tự Land`, 
    description: post.summary,
    openGraph: { images: [post.imageUrl] }
  };
}

// --- 3. MAIN COMPONENT ---
export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) notFound();

  const formattedDate = new Date(post.createdAt).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-24 font-sans selection:bg-blue-100">
      
      {/* ========================================================= */}
      {/* LỘT XÁC: HERO COVER (ẢNH BÌA LÀM NỀN CHO TIÊU ĐỀ) */}
      {/* ========================================================= */}
      <div className="relative w-full min-h-[60vh] md:min-h-[85vh] flex flex-col justify-end overflow-hidden bg-slate-900">
        
        {/* Ảnh nền Full-width */}
        {post.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover transform scale-105"
            />
            {/* Lớp phủ Gradient đen mờ để làm nổi bật chữ */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/20"></div>
          </div>
        )}

        {/* Nút quay lại (Nổi trên cùng bên trái) */}
        <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-50">
          <Link href="/tin-tuc" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 hover:text-amber-400 transition-all group backdrop-blur-md bg-black/30 px-6 py-3 rounded-full border border-white/10 hover:border-amber-400/30">
            <span className="w-6 h-[2px] bg-white/50 group-hover:bg-amber-400 transition-colors"></span>
            Trở về danh mục
          </Link>
        </div>

        {/* Nội dung Header nằm đè lên ảnh (Căn dưới cùng) */}
        <header className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-24 pt-32">
          
          {/* ========================================================= */}
          {/* TAG & DATE: PHONG CÁCH "GOLDEN GLOW" (HÀO QUANG VÀNG KIM) */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8">            
            
            {/* Thẻ Category: Nền Gradient Vàng Kim, viền sáng, đổ bóng màu Amber */}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold tracking-[0.3em] text-[10px] uppercase px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-300/40">
              {post.category || "Thị Trường"}
            </span>
            
            {/* Dấu chấm phân cách phát sáng Vàng */}
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]"></span>
            
            {/* Thẻ Ngày tháng: Giữ nguyên hiệu ứng kính mờ thanh lịch */}
            <span className="text-white font-bold text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl">
              Cập nhật: {formattedDate}
            </span>           
          </div>
          
          {/* Tiêu đề chính: Dùng font-bold thay vì font-black để giữ nét thanh lịch */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white mb-8 max-w-5xl drop-shadow-2xl">
            {post.title}
          </h1>
          
          {/* Tóm tắt: Chuyển sang font-light (mỏng nhẹ) để tạo độ tương phản với tiêu đề */}
          <p className="text-xl md:text-3xl text-slate-200 font-light leading-relaxed max-w-4xl italic drop-shadow-lg">
            "{post.summary}"
          </p>
        </header>
      </div>

      {/* ========================================================= */}
      {/* BỐ CỤC CHÍNH: GRID 2 CỘT (CONTENT & CONTACT SIDEBAR) */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative pt-20">
        
        {/* CỘT NỘI DUNG CHÍNH (Chiếm 8/12 không gian) */}
        <article className="lg:col-span-8 max-w-3xl w-full mx-auto lg:mx-0">
          {/* NỘI DUNG TỪ QUILL EDITOR (Giữ nguyên tối ưu của bạn) */}
          <div 
            className="ql-editor !p-0 
              text-[1.15rem] md:text-[1.25rem] text-slate-700 leading-loose
              [&>p]:mb-8 
              [&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-slate-900 [&>h2]:mb-6 [&>h2]:mt-12 [&>h2]:tracking-tight
              [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mb-4 [&>h3]:mt-8
              [&>img]:rounded-2xl [&>img]:shadow-lg [&>img]:my-10
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-2
              [&>blockquote]:border-l-4 [&>blockquote]:border-blue-600 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:my-8
              [&>a]:text-blue-600 [&>a]:font-bold [&>a]:underline [&>a]:decoration-blue-200 hover:[&>a]:decoration-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FOOTER BÀI VIẾT VÀ NÚT CHIA SẺ */}
          <footer className="mt-28 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 pb-10">
            
            {/* Khối chia sẻ: Trực diện, ghi rõ tên Mạng xã hội, viền Vàng Kim khi Hover */}
            <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Chia sẻ bài viết
              </span>
              <div className="flex gap-3 w-full md:w-auto">
                {/* NÚT FACEBOOK */}
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://trungtuland.vercel.app/tin-tuc/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 md:flex-none justify-center items-center px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-[0_4px_15px_rgba(245,158,11,0.15)]"
                >
                  Facebook
                </a>
                
                {/* NÚT ZALO */}
                <a 
                  href={`https://sp.zalo.me/plugins/share?link=https://trungtuland.vercel.app/tin-tuc/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 md:flex-none justify-center items-center px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-[0_4px_15px_rgba(245,158,11,0.15)]"
                >
                  Zalo
                </a>
              </div>
            </div>

            {/* Nút Đọc tiếp: Quyền lực, tone Đen chuyển Gradient Vàng Kim y hệt nút Gọi Điện */}
            <Link 
              href="/tin-tuc" 
              className="w-full md:w-auto flex items-center justify-center bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-slate-900 hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-[0_10px_25px_rgba(245,158,11,0.3)]"
            >
              Đọc bài viết khác
            </Link>
          </footer>
        </article>

        {/* CỘT LIÊN HỆ BÊN PHẢI: STICKY CONTACT SIDEBAR (Chiếm 4/12 không gian) */}
        <aside className="lg:col-span-4 sticky top-10 space-y-12">

          <div className="bg-slate-900 p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-amber-900/30">
            
            {/* Hiệu ứng ánh sáng Glow Vàng Kim (Gold) ẩn hiện */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[50px] -mr-16 -mt-16 transition-all duration-700 group-hover:bg-amber-500/20"></div>
            
            <div className="relative z-10">
              {/* Nhãn phụ: Trở về tracking vừa phải, sang trọng */}
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs block mb-5 border-b border-slate-800 pb-4">
                Đặc quyền tư vấn
              </span>
              
              {/* Tiêu đề: Đồng bộ với thẻ H2/H3 trong bài viết (font-bold thay vì font-black) */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                Sẵn sàng sở hữu <br />
                <span className="text-amber-400 italic font-medium">Tuyệt tác này?</span>
              </h3>
              
              {/* Nội dung: Đồng bộ tuyệt đối với thẻ <p> trong bài (font-normal, leading-loose) */}
              <p className="text-slate-400 mb-10 font-normal leading-loose text-[1.1rem]">
                Kết nối trực tiếp với chuyên gia Trung Tự Land để nhận bảng giá off-market và chính sách ưu đãi giới hạn.
              </p>
              
              <div className="space-y-4">
                {/* Nút Gọi: Nền Vàng Kim rực rỡ, chữ đen (Tương phản quyền lực) */}
                <a href="/lien-he" className="flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-[0_10px_25px_rgba(245,158,11,0.2)]">
                  Liên hệ tư vấn
                </a>
                
                {/* Nút Zalo: Viền Vàng Kim, hiệu ứng Glassmorphism nhẹ */}
                <a href="https://zalo.me/0776910286" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-white/5 backdrop-blur-sm border border-amber-500/40 text-amber-400 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-amber-500/10 transition-colors">
                  Chat qua Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Banner Ký gửi nhỏ gọn */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-8 md:p-10 rounded-[2.5rem] border border-amber-900/10 text-center shadow-lg shadow-slate-200/40 relative overflow-hidden group">
            
            {/* Hiệu ứng ánh sáng vàng nhẹ ở góc */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[30px] -ml-10 -mt-10 transition-all duration-700 group-hover:bg-amber-500/10"></div>
            
            <div className="relative z-10">
              {/* Tiêu đề: Đồng bộ font-bold và italic như khối VIP */}
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                Ký gửi <span className="text-amber-600 italic font-medium">Bất động sản</span>
              </h4>
              
              {/* Nội dung: Đồng bộ font-normal và leading-loose (khoảng cách dòng rộng) */}
              <p className="text-slate-500 mb-8 font-normal leading-loose text-sm md:text-[0.95rem]">
                Tiếp cận hàng ngàn khách hàng VIP thông qua mạng lưới tiếp thị đặc quyền của Trung Tự Land.
              </p>
              
              {/* Nút bấm: Viền vàng kim, chữ vàng kim, hover mượt mà */}
              <Link 
                href="/ky-gui" 
                className="inline-block w-full md:w-auto bg-white border border-amber-500/30 text-amber-600 px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.05)]"
              >
                Gửi yêu cầu ngay
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}