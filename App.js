import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert, View } from 'react-native';
import Login from './src/routes/Login';
import Signup from './src/routes/Signup';
import AboutUs from './src/routes/AboutUs';
import Profile from './src/routes/Profile';
import Map from './src/routes/map';
import MainScreenNavigator from './src/routes/Home';
import Controle from './src/routes/Controle';
import ChatBox from './src/routes/ChatBox';
import Main from './src/routes/Main';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.result;
        this.state = { component: 'Signup' };
    }
    changestate(com) {
        this.setState({ component: com });
    }
    render() {
        if (this.state.component == 'Signup') {
            return <Signup changeV={this.changestate.bind(this)} />;
        } else if (this.state.component == 'Login') {
            return <Login changeV={this.changestate.bind(this)} />;
        } else if (this.state.component == 'Home') {
            return (
                <MainScreenNavigator
                    screenProps={{ changeV: this.changestate.bind(this) }}
                />
            );

        }
        else if(this.state.component == 'AboutUs'){
           return <AboutUs changeV={this.changestate.bind(this)} />; 
        }
    }
}
