import HaveAnAccount from './components/HaveAnAccount/Index';
import SingupForm from './components/SignupForm/Index';
import Title from '../../components/Title/Index';
import './styles.scss';

const Signup = () => {
  document.title = "Cadastre-se";

  return (
    <div id="signup-page">
      <Title content="cadastre-se" margin="0px 0px 30px 0px"/>
      <SingupForm/>
      <HaveAnAccount/>
    </div>
  )
}

export default Signup;