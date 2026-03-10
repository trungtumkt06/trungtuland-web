import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();
    
    // Tạo dự án mới
    const newProject = await Project.create(body);

    return NextResponse.json({ message: "Đã thêm dự án thành công!", project: newProject }, { status: 201 });
  } catch (error: any) {
    console.error("LỖI SERVER RÕ RÀNG:", error);
    
    // Gửi chi tiết lỗi (error.message) ra trình duyệt để dễ đọc
    return NextResponse.json({ 
      message: "Lỗi Database",
      chiTiet: error.message || "Lỗi không xác định"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi khi tải", chiTiet: error.message }, { status: 500 });
  }
}