import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

class NavBar extends PureComponent {
    render() {
        return (
            <View style={styles.view}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default NavBar;