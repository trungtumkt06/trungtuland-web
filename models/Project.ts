import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    area: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    developer: { type: String, default: "Đang cập nhật" },
    description: { type: String, required: true },
    // Cho phép cả images (mảng) và imageUrl (chuỗi) để không bao giờ bị lỗi vặt
    images: [{ type: String }], 
    imageUrl: { type: String, required: false } 
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;