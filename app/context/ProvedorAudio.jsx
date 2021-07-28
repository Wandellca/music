import React, {Component,createContext} from 'react';
import {Alert, View,Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();
export class ProvedorAudio extends Component{    
    constructor(props){
        super(props);
        this.state={audioFiles:[],permissionError:false,dataProvider:new DataProvider((r1,r2)=>r1!==r2),playbackObj:null,isPlaying:false,soundObj:null,currentAudio:{},currentAudioIndex:null,playbackPosition:null,playbackDuration:null}; 
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
        this.setState({...this.state,dataProvider:dataProvider.cloneWithRows([...audioFiles,...media.assets,]),audioFiles:[...audioFiles,...media.assets],});
    }

    getPermission = async () =>{ 
        // Object {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        //   }
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

    componentDidMount(){
        this.getPermission();
    }

    updadeState=(prevState,newState={})=>{
        this.setState({...prevState,...newState});
    }

    render(){
        const {audioFiles,dataProvider,permissionError,playbackObj,soundObj,currentAudio,isPlaying,currentAudioIndex,playbackPosition,playbackDuration} = this.state
        if(permissionError)
        {
            return(
                // importa uma imagem 404 da hora e zuera
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(255, 69, 0)',}}>
                    <Text style={{fontSize:16,textAlign:'center',color:'white',fontWeight:'bold'}}>
                        Olha você não aceitou a permissão de acesso à media, ao aplicativo.
                    </Text>
                </View>
            );
        }

        return(
          <AudioContext.Provider value={{audioFiles,dataProvider,playbackObj,soundObj,currentAudio,isPlaying,currentAudioIndex,playbackPosition,playbackDuration,updadeState:this.updadeState,totalAudioCount:this.totalAudioCount}}>
             {this.props.children} 
          </AudioContext.Provider>
        );
    }
}

export default ProvedorAudio
