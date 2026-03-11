"use client";

import React from 'react';
import { motion } from 'framer-motion'; 
import Link from 'next/link';

export default function AboutUs() {
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
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
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block border border-gray-100">
              <div className="flex items-center gap-6">
                <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <p className="text-gray-900 text-4xl font-extrabold">10<span className="text-yellow-500">+</span></p>
                  <p className="text-gray-500 font-medium tracking-wide">Năm Kinh Nghiệm</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CON SỐ ẤN TƯỢNG */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tầm Nhìn - Sứ Mệnh - Giá Trị Cốt Lõi</h2>
            <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" } as any}
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-yellow-500"
            >
              <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6">👁️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm Nhìn</h3>
              <p className="text-gray-600 leading-relaxed">Trở thành đơn vị phân phối và phát triển bất động sản uy tín hàng đầu, là biểu tượng của sự đẳng cấp và là lựa chọn số 1 của khách hàng thượng lưu.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" } as any}
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-blue-600"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ Mệnh</h3>
              <p className="text-gray-600 leading-relaxed">Cung cấp các giải pháp an cư và đầu tư thông minh, minh bạch pháp lý, góp phần nâng tầm chuẩn mực sống và kiến tạo cộng đồng tinh hoa.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" } as any}
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-green-600"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💎</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Giá Trị Cốt Lõi</h3>
              <p className="text-gray-600 leading-relaxed"><strong className="text-gray-900">Tâm - Tầm - Tín.</strong> Làm việc bằng cái tâm, nhìn bằng cái tầm chiến lược và giữ trọn chữ tín với mọi khách hàng.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. HÀNH TRÌNH PHÁT TRIỂN */}
      <section className="py-24 container mx-auto px-6 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hành Trình Kiến Tạo</h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] bg-yellow-200 md:-translate-x-1/2 z-0"></div>
          
          {/* 2014 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
            className="relative pl-10 md:pl-0 mb-12 flex flex-col md:flex-row items-start md:justify-between group z-10"
          >
            <div className="absolute left-0 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-yellow-500 border-4 border-white shadow md:-translate-x-1/2"></div>
            <div className="md:w-[45%] md:text-right pr-0 md:pr-10">
              <h3 className="text-2xl font-bold text-gray-900">2014</h3>
              <p className="text-yellow-600 font-medium mb-2">Viên gạch đầu tiên</p>
            </div>
            <div className="md:w-[45%] pl-0 md:pl-10 mt-2 md:mt-0">
              <p className="text-gray-600 leading-relaxed">Thành lập TRUNGTỰ LAND với văn phòng đầu tiên, tập trung phân phối phân khúc căn hộ trung tâm.</p>
            </div>
          </motion.div>

          {/* 2018 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
            className="relative pl-10 md:pl-0 mb-12 flex flex-col md:flex-row items-start md:justify-between group z-10"
          >
            <div className="absolute left-0 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-yellow-500 border-4 border-white shadow md:-translate-x-1/2"></div>
            <div className="md:w-[45%] md:text-right pr-0 md:pr-10 md:order-1">
              <p className="text-gray-600 leading-relaxed">Mở rộng mạng lưới, trở thành đại lý chiến lược F1 của các Chủ đầu tư hàng đầu như Vinhomes, Masterise.</p>
            </div>
            <div className="md:w-[45%] pl-0 md:pl-10 mt-2 md:mt-0 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900">2018</h3>
              <p className="text-yellow-600 font-medium mb-2">Vươn mình mạnh mẽ</p>
            </div>
          </motion.div>

          {/* Nay */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
            className="relative pl-10 md:pl-0 flex flex-col md:flex-row items-start md:justify-between group z-10"
          >
            <div className="absolute left-0 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-yellow-500 border-4 border-white shadow md:-translate-x-1/2 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
            <div className="md:w-[45%] md:text-right pr-0 md:pr-10">
              <h3 className="text-2xl font-bold text-gray-900">Nay</h3>
              <p className="text-yellow-600 font-medium mb-2">Định chuẩn thượng lưu</p>
            </div>
            <div className="md:w-[45%] pl-0 md:pl-10 mt-2 md:mt-0">
              <p className="text-gray-600 leading-relaxed">Hệ sinh thái dịch vụ toàn diện, phục vụ tệp khách hàng VIP với những dinh thự và biệt thự giới hạn.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. ĐỐI TÁC CHIẾN LƯỢC */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">Đối Tác Chiến Lược Của Chúng Tôi</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/9/9d/Vietcombank_Logo.svg/1280px-Vietcombank_Logo.svg.png" alt="Vietcombank" className="w-full h-full object-contain" />
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Techcombank_logo.png" alt="Techcombank" className="w-full h-full object-contain" />
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinhomes.png" alt="Vinhomes" className="w-full h-full object-contain" />
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Novaland_Logo.svg/960px-Novaland_Logo.svg.png" alt="Novaland" className="w-full h-full object-contain" />
            </div>
            <div className="w-48 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src="https://khangdiensaigon.com.vn/wp-content/uploads/2021/03/logo-masterise.png" alt="Masterise" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sẵn sàng đồng hành cùng bạn</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">Khám phá các dự án bất động sản đẳng cấp nhất hiện nay hoặc liên hệ với chúng tôi để nhận đặc quyền tư vấn 1:1.</p>
          <div className="flex justify-center gap-4">
            <Link href="/du-an" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">Xem Dự Án</Link>
            <Link href="/lien-he" className="bg-white border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-bold py-3 px-8 rounded-lg transition-colors">Liên Hệ Ngay</Link>
          </div>
        </div>
      </section>
    </main>
  );
}