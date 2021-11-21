import React from 'react';
import {NavigationContainer,DefaultTheme} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import ProvedorAudio from './app/context/ProvedorAudio';
import color from './app/misc/color';

const MeuTema={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:color.APP_BG,
  },
};


export default function App() {
  return(
    <ProvedorAudio>
      <NavigationContainer theme={MeuTema}>
        <AppNavigator/>
      </NavigationContainer>
    </ProvedorAudio>
  );
}

