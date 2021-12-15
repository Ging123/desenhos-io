import ChatWithMessage from './components/ChatWithMessages/Index';
import createChatData from './services/createChatData';
import ChatInput from './components/ChatInput/Index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import config from '../../config';
import './styles.scss';

const Chat = () => {
  const [socket, setSocket] = useState(socketConfig());
  const navigate = useNavigate();

  useEffect(() => {
    const data = createChatData();
    socket.emit("join_to_chat", data);
  }, [])

  return (
    <div id="chat-page">
      <div className="chat-container">
        <ChatWithMessage socket={socket}/>
        <ChatInput socket={socket}/>
      </div>
    </div>
  );
}

function socketConfig() {
  return io(config.API_URL, {
    transports: ['websocket', 'polling', 'flashsocket'] 
  });
}

export default Chat;