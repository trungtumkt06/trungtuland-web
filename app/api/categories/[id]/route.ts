import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Đã xóa danh mục" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}