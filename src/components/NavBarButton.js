import React, {PureComponent} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    TouchableNativeFeedback,
    View,
    Text,
    Image
} from 'react-native';
import commonStyles from '../styles/common.js';

class NavBarButton extends PureComponent {
    state = {
        opacity: new Animated.Value(0),
        transY: new Animated.Value(40)
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                easing: Easing.out(Easing.ease),
                duration: 500,
                useNativeDriver: true
            }),

            Animated.timing(this.state.transY, {
                toValue: 0,
                easing: Easing.elastic(),
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();
    }

    componentWillUnmount() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                easing: Easing.in(Easing.ease),
                duration: 500,
                useNativeDriver: true
            }),

            Animated.timing(this.state.transY, {
                toValue: 40,
                easing: Easing.in(Easing.ease),
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }

    render() {
        let image;
        let text;

        if(this.props.image) {
            image = <Image style={commonStyles.navbarButtonImage} source={this.props.image} />;
        }

        if(this.props.text) {
            text = <Text style={commonStyles.text}>{this.props.text}</Text>;
        }

        return (
            <Animated.View style={{ opacity: this.state.opacity, transform: [{ translateY: this.state.transY }], width: 100 }}>
                <TouchableNativeFeedback onPress={this.props.onPress}>
                    <View style={commonStyles.navbarView}>
                        {image}
                        {text}
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        );
    }
}

export default NavBarButton;