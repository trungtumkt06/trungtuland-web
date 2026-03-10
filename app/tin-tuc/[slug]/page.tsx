"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
        }
      } catch (error) {
        console.error("Lỗi tải bài viết", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) return <div className="text-center py-20 italic">Đang mở trang tin...</div>;
  if (!post) return <div className="text-center py-20 font-bold">Bài viết không tồn tại.</div>;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. HEADER BÀI VIẾT */}
      <section className="relative h-[60vh] flex items-end pb-12">
        <div className="absolute inset-0 z-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <Link href="/tin-tuc" className="text-yellow-500 hover:underline mb-4 inline-block">
            ← Quay lại Tin tức
          </Link>
          <span className="block bg-yellow-600 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold max-w-4xl leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-gray-300">
             <span>👤 {post.author || "Trung Tự Land"}</span>
             <span>•</span>
             <span>📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </section>

      {/* 2. NỘI DUNG CHÍNH */}
      <section className="container mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* CỘT NỘI DUNG */}
          <div className="lg:w-2/3">
            {/* Tóm tắt bài viết */}
            <p className="text-xl font-bold text-gray-700 italic border-l-4 border-yellow-600 pl-6 mb-10 leading-relaxed">
              {post.summary}
            </p>

            {/* Nội dung bài viết (Xử lý xuống dòng) */}
            <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap leading-loose">
              {post.content}
            </div>

            {/* PHẦN CHỮ KÝ / CTA */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Bạn đang quan tâm đến Bất động sản Phú Yên?</h3>
              <p className="text-gray-600 mb-6">Liên hệ ngay với chúng tôi để được tư vấn các dự án tiềm năng nhất hiện nay.</p>
              <div className="flex gap-4">
                <Link href="/lien-he" className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold">Liên hệ tư vấn</Link>
                <Link href="/ky-gui" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold">Ký gửi ngay</Link>
              </div>
            </div>
          </div>

          {/* SIDEBAR (GỢI Ý) */}
          <div className="lg:w-1/3 space-y-10">
            <div className="sticky top-24">
               <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-yellow-600">Dịch vụ của chúng tôi</h3>
               <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors">
                     <p className="font-bold">🏠 Mua bán nhà đất</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors">
                     <p className="font-bold">📑 Pháp lý dự án</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors">
                     <p className="font-bold">💼 Tư vấn đầu tư</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}