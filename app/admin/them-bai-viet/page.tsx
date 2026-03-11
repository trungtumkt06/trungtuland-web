"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [preview, setPreview] = useState<string>(""); 
  const [categories, setCategories] = useState<any[]>([]); // 👉 State lưu danh mục động
  
  const [form, setForm] = useState({
    title: "", 
    category: "", // Khởi tạo rỗng để bắt buộc người dùng chọn
    summary: "", 
    content: "", 
  });

  // 👉 1. GỌI API LẤY DANH MỤC TỰ ĐỘNG KHI VÀO TRANG
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(err => console.error("Lỗi tải danh mục:", err));
  }, []);

  // 👉 2. UPLOAD ẢNH BÌA LÊN CLOUDINARY (TỐI ƯU DATABASE)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsSubmitting(true);
    
    // ⚠️ NHỚ THAY THÔNG TIN CLOUDINARY CỦA BẠN VÀO ĐÂY ⚠️
    const CLOUD_NAME = "dt0iompws"; 
    const UPLOAD_PRESET = "trungtuland"; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {
        setPreview(data.secure_url); // Lưu link Cloudinary trả về
      } else {
        alert("Lỗi tải ảnh bìa. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error("Lỗi xử lý ảnh bìa:", err);
      alert("Lỗi kết nối khi tải ảnh bìa!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => setPreview("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return alert("Vui lòng tải lên ảnh bìa cho bài viết!");
    if (!form.category) return alert("Vui lòng chọn Chuyên mục cho bài viết!"); // Kiểm tra danh mục
    if (!form.content || form.content === '<p><br></p>') return alert("Vui lòng nhập nội dung bài viết!");
    
    setIsSubmitting(true);
    try {
      const dataToSend = { ...form, imageUrl: preview }; // Gửi link ảnh đi thay vì Base64
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        const errorText = await res.text();
        alert(`❌ Không thể xuất bản bài viết:\n${errorText.substring(0, 100)}`);
      }
    } catch (error) {
      alert("❌ Lỗi kết nối máy chủ.");
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24 relative selection:bg-amber-100">
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl border border-white">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Xuất Bản Thành Công!</h3>
              <p className="text-slate-500 mb-10 font-medium text-lg italic">Bài viết <span className="text-amber-600 font-bold">"{form.title}"</span> đã được lên trang nhất.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="h-24 px-8 md:px-16 flex items-center justify-between sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b-2 border-slate-100 shadow-sm">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-amber-600 transition-colors uppercase">TRUNGTỰ</span>
          <span className="text-3xl font-light tracking-[0.2em] text-amber-500 border-l-2 border-slate-200 pl-4 ml-1">LAND</span>
        </Link>
        <button onClick={() => router.back()} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-amber-600 transition-all">← Quay lại</button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-12">
          <p className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-3">Tạp chí Bất động sản</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Viết Bài Mới</h1>
          <p className="text-slate-500 mt-3 text-lg">Chia sẻ kiến thức, tin tức thị trường và kinh nghiệm đầu tư.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-black text-sm">1</span>
              <h2 className="text-xl font-bold text-slate-900">Ảnh bìa bài viết</h2>
            </div>
            <div className="w-full md:w-1/2">
              {!preview ? (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 group">
                  <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-amber-600">
                    {isSubmitting ? "Đang tải ảnh..." : "Tải ảnh bìa lên"}
                  </span>
                  <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 group shadow-md">
                  <img src={preview} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Ảnh bìa" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button type="button" onClick={removeImage} className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Đổi ảnh khác
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-black text-sm">2</span>
              <h2 className="text-xl font-bold text-slate-900">Thông tin bài viết</h2>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: 5 Lý do nên đầu tư..." className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-slate-900 text-lg font-bold" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
              </div>

              {/* 👉 3. SỬ DỤNG DANH MỤC ĐỘNG TỪ DATABASE */}
              <div className="flex flex-col gap-2 md:w-1/3">
                <label className="text-sm font-bold text-slate-700">Chuyên mục <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 outline-none transition-all text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 appearance-none bg-white font-medium cursor-pointer" 
                  value={form.category} 
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  required
                >
                  <option value="" disabled>-- Chọn chuyên mục --</option>
                  {categories.filter(c => c.type === 'post').map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Đoạn tóm tắt <span className="text-red-500">*</span></label>
                <textarea rows={3} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-slate-200 outline-none text-slate-700 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all resize-none" placeholder="Viết 1-2 câu tóm tắt..." required value={form.summary} onChange={(e) => setForm({...form, summary: e.target.value})} />
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-black text-sm">3</span>
              <h2 className="text-xl font-bold text-slate-900">Nội dung chi tiết</h2>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 transition-all">
              <RichTextEditor 
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
              />
            </div>
          </section>

          <div className="pt-6">
            <button type="submit" disabled={isSubmitting || showSuccess} className="w-full bg-amber-500 text-white py-5 rounded-2xl font-bold text-lg uppercase tracking-wider hover:bg-slate-900 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-amber-500/20 flex justify-center items-center gap-3">
              {isSubmitting ? "Đang xuất bản..." : "Xuất bản bài viết"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}