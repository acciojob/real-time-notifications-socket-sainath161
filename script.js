// complete the code
const statusDiv = document.getElementById("status");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const disconnectButton = document.getElementById("disconnect-button");
const notificationsDiv = document.getElementById("notifications");
const wsUrl = "wss://socketsbay.com/wss/v2/1/demo/";
let socket;

// Function to display notifications
const displayNotification = (message) => {
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("notification");
  notificationElement.textContent = message;
  notificationsDiv.appendChild(notificationElement);
};

// Function to connect to WebSocket server
const connectWebSocket = () => {
  statusDiv.textContent = "Connecting...";
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    statusDiv.textContent = "Connected";
    messageInput.disabled = false;
    sendButton.disabled = false;
    disconnectButton.disabled = false;
  };

  socket.onmessage = (event) => {
    const message = event.data;
    displayNotification(message);
  };

  socket.onclose = () => {
    statusDiv.textContent = "Disconnected";
    messageInput.disabled = true;
    sendButton.disabled = true;
    disconnectButton.disabled = true;
    notificationsDiv.innerHTML = ""; // Clear previous notifications
    // Reconnect after 10 seconds
    setTimeout(connectWebSocket, 10000);
  };

  socket.onerror = (error) => {
    statusDiv.textContent = "Error occurred";
    console.error("WebSocket error:", error);
  };
};

// Function to send message
const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.send(message);
    messageInput.value = "";
  } else {
    // Provide feedback if message is empty
    alert("Please enter a message.");
  }
};

sendButton.addEventListener("click", sendMessage);

disconnectButton.addEventListener("click", () => {
  socket.close();
});

connectWebSocket();
