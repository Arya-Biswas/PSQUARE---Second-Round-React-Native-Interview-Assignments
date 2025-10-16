import React, {useState} from 'react';
import {LoginView} from './LoginView';
const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <LoginView
      setEmail={setEmail}
      email={email}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default LoginScreen;
