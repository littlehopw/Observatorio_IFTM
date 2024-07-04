// App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import TesteAvatares from './src/screens/TesteAvatares';

const App = () => (
  <PaperProvider>
    <TesteAvatares />
  </PaperProvider>
);

export default App;
