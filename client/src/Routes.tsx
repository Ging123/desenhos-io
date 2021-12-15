import { Routes as Endpoints, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/Login/Index'));
const Signup = lazy(() => import('./pages/Signup/Index'));
const Home = lazy(() => import('./pages/Home/Index'));
const Chat = lazy(() => import('./pages/Chat/Index'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Carregando :)</div>}>
      <Endpoints>
        <Route element={<Login/>} path="/"/>
        <Route element={<Signup/>} path="/signup"/>
        <Route element={<Home/>} path="/home"/>
        <Route element={<Chat/>} path="/chat"/>
      </Endpoints>
    </Suspense>
  );
}

export default Routes