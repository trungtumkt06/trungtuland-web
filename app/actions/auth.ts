"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 1. Khai báo kiểu dữ liệu trả về để TypeScript hiểu rõ
export type AuthResponse = {
  error?: string;
};

export async function loginAction(formData: FormData): Promise<AuthResponse | void> {
  const password = formData.get("password");

  // 2. Kiểm tra an toàn: TypeScript báo đỏ vì ADMIN_PASSWORD có thể chưa được định nghĩa trong .env
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    console.error("LỖI: Bạn chưa cài đặt ADMIN_PASSWORD trong file .env.local");
    return { error: "Lỗi hệ thống: Chưa cấu hình mật khẩu quản trị." };
  }

  // 3. So sánh mật khẩu
  if (password !== ADMIN_PASSWORD) {
    return { error: "Mật khẩu không chính xác!" };
  }

  // 4. Nếu đúng, thiết lập Cookie
  // Lưu ý: cookies() trong Server Action phải được gọi đúng cách
  const cookieStore = cookies();
  cookieStore.set("admin_token", "authenticated_success", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 ngày
    path: "/",
  });

  // 5. Điều hướng - redirect phải được gọi ngoài cùng, không nằm trong else/if phức tạp
  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}