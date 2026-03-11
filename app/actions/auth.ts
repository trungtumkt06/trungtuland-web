"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthResponse = {
  error?: string;
};

export async function loginAction(formData: FormData): Promise<AuthResponse | void> {
  const password = formData.get("password");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return { error: "Lỗi hệ thống: Chưa cấu hình mật khẩu." };
  }

  if (password !== ADMIN_PASSWORD) {
    return { error: "Mật khẩu không chính xác!" };
  }

  const cookieStore = await cookies(); 
  
  cookieStore.set("admin_token", "authenticated_success", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 ngày
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies(); 
  
  cookieStore.delete("admin_token");
  redirect("/login");
}