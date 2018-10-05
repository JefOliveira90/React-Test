import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

import App from '../App.js';

jest.mock('NativeAnimatedHelper');
jest.useFakeTimers();

jest.mock('TouchableNativeFeedback', () => {
    const ReactNative = require('react-native');

    return ReactNative.TouchableHighlight;
}) ;

test('Search view looks correct', () => {
    const app = renderer.create(<App />);
    const appInstance = app.getInstance();

    appInstance.setSearchTerm('Godfather');

    expect(app.toJSON()).toMatchSnapshot();
});