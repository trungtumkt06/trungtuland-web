import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// 1. Lấy thông tin 1 dự án (Dùng cho trang Chi tiết & trang Sửa)
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ message: "Không tìm thấy dự án" }, { status: 404 });
    }
    
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi lấy dữ liệu dự án" }, { status: 500 });
  }
}

// 2. Cập nhật dự án (Hỗ trợ lưu mảng images mới)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updatedData = await request.json(); 
    
    await connectMongoDB();
    
    // findByIdAndUpdate sẽ ghi đè dữ liệu mới (bao gồm cả mảng images mới) vào ID này
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProject) {
      return NextResponse.json({ message: "Không tìm thấy dự án để cập nhật" }, { status: 404 });
    }

    return NextResponse.json({ message: "Đã cập nhật dự án thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi cập nhật dự án" }, { status: 500 });
  }
}

// 3. Xóa dự án
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ message: "Dự án không tồn tại hoặc đã bị xóa trước đó" }, { status: 404 });
    }

    return NextResponse.json({ message: "Đã xóa dự án thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi xóa dự án" }, { status: 500 });
  }
}