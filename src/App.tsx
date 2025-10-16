import React from 'react';
import SafeAreaContext from './app/context/SafeAreaContext';
import AppWrapper from './app/context/AppWrapper';

const App = () => {
  return (
    <SafeAreaContext>
      <AppWrapper />
    </SafeAreaContext>
  );
};

export default App;
