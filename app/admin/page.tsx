"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho dự án hiển thị trong bảng
type ProjectType = {
  _id: string;
  name: string;
  price: string;
  status: string;
};

export default function AdminDashboardCombined() {
  // ---------------- LƯU TRỮ TRẠNG THÁI ----------------
  
  // 1. Trạng thái của Form thêm dự án
  const initialFormState = {
    name: "",
    location: "",
    price: "",
    area: "",
    type: "",
    status: "Đang Mở Bán",
    developer: "",
    description: "",
    imageUrl: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // 2. Trạng thái của Bảng danh sách dự án
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---------------- CÁC HÀM XỬ LÝ ----------------

  // Hàm 1: Gọi dữ liệu từ Database để đổ vào Bảng
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      
      // 👉 THÊM DÒNG NÀY ĐỂ XEM SERVER TRẢ VỀ CÁI GÌ:
      console.log("Dữ liệu từ Server trả về:", data); 

      setProjects(data.projects || []); 
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi tải dữ liệu", error);
      setProjects([]); 
      setIsLoading(false);
    }
  };

  // Tự động chạy Hàm 1 khi vừa mở trang quản trị
  useEffect(() => {
    fetchProjects();
  }, []);

  // Hàm 2: Ghi nhận chữ bạn gõ vào Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm 3: Bấm nút "Thêm Dự Án"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("🎉 Đã thêm dự án thành công!");
        setFormData(initialFormState); // Xóa trắng form để nhập dự án khác
        fetchProjects(); // Cập nhật lại cái Bảng bên dưới ngay lập tức
      } else {
        throw new Error("Lỗi khi thêm dự án");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // Hàm 4: Bấm nút "Xóa" ở Bảng
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Bạn có chắc chắn muốn xóa dự án này vĩnh viễn không?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("🗑️ Đã xóa dự án thành công!");
        fetchProjects(); // Cập nhật lại cái Bảng bên dưới sau khi xóa
      } else {
        alert("Có lỗi xảy ra khi xóa.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- GIAO DIỆN HIỂN THỊ ----------------
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Tiêu đề Trang Quản Trị */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Bảng Điều Khiển Quản Trị</h1>
          <p className="text-gray-500">Xin chào, Admin TRUNGTỰ LAND</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI (HOẶC TRÊN CÙNG): FORM THÊM DỰ ÁN (Chiếm 1/3 chiều rộng) */}
          <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Thêm Dự Án Mới</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán *</label>
                  <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                    <option value="Đang Mở Bán">Đang Mở Bán</option>
                    <option value="Sắp Mở Bán">Sắp Mở Bán</option>
                    <option value="Đã Bán Hết">Đã Bán Hết</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích *</label>
                  <input type="text" name="area" value={formData.area} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình *</label>
                  <input type="text" name="type" value={formData.type} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đầu tư *</label>
                <input type="text" name="developer" value={formData.developer} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh (URL) *</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors mt-2">
                + Lưu Dự Án
              </button>
            </form>
          </div>

          {/* CỘT PHẢI (HOẶC DƯỚI CÙNG): BẢNG QUẢN LÝ DỰ ÁN (Chiếm 2/3 chiều rộng) */}
          <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Danh Sách Dự Án Đang Bán ({projects.length})</h2>
            
            {isLoading ? (
              <p className="text-center py-10">Đang tải dữ liệu...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Tên Dự Án</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Giá Bán</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Trạng Thái</th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-500">Chưa có dự án nào. Thêm ở cột bên trái!</td>
                      </tr>
                    ) : (
                      projects?.map((project) => (
                        <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 border-b font-medium text-gray-900">{project.name}</td>
                          <td className="py-4 px-4 border-b text-red-600 font-bold">{project.price}</td>
                          <td className="py-4 px-4 border-b">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                              {project.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 border-b text-center">
                            {/* Nút Sửa sẽ code sau */}
                            <Link href={`/admin/sua-du-an/${project._id}`} className="text-blue-600 hover:text-blue-800 font-medium mr-4">
                              Sửa
                            </Link>
                            <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 font-medium">
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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