/**
 * Created by wenzelmk on 4/16/17.
 */

import React, {Component} from 'react';
import {TouchableHighlight, Navigator, AppRegistry, StyleSheet, Text, View} from 'react-native';

class HomePage extends Component {
    render () {
        return (
            <View style = {{padding: 100}}>
                <Text style = {{fontSize: 30}}>
                    Welcome to Phage Hunterator!
                </Text>

            </View>
        );
    }
}

export default HomePage