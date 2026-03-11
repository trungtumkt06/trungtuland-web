"use client";

import { useEffect, useRef, forwardRef } from "react";
// 👉 Đã chuyển import CSS lên đây để fix dứt điểm lỗi gạch đỏ
import "quill/dist/quill.snow.css"; 

// Tránh TypeScript báo lỗi khi gọi window.Quill
declare global {
  interface Window {
    Quill: any;
  }
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<any, Props>(({ value, onChange, placeholder }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadQuill = async () => {
      // 1. CHỈ LOAD SCRIPT Ở CLIENT 
      if (typeof window !== "undefined" && !window.Quill) {
        const Quill = (await import("quill")).default;
        window.Quill = Quill;
      }

      if (isMounted && containerRef.current && window.Quill && !quillRef.current) {
        
        // 👉 2. HÀM BẮT SỰ KIỆN KHI BẤM NÚT CHÈN ẢNH (UP LÊN CLOUDINARY)
        const imageHandler = () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const quill = quillRef.current;
            const range = quill.getSelection(true);

            // Chèn dòng chữ báo hiệu đang tải
            quill.insertText(range.index, "⏳ Đang tải ảnh lên...", "user");

            // ⚠️ CẤU HÌNH CLOUDINARY TẠI ĐÂY ⚠️
            const CLOUD_NAME = "dt0iompws"; 
            const UPLOAD_PRESET = "trungtuland"; 

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);

            try {
              // Bắn ảnh lên Cloudinary
              const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
              });
              const data = await res.json();

              if (data.secure_url) {
                // Xóa chữ "Đang tải ảnh..." (độ dài 22 ký tự)
                quill.deleteText(range.index, 22);
                
                // Chèn cái LINK ẢNH THẬT trả về từ mây vào bài
                quill.insertEmbed(range.index, "image", data.secure_url);
                quill.setSelection(range.index + 1); // Đẩy chuột ra sau ảnh
              } else {
                quill.deleteText(range.index, 22);
                alert("Lỗi tải ảnh: Hãy kiểm tra lại Cloud Name và Upload Preset.");
              }
            } catch (error) {
              quill.deleteText(range.index, 22);
              alert("Lỗi kết nối khi tải ảnh lên.");
            }
          };
        };

        // 👉 3. KHỞI TẠO KHUNG SOẠN THẢO
        quillRef.current = new window.Quill(containerRef.current, {
          theme: "snow",
          placeholder: placeholder || "Bắt đầu soạn thảo nội dung...",
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"], // Nút Ảnh
                ["clean"],
              ],
              handlers: {
                // Ghi đè chức năng của nút Ảnh mặc định
                image: imageHandler, 
              },
            },
          },
        });

        // 4. KHỞI TẠO GIÁ TRỊ BAN ĐẦU (NẾU CÓ)
        if (value) {
          quillRef.current.clipboard.dangerouslyPasteHTML(value);
        }

        // 5. LẮNG NGHE KHI NGƯỜI DÙNG GÕ CHỮ / CHÈN ẢNH
        quillRef.current.on("text-change", () => {
          onChange(quillRef.current.root.innerHTML);
        });
      }
    };

    loadQuill();

    return () => {
      isMounted = false;
    };
  }, []);

  // 6. XỬ LÝ KHI RESET FORM (SAU KHI ĐĂNG BÀI THÀNH CÔNG)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      if (value === "") {
        quillRef.current.setText("");
      } else if (value !== "<p><br></p>") {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value]);

  // Vùng chứa trình soạn thảo
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div ref={containerRef} className="h-[500px]" />
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;