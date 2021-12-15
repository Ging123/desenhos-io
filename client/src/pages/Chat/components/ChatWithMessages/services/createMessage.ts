export default function createMessage(message:string) {
  const chat = document.querySelector('.chat');
  const messageOfTheSite = createMessageDom(message);
  chat?.appendChild(messageOfTheSite);
}

function createMessageDom(message:string) {
  const messageOfTheSite = document.createElement('div');
  messageOfTheSite.className = 'message';
  messageOfTheSite.textContent = message;
  return messageOfTheSite;
}