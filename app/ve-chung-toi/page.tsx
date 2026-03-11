"use client";

import React from 'react';
import { motion } from 'framer-motion'; 
import Link from 'next/link';

export default function AboutUs() {
  const fadeInUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Về Trung Tự Land"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 } as any}
            className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 } as any}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Kiến tạo giá trị thực - Nâng tầm chuẩn mực sống cho giới thượng lưu Việt.
          </motion.p>
        </div>
      </section>

      {/* 2. CÂU CHUYỆN THƯƠNG HIỆU */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp as any} // Ép kiểu tại đây
            className="lg:w-1/2"
          >
            <span className="text-yellow-600 font-bold uppercase tracking-[0.2em] text-sm">Câu chuyện TRUNGTỰ LAND</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-8 leading-tight">
              Hơn một thập kỷ <br/><span className="text-yellow-600">Kiến tạo di sản</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Được thành lập với tầm nhìn trở thành cầu nối tin cậy giữa khách hàng và những không gian sống mơ ước, 
                <strong className="text-gray-900"> TRUNGTỰ LAND</strong> không ngừng nỗ lực để mang đến những sản phẩm bất động sản có giá trị thực, 
                pháp lý minh bạch và tiềm năng sinh lời vượt trội.
              </p>
              <p>
                Chúng tôi tin rằng mỗi dự án không chỉ là những khối bê tông vô tri, mà là tổ ấm khơi nguồn hạnh phúc, là tài sản truyền đời mang đậm dấu ấn cá nhân của mỗi gia chủ. Sự hài lòng của khách hàng chính là thước đo thành công duy nhất của chúng tôi.
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">Ông Trung Tự</p>
                <p className="text-yellow-600 font-medium">Nhà Sáng Lập & CEO</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 } as any}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000" 
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                alt="Professional Team"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CON SỐ ẤN TƯỢNG */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp as any} // Ép kiểu tại đây
            className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-gray-800 py-12"
          >
            <div>
              <p className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-4">500+</p>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Dự án phân phối</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-4">2000+</p>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Khách hàng VIP</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-4">150+</p>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Chuyên viên tư vấn</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-4">20+</p>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Giải thưởng uy tín</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TẦM NHÌN - SỨ MỆNH */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} 
              variants={fadeInUp as any} // Ép kiểu tại đây
              className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-yellow-500"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm Nhìn</h3>
              <p className="text-gray-600">Trở thành đơn vị uy tín hàng đầu, biểu tượng đẳng cấp cho khách hàng thượng lưu.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} 
              variants={fadeInUp as any} // Ép kiểu tại đây
              transition={{ delay: 0.2 } as any}
              className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-blue-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ Mệnh</h3>
              <p className="text-gray-600">Cung cấp giải pháp an cư thông minh, góp phần nâng tầm chuẩn mực sống tinh hoa.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} 
              variants={fadeInUp as any} // Ép kiểu tại đây
              transition={{ delay: 0.4 } as any}
              className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-green-600"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Giá Trị</h3>
              <p className="text-gray-600">Tâm - Tầm - Tín. Làm việc bằng cái tâm và giữ trọn chữ tín với khách hàng.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. HÀNH TRÌNH PHÁT TRIỂN */}
      <section className="py-24 container mx-auto px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] bg-yellow-200 md:-translate-x-1/2 z-0"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} 
            variants={fadeInUp as any} // Ép kiểu tại đây
            className="relative pl-10 md:pl-0 mb-12 flex flex-col md:flex-row items-start md:justify-between group z-10"
          >
            <div className="absolute left-0 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-yellow-500 border-4 border-white shadow md:-translate-x-1/2"></div>
            <div className="md:w-[45%] md:text-right pr-0 md:pr-10">
              <h3 className="text-2xl font-bold text-gray-900">2014</h3>
              <p className="text-gray-600">Thành lập văn phòng đầu tiên.</p>
            </div>
            <div className="md:w-[45%] pl-0 md:pl-10 mt-2 md:mt-0"></div>
          </motion.div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-4">
            <Link href="/du-an" className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">Xem Dự Án</Link>
            <Link href="/lien-he" className="bg-white border-2 border-yellow-600 text-yellow-600 font-bold py-3 px-8 rounded-lg">Liên Hệ Ngay</Link>
          </div>
        </div>
      </section>
    </main>
  );
}