import SmallText from '../../../../components/SmallText/Index';
import { useNavigate } from 'react-router-dom';

const DoesntHaveAccount = () => {
  const navigate = useNavigate()
  const goToSignupPage = () => navigate('/signup');

  return (
    <SmallText 
      className="less-brightness-on-hover-or-click" 
      content="Clique aqui para criar uma conta"
      onClick={goToSignupPage}
    />
  );
}

export default DoesntHaveAccount;