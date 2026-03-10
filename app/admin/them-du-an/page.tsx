"use client"; // Bắt buộc phải có đối với trang có form tương tác

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  
  // Nơi lưu trữ tạm thời dữ liệu bạn gõ vào form
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    area: "",
    type: "",
    status: "Đang Mở Bán", // Giá trị mặc định
    developer: "",
    description: "",
    imageUrl: "",
  });

  // Hàm xử lý khi bạn gõ vào các ô input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm chạy khi bạn bấm nút "Thêm Dự Án"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trang web tải lại khi bấm submit

    try {
      // Gửi dữ liệu xuống API chúng ta vừa tạo ở bước trước
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("🎉 Đã thêm dự án thành công vào CSDL!");
        router.push("/"); // Đẩy về trang chủ sau khi thêm xong
      } else {
        throw new Error("Lỗi khi thêm dự án");
      }
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Thêm Dự Án Bất Động Sản Mới
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên Dự Án */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
              <input type="text" name="name" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: Vinhomes Grand Park" />
            </div>

            {/* Chủ Đầu Tư */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đầu tư *</label>
              <input type="text" name="developer" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: Vingroup" />
            </div>

            {/* Vị trí */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí (Địa chỉ) *</label>
              <input type="text" name="location" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: Quận 9, TP. Thủ Đức" />
            </div>

            {/* Giá bán */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán *</label>
              <input type="text" name="price" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: Từ 3.5 Tỷ" />
            </div>

            {/* Diện tích */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích *</label>
              <input type="text" name="area" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: 50 - 120 m2" />
            </div>

            {/* Loại hình */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình *</label>
              <input type="text" name="type" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: Căn hộ cao cấp" />
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
              <select name="status" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="Đang Mở Bán">Đang Mở Bán</option>
                <option value="Sắp Mở Bán">Sắp Mở Bán</option>
                <option value="Đang Bàn Giao">Đang Bàn Giao</option>
                <option value="Đã Bán Hết">Đã Bán Hết</option>
              </select>
            </div>

            {/* Hình ảnh */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn hình ảnh (URL) *</label>
              <input type="text" name="imageUrl" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="VD: https://images.unsplash.com/photo-..." />
            </div>

            {/* Mô tả chi tiết */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết dự án *</label>
              <textarea name="description" onChange={handleChange} required rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập thông tin tổng quan, tiện ích, chính sách bán hàng..."></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors text-lg shadow-md">
              Lưu Dự Án Vào Cơ Sở Dữ Liệu
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}