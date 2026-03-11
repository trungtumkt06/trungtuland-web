import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    // Dùng trường 'type' để phân biệt đây là danh mục của Dự án hay Tin tức
    type: { type: String, enum: ['project', 'post'], required: true }, 
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;