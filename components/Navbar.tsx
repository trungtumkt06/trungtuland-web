"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Trang Chủ", href: "/" },
    { name: "Về Chúng Tôi", href: "/ve-chung-toi" },
    { name: "Dự Án", href: "/du-an" },
    { name: "Ký Gửi", href: "/ky-gui" },
    { name: "Tin Tức", href: "/tin-tuc" },
    { name: "Liên Hệ", href: "/lien-he" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md text-gray-800 shadow-md sticky top-0 z-[100] border-b border-blue-50">
      <div className="container mx-auto px-6 flex justify-between items-center h-20">
        
        {/* 1. LOGO - Phối màu Xanh Navy và Sky Blue */}
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 transition-colors group-hover:text-blue-600">
            TRUNGTỰ
          </span>
          <span className="text-2xl md:text-3xl font-light tracking-widest text-blue-600 border-l border-blue-100 pl-2">
            LAND
          </span>
        </Link>
        
        {/* 2. DESKTOP MENU - Chữ đen, vạch xanh lướt mượt */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`relative py-2 text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                pathname === link.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* 3. CTA BUTTON - Xanh dương đậm cực kỳ uy tín */}
        <div className="hidden md:block">
          <Link 
            href="/lien-he" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-200 active:scale-95"
          >
            Nhận Tư Vấn
          </Link>
        </div>

        {/* 4. MOBILE BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-600 p-2 focus:outline-none"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* 5. MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-blue-50 shadow-inner"
          >
            <div className="px-8 py-10 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-bold tracking-widest uppercase ${
                    pathname === link.href ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/lien-he"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-center bg-blue-600 text-white rounded-xl font-black tracking-widest uppercase shadow-lg shadow-blue-200"
              >
                Nhận Tư Vấn Ngay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}