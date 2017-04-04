import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});


const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class SEAPHAGES extends React.Component {

    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
    };

    watchID: ?number = null;

    componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
                this.setState(
                    {currentRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
            }});
        },
        (error) => alert(error.message),
            {enableHighAccuracy: true,
                timeout: 20000000,
                maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            console.log(position);
            this.setState(
                {currentRegion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
            }});

        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        //const { region } = this.props;

        return (
            <View style ={styles.container}>
                <MapView
                    style = {styles.map}
                    ref = "map"
                    mapType = {"terrain"}
                    initialPosition={this.state.currentRegion}
                    showsUserLocation = {true}
                />
            </View>
        );
    }

};

AppRegistry.registerComponent('SEAPHAGES', () => SEAPHAGES);
