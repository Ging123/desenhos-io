import DefaultButton from '../../components/DefaultButton/Index';
import LogoutIcone from '../../components/LogoutIcone/Index';
import Title from '../../components/Title/Index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Room from './services/room';
import './styles.scss';
import User from '../../global/services/user';

const Home = () => {
  document.title = "Início";
  const [user, setUser] = useState<any>()
  const navigate = useNavigate();
  const room = new Room(navigate);

  useEffect(() => {
    const user = new User();
    const userData = user.get();
    if(!userData) navigate('/');
    setUser(userData)
  }, []);
  
  return (
    <div id="home-page">
      <div>
        <Title 
          content={`Bem vindo ao random chat ${user?.username}`}
          margin='20px 0px'
        />
        <LogoutIcone/>
        <DefaultButton
          content='Entrar em uma sala aleatória'
          margin='20px 0px'
          onClick={async () => await room.join()}
        />
      </div>
    </div>
  );
}

export default Home;