import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    // Tạm thời bỏ unique: true nếu bạn đang test để tránh lỗi trùng lặp khi bấm nút nhiều lần
    slug: { type: String, required: true }, 
    summary: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, default: "Thị trường" },
    author: { type: String, default: "Trung Tự Land" },
  },
  { timestamps: true }
);

// Đoạn này giúp tránh lỗi "OverwriteModelError" khi Next.js reload trang
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;