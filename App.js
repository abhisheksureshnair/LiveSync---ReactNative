import React from 'react';
import { Text } from 'react-native';

import AppNav from './src/navigation/AppNav';
import { AppProvider } from './src/context/AppContext';

Text.defaultProps = Text.defaultProps || {};

Text.defaultProps.style = [
  Text.defaultProps.style,
  {
    fontFamily: 'Poppins-Regular',
  },
];

const App = () => {
  return (
    <AppProvider>
      <AppNav />
    </AppProvider>
  );
};

export default App;
