import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// Lệnh POST: Thêm dự án mới
export async function POST(request: Request) {
  try {
    const { name, location, price, area, type, status, developer, description, imageUrl } = await request.json();
    await connectMongoDB();
    await Project.create({ name, location, price, area, type, status, developer, description, imageUrl });
    return NextResponse.json({ message: "Đã thêm dự án thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi thêm dự án" }, { status: 500 });
  }
}

// Lệnh GET: Lấy danh sách TẤT CẢ dự án
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải danh sách dự án" }, { status: 500 });
  }
}