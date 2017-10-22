import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            image: ''
        };
    }
    async Signup() {
        try {
            let response = await fetch('http://192.168.2.49/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email
                    }
                })
            });

            let res = await response.text();
            console.log(res)
            res=JSON.parse(res)
            if(res == "exist"){
                Alert.alert("this user is already exist")
                
            }else{
                Alert.alert("Done ,, Now you can go to Login")
                return this.props.changeV('Login') 
                
            }
        } catch (errors) {
            console.log('catch errors' + errors);
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./Smart.png')}
                        />
                    </View>
                    <Text style={styles.header}>
                        {' '}
                        Welcome to the Home Automation System
                    </Text>

                    <TextInput
                        placeholder="username"
                        returnKeyType="next"
                        validators="required"
                        onChangeText={value =>
                            this.setState({ username: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        validators="required"
                        returnKeyType="next"
                        onChangeText={value =>
                            this.setState({ password: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="email"
                        returnKeyType="go"
                        validators="required"
                        onChangeText={value => this.setState({ email: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.Signup()}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                    <Button
                    title="Go back to Login"
                    onPress={() => this.props.changeV('Login')}
                />
                </View>
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
        width: 200,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#E0FFFF',
        color: '#C71585',
        paddingHorizontal: 10,
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
