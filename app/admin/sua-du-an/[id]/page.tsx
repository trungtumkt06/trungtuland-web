"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  const [formData, setFormData] = useState({
    name: "", location: "", price: "", area: "", type: "", 
    status: "", developer: "", description: "", imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // 1. LẤY DỮ LIỆU CŨ ĐỔ VÀO FORM
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          const p = data.project;
          
          // 👉 BƯỚC CHUẨN HÓA 1: Rút ảnh từ mảng images ra để điền vào ô input
          const currentImage = (p.images && p.images.length > 0) 
            ? p.images[0] 
            : (p.imageUrl || "");

          setFormData({
            name: p.name || "",
            location: p.location || "",
            price: p.price || "",
            area: p.area || "",
            type: p.type || "",
            status: p.status || "Đang Mở Bán",
            developer: p.developer || "",
            description: p.description || "",
            imageUrl: currentImage, // Đưa ảnh đã rút ra vào đây
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dự án", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. GỬI DỮ LIỆU ĐÃ SỬA LÊN DATABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 👉 BƯỚC CHUẨN HÓA 2: Bọc cái link ảnh lại thành mảng images trước khi gửi đi
    const dataToSend = {
      ...formData,
      images: formData.imageUrl ? [formData.imageUrl] : [], 
    };

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend), // Gửi dataToSend thay vì formData gốc
      });

      if (res.ok) {
        alert("✅ Đã cập nhật thông tin dự án thành công!");
        router.push("/admin"); 
      } else {
        throw new Error("Lỗi khi cập nhật");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  if (isLoading) return <div className="text-center py-20 mt-10 text-xl font-bold">Đang tải dữ liệu dự án...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        
        <div className="flex justify-between items-center border-b pb-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh Sửa Dự Án</h1>
          <Link href="/admin" className="text-gray-500 hover:text-gray-800 underline">
            Quay lại bảng điều khiển
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đầu tư *</label>
              <input type="text" name="developer" value={formData.developer} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí (Địa chỉ) *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán *</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích *</label>
              <input type="text" name="area" value={formData.area} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình *</label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                <option value="Đang Mở Bán">Đang Mở Bán</option>
                <option value="Sắp Mở Bán">Sắp Mở Bán</option>
                <option value="Đang Bàn Giao">Đang Bàn Giao</option>
                <option value="Đã Bán Hết">Đã Bán Hết</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn hình ảnh (URL) *</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết dự án *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="w-full px-4 py-2 border rounded-md"></textarea>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors text-lg shadow-md">
              💾 Cập Nhật Thông Tin
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}