"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function KyGuiPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 1. Khởi tạo State để quản lý dữ liệu nhập vào
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

  // 2. Hàm ghi nhận thay đổi dữ liệu khi người dùng gõ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Hàm xử lý gửi Form lên API Telegram
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Gọi đến API chúng ta sẽ tạo ở bước sau
      const res = await fetch("/api/ky-gui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("🎉 Thông tin ký gửi của bạn đã được gửi thành công đến Admin. Chúng tôi sẽ liên hệ lại sớm nhất!");
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
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gray-900 py-20 text-white text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500">Ký Gửi Bất Động Sản</h1>
          <div className="w-24 h-1.5 bg-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 leading-relaxed">
            Bạn đang có nhu cầu Bán hoặc Cho thuê bất động sản? Hãy để **TRUNGTỰ LAND** giúp bạn kết nối với hàng nghìn khách hàng tiềm năng một cách nhanh chóng và hiệu quả nhất.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 -mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 2. FORM KÝ GỬI */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="bg-yellow-100 p-2 rounded-lg text-yellow-600 text-xl">📝</span>
              Thông Tin Bất Động Sản Ký Gửi
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Thông tin chủ sở hữu */}
                <div className="md:col-span-2 border-l-4 border-yellow-600 pl-4">
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Thông tin liên hệ</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên *</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại (Zalo) *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="090xxx" />
                </div>

                {/* Thông tin bất động sản */}
                <div className="md:col-span-2 mt-4 border-l-4 border-yellow-600 pl-4">
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Thông tin tài sản</h3>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề ký gửi *</label>
                  <input name="title" value={formData.title} onChange={handleChange} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Ví dụ: Bán căn hộ 2PN Vinhomes Grand Park" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nhu cầu ký gửi *</label>
                  <select name="demand" value={formData.demand} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none appearance-none bg-white">
                    <option value="ban">Cần Bán</option>
                    <option value="thue">Cho Thuê</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Loại hình *</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none appearance-none bg-white">
                    <option value="canho">Căn hộ</option>
                    <option value="nhapho">Nhà phố / Biệt thự</option>
                    <option value="datnen">Đất nền</option>
                    <option value="khac">Khác</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ bất động sản *</label>
                  <input name="address" value={formData.address} onChange={handleChange} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Số nhà, tên đường, Quận/Huyện..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Giá mong muốn (VNĐ) *</label>
                  <input name="price" value={formData.price} onChange={handleChange} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Ví dụ: 3.5 tỷ" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Diện tích (m2) *</label>
                  <input name="area" value={formData.area} onChange={handleChange} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Ví dụ: 75m2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả thêm & Tình trạng pháp lý</label>
                  <textarea name="note" value={formData.note} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-600 outline-none transition-all" placeholder="Ví dụ: Sổ hồng riêng, hướng Đông Nam, nội thất đầy đủ..."></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-yellow-600/30 flex items-center justify-center gap-2 text-lg`}
              >
                {isSubmitting ? "🚀 ĐANG GỬI THÔNG TIN..." : "GỬI YÊU CẦU KÝ GỬI NGAY"}
              </button>
            </form>
          </div>

          {/* 3. LỢI ÍCH KÝ GỬI (SIDEBAR) */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-6 border-b pb-4 text-gray-800">Quy trình ký gửi</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold text-gray-800">Tiếp nhận thông tin</p>
                    <p className="text-sm text-gray-500">Ghi nhận thông tin bất động sản ngay khi bạn gửi form.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold text-gray-800">Thẩm định giá</p>
                    <p className="text-sm text-gray-500">Chuyên viên khảo sát và tư vấn mức giá bán/thuê tốt nhất.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold text-gray-800">Tiếp thị & Bán hàng</p>
                    <p className="text-sm text-gray-500">Triển khai quảng cáo đa kênh tiếp cận khách hàng tiềm năng.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">Bạn cần hỗ trợ nhanh?</h3>
              <p className="mb-6 text-white/90 italic">Liên hệ trực tiếp với chuyên viên để được xử lý trong 15 phút.</p>
              <a href="tel:0901234567" className="block text-center bg-white text-yellow-700 font-bold py-4 rounded-xl text-2xl hover:bg-gray-100 transition-colors shadow-lg">
                📞 090.xxx.xxxx
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}