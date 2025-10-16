import React, {useState} from 'react';
import {ForgotPasswordView} from './ForgotPasswordView';
const ForgotScreen = () => {
  const [email, setEmail] = useState<string>('');

  return <ForgotPasswordView setEmail={setEmail} email={email} />;
};

export default ForgotScreen;
