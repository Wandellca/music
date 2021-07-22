import React, {Component,createContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import color from '../misc/color';

const PlayerButton =(props)=>{

    const {iconType,onPress,size=40,Iconcolor=color.FONT} = props;
    const getIconName =(type) =>{
        switch(type){
            case 'PLAY':
                return 'pausecircleo'
            case 'PAUSE':
                return 'playcircleo'
            case 'NEXT':
                return 'forward'
            case 'PREVIOUS':
                return 'banckward'
            case 'LOOP':
                return ''
       }
    }   

    return(
        <AntDesign {...props} onPress={onPress} name={getIconName(iconType)} size={size} color={Iconcolor}/>
    );
};

const styles = StyleSheet.create({
    container:{},
});

export default PlayerButton;