import React, {Component,createContext} from 'react';
import {Alert, View,Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export const AudioContext = createContext(); 
export class ProvedorAudio extends Component{    
    constructor(props){
        super(props);
        this.state={
            audioFiles:[],
            permissionError:false,
            dataProvider:new DataProvider((r1,r2)=>r1!==r2),
            playbackObj:null,
            soundObj:null,
            currentAudio:{},
            isPlaying:false,                        
            currentAudioIndex:null,
            playbackPosition:null,
            playbackDuration:null            
        }; 
        this.totalAudioCount = 0;
    }
    
    permissionAllert = () =>{
        Alert.alert("Permissão de Acesso a Midia do dispositivo","Este aplicativo precisa ler arquivos de áudio, para funcionar corretamente!",
        [
            {
                text:'Aceito',
                onPress:()=>this.getPermission(),
            },{
                text:'Cancelar',
                onPress:()=>this.permissionAllert(),
            },
        ]);
    };

    getAudioFiles = async () =>{
        const{dataProvider,audioFiles} = this.state;
        let media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio',            
        });        
        media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio',
            first:media.totalCount,
        });
        this.totalAudioCount = media.totalCount;        
        this.setState({
            ...this.state,
            dataProvider:dataProvider.cloneWithRows([
                ...audioFiles,
                ...media.assets,
            ]),
            audioFiles:[...audioFiles,...media.assets],
        });
    };

    //Nós precisamos carregar o áudio de nosso storage asnync
    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio;
        let currentAudioIndex;

        if(previousAudio===null){
            currentAudio=this.state.audioFiles[0];
            currentAudioIndex=0;
        }
        else{
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state,currentAudio,currentAudioIndex});
    };

    getPermission = async () =>{      
        const permission = await MediaLibrary.getPermissionsAsync() 
        
        if(permission.granted)//Permitido acesso
        {
            this.getAudioFiles();
        }

        if(!permission.canAskAgain && !permission.granted)
        {
            this.setState({...this.state,permissionError:true});
        }

        if(!permission.granted && permission.canAskAgain)//Sem permissão ao acesso e pode perguntar de novo
        {
            const {status,canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status==='denied' && canAskAgain)
            {
                this.permissionAllert();
            }

            if(status==='granted')
            {
                this.getAudioFiles();
            }

            if(status==='denied' && !canAskAgain)//sem acesso e Não pergunte mais
            {
                this.setState({...this.state,permissionError:true});
            }
        }

    }

    onPlaybackStatusUpdate = async playbackStatus =>{
            if(playbackStatus.isLoaded && playbackStatus.isPlaying)
            {
                this.updadeState(this,{
                    playbackPosition:playbackStatus.positionMillis,
                    playbackDuration:playbackStatus.durationMillis,
                });
            }
            if(playbackStatus.didJustFinished)
            {
              const nextAudioIndex= this.state.currentAudioIndex+1;
              if(nextAudioIndex >= this.totalAudioCount)
              {
                this.state.playbackObj.unloadAsync();
                this.updadeState(this,{
                    soundObj:null,
                    currentAudio:this.state.audioFiles[0],
                    isPlaying:false,
                    currentAudioIndex:0,
                    playbackPosition:null,
                    playbackDuration:null,
                });
                return await storeAudioForNextOpening(this.state.audioFiles[0],0);
              }
    
              const audio = this.state.audioFiles[nextAudioIndex];
              const status = await playNext(this.state.playbackObj,audio.uri);
              this.updadeState(this,{
                  soundObj:status,
                  currentAudio:audio,
                  isPlaying:true,
                  currentAudioIndex:nextAudioIndex,
              });
              await storeAudioForNextOpening(audio,nextAudioIndex)
        }
    };

    componentDidMount(){
        this.getPermission();
        if(this.state.playbackObj===null){
            this.setState({...this.state, playbackObj:new Audio.Sound() });
        }
    }

    updadeState=(prevState,newState={})=>{
        this.setState({...prevState,...newState});
    }

    render(){
        const {
            audioFiles,
            dataProvider,
            permissionError,
            playbackObj,
            soundObj,
            currentAudio,
            isPlaying,
            currentAudioIndex,
            playbackPosition,
            playbackDuration,
        } = this.state;
        if(permissionError)
        {
            return(
                // importa uma imagem 404 da hora e zuera
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(255, 69, 0)',}}>
                    <Text style={{fontSize:16,textAlign:'center',color:'white',fontWeight:'bold'}}>
                        Olha você não aceitou a permissão de acesso à media ao aplicativo.
                    </Text>
                </View>
            );
        }

        return(<AudioContext.Provider 
                    value={{
                        audioFiles,
                        dataProvider,
                        playbackObj,
                        soundObj,
                        currentAudio,
                        isPlaying,
                        currentAudioIndex,
                        totalAudioCount:this.totalAudioCount,
                        playbackPosition,                        
                        playbackDuration,
                        updadeState:this.updadeState,
                        loadPreviousAudio:this.loadPreviousAudio,
                        onPlaybackStatusUpdate:this.onPlaybackStatusUpdate,
                    }}
                >
                    {this.props.children} 
          </AudioContext.Provider>
        );
    }
}

export default ProvedorAudio;