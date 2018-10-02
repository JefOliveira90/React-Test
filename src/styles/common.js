import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    view: {
        display: 'flex',
        backgroundColor: '#411a9b',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 10
    },

    content: {
        display: 'flex',
        flex: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: 'white'
    },

    navbarView: {
        display: 'flex',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    navbarButtonImage: {
        width: 26,
        height: 26
    }
});