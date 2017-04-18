import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,
    AppRegistry, StyleSheet, Text, View} from 'react-native';
import HomePage from './HomePage.js';
import DetailScreen from './DetailScreen.android.js';
import MapPage from './MapPage.js';


const routes = [
    {
        title: 'HOME',
        index: 0
    },
    {
        title: 'MAP VIEW',
        index: 1
    },
    {
        title: 'STUFF',
        index: 2
    }
];






class SEAPHAGES extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="darkred"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={routes[0]}
                    initialRouteStack={routes}
                    renderScene={
                        (route, navigator) => {
                            switch (route.index) {
                                case 0: return (<HomePage navigator={navigator} route={routes[route.index]} {...route.passProps}></HomePage>);
                                case 1: return (<MapPage navigator={navigator} route={routes[route.index]} {...route.passProps}></MapPage>);
                                case 2: return (<DetailScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></DetailScreen>);
                            }
                        }
                    }
                    configureScene={
                        (route, routeStack) =>
                            Navigator.SceneConfigs.FloatFromBottom
                    }

                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={{
                                LeftButton: (route, navigator, index, navState) => {
                                    return (
                                        <TouchableHighlight onPress={()=>navigator.jumpTo(routes[0])}>
                                            <Text style={styles.navigationBarText}>Home</Text>
                                        </TouchableHighlight>
                                    )
                                    /*if (route.index === 0) {
                                     return (
                                     <Text style={styles.navigationBarText}>Home</Text>
                                     )
                                     }

                                     else {
                                     return (
                                     <TouchableHighlight onPress={()=>navigator.push(routes[0])}>
                                     <Text style={styles.navigationBarText}>Home</Text>
                                     </TouchableHighlight>
                                     ); }*/
                                },
                                RightButton: (route, navigator, index, navState) => {
                                   return (
                                        <TouchableHighlight onPress={()=>navigator.jumpTo(routes[1])}>
                                            <Text style={styles.navigationBarText}>Map</Text>
                                        </TouchableHighlight>
                                    )
                                },
                                /*Title: (route, navigator, index, navState) => {
                                    return (
                                        <Text style={
                                            [styles.navigationBarText, styles.navigationBarText]}>
                                            {routes[route.index].title}
                                        </Text>);
                                    },*/
                                Title: (route, navigator, index, navState) => {
                                    return(
                                        <TouchableHighlight onPress={()=>navigator.jumpTo(routes[2])}>
                                        <Text style={styles.navigationBarText}>Stuff</Text>
                                        </TouchableHighlight>
                                )
                            },
                            }}
                            style={styles.navigationBar}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar:{
        backgroundColor: 'darkred',
    },
    navigationBarText:{
        color: 'white',
        padding: 10,
        fontSize: 15,
        textAlign: "center",
    },
    titleText:{
        fontSize: 20,
        paddingTop: 10,
        textAlign: "center",
    }

});



AppRegistry.registerComponent('SEAPHAGES', () => SEAPHAGES);
