const API_URL = "https://karensite-ai-api.onrender.com/ai";

const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.textContent = (type === "user" ? "تو: " : "هوش مصنوعی: ") + text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    sendBtn.disabled = true;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text })
        });

        const data = await res.json();
        let reply = data.reply;

        if (Array.isArray(reply)) {
            reply = reply[0]?.generated_text || JSON.stringify(reply);
        }

        addMessage(reply, "ai");
    } catch (e) {
        addMessage("خطا در ارتباط با هوش مصنوعی.", "ai");
    } finally {
        sendBtn.disabled = false;
    }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
