import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();

    // 1. Tạo Slug chuẩn SEO (Xóa sạch dấu tiếng Việt và chống lỗi)
    const rawTitle = body.title || "bai-viet-moi";
    const slug = rawTitle
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Xóa dấu (VD: ồ -> o)
      .replace(/[đĐ]/g, "d")                            // Thay đ thành d
      .replace(/([^0-9a-z-\s])/g, "")                   // Xóa ký tự đặc biệt
      .replace(/(\s+)/g, "-")                           // Thay dấu cách bằng dấu gạch ngang
      .replace(/^-+|-+$/g, "") + "-" + Date.now();      // Thêm Date.now() để không bao giờ trùng link

    // 2. Lưu vào Database
    const newPost = await Post.create({
      title: body.title,
      summary: body.summary,
      content: body.content,
      imageUrl: body.imageUrl,
      category: body.category || "Thị trường",
      slug: slug,
      author: "Trung Tự Land"
    });

    return NextResponse.json({ message: "Thành công", post: newPost }, { status: 201 });
  } catch (error: any) {
    // ĐOẠN NÀY RẤT QUAN TRỌNG: Nó sẽ in lỗi chi tiết ra Terminal
    console.error("🚨 LỖI TẠI API:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}