import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Lista from '../screens/Lista';
import Conjunto from '../screens/Conjunto';
import Tocar from '../screens/Tocar';
import {MaterialIcons,Ionicons,SimpleLineIcons} from '@expo/vector-icons';
import color from '../misc/color';

const Tab = createBottomTabNavigator();
const AppNavigator = () =>
{
    return(
        <Tab.Navigator tabBarOptions={{activeTintColor: '#101010',style:{/*backgroundColor:'rgb(75, 218, 39)',*/borderTopColor:color.FONT_LIGHT,borderTopWidth:1}}} >        
            <Tab.Screen name='Músicas' component={Lista} options={{ tabBarIcon:({color,size})=>(<Ionicons name="headset" size={size} color={color}/>),}}/>
            <Tab.Screen name='Conjunto' component={Conjunto} options={{ tabBarIcon:({color,size})=>(<SimpleLineIcons name="disc" size={size} color={color} />),}} />
            <Tab.Screen name='Tocar' component={Tocar} options={{ tabBarIcon:({color,size})=>(<MaterialIcons name="library-music" size={size} color={color}/>),}} />             
        </Tab.Navigator>
    );
}
export default AppNavigator;