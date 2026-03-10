"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardCombined() {
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");
  const [isLoading, setIsLoading] = useState(true);

  // ---------------- STATE DỰ ÁN ----------------
  const initialProjectState = {
    name: "", location: "", price: "", area: "", type: "", 
    status: "Đang Mở Bán", developer: "", description: "", imageUrl: "",
  };
  const [projectForm, setProjectForm] = useState(initialProjectState);
  const [projects, setProjects] = useState<any[]>([]);

  // ---------------- STATE TIN TỨC ----------------
  const initialPostState = {
    title: "", summary: "", content: "", imageUrl: "", category: "Thị trường"
  };
  const [postForm, setPostForm] = useState(initialPostState);
  const [posts, setPosts] = useState<any[]>([]);

  // ---------------- HÀM GỌI DỮ LIỆU ----------------
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resProj = await fetch('/api/projects');
      if (resProj.ok) {
        const dataProj = await resProj.json();
        setProjects(dataProj.projects || []);
      }

      const resPost = await fetch('/api/posts');
      if (resPost.ok) {
        const dataPost = await resPost.json();
        setPosts(dataPost.posts || []);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ---------------- XỬ LÝ DỰ ÁN ----------------
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = { 
        ...projectForm, 
        images: projectForm.imageUrl ? [projectForm.imageUrl] : [] 
      };
      
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("🎉 Thêm dự án thành công!");
        setProjectForm(initialProjectState);
        fetchData();
      }
    } catch (err) { alert("Lỗi khi kết nối API Dự án"); }
  };

  // ---------------- XỬ LÝ TIN TỨC (SỬA LẠI ĐỂ CHẠY CHUẨN) ----------------
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(postForm),
      });

      if (res.ok) {
        alert("📰 Đăng bài viết thành công!");
        setPostForm(initialPostState); // Reset form
        fetchData(); // Cập nhật danh sách bên phải
      } else {
        const errorData = await res.json();
        alert(`❌ Lỗi: ${errorData.message || "Không thể đăng bài"}`);
      }
    } catch (error) {
      alert("❌ Lỗi kết nối server, hãy kiểm tra file route.ts");
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Xóa dự án này?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) fetchData();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) fetchData();
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & CHUYỂN TAB */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Quản Trị Trung Tự Land</h1>
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
            <button 
              onClick={() => setActiveTab("projects")}
              className={`px-8 py-2.5 rounded-lg font-bold transition-all duration-300 ${activeTab === "projects" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-700"}`}
            >
              🏢 DỰ ÁN
            </button>
            <button 
              onClick={() => setActiveTab("posts")}
              className={`px-8 py-2.5 rounded-lg font-bold transition-all duration-300 ${activeTab === "posts" ? "bg-yellow-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-700"}`}
            >
              📰 TIN TỨC
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI: FORM */}
          <div className="xl:col-span-1">
            {activeTab === "projects" ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-8 animate-in fade-in duration-500">
                <h2 className="text-lg font-bold text-blue-600 mb-6 border-b-2 border-blue-50 pb-2 uppercase italic">Thêm Dự Án Mới</h2>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <input type="text" placeholder="Tên dự án" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={projectForm.name} onChange={(e) => setProjectForm({...projectForm, name: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Giá" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={projectForm.price} onChange={(e) => setProjectForm({...projectForm, price: e.target.value})} required />
                    <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                        value={projectForm.status} onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}>
                      <option value="Đang Mở Bán">Đang Mở Bán</option>
                      <option value="Sắp Mở Bán">Sắp Mở Bán</option>
                      <option value="Đã Bán Hết">Đã Bán Hết</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Vị trí" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={projectForm.location} onChange={(e) => setProjectForm({...projectForm, location: e.target.value})} required />
                  <input type="text" placeholder="Link Ảnh" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} required />
                  <textarea placeholder="Mô tả..." rows={4} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required />
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">LƯU DỰ ÁN</button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-8 animate-in fade-in duration-500">
                <h2 className="text-lg font-bold text-yellow-600 mb-6 border-b-2 border-yellow-50 pb-2 uppercase italic">Đăng Bài Viết Mới</h2>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <input type="text" placeholder="Tiêu đề bài viết" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                    value={postForm.title} onChange={(e) => setPostForm({...postForm, title: e.target.value})} required />
                  <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none bg-white" 
                    value={postForm.category} onChange={(e) => setPostForm({...postForm, category: e.target.value})}>
                    <option value="Thị trường">Thị trường</option>
                    <option value="Kinh nghiệm">Kinh nghiệm</option>
                    <option value="Quy hoạch">Quy hoạch</option>
                  </select>
                  <input type="text" placeholder="Link Ảnh bìa" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                    value={postForm.imageUrl} onChange={(e) => setPostForm({...postForm, imageUrl: e.target.value})} required />
                  <input type="text" placeholder="Tóm tắt ngắn" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                    value={postForm.summary} onChange={(e) => setPostForm({...postForm, summary: e.target.value})} required />
                  <textarea placeholder="Nội dung chi tiết..." rows={8} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                    value={postForm.content} onChange={(e) => setPostForm({...postForm, content: e.target.value})} required />
                  <button type="submit" className="w-full bg-yellow-600 text-white font-bold py-3.5 rounded-xl hover:bg-yellow-700 transition-all shadow-md active:scale-95">ĐĂNG BÀI NGAY</button>
                </form>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: BẢNG DANH SÁCH */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 italic text-gray-500">Đang đồng bộ dữ liệu...</div>
            ) : activeTab === "projects" ? (
              <div className="overflow-x-auto">
                <h2 className="text-xl font-bold mb-6 flex justify-between">Danh Sách Dự Án <span>({projects.length})</span></h2>
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">Tên dự án</th>
                      <th className="p-4">Giá</th>
                      <th className="p-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p._id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-bold text-gray-800">{p.name}</td>
                        <td className="p-4 text-red-600 font-bold">{p.price}</td>
                        <td className="p-4 text-center space-x-4">
                          <Link href={`/admin/sua-du-an/${p._id}`} className="text-blue-600 font-bold hover:underline">Sửa</Link>
                          <button onClick={() => deleteProject(p._id)} className="text-red-500 font-bold hover:underline">Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <h2 className="text-xl font-bold mb-6 flex justify-between">Bài Viết Đã Đăng <span>({posts.length})</span></h2>
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b text-gray-400 text-sm">
                    <tr>
                      <th className="p-4">Tiêu đề bài viết</th>
                      <th className="p-4">Chuyên mục</th>
                      <th className="p-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-800 line-clamp-1">{post.title}</td>
                        <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">{post.category}</span></td>
                        <td className="p-4 text-center">
                          <button onClick={() => deletePost(post._id)} className="text-red-500 font-bold hover:underline">Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}