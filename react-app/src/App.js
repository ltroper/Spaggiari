import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Portfolio from './components/Portfolio';
import { authenticate } from './store/session';
import {getAllCryptosThunk} from './store/portfolio'
import CryptoPage from './components/Crypto/CryptoPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  // const cryptoObj = useSelector(state=>state.crypto)
  // const cryptoArray = Object.values(cryptoObj)

  useEffect(() => {
      dispatch(getAllCryptosThunk());
    }, [dispatch]);


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Portfolio />
        </ProtectedRoute>
        <ProtectedRoute path='/crypto/:cryptoId' exact={true} >
          <CryptoPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
