// آدرس سرور API و WebSocket را بعداً جایگزین کن
const API = "https://YOUR_SERVER/api";
const WS_URL = "wss://YOUR_SERVER/ws";

let token = null;
let ws = null;

// پیام را در چت نمایش بده
function addMessage(text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ثبت‌نام
async function signup() {
  const username = document.getElementById("su_user").value.trim();
  const password = document.getElementById("su_pass").value.trim();

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message);
}

// ورود
async function login() {
  const username = document.getElementById("li_user").value.trim();
  const password = document.getElementById("li_pass").value.trim();

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!data.token) {
    alert("ورود ناموفق");
    return;
  }

  token = data.token;

  document.getElementById("box").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("sendBox").style.display = "block";

  connectWS();
}

// اتصال به WebSocket
function connectWS() {
  ws = new WebSocket(WS_URL + "?token=" + token);

  ws.onopen = () => addMessage("✔ وارد چت شدی");

  ws.onmessage = (event) => addMessage(event.data);

  ws.onerror = () => addMessage("❌ خطا در اتصال");

  ws.onclose = () => addMessage("🔌 اتصال قطع شد");
}

// ارسال پیام
function sendMsg() {
  const text = document.getElementById("msg").value.trim();
  if (!text) return;

  ws.send(text);
  document.getElementById("msg").value = "";
    }
