import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

import App from '../App.js';
import Search from '../views/Search.js';

import Router from '../components/Router.js';
import SearchResults from '../views/SearchResults.js';

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
    const searchResults = app.root.findByType(SearchResults);

    appInstance.setSearchTerm('Godfather');

    await appInstance.fetchSearchResults();

    router.instance.changeView('search_results');
    searchResults.instance.showInfo(appInstance.state.searchResults[0]);
    
    expect(app.toJSON()).toMatchSnapshot();
});