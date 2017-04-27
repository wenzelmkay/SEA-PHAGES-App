//React Native lets you build mobile apps using only JavaScript. You can use react native to build an app for both IOS and Android.
//you can reload the app instantly and run new code while retaining application state.

//index.js contains code for the navigation bar & navigation between pages, or states
//importing different pages
import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,
    AppRegistry, StyleSheet, Text, View} from 'react-native';

//import exported components from other app files
import HomePage from './HomePage.js';
import MapPage from './MapPage.js';
//import DetailScreen from './DetailScreen.android.js';

//const is like a variable but it can not be reassigned; Routes assigns a title and index number to each scene in app.
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

//React native is component-based. Meaning an app is just a tree of components, starting with a root component
class SEAPHAGES extends Component {


    // Render tells the app that something is about to be displayed; return says what that is. Underneath the return is an example of JSX - a syntax used to embed XML (eXtensible Markup Language), designed to store & transport data, and be both human- and machine-readable in JavaScript. (source: w3schools)
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#64abc1"
                    barStyle="dark-content"
                />
                <Navigator
                    initialRoute={routes[0]}
                    initialRouteStack={routes}
                    renderScene={
                        //Defines which component each index number points to.
                        (route, navigator) => {
                            switch (route.index) {
                                case 0: return (<HomePage navigator={navigator} route={routes[route.index]} {...route.passProps}></HomePage>);
                                case 1: return (<MapPage navigator={navigator} route={routes[route.index]} {...route.passProps}></MapPage>);
                                //case 2: return (<DetailScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></DetailScreen>);
                            }
                        }
                    }
                    configureScene={
                        (route, routeStack) =>
                            //animates each new scene to come up from the bottom of the screen
                            Navigator.SceneConfigs.FloatFromBottom
                    }

                    navigationBar={
                        <Navigator.NavigationBar
                            navigationStyles={Navigator.NavigationBar.StylesIOS}
                            routeMapper={{
                                LeftButton: (route, navigator, index, navState) => {
                                    return (
                                        //touchable highlight makes the text into a touchable button
                                        <TouchableHighlight underlayColor="ivory" onPress={()=>navigator.jumpTo(routes[0])}>
                                            <Text style={styles.navigationBarText}>Home</Text>
                                        </TouchableHighlight>
                                    )
                                },
                                RightButton: (route, navigator, index, navState) => {
                                   return (
                                        <TouchableHighlight underlayColor="ivory" onPress={()=>navigator.jumpTo(routes[1])}>
                                            <Text style={styles.navigationBarText}>Map</Text>
                                        </TouchableHighlight>
                                    )
                                },
                                Title: (route, navigator, index, navState) => {
                                    return(
                                        <Text style={[styles.navigationBarText, styles.titleText]}>PHAGE HUNTERS</Text>
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

//these styles are used in the app. Create a style sheet to be used to style the navigation bar
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar:{
        backgroundColor: '#64abc1',
    },
    navigationBarText:{
        color: '#2b2d2d',
        padding: 10,
        fontSize: 15,
    },
    titleText:{
        fontSize: 20,
        paddingTop: 5,
        fontWeight: 'bold',
    },
});


//register the main app component; only needs to happen once per app.
AppRegistry.registerComponent('SEAPHAGES', () => SEAPHAGES);
