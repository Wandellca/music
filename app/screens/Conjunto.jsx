import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const Conjunto = () =>
{
    return(
        <View style={styles.container}>
            <Text>Player List</Text>
        </View>
    );
}
const styles = StyleSheet.create
({
    container:
    {flex:1,justifyContent:'center', alignItems:'center',backgroundColor:'#FF3C00'}
});
export default Conjunto;