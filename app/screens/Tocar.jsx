import React,{useContext,useEffect,useState} from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
import Screen from '../components/Screen';
import color from '../misc/color';
import { Feather,Ionicons,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/ProvedorAudio';
import { play,pause,resume,playNext, playPrev } from '../misc/audioController';

const {width} =Dimensions.get('window');

const Tocar = () =>
{
    const context = useContext(AudioContext);
    const {playbackPosition,playbackDuration}=context;
    const calcularSeebBar =() =>{
        if(playbackPosition!==null && playbackDuration!==null){
            return playbackPosition / playbackDuration;
        }
        return 0;
    };

    useEffect(() =>{
        context.loadPreviousAudio();
    },[]);

    //Pausar, tocar continue
    const handlePlayPause = async () => {       
        //TOCAR
        if(context.soundObj===null){
            const audio = context.currentAudio;
            const status = await play(context.playbackObj,audio.uri);
            context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
            return context.updateState(context,{
                soundObj:status,
                currentAudio:audio,
                isPlaying:true,
                currentAudioIndex:context.currentAudioIndex,
            });
        }
        console.log(context.soundObj);
        //PAUSAR
        if(context.soundObj && context.soundObj.isPlaying){
            const status = await pause(context.playbackObj);
            return context.updateState(context,{
                soundObj:status,                
                isPlaying:false,
            });
        }
        //CONTINUAR
        if(context.soundObj && !context.soundObj.isPlaying){
            const status = await resume(context.playbackObj);
            return context.updateState(context,{
                soundObj:status,                
                isPlaying:true,
            });
        }
    };

    const handleNext = async () =>{
        const {isLoaded} = await context.playbackObj.getStatusAsync();
        const isLastAudio = context.currentAudioIndex+1 === context.totalAudioCount;
        
        let audio = context.audioFiles[context.currentAudioIndex+1];
        let index;
        let status;

        if(!isLoaded && !isLastAudio){
           index = context.currentAudioIndex+1;
           status = await play(context.playbackObj,audio.uri);
        }        

        if(isLoaded && isLastAudio){
            index = context.currentAudioIndex+1;
            status = await playNext(context.playbackObj,audio.uri); 
         }    

         if(isLastAudio){
             index=0;
             audio=context.audioFiles[index];
             if(isLoaded){
                status = await playNext(context.playbackObj,audio.uri); 
             }else{ 
                status = await play(context.playbackObj,audio.uri); 
             }           
         }

        context.updateState(context,{
            soundObj:status,
            currentAudio:audio,
            playbackObj:context.playbackObj,
            isPlaying:true,
            currentAudioIndex:index,
            playbackPosition:null,
            playbackDuration:null,
        });

    };
    
    const handlePrevious = async () =>{
        const {isLoaded} = await context.playbackObj.getStatusAsync();
        const isFirstAudio = context.currentAudioIndex <=0;
        
        let audio = context.audioFiles[context.currentAudioIndex-1];
        let index;
        let status;

        if(!isLoaded && !isFirstAudio){
           index = context.currentAudioIndex-1;
           status = await play(context.playbackObj,audio.uri);
        }        

        if(isLoaded && isFirstAudio){
            index = context.currentAudioIndex-1;
            status = await playNext(context.playbackObj,audio.uri); 
         }    

         if(isFirstAudio){
             index=context.totalAudioCount-1;
             audio=context.audioFiles[index];
             if(isLoaded){
                status = await playPrev(context.playbackObj,audio.uri); 
             }else{ 
                status = await play(context.playbackObj,audio.uri); 
             }           
         }

        context.updateState(context,{
            soundObj:status,
            currentAudio:audio,
            playbackObj:context.playbackObj,
            isPlaying:true,
            currentAudioIndex:index,
            playbackPosition:null,
            playbackDuration:null,
        });
    };
    
    if(!context.currentAudio) return null;

    return<Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{`${context.currentAudioIndex+1}/${context.totalAudioCount}`}</Text>
                {/* <Text style={styles.audioCount}>{console.log(context)}</Text> */}
                <View style={styles.midBannerContainer}> 
                    <MaterialCommunityIcons name="music-clef-treble" size={350} color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM }/> 
                    {/* <Feather name="message-circle" size={370} color="black" style={styles.icon} />  style={styles.icon1} 230 */}
                    {/* <Feather name="circle" size={370} color="black" style={styles.icon}/>*/}
                    {/* <FontAwesome name="circle" size={370} color="#F5DEB3" style={styles.icon}/>  */}
                </View>
                <View style={styles.audioPlayerContainer}><Text numberOfLines={2} style={styles.audioTitle}>{context.currentAudio.filename}</Text></View>
                <Slider
                    style={{width: width, height: 40}}
                    minimumValue={0} 
                    maximumValue={1}
                    value={calcularSeebBar()}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG}
                />
                <View style={styles.audioControlles}>
                    <PlayerButton iconType='PREVIOUS' onPress={handlePrevious}/>
                    <PlayerButton onPress={handlePlayPause} style={{marginHorizontal:25}} iconType={context.isPlaying ? 'PLAY' : 'PAUSE' }/>                    
                    <PlayerButton iconType='NEXT' onPress={handleNext} />                    
                </View>
            </View>
        </Screen>;
};
// GiRaiseSkeleton 
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