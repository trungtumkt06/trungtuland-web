import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// Lệnh GET: Lấy thông tin 1 dự án để điền vào Form sửa
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await connectMongoDB();
    const project = await Project.findById(resolvedParams.id);
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi lấy dữ liệu dự án" }, { status: 500 });
  }
}

// Lệnh PUT: Cập nhật dự án
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const updatedData = await request.json(); 
    await connectMongoDB();
    await Project.findByIdAndUpdate(resolvedParams.id, updatedData);
    return NextResponse.json({ message: "Đã cập nhật dự án thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi cập nhật dự án" }, { status: 500 });
  }
}

// Lệnh DELETE: Xóa dự án
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await connectMongoDB();
    await Project.findByIdAndDelete(resolvedParams.id);
    return NextResponse.json({ message: "Đã xóa dự án thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi xóa dự án" }, { status: 500 });
  }
}