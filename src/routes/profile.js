import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
export default class Profile extends React.Component {
    constructor(props) {
        super(props)
       this.state={
       	init:this.getCureentUser(),
       	name:"",
       	turnon:"",
       	connect:"",
        logout : "",
        motion:""
       }
    }
    //detect motion 
    async motion() {
        try {
                 let response = await fetch('http://192.168.8.120:8000/motion');
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
    //logout
    async logout() {
        try {
                 let response = await fetch('http://192.168.8.120:8000/logout');
                 let responseJson = await response.json();
                 this.setState({logout:responseJson})
                 return this.props.changeV('Login');
           } catch(error) {
             console.error(error);
             }
    } 
    //get current user
    async getCureentUser() {
	    try {
			     let response = await fetch('http://192.168.8.120:8000/user');
			     let responseJson = await response.json();
			     this.setState({name:responseJson})
		   } catch(error) {
		     console.error(error);
		     }
    } 
     async connect(){
    	 try {
			     let response = await fetch('http://192.168.8.120:8000/connect');
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
			     let response = await fetch('http://192.168.8.120:8000/on');
			     let responseJson = await response.json();
			   
		   } catch(error) {
		     console.error(error);
		     }
    }
    async turnoff(){
    	 try {
			     let response = await fetch('http://192.168.8.120:8000/off');
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
                 <Button
                    title="Connect"
                    onPress={() => this.connect()}
                />
                 <Button
                    title="Turn on lights"
                    onPress={() => this.turnon()}
                />
                 <Button
                    title="Turn off lights"
                    onPress={() => this.turnoff()}
                />
                 <Button
                    title="Detect motion in my room"
                    onPress={() => this.motion()}
                />
                <Button
                    title="Log out"
                    onPress={() => this.logout()}
                />

                 <Button
                    title="Go To map"
                    onPress={() => this.props.changeV('Mape')}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {},
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
    input: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#E0FFFF',
        color: '#C71585',
        paddingHorizontal: 10,
        width: 200,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: '#C71585',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});
