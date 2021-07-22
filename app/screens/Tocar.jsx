import React,{useContext} from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
import Screen from '../components/Screen';
import color from '../misc/color';
import { Feather,Ionicons,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/ProvedorAudio';

const {width} =Dimensions.get('window');

const Tocar = () =>
{
    const context = useContext(AudioContext);
    return<Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{`${context.currentAudioIndex+1}/${context.totalAudioCount}`}</Text>
                <View style={styles.midBannerContainer}> 
                    <MaterialCommunityIcons name="music-clef-treble" size={350} color={color.ACTIVE_BG}  /> 
                    {/* <Feather name="message-circle" size={370} color="black" style={styles.icon} />  style={styles.icon1} 230 */}
                    {/* <Feather name="circle" size={370} color="black" style={styles.icon}/>*/}
                    {/* <FontAwesome name="circle" size={370} color="#F5DEB3" style={styles.icon}/>  */}
                </View>
                <View style={styles.audioPlayerContainer}><Text numberOfLines={2} style={styles.audioTitle}>{context.currentAudio.filename}</Text></View>
                <Slider
                    style={{width: width, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG}
                />
                <View style={styles.audioControlles}>
                    <PlayerButton iconType='PREVIOUS'/>
                    <PlayerButton onPress={()=>console.log('OK2')} style={{marginHorizontal:25}} iconType='PLAY'/>
                    <PlayerButton iconType='PAUSE'/>
                    <PlayerButton iconType='NEXT'/>                    
                </View>
            </View>
        </Screen>;
};
// GiRaiseSkeleton    15 => 5:25
const styles = StyleSheet.create
({
    container:{flex:1,},
    audioCount:{textAlign:'right',padding:15,color:color.FONT_LIGHT,fontSize:14,},
    midBannerContainer:{flex:1,justifyContent:'center',alignItems:'center',},
    audioPlayerContainer:{},
    audioTitle:{fontSize:14,color:color.FONT,padding:15,},
    icon:{zIndex:-1000,top:-100,color:color.FONT_LIGHT},
    icon1:{top:195,color:color.FONT_LIGHT},
    audioControlles:{width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:20,},
})

export default Tocar;