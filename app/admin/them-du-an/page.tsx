"use client";

// 👉 Đã bổ sung useEffect vào đây để hết gạch đỏ
import { useState, useRef, useEffect } from "react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AddProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [previews, setPreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    name: "", 
    location: "", 
    price: "", 
    area: "", 
    type: "", // Để trống để bắt người dùng phải chọn danh mục
    status: "Đang Mở Bán", 
    description: "", 
    developer: "Trung Tự Land"
  });

  // 👉 GỌI API LẤY DANH MỤC TỰ ĐỘNG
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(err => console.error("Lỗi tải danh mục:", err));
  }, []);

  // --- HÀM NÉN ẢNH TỰ ĐỘNG ---
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.7)); // Nén chất lượng 0.7
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setIsSubmitting(true);
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      try {
        const compressedBase64 = await compressImage(file);
        setPreviews((prev) => [...prev, compressedBase64]);
      } catch (err) {
        console.error("Lỗi xử lý ảnh:", err);
      }
    }
    setIsSubmitting(false);
  };

  const removeImage = (index: number) => setPreviews((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (previews.length === 0) return alert("Vui lòng tải lên ít nhất một hình ảnh tuyệt tác!");
    
    setIsSubmitting(true);
    try {
      const dataToSend = { ...form, area: form.area.replace(/m2/gi, 'm²'), images: previews };
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 2500);
      } else {
        // 👉 ĐÃ THÊM BỘ BẮT LỖI TẠI ĐÂY
        let errorMessage = `Lỗi ${res.status}: ${res.statusText}`;
        try {
           const errorJson = await res.json();
           errorMessage = errorJson.message || errorMessage;
        } catch (e) {
           // Nếu server trả về text thuần hoặc HTML lỗi (ví dụ lỗi 413)
           const errorText = await res.text();
           if (errorText.includes("Payload Too Large")) {
             errorMessage = "Dung lượng ảnh quá lớn! Server từ chối tiếp nhận.";
           } else {
             errorMessage = errorText.substring(0, 100); // Lấy 100 ký tự đầu tiên của lỗi
           }
        }
        
        alert(`❌ Không thể niêm yết dự án:\n${errorMessage}`);
      }
    } catch (error) {
      alert("❌ Lỗi kết nối máy chủ. Vui lòng kiểm tra lại mạng hoặc file API.");
      console.error(error);
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24 relative selection:bg-blue-100">
      
      {/* 1. THÔNG BÁO THÀNH CÔNG (OVERLAY) */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-slate-900/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl border border-white"
            >
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Thành Công!</h3>
              <p className="text-slate-500 mb-10 font-medium text-lg italic">Dự án <span className="text-blue-600 font-bold">"{form.name}"</span> đã được niêm yết.</p>
              
              <button 
                onClick={() => router.push("/admin")}
                className="w-full bg-blue-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-200"
              >
                Về Trang Quản Trị
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVBAR */}
      <nav className="h-24 px-8 md:px-16 flex items-center justify-between sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b-2 border-slate-100 shadow-sm">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-blue-700 transition-colors uppercase">TRUNGTỰ</span>
          <span className="text-3xl font-light tracking-[0.2em] text-blue-600 border-l-2 border-slate-200 pl-4 ml-1">LAND</span>
        </Link>
        <button onClick={() => router.back()} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-700 transition-all">
          ← Quay lại
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12">
        
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3">Hệ thống quản trị</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Niêm Yết Dự Án Mới
          </h1>
          <p className="text-slate-500 mt-3 text-lg">Điền đầy đủ thông tin bên dưới để xuất bản dự án lên hệ thống.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          
          {/* SECTION 1: HÌNH ẢNH */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-sm">1</span>
              <h2 className="text-xl font-bold text-slate-900">Thư viện hình ảnh</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 group"
              >
                <svg className="w-8 h-8 mb-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-600">Tải ảnh lên</span>
                <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
              </button>

              <AnimatePresence>
                {previews.map((src, index) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={index} 
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group shadow-sm"
                  >
                    <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Preview ${index}`} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={() => removeImage(index)} 
                        className="bg-white text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-red-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 2: THÔNG SỐ */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-sm">2</span>
              <h2 className="text-xl font-bold text-slate-900">Thông số cơ bản</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Tên dự án", name: "name", placeholder: "VD: Vinhomes Grand Park", type: "text" },
                { label: "Vị trí địa lý", name: "location", placeholder: "VD: Quận 9, TP. Thủ Đức", type: "text" },
                { label: "Giá bán niêm yết", name: "price", placeholder: "VD: 3.5 Tỷ", type: "text", highlight: true },
                { label: "Diện tích", name: "area", placeholder: "VD: 100m2", type: "text" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 ${field.highlight ? 'text-blue-700 font-bold text-lg bg-blue-50/50' : 'text-slate-900'}`}
                    value={(form as any)[field.name]}
                    onChange={(e) => setForm({...form, [field.name]: e.target.value})}
                    required
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Loại hình sản phẩm <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none transition-all text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 appearance-none bg-white font-medium cursor-pointer" 
                  value={form.type} 
                  onChange={(e) => setForm({...form, type: e.target.value})}
                  required
                >
                  <option value="" disabled>-- Chọn loại hình --</option>
                  {/* Lọc và map các danh mục có type là 'project' từ Database */}
                  {categories.filter(c => c.type === 'project').map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Trạng thái <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none transition-all text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 appearance-none bg-white font-medium cursor-pointer" 
                  value={form.status} 
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="Đang Mở Bán">🟢 Đang Mở Bán</option>
                  <option value="Sắp Mở Bán">🟡 Sắp Mở Bán</option>
                  <option value="Đã Bán Hết">🔴 Đã Bán Hết</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: MÔ TẢ */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-sm">3</span>
              <h2 className="text-xl font-bold text-slate-900">Nội dung truyền thông</h2>
            </div>
            <textarea 
              rows={8} 
              className="w-full bg-white px-5 py-4 rounded-2xl border-2 border-slate-200 outline-none text-slate-800 leading-relaxed placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all resize-y"
              placeholder="Mô tả chi tiết về tiện ích, pháp lý, và tiềm năng sinh lời của dự án..."
              required 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
            />
          </section>

          {/* SUBMIT ACTION */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting || showSuccess} 
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg uppercase tracking-wider hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? "Đang lưu dữ liệu..." : "Xác nhận niêm yết"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}