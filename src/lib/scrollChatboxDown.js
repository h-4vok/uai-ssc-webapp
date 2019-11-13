export function scrollChatboxDown() {
  const chatboxDiv = document.getElementById('chatbox');
  if (chatboxDiv) chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
}
