import React from 'react';
import {StyleSheet,View,Text,Dimensions,TouchableWithoutFeedback} from 'react-native';
import { Entypo,Feather,FontAwesome5} from '@expo/vector-icons';
import color from '../misc/color';

const  getThumbnailText = filename => filename[0];
const convertTimes = minutes =>{
    if(minutes)
    {
        const hrs = minutes/60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
        const sec = Math.ceil((60*percent)/100);
        
        if(parseInt(minute)<10 && sec<10){
            return `0${minute}:0${sec}`;
        }        
        if(parseInt(minute)<10){
            return `0${minute}:${sec}`;
        }
        if(sec<10){
            return `${minute}:0${sec}`;
        }

        return `${minute}:${sec}`;
    }
};

const renderPlayPauseIcon = isPlaying =>{    //13 
    if(isPlaying) return <Feather name="pause" size={24} color="black" />       
    return <FontAwesome5 name="play" size={24} color="black" />    
};

const MusicasItem = ({title,duration,onOptionPress,onAudioPress,isPlaying,activeListItem}) =>{
    return(
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onAudioPress}>
                    <View style={styles.leftContainer}> 
                        <View style={styles.thumbnail}>
                            <Text style={styles.thumbnailText}>
                                {activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title)}                               
                            </Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>{title}</Text>
                            <Text style={styles.timeText}>{convertTimes(duration)}</Text>
                        </View>
                    </View>    
                </TouchableWithoutFeedback>
                <View style={styles.rightContainer}>
                    <Entypo onPress={onOptionPress} name="dots-three-vertical" size={20} color={color.FONT_MEDIUM} style={styles.rightIcon} />
                </View>                
            </View>    
            {/* <View style={styles.separator}/>         */}
        </>
    );
};
const{width} = Dimensions.get('window');
const styles = StyleSheet.create
({
    container:{flexDirection:'row',alignSelf:'center',width:width-10, alignItems:'center',padding:7,borderTopEndRadius:10,borderBottomStartRadius:10,backgroundColor:'white',},
    leftContainer:{flexDirection:'row',alignItems:'center',flex:1,},
    thumbnailText:{fontSize:20,fontWeight:'bold',color:color.FONT,},
    title:{fontSize:14,color:color.FONT,},
    thumbnail:{height:50,flexBasis:50,alignItems:'center',justifyContent:'center',borderRadius:25,backgroundColor:color.FONT_LIGHT,},
    titleContainer:{width:width-120,paddingLeft:10,},
    rightContainer:{flexBasis:40,alignItems:'center',height:40,flexBasis:40,justifyContent:'center'},
    separator:{width:width-10,backgroundColor:'#333',opacity:0.3,height:0.6,alignSelf:'center',marginTop:10,},
    timeText:{fontSize:12,color:color.FONT_LIGHT,},
    rightIcon:{padding:10,},
});
export default MusicasItem;