"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/ky-gui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          isContactPage: true // Đánh dấu đây là dữ liệu từ trang liên hệ
        }),
      });

      if (res.ok) {
        alert("🎉 Cảm ơn bạn! Tin nhắn đã được gửi tới Trung Tự Land qua Telegram.");
        setFormData({ fullName: "", phone: "", email: "", message: "" });
      } else {
        alert("Lỗi khi gửi, vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-gray-900 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">"Sự hài lòng của khách hàng là thước đo thành công của Trung Tự Land"</p>
        </motion.div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-600 pl-4">Gửi tin nhắn ngay</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Họ và tên *" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-600 outline-none transition-all" />
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Số điện thoại *" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-600 outline-none transition-all" />
                </div>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email (Không bắt buộc)" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-600 outline-none transition-all" />
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Lời nhắn của bạn..." required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-600 outline-none transition-all"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-lg uppercase tracking-widest">
                  {isSubmitting ? "🚀 Đang gửi..." : "Gửi tin nhắn ngay"}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">📍 Địa chỉ văn phòng</h4>
                <p className="text-gray-600">Thôn Vinh Ba, Xã Hòa Đồng, Tây Hòa, Phú Yên</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">📞 Hotline 24/7</h4>
                <p className="text-yellow-700 font-bold text-xl">077.691.0286</p>
              </div>
            </div>
          </div>

          {/* BẢN ĐỒ */}
          <div className="h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62058.48424765793!2d109.1672346764516!3d13.011802513364234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f733190471c99%3A0xc3f8e58309503947!2zSMOyYSDEkOG7k25nLCBUw6J5IEjDsmEsIFBow7ogWcOqbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}