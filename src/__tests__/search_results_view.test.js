import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

import App from '../App.js';

import Router from '../components/Router.js';

jest.mock('NativeAnimatedHelper');
jest.useFakeTimers();

jest.mock('TouchableNativeFeedback', () => {
    const ReactNative = require('react-native');
    return ReactNative.TouchableHighlight;
});

jest.doMock('FlatList', () => props => {
    return (<div class="FlatList">{JSON.stringify(props.data)}</div>);
});

test('SearchResult view looks correct', async () => {
    const app = renderer.create(<App />);
    const appInstance = app.getInstance();
    const router = app.root.findByType(Router);

    appInstance.setSearchTerm('Godfather');

    await appInstance.fetchSearchResults();

    router.instance.changeView('search_results');

    expect(app.toJSON()).toMatchSnapshot();
});