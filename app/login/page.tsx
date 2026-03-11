"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError("");
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Họa tiết trang trí nền */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="text-3xl font-black tracking-tighter text-gray-900">
              TRUNGTỰ<span className="text-blue-600 font-light tracking-widest ml-1">LAND</span>
            </Link>
            <p className="text-gray-400 text-sm mt-3 font-medium uppercase tracking-widest">Hệ thống quản trị</p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mật khẩu truy cập</label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl flex items-center gap-2 border border-red-100">
                <span>⚠️</span> {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-95 flex justify-center items-center uppercase tracking-widest"
            >
              {isPending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Xác nhận đăng nhập"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-400 hover:text-blue-600 text-sm transition-colors font-medium">
              ← Quay về trang chủ
            </Link>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} TRUNGTỰ LAND Management System
        </p>
      </div>
    </main>
  );
}