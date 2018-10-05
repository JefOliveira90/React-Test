import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

import App from '../App.js';

import Router from '../components/Router.js';

import Search from '../views/Search.js';
import Historic from '../views/Historic.js';
import SearchResults from '../views/SearchResults.js';

jest.mock('NativeAnimatedHelper');
jest.useFakeTimers();
jest.setTimeout(30000);

describe('App tests', () => {
    it('State has default values', () => {
        const app = renderer.create(<App />).getInstance();

        expect(app.state).toEqual({
            loading: false,
            search: '',
            searchError: null,
            searchResults: [],
            searchPage: 1,
            searchResultsPerPage: 10,
            searchTotalResults: 0,
            searchHistory: [],
            viewHistory: []
        });
    });

    it('Search term is being set properly', () => {
        const app = renderer.create(<App />).getInstance();

        app.setSearchTerm('Lorem ipsum dolor sit amet');

        expect(app.state.search).toBe('Lorem ipsum dolor sit amet');
    });

    it('Is fetching empty searches successfully', async () => {
        const app = renderer.create(<App />).getInstance();

        app.setSearchTerm('ThisShouldNotReturnAnyResults9182003');
        await app.fetchSearchResults();

        expect(app.state.searchError).toBe('Movie not found!');
    });

    it('Is fetching search results successfully', async () => {
        const app = renderer.create(<App />).getInstance();

        app.setSearchTerm('Source Code');
        await app.fetchSearchResults();

        expect(app.state.searchError).toBe(null);
        expect(app.state.searchResults[0].Response).toBe('True');
    });

    it('Is fetching search results continuously and resetting', async() => {
        const app = renderer.create(<App />).getInstance();

        app.setSearchTerm('Godfather');
        await app.fetchSearchResults();

        expect(app.state.searchError).toBe(null);
        expect(app.state.searchPage).toBe(1);
        expect(app.state.searchResults).toHaveLength(10);

        await app.fetchMoreResults(false);

        expect(app.state.searchError).toBe(null);
        expect(app.state.searchPage).toBe(2);
        
        await app.fetchSearchResults();
        expect(app.state.searchResults).toHaveLength(20);

        await app.fetchMoreResults(false);

        expect(app.state.searchError).toBe(null);
        expect(app.state.searchPage).toBe(3);

        await app.fetchSearchResults();
        expect(app.state.searchResults).toHaveLength(30);

        app.resetSearchResults();

        expect(app.state.searchPage).toBe(1);
        expect(app.state.searchResults).toEqual([]);
        expect(app.state.searchError).toBe(null);
    });
});