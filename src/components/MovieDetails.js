import React, {Component} from 'react';
import {
    Dimensions,
    Animated,
    Easing,
    StyleSheet,
    TouchableNativeFeedback,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import commonStyles from '../styles/common.js';

class MovieDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posY: new Animated.Value(Dimensions.get('window').height),
        }
    }

    componentDidUpdate() {
        this.props.render ? this.showView() : this.hideView();

        console.log(this.props.render);
    }

    showView() {
        Animated.timing(this.state.posY, {
            toValue: 0,
            easing: Easing.out(Easing.ease),
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    hideView() {
        Animated.timing(this.state.posY, {
            toValue: Dimensions.get('window').height,
            easing: Easing.in(Easing.ease),
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    render() {
        if(!this.props.info) { return null; }

        console.log(this.props.info);

        return (
            <Animated.View style={[ styles.view, { transform: [{ translateY: this.state.posY }] } ]}>
                <ScrollView>
                    <View style={styles.header}>
                        <Image source={{uri: this.props.info.Poster, cache: 'force-cache'}} style={styles.headerBgImg} />
                    </View>

                    <View>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText}>{this.props.info.Type}</Text>
                            <Text style={styles.headerTitle}>{this.props.info.Title}</Text>
                            <Text style={styles.headerText}>De {this.props.info.Director}</Text>
                            <Text style={styles.headerText}>Lançado em {this.props.info.Released}</Text>
                            <Text style={styles.headerText}>Avaliado {this.props.info.imdbRating}/10</Text>
                        </View>

                        <View style={styles.details}>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Gênero:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Genre}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Produtora:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Production}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Linguagem:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Language}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Duração:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Runtime}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Escritores:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Writer}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>Atores:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Actors}</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailsLabel}>País:</Text>
                                <Text style={styles.detailsValue}>{this.props.info.Country}</Text>
                            </View>
                        </View>
                        
                        <Text style={styles.plot}>{this.props.info.Plot}</Text>
                    </View>
                </ScrollView>

                <View style={styles.closeInput}>
                    <TouchableNativeFeedback onPress={this.props.onHideInfo}>
                        <Text style={{ color: 'white', fontSize: 20 }}>X</Text>    
                    </TouchableNativeFeedback>
                </View>
            </Animated.View>
        );
    }
}

const styles = {
    view: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#411a9b',
        zIndex: 1
    },

    closeInput: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10
    },

    headerBgImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },

    header: {
        width: '100%',
        height: 400,
        backgroundColor: 'black'
    },

    headerTitle: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
    },

    headerText: {
        color: 'white',
        fontSize: 12,
        opacity: 0.8,
        textAlign: 'center'
    },

    headerContent: {
        padding: 10,
        backgroundColor: '#411a9b',
    },

    contentWrap: {

    },

    content: {
        backgroundColor: 'white',
    },

    details: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,.2)'
    },

    detailsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    detailsLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        flex: 1
    },

    detailsValue: {
        color: 'white',
        fontSize: 12,
        flex: 2
    },

    plot: {
        padding: 10,
        backgroundColor: 'white',
        color: '#411a9b'
    }
}

export default MovieDetails;