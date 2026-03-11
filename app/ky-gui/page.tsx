"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KyGuiPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Điều khiển Popup
  
  // Khởi tạo State để quản lý dữ liệu nhập vào
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    title: "",
    demand: "ban",
    propertyType: "canho",
    address: "",
    price: "",
    area: "",
    note: ""
  });

  // Ghi nhận thay đổi dữ liệu khi người dùng gõ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý gửi Form lên API
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/ky-gui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Gửi kèm cờ báo hiệu đây là form Ký Gửi
        body: JSON.stringify({ ...formData, isKyGuiPage: true }),
      });

      if (res.ok) {
        // Bật Popup xịn thay vì alert
        setShowSuccessPopup(true);
        // Xóa trắng form sau khi gửi thành công
        setFormData({
          fullName: "", phone: "", title: "", demand: "ban",
          propertyType: "canho", address: "", price: "", area: "", note: ""
        });
      } else {
        alert("Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      alert("Lỗi kết nối server!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 relative">
      {/* 1. HERO SECTION */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Ảnh nền */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Ký gửi nhà đất Trung Tự Land"
          />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 max-w-4xl text-center pt-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Ký Gửi <span className="text-yellow-500">Bất Động Sản</span>
          </h1>
          <div className="w-24 h-1.5 bg-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic max-w-2xl mx-auto">
            Giải pháp thanh khoản nhanh chóng, bảo mật thông tin tuyệt đối. Hãy để đội ngũ chuyên gia của chúng tôi kết nối tài sản của bạn với hàng ngàn khách hàng VIP.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 2. FORM KÝ GỬI (Đồng bộ phong cách Premium) */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group relative">
            
            {/* Họa tiết trang trí */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
                <span className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center text-yellow-600 text-2xl shadow-sm">📝</span>
                Cung Cấp Thông Tin Tài Sản
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* Khu vực 1: Thông tin liên hệ */}
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Thông tin chủ sở hữu
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input 
                        name="fullName" value={formData.fullName} onChange={handleChange} type="text" id="kg-fullName" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-fullName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Họ và tên *
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        name="phone" value={formData.phone} onChange={handleChange} type="tel" id="kg-phone" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Số điện thoại (Zalo) *
                      </label>
                    </div>
                  </div>
                </div>

                {/* Khu vực 2: Thông tin bất động sản */}
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Chi tiết bất động sản
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative md:col-span-2">
                      <input 
                        name="title" value={formData.title} onChange={handleChange} type="text" id="kg-title" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Tiêu đề (VD: Bán căn hộ 2PN Vinhomes Grand Park) *
                      </label>
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-medium text-gray-500 mb-1 tracking-wide uppercase">Nhu cầu *</label>
                      <select name="demand" value={formData.demand} onChange={handleChange} className="block w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 font-medium cursor-pointer transition-colors">
                        <option value="ban">Cần Bán</option>
                        <option value="thue">Cho Thuê</option>
                      </select>
                      <div className="absolute right-0 top-7 pointer-events-none text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-medium text-gray-500 mb-1 tracking-wide uppercase">Loại hình *</label>
                      <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="block w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 font-medium cursor-pointer transition-colors">
                        <option value="canho">Căn hộ chung cư</option>
                        <option value="nhapho">Nhà phố / Biệt thự</option>
                        <option value="datnen">Đất nền dự án</option>
                        <option value="khac">Khác</option>
                      </select>
                      <div className="absolute right-0 top-7 pointer-events-none text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                    </div>

                    <div className="relative">
                      <input 
                        name="price" value={formData.price} onChange={handleChange} type="text" id="kg-price" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-price" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Giá mong muốn (VNĐ) *
                      </label>
                    </div>

                    <div className="relative">
                      <input 
                        name="area" value={formData.area} onChange={handleChange} type="text" id="kg-area" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-area" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Diện tích (m²) *
                      </label>
                    </div>

                    <div className="relative md:col-span-2">
                      <input 
                        name="address" value={formData.address} onChange={handleChange} type="text" id="kg-address" required 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                      />
                      <label htmlFor="kg-address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Địa chỉ đầy đủ bất động sản *
                      </label>
                    </div>

                    <div className="relative md:col-span-2 mt-4">
                      <textarea 
                        name="note" value={formData.note} onChange={handleChange} id="kg-note" rows={3} 
                        className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors resize-none" placeholder=" "
                      ></textarea>
                      <label htmlFor="kg-note" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium">
                        Tình trạng pháp lý & Ghi chú thêm (Không bắt buộc)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nút Submit Gây Chú Ý */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="relative w-full overflow-hidden bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-extrabold py-5 rounded-2xl transition-all duration-500 shadow-[0_10px_20px_-10px_rgba(202,138,4,0.8)] hover:shadow-[0_15px_30px_-10px_rgba(202,138,4,1)] hover:-translate-y-1 flex justify-center items-center gap-3 group/btn"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse tracking-widest uppercase">Đang gửi dữ liệu...</span>
                    ) : (
                      <>
                        <span className="tracking-[0.15em] uppercase text-lg">Gửi Yêu Cầu Ký Gửi</span> 
                        <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4 italic">Bằng việc gửi form, bạn đồng ý để TRUNGTỰ LAND liên hệ tư vấn dựa trên thông tin đã cung cấp.</p>
                </div>

              </form>
            </div>
          </div>

          {/* 3. LỢI ÍCH KÝ GỬI (SIDEBAR ĐÃ TỐI ƯU GIAO DIỆN) */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Quy Trình Ký Gửi
              </h3>
              
              {/* Timeline dạng đường thẳng mượt mà cho Sidebar */}
              <div className="relative border-l-2 border-yellow-200 ml-4 space-y-10 pb-4">
                
                {/* Bước 1 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white bg-yellow-500 text-white font-bold text-sm shadow-md flex items-center justify-center">1</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 leading-none pt-1.5">Tiếp nhận thông tin</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2">Ghi nhận nhu cầu qua form hoặc hotline. Tư vấn sơ bộ về thị trường hiện tại.</p>
                </div>

                {/* Bước 2 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white bg-yellow-500 text-white font-bold text-sm shadow-md flex items-center justify-center">2</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 leading-none pt-1.5">Khảo sát & Định giá</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2">Chuyên viên đến tận nơi khảo sát, chụp ảnh chuyên nghiệp và đề xuất mức giá tốt nhất.</p>
                </div>

                {/* Bước 3 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white bg-yellow-500 text-white font-bold text-sm shadow-md flex items-center justify-center">3</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 leading-none pt-1.5">Triển khai Marketing</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2">Đưa tài sản lên hệ thống, chạy quảng cáo đa kênh để tiếp cận tệp khách hàng VIP.</p>
                </div>

                {/* Bước 4 */}
                <div className="relative pl-8 group">
                  {/* Chấm bước 4 có hiệu ứng radar nhấp nháy tạo điểm nhấn chốt sale */}
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white bg-green-500 text-white font-bold text-sm shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform">4</div>
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-green-400 animate-ping opacity-40"></div>
                  
                  <h4 className="font-bold text-green-600 text-lg mb-1 leading-none pt-1.5">Chốt giao dịch</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2">Hỗ trợ đàm phán, soạn thảo hợp đồng và lo trọn gói thủ tục sang tên pháp lý.</p>
                </div>
              </div>
            </div>

            {/* Banner Hotline VIP */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
              {/* Vòng tròn decor */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-600/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700 delay-100"></div>
              
              <div className="relative z-10 text-center">
                <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 animate-pulse">🔥 Ưu tiên đặc biệt</span>
                <h3 className="text-2xl font-extrabold mb-3">Bạn cần bán gấp?</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Gọi ngay Hotline Giám đốc để đưa tài sản vào danh sách VIP, tiếp cận trực tiếp mạng lưới nhà đầu tư sẵn tiền mặt.
                </p>
                <a href="tel:0776910286" className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-black py-4 rounded-xl text-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(202,138,4,0.8)] hover:shadow-[0_15px_30px_-10px_rgba(202,138,4,1)] hover:-translate-y-1">
                  <span className="animate-bounce">📞</span> 077.691.0286
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. KHỐI POPUP THÔNG BÁO THÀNH CÔNG */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSuccessPopup(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center z-10"
            >
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative">
                <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>

              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Đã Nhận Ký Gửi!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Thông tin bất động sản của quý khách đã được chuyển đến bộ phận thẩm định. Chúng tôi sẽ liên hệ qua Zalo trong thời gian sớm nhất.
              </p>

              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-gray-900 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 text-lg uppercase tracking-wider"
              >
                Trở về trang chủ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}