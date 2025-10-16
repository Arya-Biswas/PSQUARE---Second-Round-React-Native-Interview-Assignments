import React, {useCallback, useState} from 'react';
import {SignUpView} from './SignUpView';
import {useFocusEffect} from '@react-navigation/native';

const SignUpScreen = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const initialForm = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const initialErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handleChange = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''}));
  };
  useFocusEffect(
    useCallback(() => {
      setForm(initialForm);
    }, []),
  );

  return (
    <SignUpView
      form={form}
      errors={errors}
      setErrors={setErrors}
      onChange={handleChange}
    />
  );
};

export default SignUpScreen;
