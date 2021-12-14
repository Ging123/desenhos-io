import { useNavigate } from 'react-router-dom';
import logout from './service/logout';
import './styles.scss';

const LogoutIcone = () => {
  const classes = 'fas fa-sign-out-alt less-brightness-on-hover-or-click logout-icone';
  const navigate = useNavigate();
  
  return (
    <i 
      className={classes} 
      onClick={async () => await logout(navigate)}
    />
  );
}

export default LogoutIcone;