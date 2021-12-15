import { useState } from 'react';
import { Socket } from 'socket.io-client';
import Message from './services/message';
import './styles.scss';

type event = React.FormEvent<HTMLFormElement>;

interface props {
  socket:Socket;
}

const ChatInput = (props:props) => {
  const msg = new Message(props.socket);
  const [message, setMessage] = useState('');

  function send(e:event) {
    e.preventDefault();
    msg.send(message);
    setMessage('');
  }
 
  return (
    <form className="chat-input-container" onSubmit={(e) => send(e)}>
      <input 
        className="chat-input"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite uma menssagem"
        type="text"
        value={message}
      />
    </form>
  )
}

export default ChatInput;