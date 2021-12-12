import SmallText from "../../../../components/SmallText/Index";
import { useNavigate } from 'react-router-dom';

const HaveAnAccount = () => {
  const navigate = useNavigate()
  const goToLoginPage = () => navigate('/');

  return (
    <SmallText 
      className="less-brightness-on-hover-or-click"
      content="Já tem uma conta, clique aqui para logar nela"
      onClick={goToLoginPage}
    />
  );
}

export default HaveAnAccount;