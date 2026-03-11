"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "posts" | "project_categories" | "post_categories">("projects");
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  
  // State cho phần thêm danh mục
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resProj, resPost, resCat] = await Promise.all([
        fetch('/api/projects').catch(() => null),
        fetch('/api/posts').catch(() => null),
        fetch('/api/categories').catch(() => null)
      ]);
      
      if (resProj?.ok) setProjects((await resProj.json()).projects || []);
      if (resPost?.ok) setPosts((await resPost.json()).posts || []);
      if (resCat?.ok) setCategories((await resCat.json()).categories || []);
    } catch (error) {
      console.error("Lỗi đồng bộ dữ liệu:", error);
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleDelete = async (type: 'projects' | 'posts' | 'categories', id: string) => {
    const typeName = type === 'projects' ? 'dự án' : type === 'posts' ? 'bài viết' : 'danh mục';
    if (!confirm(`Bạn có chắc chắn muốn xóa ${typeName} này vĩnh viễn?`)) return;
    
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert("Lỗi khi xóa dữ liệu. Vui lòng thử lại.");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ.");
    }
  };

  const handleAddCategory = async (type: 'project' | 'post') => {
    if (!newCategoryName.trim()) return alert("Vui lòng nhập tên danh mục!");
    setIsAddingCat(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: newCategoryName, type }),
      });
      if (res.ok) {
        setNewCategoryName(""); 
        fetchData(); 
      } else {
        alert("Lỗi khi thêm danh mục!");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsAddingCat(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fe] py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              TRUNGTỰ <span className="text-blue-600 font-light">LAND</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Hệ thống quản lý dữ liệu trung tâm</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link 
              href={activeTab.includes("post") ? "/admin/them-bai-viet" : "/admin/them-du-an"} 
              className="flex-1 md:flex-none bg-blue-600 hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              {activeTab.includes("post") ? "VIẾT BÀI MỚI" : "THÊM DỰ ÁN"}
            </Link>
            <button 
              onClick={() => logoutAction()} 
              title="Đăng xuất"
              className="p-3.5 bg-slate-50 text-red-500 rounded-2xl hover:bg-red-50 transition-colors border border-slate-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        {/* TABS SELECTION */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          <button onClick={() => setActiveTab("projects")} className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all whitespace-nowrap ${activeTab === 'projects' ? 'bg-white text-blue-600 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}>
            DỰ ÁN ĐANG NIÊM YẾT ({projects.length})
          </button>
          
          <button onClick={() => setActiveTab("posts")} className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all whitespace-nowrap ${activeTab === 'posts' ? 'bg-white text-amber-600 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}>
            TẠP CHÍ TIN TỨC ({posts.length})
          </button>

          <button onClick={() => setActiveTab("project_categories")} className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all whitespace-nowrap ${activeTab === 'project_categories' ? 'bg-white text-blue-600 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}>
            DANH MỤC DỰ ÁN
          </button>

          <button onClick={() => setActiveTab("post_categories")} className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all whitespace-nowrap ${activeTab === 'post_categories' ? 'bg-white text-amber-600 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}>
            DANH MỤC TIN TỨC
          </button>
        </div>

        {/* DATA CONTAINER */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">Đang đồng bộ dữ liệu...</p>
            </div>
          ) : (
            <div>
              
              {/* === BẢNG DỰ ÁN === */}
              {activeTab === "projects" && (
                projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <p className="text-slate-500 font-medium text-lg">Chưa có dự án nào được niêm yết.</p>
                    <Link href="/admin/them-du-an" className="mt-4 text-blue-600 font-bold hover:underline">Thêm dự án đầu tiên ngay →</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p: any) => (
                      <div key={p._id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-300 overflow-hidden flex flex-col">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                          <img src={p.images?.[0] || p.imageUrl || '/placeholder.png'} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className={`px-3 py-1.5 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm ${p.status === 'Đang Mở Bán' ? 'bg-green-500/90 text-white' : p.status === 'Sắp Mở Bán' ? 'bg-amber-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                              {p.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-slate-800 text-xl leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
                            <span className="text-lg font-black text-blue-600">{p.price}</span><span className="text-slate-300 font-bold">•</span>
                            <span className="text-sm font-bold text-slate-500">{p.area}</span><span className="text-slate-300 font-bold">•</span>
                            <span className="text-sm font-bold text-slate-500">{p.type}</span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <div className="text-xs font-bold text-slate-400 truncate pr-4 flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              <span className="truncate">{p.location || 'Đang cập nhật'}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <Link href={`/du-an/${p._id}`} target="_blank" className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></Link>
                              <Link href={`/admin/sua-du-an/${p._id}`} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                              <button onClick={() => handleDelete('projects', p._id)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* === BẢNG TIN TỨC === */}
              {activeTab === "posts" && (
                posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                    </div>
                    <p className="text-slate-500 font-medium text-lg">Chưa có bài viết nào được xuất bản.</p>
                    <Link href="/admin/them-bai-viet" className="mt-4 text-amber-600 font-bold hover:underline">Viết bài đầu tiên ngay →</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post: any) => (
                      <div key={post._id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-col">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                          <img src={post.imageUrl || '/placeholder.png'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">{post.category}</span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-slate-800 text-lg leading-snug line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">{post.title}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{post.summary}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <div className="text-xs text-slate-400 font-medium">{new Date(post.createdAt || Date.now()).toLocaleDateString('vi-VN')}</div>
                            <div className="flex items-center gap-2">
                              <Link href={`/tin-tuc/${post.slug}`} target="_blank" className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></Link>
                              <Link href={`/admin/sua-bai-viet/${post.slug}`} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                              <button onClick={() => handleDelete('posts', post.slug || post._id)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* === DANH MỤC DỰ ÁN === */}
              {activeTab === "project_categories" && (
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 h-fit">
                    <h3 className="font-black text-slate-800 text-lg mb-4 uppercase tracking-tight">Thêm Danh Mục Mới</h3>
                    <div className="flex flex-col gap-3">
                      <input type="text" placeholder="VD: Đất nền, Biệt thự..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 font-medium" />
                      <button onClick={() => handleAddCategory('project')} disabled={isAddingCat} className="w-full bg-blue-600 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200">{isAddingCat ? "Đang lưu..." : "Thêm Danh Mục"}</button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-black text-slate-800 text-lg mb-4 tracking-tight">Danh Sách Hiện Có</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.filter(c => c.type === 'project').length === 0 ? (
                        <p className="text-slate-400 italic text-sm">Chưa có danh mục nào.</p>
                      ) : (
                        categories.filter(c => c.type === 'project').map(cat => (
                          <div key={cat._id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div><p className="font-bold text-slate-800">{cat.name}</p><p className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.slug}</p></div>
                            <button onClick={() => handleDelete('categories', cat._id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* === DANH MỤC TIN TỨC === */}
              {activeTab === "post_categories" && (
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 h-fit">
                    <h3 className="font-black text-slate-800 text-lg mb-4 uppercase tracking-tight">Thêm Danh Mục Mới</h3>
                    <div className="flex flex-col gap-3">
                      <input type="text" placeholder="VD: Phong thủy, Mẹo vặt..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-slate-800 font-medium" />
                      <button onClick={() => handleAddCategory('post')} disabled={isAddingCat} className="w-full bg-amber-500 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-200">{isAddingCat ? "Đang lưu..." : "Thêm Danh Mục"}</button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-black text-slate-800 text-lg mb-4 tracking-tight">Danh Sách Hiện Có</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.filter(c => c.type === 'post').length === 0 ? (
                        <p className="text-slate-400 italic text-sm">Chưa có danh mục nào.</p>
                      ) : (
                        categories.filter(c => c.type === 'post').map(cat => (
                          <div key={cat._id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all">
                            <div><p className="font-bold text-slate-800">{cat.name}</p><p className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.slug}</p></div>
                            <button onClick={() => handleDelete('categories', cat._id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </main>
  );
}