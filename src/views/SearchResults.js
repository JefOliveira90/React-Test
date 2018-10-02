import React, {Component} from 'react';
import {
    Animated,
    Easing,
    FlatList,
    StatusBar,
    View,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native';

import commonStyles from '../styles/common.js';

import TitleBar from '../components/TitleBar.js';
import MovieDetails from '../components/MovieDetails.js';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
            selected: null,
            renderInfo: false
        };
    }

    willRender() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            easing: Easing.out(Easing.ease),
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    componentDidUpdate() {
        if(this.props.router.state.currentView === this.props.name) {
            this.willRender();
        }
    }

    hideInfo() {
        this.setState(() => ({ renderInfo: false }));
    }

    showInfo(item) {
        this.setState(() => ({
            selected: item,
            renderInfo: true
        }));
    } 

    render() {
        if(this.props.router.state.currentView !== this.props.name) {
            return null;
        }

        let error = this.props.app.state.searchError;
        let content = <FlatList
                refreshing={this.props.app.state.loading}
                style={{ width: '100%' }}
                data={this.props.app.state.searchResults}
                keyExtractor={ (item) => item.imdbID }
                onEndReached={ this.props.app.fetchMoreResults.bind(this.props.app) }
                renderItem={({item}) => 
                    <TouchableNativeFeedback onPress={this.showInfo.bind(this, item)}>
                        <View style={styles.itemWrapper}>
                            <Image style={{ width: 64, height: 64 }} source={{ uri: item.Poster, cache: 'force-cache' }} />
                            <View style={styles.itemContent}>
                                <Text style={[ commonStyles.text, { fontSize: 16 } ]}>{item.Title}</Text>
                                <Text style={[ commonStyles.text, { fontSize: 12, opacity: 0.6 } ]}>De {item.Director}</Text>
                                <Text style={[ commonStyles.text, { fontSize: 12, opacity: 0.6 } ]}>{item.imdbRating}/10</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                }/>;

        if(error) {
            let els = {
                'Movie not found!': 
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                        Sua busca por "{this.props.app.state.search}" não retornou nenhum resultado.
                    </Text>
            };

            content = els[error] || <Text>Ocorreu um erro durante a requisição. Por favor tente novamente mais tarde.</Text>;
        }

        return (
            <View style={commonStyles.view}>
                <StatusBar hidden={true}></StatusBar>

                <TitleBar title={`Resultados da busca por "${this.props.app.state.search}"`} />
                
                <Animated.View style={[ commonStyles.content, { backgroundColor: 'rgba(0,0,0,.2)', opacity: this.state.opacity, zIndex: 0 } ]}>
                    {content}
                </Animated.View>

                <MovieDetails render={this.state.renderInfo} info={this.state.selected} onHideInfo={this.hideInfo.bind(this)} />
            </View>
        );
    }
}

const styles = {
    itemWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        width: '100%'
    },
    itemContent: {
        flex: 3,
        width: '100%',
        marginLeft: 10
    },
}

export default SearchResults;