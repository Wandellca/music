import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import ProvedorAudio from './app/context/ProvedorAudio';

export default function App() {
  return(
    <ProvedorAudio>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </ProvedorAudio>
  );
}

