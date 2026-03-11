"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

// ĐÃ THÊM: Thuộc tính area (Diện tích)
interface Project {
  _id: string; 
  name: string;
  location: string;
  price: string;
  status: string;
  imageUrl: string;
  area?: string; 
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, ease: "easeOut" }} 
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
    >
      {/* 1. KHUNG ẢNH DỰ ÁN */}
      <div className="relative h-72 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded shadow-md">
          {project.status}
        </div>
      </div>
      
      {/* 2. THÔNG TIN DỰ ÁN */}
      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-1">
          {project.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-3 flex items-start gap-2 line-clamp-2 leading-relaxed">
          <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>

        {/* ĐÃ THÊM: Hiển thị Diện tích với định dạng chuẩn m² */}
        {project.area && (
          <p className="text-gray-600 text-sm font-medium mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            {project.area.replace(/m2/gi, 'm²')}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="flex justify-between items-end border-t border-gray-100 pt-6">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Giá dự kiến</p>
              <p className="text-xl md:text-2xl font-bold text-yellow-600 tracking-tight">{project.price}</p>
            </div>
            
            <Link 
              href={`/du-an/${project._id}`} 
              className="inline-flex items-center justify-center bg-gray-50 hover:bg-yellow-500 text-gray-900 hover:text-white w-12 h-12 rounded-xl transition-all duration-300 group/btn shadow-sm"
              title="Xem chi tiết"
            >
              <svg className="w-5 h-5 transform group-hover/btn:-rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}