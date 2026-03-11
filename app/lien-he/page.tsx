"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Điều khiển Popup
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "Tư vấn dự án",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/ky-gui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isContactPage: true }),
      });

      if (res.ok) {
        // Bật Popup xịn thay vì dùng alert()
        setShowSuccessPopup(true); 
        setFormData({ fullName: "", phone: "", email: "", subject: "Tư vấn dự án", message: "" });
      } else {
        alert("Lỗi khi gửi, vui lòng thử lại."); 
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cấu hình hiệu ứng
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 relative">
      
      {/* 1. HERO SECTION VỚI ẢNH NỀN SANG TRỌNG */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Liên hệ Trung Tự Land"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Liên Hệ Với TRUNGTỰ <span className="text-yellow-500">LAND</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full mb-6"></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto italic">
            "Sự hài lòng và thịnh vượng của khách hàng chính là thước đo duy nhất cho thành công của chúng tôi."
          </motion.p>
        </div>
      </section>

      {/* 2. 3 KHỐI THÔNG TIN LIÊN HỆ (Đẩy lên đè vào ảnh nền) */}
      <section className="max-w-7xl mx-auto px-6 relative z-20 -mt-16">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-yellow-500 text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-yellow-500 group-hover:text-white transition-colors">📍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Văn Phòng Đại Diện</h3>
            <p className="text-gray-600">Thôn Vinh Ba, Xã Hòa Đồng<br/>Tây Hòa, Phú Yên</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-blue-600 text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">📞</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Hotline Trực Tuyến</h3>
            <a href="tel:0776910286" className="text-gray-600 hover:text-blue-600 font-bold text-lg block mb-1">077.691.0286</a>
            <p className="text-gray-400 text-sm">Hỗ trợ 24/7 kể cả ngày lễ</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-green-600 text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">🕰️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Giờ Làm Việc</h3>
            <p className="text-gray-600">Thứ 2 - Thứ 7: 08:00 - 18:00</p>
            <p className="text-gray-600">Chủ nhật: Đặt lịch hẹn trước</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. FORM LIÊN HỆ & BẢN ĐỒ */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Form Gửi Yêu Cầu (Bản Premium Siêu Nổi Bật) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full blur-2xl opacity-70 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Gửi Thông Tin <span className="text-yellow-600">Cho Chúng Tôi</span></h2>
              <p className="text-gray-500 mb-10 text-lg">Chuyên viên tư vấn cấp cao của chúng tôi sẽ liên hệ lại với bạn trong vòng 15 phút.</p>
              
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="relative">
                    <input 
                      name="fullName" value={formData.fullName} onChange={handleChange} type="text" id="fullName" required 
                      className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                    />
                    <label htmlFor="fullName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide">
                      Họ và tên *
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input 
                      name="phone" value={formData.phone} onChange={handleChange} type="tel" id="phone" required 
                      className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                    />
                    <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide">
                      Số điện thoại *
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="relative">
                    <input 
                      name="email" value={formData.email} onChange={handleChange} type="email" id="email" 
                      className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors" placeholder=" " 
                    />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide">
                      Email của bạn
                    </label>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-500 mb-1 tracking-wide uppercase">Chủ đề quan tâm *</label>
                    <select 
                      name="subject" value={formData.subject} onChange={handleChange} 
                      className="block w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 font-medium cursor-pointer transition-colors"
                    >
                      <option value="Tư vấn dự án">Tư vấn mua dự án</option>
                      <option value="Ký gửi nhà đất">Ký gửi nhà đất</option>
                      <option value="Hỗ trợ pháp lý">Hỗ trợ hồ sơ pháp lý</option>
                      <option value="Khác">Vấn đề khác</option>
                    </select>
                    <div className="absolute right-0 top-7 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8">
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} id="message" rows={3} required 
                    className="block w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer transition-colors resize-none" placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium tracking-wide">
                    Nội dung chi tiết *
                  </label>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="relative w-full overflow-hidden bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-extrabold py-5 rounded-2xl transition-all duration-500 shadow-[0_10px_20px_-10px_rgba(202,138,4,0.8)] hover:shadow-[0_15px_30px_-10px_rgba(202,138,4,1)] hover:-translate-y-1 flex justify-center items-center gap-3 group/btn"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse tracking-widest uppercase">Đang kết nối...</span>
                    ) : (
                      <>
                        <span className="tracking-[0.2em] uppercase text-lg">Gửi Yêu Cầu Ngay</span> 
                        <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>

          {/* Bản đồ Google Maps */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="h-full flex flex-col">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 hidden lg:block">Chỉ Đường Đến Văn Phòng</h2>
            <div className="flex-grow rounded-3xl overflow-hidden shadow-xl border-4 border-white relative min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.807314486588!2d109.2885448143224!3d12.984442290847708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316feaf586cc2a01%3A0x6b801a6b0c2a8f81!2zSMOyYSDEkOG7k25nLCBUw6J5IEjDsmEsIFBow7ogWcOqbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1684824823903!5m2!1svi!2s" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 4. FAQ - CÂU HỎI THƯỜNG GẶP */}
      <section className="py-20 bg-gray-900 text-white mt-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Câu Hỏi Thường Gặp</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="text-lg font-bold text-yellow-500 mb-3 flex items-start gap-2">
                <span className="text-2xl leading-none">Q.</span> Thủ tục ký gửi bất động sản cần những gì?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Quý khách chỉ cần cung cấp bản photo Sổ đỏ/Sổ hồng, CCCD và hình ảnh thực tế của bất động sản. Đội ngũ TRUNGTỰ LAND sẽ hỗ trợ thẩm định giá và chụp ảnh chuyên nghiệp hoàn toàn miễn phí.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="text-lg font-bold text-yellow-500 mb-3 flex items-start gap-2">
                <span className="text-2xl leading-none">Q.</span> Công ty có hỗ trợ vay ngân hàng không?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Có. Chúng tôi là đối tác chiến lược của Vietcombank, Techcombank, MB Bank... Khách hàng sẽ được hỗ trợ vay lên đến 70% giá trị tài sản với thủ tục giải ngân nhanh chóng.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="text-lg font-bold text-yellow-500 mb-3 flex items-start gap-2">
                <span className="text-2xl leading-none">Q.</span> Thời gian tư vấn trực tiếp là bao lâu?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ngay sau khi nhận được yêu cầu, chuyên viên của chúng tôi sẽ liên hệ trong 15 phút để sơ bộ nhu cầu, sau đó có thể đặt lịch hẹn tư vấn chuyên sâu trực tiếp tại văn phòng hoặc nhà của khách hàng.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="text-lg font-bold text-yellow-500 mb-3 flex items-start gap-2">
                <span className="text-2xl leading-none">Q.</span> Bất động sản tại đây có sổ hồng không?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                100% dự án và nhà đất do TRUNGTỰ LAND phân phối đều có pháp lý minh bạch, sổ hồng riêng hoặc quyết định 1/500 rõ ràng. Khách hàng được kiểm tra hồ sơ gốc trước khi giao dịch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KHỐI POPUP THÔNG BÁO THÀNH CÔNG */}
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
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Gửi Thành Công!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Cảm ơn bạn đã tin tưởng <strong>TRUNGTỰ LAND</strong>. Yêu cầu của bạn đã được tiếp nhận. Chuyên viên của chúng tôi sẽ liên hệ lại trong ít phút nữa.
              </p>

              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-gray-900 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 text-lg uppercase tracking-wider"
              >
                Đóng Cửa Sổ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}