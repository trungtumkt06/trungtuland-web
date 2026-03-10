import connectMongoDB from "../../../lib/mongodb";
import Project from "../../../models/Project";
import { NextResponse } from "next/server";

// 1. LỆNH POST: Dùng để Thêm một dự án BĐS mới vào Database
export async function POST(request: Request) {
  try {
    // Lấy dữ liệu người dùng gửi lên từ form
    const { name, location, price, area, type, status, developer, description, imageUrl } = await request.json();
    
    // Kết nối CSDL
    await connectMongoDB();
    
    // Tạo dự án mới trong MongoDB
    await Project.create({ name, location, price, area, type, status, developer, description, imageUrl });
    
    return NextResponse.json({ message: "Đã thêm dự án thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi thêm dự án", error }, { status: 500 });
  }
}

// 2. LỆNH GET: Dùng để Lấy toàn bộ danh sách dự án hiển thị ra Trang Chủ
export async function GET() {
  try {
    await connectMongoDB();
    // Lấy tất cả dự án từ MongoDB
    const projects = await Project.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải dữ liệu", error }, { status: 500 });
  }
}