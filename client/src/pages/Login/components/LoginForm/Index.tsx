import DefaultButton from '../../../../components/DefaultButton/Index';
import DefaultInput from '../../../../components/DefaultInput/Index';
import Error from '../../../../components/Error/Index';
import { FormEvent, useState } from 'react';
import Request from './services/login';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function send(e:FormEvent) {
    try {
      e.preventDefault();
      const user = new Request(emailOrUsername, password);
      await user.login();
    }
    catch(err:any) {
      setError(err);
    }
  }

  return (
    <form className="form" onSubmit={async (e) => await send(e)}>
      <DefaultInput
        icone="fas fa-user"
        maxLength={100}
        margin="10px 0px"
        onChange={(e) => setEmailOrUsername(e.target.value)}
        placeholder="Email ou username"
        required={true}
        value={emailOrUsername}
      />
      <DefaultInput
        icone="fas fa-unlock"
        maxLength={30}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required={true}
        type="password"
        value={password}
      />
      <DefaultButton
        margin="15px 0px 20px 0px"
        content="Entrar"
      />
      {error && <Error content={error} margin='0px 0px 15px 0px'/>}
    </form>
  );
}

export default LoginForm;