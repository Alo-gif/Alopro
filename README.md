<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat with OpenAI</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
    #chat { border: 1px solid #ddd; padding: 10px; height: 400px; overflow-y: auto; }
    .msg { margin: 5px 0; }
    .user { font-weight: bold; color: blue; }
    .bot { font-weight: bold; color: green; }
  </style>
</head>
<body>
  <h2>Chat with AI</h2>
  <div id="chat"></div>
  <input type="text" id="input" placeholder="Type a message..." style="width:80%">
  <button onclick="sendMessage()">Send</button>

  <script>
    const API_URL = "https://your-app-name.onrender.com/chat"; // replace with your Render URL

    async function sendMessage() {
      const input = document.getElementById("input");
      const chat = document.getElementById("chat");
      const userMessage = input.value.trim();
      if (!userMessage) return;

      chat.innerHTML += `<div class="msg user">You: ${userMessage}</div>`;
      input.value = "";

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      chat.innerHTML += `<div class="msg bot">AI: ${data.reply}</div>`;
      chat.scrollTop = chat.scrollHeight;
    }
  </script>
</body>
</html>
