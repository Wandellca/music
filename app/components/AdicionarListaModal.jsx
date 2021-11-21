import React from 'react';
import {View, Modal,StyleSheet,TextInput,Text,Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import color from '../misc/color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AdicionarListaModal = ({visible,onClose,onSubmit}) =>
{
    return(
        <Modal visible={visible} animationType='fade' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>
                    <Text style={{color:color.ACTIVE_BG}}>Nova Lista</Text>
                    <TextInput style={styles.input} />   
                    <AntDesign name="check" size={24} color={color.ACTIVE_FONT} style={styles.submitIcon} onPress={onSubmit} />                 
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject,styles.modalBG]} />
            </TouchableWithoutFeedback>
        </Modal>
    );
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({    
    modalContainer:{flex:1,justifyContent:'center',alignItems:'center'},
    inputContainer:{width:width-20,height:200,borderRadius:10,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'},
    input:{width:width-40,borderBottomWidth:1,borderBottomColor:color.ACTIVE_BG,fontSize:18,paddingVertical:5},
    submitIcon:{padding:10,backgroundColor:color.ACTIVE_BG,borderRadius:50,marginTop:15},
    modalBG:{backgroundColor:color.MODAL_BG,zIndex:-1}
});

export default AdicionarListaModal;