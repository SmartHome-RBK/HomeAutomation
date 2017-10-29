import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';

const tts = require('react-native-android-speech')
export default class Controle extends React.Component {
        static navigationOptions={
        tabBarLabel:'Controle'
    }
    constructor(props) {
        super(props)
       this.state={
       	init:this.getCureentUser(),
        wellcome:this.welcome(),
       	name:"",
       	turnon:"",
       	connect:"",
        motion:"",
        text:""
       }
    }
    async speak(){
    try{
        //More Locales will be available upon release.
        var spokenText = await SpeechAndroid.startSpeech("Speak now", SpeechAndroid.ENGLISH);
        //setTimeout(function(){ alert("kokokoko"); }, 3000);
        //ToastAndroid.show(spokenText , ToastAndroid.LONG);
        this.state.text=spokenText
        var a = this.state.text.search("turn");
        var b = this.state.text.search("on");
        var c = this.state.text.search("off");
        if(a !==-1 && b!==-1){
            tts.speak({
    text:'your fan turned on', // Mandatory
    pitch:1.5, // Optional Parameter to set the pitch of Speech,
    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
    language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
    country : 'US' // Optional Paramenter Default is null, it provoques that system selects its default
}).then(isSpeaking=>{
    //Success Callback
    console.log(isSpeaking);
}).catch(error=>{
    //Errror Callback
    console.log(error)
});
          this.turnon();
        }
        else if(a !==-1 && c!==-1){
            tts.speak({
    text:'your fan turned off', // Mandatory
    pitch:1.5, // Optional Parameter to set the pitch of Speech,
    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
    language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
    country : 'US' // Optional Paramenter Default is null, it provoques that system selects its default
}).then(isSpeaking=>{
    //Success Callback
    console.log(isSpeaking);
}).catch(error=>{
    //Errror Callback
    console.log(error)
});
          this.turnoff();
        }else{
            tts.speak({
    text:'i can not understand', // Mandatory
    pitch:1.5, // Optional Parameter to set the pitch of Speech,
    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
    language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
    country : 'US' // Optional Paramenter Default is null, it provoques that system selects its default
}).then(isSpeaking=>{
    //Success Callback
    console.log(isSpeaking);
}).catch(error=>{
    //Errror Callback
    console.log(error)
});
          Alert.alert("Try again!")
        }


    }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
            /*And more errors that will be documented on Docs upon release*/
        }
    }
    }
    //detect motion 
    welcome() {
        tts.speak({
    text:'welcome to home automation system , how can i help you', // Mandatory
    pitch:1.5, // Optional Parameter to set the pitch of Speech,
    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
    language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
    country : 'US' // Optional Paramenter Default is null, it provoques that system selects its default
}).then(isSpeaking=>{
    //Success Callback
    console.log(isSpeaking);
}).catch(error=>{
    //Errror Callback
    console.log(error)
});
    }
    async motion() {
        try {
                 let response = await fetch('http://192.168.1.17:8080/motion');
                 let responseJson = await response.json();
                 //responseJson=JSON.parse(responseJson)
                 
                 if(responseJson=='n'){
                    Alert.alert("No motion in room")
                 }else{
                    Alert.alert("there is motion in room ")
                 }
                 this.setState({motion:responseJson})
               //  res=JSON.parse(res)
           } catch(error) {
             console.error(error);
             }
    } 

    //get current user
    async getCureentUser() {
	    try {
			     let response = await fetch('http://192.168.1.17:8080/user');
			     let responseJson = await response.json();
			     this.setState({name:responseJson.name})
		   } catch(error) {
		     console.error(error);
		     }
    } 
     async connect(){
    	 try {
			     let response = await fetch('http://192.168.1.17:8080/connect');
			     let responseJson = await response.json();
			     if(responseJson){
			     	Alert.alert("Connected")
			     }
			   
		   } catch(error) {
		     console.error(error);
		     }
    }
    async turnon(){
    	 try {
			     let response = await fetch('http://192.168.1.17:8080/on');
			     let responseJson = await response.json();
			   
		   } catch(error) {
		     console.error(error);
		     }
    }
    async turnoff(){
    	 try {
			     let response = await fetch('http://192.168.1.17:8080/off');
			     let responseJson = await response.json();
			    
		   } catch(error) {
		     console.error(error);
		     }
    }
   

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('./Smart.png')}
                />
            </View>
            <Text style={styles.header}>
                {' '}
                 {this.state.name}
            </Text>
            <View style={styles.buttonContainer} >
             <TouchableOpacity
            
             onPress={() => this.connect()}>
             <Text style={styles.buttonText}>Connect</Text>
             </TouchableOpacity>                
               

             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.turnon()}>
             <Text style={styles.buttonText}>Turn on lights</Text>
             </TouchableOpacity> 
             
             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.turnoff()}>
             <Text style={styles.buttonText}>Turn off lights</Text>
               </TouchableOpacity> 
                
             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.motion()}>
             <Text style={styles.buttonText}>Detect motion in my room</Text>
             </TouchableOpacity> 

             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.speak()}>
             <Text style={styles.buttonText}>Talk to your home</Text>
             </TouchableOpacity> 
            


            </View>
        </KeyboardAvoidingView>
                

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '700'
    },

    buttonContainer: {
        margin:10,
        borderRadius: 10,    
        backgroundColor: '#87CEFA',
        padding:10
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});
