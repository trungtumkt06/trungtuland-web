"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. HEADER TIN TỨC */}
      <section className="bg-white border-b py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-yellow-600 font-bold tracking-widest uppercase text-sm"
          >
            Blog & Kiến thức
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
          >
            Tin Tức Bất Động Sản
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về thị trường, quy hoạch và kinh nghiệm đầu tư bất động sản tại Phú Yên và cả nước.
          </p>
        </div>
      </section>

      {/* 2. DANH SÁCH BÀI VIẾT */}
      <div className="container mx-auto px-6 mt-12">
        {loading ? (
          <div className="text-center py-20">Đang tải tin tức...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <motion.article 
                key={post._id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <Link href={`/tin-tuc/${post.slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform hover:scale-110 transition-duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                      <span>📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span>•</span>
                      <span>👤 {post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>
                    <span className="text-yellow-600 font-bold text-sm flex items-center gap-1 group">
                      Đọc tiếp <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400 italic">
            Chưa có bài viết nào được đăng.
          </div>
        )}
      </div>
    </main>
  );
}