import DefaultButton from '../../../../components/DefaultButton/Index';
import DefaultInput from '../../../../components/DefaultInput/Index';
import Error from '../../../../components/Error/Index';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Request from './services/signup';

const SingupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/');

  async function send(e:FormEvent) {
    try {
      e.preventDefault();
      const user = new Request(email, username, password);
      await user.signup();
      goToLoginPage();
    }
    catch(err:any) {
      setError(err);
    }
  }

  return (
    <form className="form" onSubmit={async (e) => await send(e)}>
      <DefaultInput
        icone="fas fa-at"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required={true}
        type="email"
        value={email}
      />
      <DefaultInput
        icone="fas fa-user"
        margin="10px 0px"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required={true}
        value={username}
      />
      <DefaultInput
        icone="fas fa-unlock"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        type="password"
        required={true}
        value={password}
      />
      <DefaultButton
        content="cadastrar"
        margin="15px 0px"
      />
      {error && <Error content={error} margin='0px 0px 15px 0px'/>}
    </form>
  );
}

export default SingupForm