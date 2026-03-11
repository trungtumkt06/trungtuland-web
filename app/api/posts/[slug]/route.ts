import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// 1. LẤY BÀI VIẾT THEO SLUG
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectMongoDB();
    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

// 2. CẬP NHẬT BÀI VIẾT THEO SLUG
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    await connectMongoDB();

    // Dùng findOneAndUpdate thay vì findByIdAndUpdate
    const updatedPost = await Post.findOneAndUpdate({ slug: slug }, body, { new: true });

    if (!updatedPost) {
      return NextResponse.json({ message: "Không tìm thấy bài viết để sửa" }, { status: 404 });
    }

    return NextResponse.json({ message: "Đã cập nhật bài viết!", post: updatedPost }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 3. XÓA BÀI VIẾT THEO SLUG (Phục vụ cho nút xóa ở trang Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectMongoDB();
    
    const deletedPost = await Post.findOneAndDelete({ slug: slug });
    
    if (!deletedPost) {
       return NextResponse.json({ message: "Không tìm thấy bài viết để xóa" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Đã xóa bài viết" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}