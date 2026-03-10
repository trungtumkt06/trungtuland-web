"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái đóng/mở menu mobile
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
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-[100]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center h-20">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-3xl font-bold tracking-wider text-gray-900 flex-shrink-0">
          TRUNGTỰ<span className="text-blue-600">LAND</span>
        </Link>
        
        {/* 2. DESKTOP MENU (Ẩn trên mobile) */}
        <div className="hidden md:flex space-x-8 font-semibold">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`transition-colors duration-200 uppercase text-sm tracking-wide ${
                pathname === link.href ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. CTA BUTTON (Ẩn trên mobile) */}
        <div className="hidden md:block">
          <Link href="/lien-he" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-lg hover:shadow-blue-200">
            NHẬN TƯ VẤN
          </Link>
        </div>

        {/* 4. MOBILE BUTTON (Chỉ hiện trên mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 focus:outline-none transition-transform active:scale-90"
          >
            {/* Icon Hamburger hoặc X */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 5. MOBILE MENU DROPDOWN (Chỉ hiện khi nhấn nút) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Đóng menu khi click link
              className={`block py-3 font-bold border-b border-gray-50 ${
                pathname === link.href ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/lien-he"
            onClick={() => setIsOpen(false)}
            className="block py-4 text-center bg-blue-600 text-white rounded-lg font-bold mt-4"
          >
            NHẬN TƯ VẤN NGAY
          </Link>
        </div>
      </div>
    </nav>
  );
}