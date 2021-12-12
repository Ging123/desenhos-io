import DoesntHaveAccont from './components/DoesntHaveAccount/Index';
import LoginForm from './components/LoginForm/Index';
import Title from '../../components/Title/Index';
import './styles.scss';
 
const Login = () => {
  document.title = 'Entrar';

  return (
    <div id="login-page">
      <Title content="bem vindo!" margin='0px 0px 30px 0px'/>
      <LoginForm/>
      <DoesntHaveAccont/>
    </div>
  );
}

export default Login;