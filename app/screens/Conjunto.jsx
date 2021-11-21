import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
import color from '../misc/color';
import AdicionarListaModal from '../components/AdicionarListaModal';

const Conjunto = () =>
{
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.tocarLista}>
                <Text>Meus Favoritos</Text>
                <Text style={styles.audioCount}>0 Musicas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setModalVisible(true)} style={styles.novaLista}>
                <Text style={styles.listaBtn}>+ Add Nova Lista</Text>               
            </TouchableOpacity>

            <AdicionarListaModal visible={modalVisible} onClose={()=> setModalVisible(false)} />
        </ScrollView>
    );
}
const styles = StyleSheet.create
({
    container:{padding:20},
    tocarLista:{padding:5,backgroundColor:'rgba(204,204,204,0.3)',borderRadius:5},
    audioCount:{marginTop:5,opacity:0.5,fontSize:14,},
    novaLista:{marginTop:15,padding:8,backgroundColor:'rgba(37,93,136,0.3)',borderRadius:6,},
    listaBtn:{marginTop:4,color:color.ACTIVE_BG,letterSpacing:1,fontWeight:'bold',fontSize:14,padding:5,}
});
export default Conjunto;