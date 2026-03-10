import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// Lệnh POST: Thêm dự án mới với danh sách nhiều ảnh
export async function POST(request: Request) {
  try {
    // Đổi imageUrl thành images để khớp với Model mới
    const { name, location, price, area, type, status, developer, description, images } = await request.json();
    
    await connectMongoDB();
    
    // Lưu vào Database
    await Project.create({ 
      name, 
      location, 
      price, 
      area, 
      type, 
      status, 
      developer, 
      description, 
      images // Truyền mảng images vào đây
    });

    return NextResponse.json({ message: "Đã thêm dự án thành công!" }, { status: 201 });
  } catch (error) {
    console.error("Lỗi API POST:", error);
    return NextResponse.json({ message: "Lỗi khi thêm dự án" }, { status: 500 });
  }
}

// Lệnh GET: Lấy danh sách TẤT CẢ dự án
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find().sort({ createdAt: -1 }); // Thêm sort để dự án mới nhất hiện lên đầu
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải danh sách dự án" }, { status: 500 });
  }
}