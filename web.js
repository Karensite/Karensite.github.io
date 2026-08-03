const API_KEY = "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";
const MODEL = "google/flan-t5-small";

const chat = document.getElementById("chat");
const msg = document.getElementById("msg");

function addMessage(text, sender="user") {
  const div = document.createElement("div");
  div.textContent = (sender === "ai" ? "🤖 AI: " : "👤 شما: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMsg() {
  const text = msg.value.trim();
  if (!text) return;

  addMessage(text, "user");
  msg.value = "";

  const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  const data = await response.json();

  try {
    const aiText = data[0].generated_text;
    addMessage(aiText, "ai");
  } catch {
    addMessage("خطا در پاسخ هوش مصنوعی", "ai");
  }
}
