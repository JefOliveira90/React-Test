import React, {Component} from 'react';
import {Animated, Easing, View, Text, StyleSheet} from 'react-native';

import commonStyles from '../styles/common.js';

class TitleBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
            posY: new Animated.Value(-30),
            title: props.title
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                easing: Easing.out(Easing.ease),
                duration: 200,
                useNativeDriver: true
            }),

            Animated.timing(this.state.posY, {
                toValue: 0,
                easing: Easing.out(Easing.ease),
                duration: 400,
                useNativeDriver: true
            })
        ]).start();
    }

    render() {
        return (
            <View style={{ width: '100%', height: 30 }}>
                <Animated.View style={[ style.view, { opacity: this.state.opacity, transform: [{ translateY: this.state.posY }] } ]}>
                    <Text style={style.text}>{this.state.title}</Text>
                </Animated.View>
            </View>
        );
    }
}

const style = {
    view: {
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#411a9b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flex: 1
    },

    text: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
        fontSize: 14
    }
}

export default TitleBar;
