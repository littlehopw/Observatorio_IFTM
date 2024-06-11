// App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';

const App = () => (
  <PaperProvider>
    <MainScreen />
  </PaperProvider>
);

export default App;
