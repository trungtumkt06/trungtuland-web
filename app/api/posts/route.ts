import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();

    // Tạo slug đơn giản
    const slug = body.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    const newPost = await Post.create({
      title: body.title,
      summary: body.summary,
      content: body.content,
      imageUrl: body.imageUrl,
      category: body.category,
      slug: slug,
      author: "Trung Tự Land"
    });

    return NextResponse.json({ message: "Thành công", post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error("LỖI TẠI API:", error);
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