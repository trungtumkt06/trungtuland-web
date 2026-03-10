export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Nút Zalo */}
      <a 
        href="https://zalo.me/0909123456" // Thay bằng số Zalo của bạn
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transition-transform hover:scale-110 flex items-center justify-center w-14 h-14 border-2 border-white"
        title="Chat Zalo"
      >
        <span className="font-extrabold text-sm tracking-wider">Zalo</span>
      </a>

      {/* Nút Gọi Điện */}
      <a 
        href="tel:0909123456" // Thay bằng số điện thoại của bạn
        className="bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center w-14 h-14 border-2 border-white animate-bounce"
        title="Gọi Hotline"
      >
        <span className="text-2xl">📞</span>
      </a>
    </div>
  );
}