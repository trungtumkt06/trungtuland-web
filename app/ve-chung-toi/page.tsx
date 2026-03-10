"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Về Trung Tự Land"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Về Chúng Tôi
          </motion.h1>
          <div className="h-1.5 w-20 bg-yellow-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* 2. GIỚI THIỆU CHUNG */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm">Trung Tự Land</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
              Hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản cao cấp
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Được thành lập với tầm nhìn trở thành cầu nối tin cậy giữa khách hàng và những không gian sống mơ ước, 
              <strong> Trung Tự Land</strong> không ngừng nỗ lực để mang đến những sản phẩm bất động sản có giá trị thực, 
              pháp lý minh bạch và tiềm năng sinh lời vượt trội.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chúng tôi tin rằng mỗi dự án không chỉ là những khối bê tông, mà là nơi khơi nguồn hạnh phúc và là tài sản truyền đời cho mỗi gia đình Việt.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000" 
              className="rounded-2xl shadow-2xl"
              alt="Professional Team"
            />
            <div className="absolute -bottom-10 -left-10 bg-yellow-600 p-8 rounded-2xl hidden md:block">
              <p className="text-white text-4xl font-bold">10+</p>
              <p className="text-white/80 font-medium">Năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl mb-6">👁️</div>
              <h3 className="text-2xl font-bold mb-4">Tầm Nhìn</h3>
              <p className="text-gray-400 leading-relaxed">
                Trở thành đơn vị phân phối và phát triển bất động sản uy tín hàng đầu, là lựa chọn số 1 của khách hàng khi nghĩ tới bất động sản giá trị thực.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Sứ Mệnh</h3>
              <p className="text-gray-400 leading-relaxed">
                Cung cấp các giải pháp an cư và đầu tư thông minh, minh bạch, góp phần nâng cao chất lượng sống và thịnh vượng cho cộng đồng.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl mb-6">💎</div>
              <h3 className="text-2xl font-bold mb-4">Giá Trị Cốt Lõi</h3>
              <p className="text-gray-400 leading-relaxed">
                Tâm - Tầm - Tín. Chúng tôi làm việc bằng cái tâm, nhìn bằng cái tầm và giữ trọn chữ tín với mọi khách hàng và đối tác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CON SỐ ẤN TƯỢNG */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-16">Những Con Số Biết Nói</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-5xl font-extrabold text-yellow-600 mb-2">500+</p>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Dự án phân phối</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-yellow-600 mb-2">2000+</p>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Khách hàng hài lòng</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-yellow-600 mb-2">150+</p>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Nhân sự chuyên nghiệp</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-yellow-600 mb-2">20+</p>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Giải thưởng uy tín</p>
          </div>
        </div>
      </section>

      {/* 5. ĐỐI TÁC CHIẾN LƯỢC (Tùy chọn) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-10">Đối tác chiến lược</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-bold text-gray-400">VINHOMES</span>
            <span className="text-2xl font-bold text-gray-400">NOVALAND</span>
            <span className="text-2xl font-bold text-gray-400">SUNGROUP</span>
            <span className="text-2xl font-bold text-gray-400">MASTERISE</span>
            <span className="text-2xl font-bold text-gray-400">NAM LONG</span>
          </div>
        </div>
      </section>
    </main>
  );
}