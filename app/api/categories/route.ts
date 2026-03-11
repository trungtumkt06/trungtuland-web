import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();

    // Tự động tạo slug chuẩn SEO từ tên danh mục
    const slug = body.name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + Date.now();

    const newCategory = await Category.create({
      name: body.name,
      slug: slug,
      type: body.type, // 'project' hoặc 'post'
    });

    return NextResponse.json({ message: "Thành công", category: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}