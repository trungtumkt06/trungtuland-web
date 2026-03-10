import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    // Kéo chuỗi kết nối từ file .env.local
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error("Không tìm thấy biến môi trường MONGODB_URI");
    }

    // Nếu đã kết nối rồi thì không kết nối lại nữa (giảm tải cho server)
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(uri);
    console.log("🟢 Đã kết nối thành công với MongoDB!");
  } catch (error) {
    console.log("🔴 Lỗi kết nối MongoDB: ", error);
  }
};

export default connectMongoDB;