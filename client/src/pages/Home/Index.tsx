import LogoutIcone from '../../components/LogoutIcone/Index';
import { useCallback, useEffect, useState } from 'react';
import Title from '../../components/Title/Index';
import { useNavigate } from 'react-router-dom';
import getUser from './services/getUser';
import './styles.scss';
import DefaultButton from '../../components/DefaultButton/Index';


interface user {
  email?:string;
  username?:string;
}

const Home = () => {
  document.title = "Início";
  const navigate = useNavigate();
  const [user, setUser] = useState<user>();

  const getUserData = useCallback(async () => {
    await getUser(setUser, navigate);
  }, [user]);
  
  useEffect(() => { getUserData() }, []);
  
  return (
    <div id="home-page">
      <div>
        <Title 
          content={`Bem vindo, ${user?.username || ""}`}
          margin='20px 0px'
        />
        <LogoutIcone/>
        <DefaultButton
          content='Clique aqui para jogar'
          margin='20px 0px'
        />
        <DefaultButton
          background='transparent'
          border='1px solid gray'
          color='white'
          content='Criar uma sala'
        />
      </div>
    </div>
  );
}

export default Home;