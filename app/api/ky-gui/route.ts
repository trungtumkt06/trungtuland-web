import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const BOT_TOKEN = "8459397057:AAFjmP3KlNqwQO1agnZgTv38oJT4VG9uk9A"; 
    const CHAT_ID = "1973971973";

    // Kiểm tra xem đây là đơn ký gửi hay tin nhắn liên hệ
    const isContact = body.isContactPage; 

    let message = "";

    if (isContact) {
      // Nội dung cho trang LIÊN HỆ
      message = `
📩 **TIN NHẮN LIÊN HỆ MỚI!**
--------------------------
👤 **Khách:** ${body.fullName}
📞 **SĐT:** [${body.phone}](tel:${body.phone})
📧 **Email:** ${body.email || 'Không có'}
💬 **Lời nhắn:** ${body.message}
--------------------------
📅 *Gửi từ trang Liên hệ - Trung Tự Land*
      `;
    } else {
      // Nội dung cho trang KÝ GỬI (Giữ nguyên logic cũ của bạn)
      const loaiHinhMap: { [key: string]: string } = {
        canho: "Căn hộ", nhapho: "Nhà phố / Biệt thự", datnen: "Đất nền", khac: "Khác"
      };
      message = `
🔔 **CÓ KHÁCH KÝ GỬI MỚI!**
--------------------------
👤 **Khách:** ${body.fullName}
📞 **SĐT:** [${body.phone}](tel:${body.phone})
🏠 **Nhu cầu:** ${body.demand === 'ban' ? 'CẦN BÁN' : 'CHO THUÊ'}
🏗️ **Loại hình:** ${loaiHinhMap[body.propertyType] || "Khác"}
📍 **Địa chỉ:** ${body.address}
💰 **Giá:** ${body.price}
📐 **Diện tích:** ${body.area}
📝 **Ghi chú:** ${body.note || 'Không có'}
--------------------------
📅 *Gửi từ trang Ký gửi - Trung Tự Land*
      `;
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ message: "Gửi thành công" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}