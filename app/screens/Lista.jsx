import React, { Component } from 'react';
import {Dimensions, StyleSheet,Text, View} from 'react-native';
import {RecyclerListView,LayoutProvider} from 'recyclerlistview';
import MusicasItem from '../components/MusicasItem';
import OptionModal from '../components/OptionModal';
import Screen from '../components/Screen';
import {AudioContext } from '../context/ProvedorAudio';
import {Audio} from 'expo-av';
import {play,pause,resume,playNext} from '../misc/audioController';

export class Lista extends Component{
    static contextType = AudioContext;
    
    constructor(props){
        super(props);
        this.state={OptionModalVisible:false,playbackObj:null,soundObj:null,currentAudio:{},};
        this.currentItem={};
    }
    
    layoutProvider = new LayoutProvider(i=>'audio',(type,dim)=>{
        switch(type)
        {
            case'audio':
                dim.width=Dimensions.get('window').width;
                dim.height=70;                          
                break;
            default:
                dim.width=0;
                dim.height=0;  
        }        
    });

    handleAudioPress= async(audio)=>{

        const {playbackObj,soundObj,currentAudio,updadeState,audioFiles} = this.context;
       //playing audio for the first time.
        if(soundObj===null){
            // console.log(audio);
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj,audio.uri); // console.log(status);         
            const index = audioFiles.indexOf(audio);
            return updadeState(this.context,{currentAudio:audio,playbackObj:playbackObj,isPlaying:true,currentAudioIndex:index,soundObj:status});               
        }
        //pause audio
        if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id)
        {   
            const status = await pause(playbackObj);
            return updadeState(this.context,{isPlaying:false,soundObj:status});            
            // return this.setState({...this.state,soundObj:status,});//aula de numero 9 
        }
        //resume audio
        if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id)
        {            
            const status = await resume(playbackObj);
            return updadeState(this.context,{isPlaying:true,soundObj:status});            
            // return this.setState({...this.state,soundObj:status,});
        }
        //select another audio
         if(soundObj.isLoaded && currentAudio.id !== audio.id)
         {   
             const status =  await playNext(playbackObj,audio.uri);
             const index = audioFiles.indexOf(audio);
             return updadeState(this.context,{currentAudio:audio,isPlaying:true,currentAudioIndex:index,soundObj:status,});  
         }
    };

    rowRenderer = (type,item,index,extendedState) => {       
        return( <MusicasItem title={item.filename} duration={item.duration} onOptionPress={()=>{this.currentItem=item; this.setState({...this.state,OptionModalVisible:true});}} onAudioPress={()=>this.handleAudioPress(item)} isPlaying={extendedState.isPlaying} activeListItem={this.context.currentAudioIndex===index} /> );
    };
    render(){        
        return( 
            <AudioContext.Consumer>
                {({dataProvider,isPlaying})=>{                   
                    return( 
                        <>
                            <Screen>                            
                                <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} extendedState={{isPlaying}}/>    
                                <OptionModal onPlayPress={()=>console.log('Play')} onPlayListPress={()=>console.log('Play List')} currentItem={this.currentItem} onClose={()=>this.setState({...this.state,OptionModalVisible:false})} visible={this.state.OptionModalVisible}/>                    
                            </Screen>
                             {/* <Screen>                                                                                          
                                <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer}/>    
                                <OptionModal currentItem={this.currentItem} onClose={()=>this.setState({...this.state,OptionModalVisible:false})} visible={this.state.OptionModalVisible}/>                    
                            </Screen> */}
                        </>
                    );
                }}
            </AudioContext.Consumer>
        );
    }
}

const styles = StyleSheet.create
({
    container:{flex:1,justifyContent:'center',alignItems:'center',padding:10,borderBottomColor:'yellow',borderBottomWidth:2,}
});
export default Lista;