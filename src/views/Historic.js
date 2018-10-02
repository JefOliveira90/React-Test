import React, {Component} from 'react';
import {
    FlatList,
    TouchableNativeFeedback,
    StatusBar,
    View,
    Text
} from 'react-native';

import commonStyles from '../styles/common.js';

import NavBar from '../components/NavBar.js';
import NavBarButton from '../components/NavBarButton.js';
import TitleBar from '../components/TitleBar.js';

class Historic extends Component {
    render() {
        if(this.props.router.state.currentView !== this.props.name) {
            return null;
        }

        return (
            <View style={commonStyles.view}>
                <StatusBar hidden={true}></StatusBar>

                <TitleBar title="Histórico de buscas" />

                <FlatList
                    data={this.props.app.state.searchHistory}
                    style={{ width: '100%' }}
                    keyExtractor={(item) => item.key}
                    renderItem={(item) => 
                        <TouchableNativeFeedback>
                            <View style={style.itemWrapper}>
                                <Text style={[ commonStyles.text, { fontSize: 16 } ]}>{item.term}</Text>
                                <Text style={[ commonStyles.text, { fontSize: 12, opacity: 0.6 } ]}>{item.date}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    }/>
            </View>
        );
    }
}

const style = {
    itemWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        width: '100%'
    },
}

export default Historic;