export default function createSiteMessage(message:string) {
  const chat = document.querySelector('.chat');
  const messageOfTheSite = createMessage(message);
  chat?.appendChild(messageOfTheSite);
} 

function createMessage(message:string) {
  const messageOfTheSite = document.createElement('div');
  messageOfTheSite.className = 'message-of-site';
  messageOfTheSite.textContent = message;
  return messageOfTheSite;
}