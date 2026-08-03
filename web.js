const chat = document.getElementById("chat");
const msg = document.getElementById("msg");

// نمایش پیام در صفحه
function addMessage(text, sender = "user") {
  const div = document.createElement("div");
  div.textContent = (sender === "ai" ? "🤖 AI: " : "👤 شما: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ارسال پیام به سرور Render
async function sendMsg() {
  const text = msg.value.trim();
  if (!text) return;

  // پیام کاربر
  addMessage(text, "user");
  msg.value = "";

  try {
    const res = await fetch("https://karen-ai-server.onrender.com/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();

    // پیام هوش مصنوعی
    addMessage(data.reply || "خطا در پاسخ هوش مصنوعی", "ai");

  } catch (err) {
    addMessage("❌ خطا در اتصال به سرور", "ai");
  }
}
