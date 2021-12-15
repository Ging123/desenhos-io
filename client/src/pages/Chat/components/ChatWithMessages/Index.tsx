import createSiteMessage from './services/createSiteMessage';
import createMessage from './services/createMessage';
import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import './styles.scss';

interface props {
  socket:Socket;
}

const ChatWithMessages = (props:props) => {

  useEffect(() => {
    props.socket.on("site-message", (message) => {
      createSiteMessage(message);
    });

    props.socket.on("message", (message) => {
      createMessage(message);
    });
  }, [props.socket])
  
  return <div className="chat"/>
}

export default ChatWithMessages;
