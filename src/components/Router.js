import React, {PureComponent} from 'react';
import {View, BackHandler} from 'react-native';

class Router extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            views: [],
            currentView: '',
            historic: [],
            historicPos: 0,
        }

        for(let key in props.views) {
            let viewDef = props.views[key];
            let viewEl = React.createElement(
                viewDef.type,
                {
                    key: key,
                    name: key,
                    router: this,
                    app: this.props.app
                }
            );

            this.state.views.push(viewEl);
        }
    }

    onHardwareBackPress() {
        if(this.state.historicPos !== 1) {
            this.historicGoBack();

            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        this.changeView(this.props.initialView);

        BackHandler.addEventListener(
            'hardwareBackPress',
            this.onHardwareBackPress.bind(this));
    }

    changeView(viewID, params = {}) {
        this.setState(() => ({ currentView: viewID }));
        
        this.historicRegisterView(viewID);
    }

    historicRegisterView(viewID) {
        let hist = this.state.historic;
        let pos = this.state.historicPos;

        hist.splice(pos);
        hist.push(viewID);
        
        pos = hist.length;

        this.setState(() => ({
           historic: hist,
           historicPos: pos 
        }));
    }

    historicNavigate(pos) {
        let hist = this.state.historic;

        if(hist.length === 0) {
            return; // Nothing to do
        }

        if(pos > hist.length) {
            pos = hist.length;
        } else if(pos < 0) {
            pos = 0;
        }

        this.setState(() => ({
            historicPos: pos,
            currentView: hist[pos - 1]
        }));
    }

    historicGoBack() {
        this.historicNavigate(this.state.historicPos - 1);
    }

    historicGoForward() {
        this.historicNavigate(this.state.historicPos + 1);
    }

    render() {
        return(
            <View style={style.view}>
                {this.state.views}
            </View>
        );
    }
}

const style = {
    view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: '100%'
    }
}

export default Router;