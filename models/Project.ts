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
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true, // Tự động lưu thời gian tạo và cập nhật
  }
);

// Tránh lỗi khi Next.js reload lại file
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;