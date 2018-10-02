import React, {Component} from 'react';
import {
    Alert,
    Text,
    TextInput,
    View,
    StatusBar
} from 'react-native';

import commonStyles from '../styles/common.js';

import NavBar from '../components/NavBar.js';
import NavBarButton from '../components/NavBarButton.js';
import TitleBar from '../components/TitleBar.js';

class Search extends Component {    
    constructor(props) {
        super(props);
    }

    goToSearchResults() {
        let term = this.props.app.state.search.trim();

        if(term === '') {
            Alert.alert(
                'Ops!',
                'Forneça o nome de um filme ou série para efetuar a busca.'
            );
            return;
        }

        this.props.app.resetSearchResults(() => {
            this.props.app.fetchSearchResults();
            this.props.app.registerSearchHistory(term);

            this.props.router.changeView('search_results');
        });
    }

    render() {
        if(this.props.router.state.currentView !== this.props.name) {
            return null;
        }

        return (
            <View style={commonStyles.view}>
                <StatusBar hidden={true}></StatusBar>

                <View style={commonStyles.content}>
                    <Text style={styles.searchLabel}>Insira o nome do filme ou série.</Text>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Nome"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        underlineColorAndroid="transparent"
                        selectionColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={(text) => this.props.app.setSearchTerm(text)}
                        value={this.props.app.state.search}/>
                </View>
                
                <NavBar>
                    <NavBarButton 
                        text="Buscar"
                        image={require('../assets/icon-search.png')}
                        onPress={this.goToSearchResults.bind(this)}/>
                </NavBar>
            </View>
        );
    }
}

const styles = {
    searchLabel: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
        width: '80%',
        textAlign: 'center'
    },

    searchInput: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        width: '70%',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    }
}

export default Search;