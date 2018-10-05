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

describe('Router tests', () => {
    it('Is present in app', () => {
        const app = renderer.create(<App />).root;
        const router = app.findByType(Router);

        expect(router).toBeTruthy();
    });

    it('References app', () => {
        const appTestObject = renderer.create(<App />);
        const app = appTestObject.root;
        const router = app.findByType(Router);

        expect(router.props).toHaveProperty('app');
        expect(router.props.app).toBe(appTestObject.getInstance());
    });

    it('Has initial view set to Search view', () => {
        const app = renderer.create(<App />).root;
        const router = app.findByType(Router);

        expect(router.props).toHaveProperty('initialView', 'search');
    });

    it('Has views set properly', () => {
        const app = renderer.create(<App />).root;
        const router = app.findByType(Router);

        expect(router.props).toHaveProperty('views');
        expect(router.props.views).toHaveProperty('search');
        expect(router.props.views).toHaveProperty('search_results');

        expect(router.props.views.search).toMatchObject({ type: Search });
        expect(router.props.views.search_results).toMatchObject({ type: SearchResults });
    });

    it('Changed view properly', () => {
        const app = renderer.create(<App />);
        const router = app.root.findByType(Router).instance;

        app.getInstance().setSearchTerm('Source Code');
        router.changeView('search_results');

        expect(router.state.currentView).toBe('search_results');
        expect(router.state.historicPos).toBe(2);
        expect(router.state.historic).toHaveLength(2);
        expect(router.state.historic[0]).toBe('search');
        expect(router.state.historic[1]).toBe('search_results');
    });

    it('Navigate history backwards properly', () => {
        const app = renderer.create(<App />);
        const router = app.root.findByType(Router).instance;

        app.getInstance().setSearchTerm('Source Code');
        router.changeView('search_results');
        router.historicGoBack();

        expect(router.state.currentView).toBe('search');
        expect(router.state.historicPos).toBe(1);
    });

    it('Navigate history forward properly', () => {
        const app = renderer.create(<App />);
        const router = app.root.findByType(Router).instance;

        app.getInstance().setSearchTerm('Source Code');
        router.changeView('search_results');
        router.historicGoBack();

        expect(router.state.currentView).toBe('search');
        expect(router.state.historicPos).toBe(1);
        
        router.historicGoForward();

        expect(router.state.currentView).toBe('search_results');
        expect(router.state.historicPos).toBe(2);
    })
});