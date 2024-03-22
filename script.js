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

// Function to handle WebSocket errors
const handleWebSocketError = (error) => {
  console.error("WebSocket error:", error);
  displayNotification("WebSocket error. Please check console for details.");
};

// Function to handle disconnect
const handleDisconnect = () => {
  statusDiv.textContent = "Disconnected";
  messageInput.disabled = true;
  sendButton.disabled = true;
  disconnectButton.disabled = true;
};

// Function to reconnect after 10 seconds
const reconnectWebSocket = () => {
  setTimeout(connectWebSocket, 10000);
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

  socket.onerror = handleWebSocketError;

  socket.onclose = () => {
    handleDisconnect();
    // Clear notifications on reconnection
    notificationsDiv.innerHTML = "";
    // Reconnect after 10 seconds
    reconnectWebSocket();
  };
};

// Function to send message
const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.send(message);
    messageInput.value = "";
  }
};

sendButton.addEventListener("click", sendMessage);

disconnectButton.addEventListener("click", () => {
  socket.close();
});

connectWebSocket();
