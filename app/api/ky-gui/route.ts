import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. TỐI ƯU BẢO MẬT: Lấy Token từ biến môi trường (.env)
    // Dùng dấu || để phòng hờ trường hợp quên cài biến môi trường (Lúc dev thì vẫn chạy được)
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8459397057:AAFjmP3KlNqwQO1agnZgTv38oJT4VG9uk9A"; 
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "1973971973";

    let message = "";

    // 2. PHÂN LUỒNG 3 TRẠNG THÁI (Liên Hệ, Dự Án, Ký Gửi)
    // Đã chuyển sang dùng thẻ HTML (<b>, <i>) để Telegram không bị lỗi khi khách nhập ký tự lạ
    if (body.isContactPage) {
      message = `
🚨 <b>TIN NHẮN LIÊN HỆ MỚI</b> 🚨
-----------------------------------
👤 <b>Khách hàng:</b> ${body.fullName}
📞 <b>SĐT:</b> ${body.phone}
📧 <b>Email:</b> ${body.email || 'Không cung cấp'}
📌 <b>Chủ đề:</b> ${body.subject || 'Không có'}
💬 <b>Lời nhắn:</b> 
<i>${body.message}</i>
-----------------------------------
🌐 <i>Nguồn: Trang Liên Hệ - Trung Tự Land</i>
      `;
    } 
    else if (body.isProjectPage) {
      message = `
🔥 <b>KHÁCH HÀNG QUAN TÂM DỰ ÁN VIP</b> 🔥
-----------------------------------
👤 <b>Khách hàng:</b> ${body.fullName}
📞 <b>SĐT:</b> ${body.phone}
💬 <b>Nội dung:</b> 
<i>${body.message}</i>
-----------------------------------
🌐 <i>Nguồn: Trang Chi Tiết Dự Án - Trung Tự Land</i>
      `;
    } 
    else {
      // Mặc định là Form Ký Gửi
      const loaiHinhMap: { [key: string]: string } = {
        canho: "Căn hộ chung cư", 
        nhapho: "Nhà phố / Biệt thự", 
        datnen: "Đất nền dự án", 
        khac: "Khác"
      };
      
      const nhuCau = body.demand === 'ban' ? '💰 CẦN BÁN' : '🔑 CHO THUÊ';

      message = `
🔔 <b>YÊU CẦU KÝ GỬI BẤT ĐỘNG SẢN</b> 🔔
-----------------------------------
👤 <b>Chủ sở hữu:</b> ${body.fullName}
📞 <b>SĐT Zalo:</b> ${body.phone}
📋 <b>Tiêu đề:</b> ${body.title || 'Không có'}

🏠 <b>Nhu cầu:</b> <b>${nhuCau}</b>
🏗️ <b>Loại hình:</b> ${loaiHinhMap[body.propertyType] || "Khác"}
📍 <b>Địa chỉ TS:</b> ${body.address}
💵 <b>Giá mong muốn:</b> ${body.price}
📐 <b>Diện tích:</b> ${body.area ? body.area.replace(/m2/gi, 'm²') : 'Không có'}
📝 <b>Tình trạng pháp lý & Ghi chú:</b> 
<i>${body.note || 'Không có'}</i>
-----------------------------------
🌐 <i>Nguồn: Trang Ký Gửi - Trung Tự Land</i>
      `;
    }

    // 3. GỬI REQUEST LÊN TELEGRAM
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML", // Bắt buộc dùng HTML để tránh lỗi sập ngầm
      }),
    });

    const telegramData = await telegramRes.json();

    // Kiểm tra xem Telegram có báo lỗi gì không
    if (!telegramData.ok) {
      console.error("Lỗi từ Telegram API:", telegramData);
      throw new Error("Telegram từ chối tin nhắn");
    }

    return NextResponse.json({ message: "Gửi thành công" }, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi API Backend:", error);
    return NextResponse.json({ message: "Lỗi hệ thống: " + error.message }, { status: 500 });
  }
}