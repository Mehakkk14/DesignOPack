import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "919868176361";
  const message = "Hi! I'm interested in your hospitality products.";

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-10 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-md px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-medium"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="text-sm font-semibold uppercase tracking-wide">Chat on WhatsApp</span>
    </button>
  );
};

export default WhatsAppButton;
