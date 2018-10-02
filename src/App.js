import React, {Component} from 'react';
import {View} from 'react-native';

import commonStyles from './styles/common.js';

import Router from './components/Router.js';
import TitleBar from './components/TitleBar.js';

import Search from './views/Search.js';
import Historic from './views/Historic.js';
import SearchResults from './views/SearchResults.js';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            search: '',
            searchError: null,
            searchResults: [],
            searchPage: 1,
            searchResultsPerPage: 10,
            searchTotalResults: 0,
            searchHistory: [],
            viewHistory: []
        };
    }

    async fetchSearchResults() {
        this.state.loading = true;

        try {
            let term = this.state.search;
            let page = this.state.searchPage;
            let url = `http://www.omdbapi.com/?apikey=2b1a6d43&s=${term}&page=${page}`;
            let request = await fetch(url);
            let response = await request.json();

            if(response.Response === 'True') {
                let results = response.Search;

                for(let i in results) {
                    let result = results[i];
                    let details = await this.fetchDetailedInfo(result.imdbID);

                    result = Object.assign(result, details);
                }

                this.setState((state, props) => ({
                    searchTotalResults: response.totalResults,
                    searchResults: state.searchResults.concat(results)
                }));
            } else {
                this.setState(() => ({
                    searchError: response.Error
                }));
            }
        } catch(reason) {
            console.error(reason);
        }

        this.state.loading = false;
    }

    async fetchDetailedInfo(imdbID) {
        let obj = {};

        try {
            let url = `http://www.omdbapi.com/?apikey=2b1a6d43&i=${imdbID}&plot=full`;
            let request = await fetch(url);

            obj = await request.json();
        } catch(reason) {
            console.error(reason);
        }

        return obj;
    }

    fetchMoreResults() {
        let limit = this.state.searchResultsPerPage;
        let total = this.state.searchTotalResults;

        if(this.state.loading || this.state.searchPage >= Math.ceil(total / limit)) {
            return;
        }

        this.setState((state) => ({
            searchPage: state.searchPage + 1
        }), this.fetchSearchResults);
    }

    resetSearchResults(callback) {
        this.setState((state, props) => {
            return {
                searchError: null,
                searchResults: [],
                searchPage: 1
            }
        }, callback);
    }

    setSearchTerm(term) {
        this.setState((state, props) => ({ search: term }));
    }

    registerSearchHistory(term) {
        let date = new Date();

        this.setState((state, props) => {
            state.searchHistory.push({
                key: term + date.toISOString(),
                term: term,
                date: date.toLocaleDateString()
            });
            
            return state;
        });
    }

    render() {
        return (
            <Router 
                app={this}
                initialView='search'
                views={{
                    'search': {
                        type: Search
                    },
                    'search_results': {
                        type: SearchResults
                    },
                    'historic': {
                        type: Historic
                    }
                }}/>
        );
    }
}