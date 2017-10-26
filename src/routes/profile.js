import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image

    
} from 'react-native';

export default class Profile extends React.Component {
       static navigationOptions={
        tabBarLabel:'Profile'
    }
    constructor(props) {
        super(props);

    }



    render() {
        return (
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./Smart.png')}
                    />
               
                <Text style={styles.header}>
                    
                    setting hereeee but not ready yet
                </Text>

                </View>
            
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
    }
});
