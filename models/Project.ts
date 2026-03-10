import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    area: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    developer: { type: String, required: true },
    description: { type: String, required: true },
    // CHỈNH SỬA TẠI ĐÂY: Chuyển sang mảng để lưu nhiều link ảnh
    images: { type: [String], required: true }, 
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;