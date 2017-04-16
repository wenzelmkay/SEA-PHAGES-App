/**
 * Created by wenzelmk on 4/16/17.
 */

import MapView, {Marker} from 'react-native-maps';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Navigator,
    TouchableHighlight,
    Text,
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


class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        this.state = {
            marker: {
                latitude: 38.4200,
                longitude: -78.8600,
                sampleName: "Sample 1",
                Weather: "Sunny",
            }
        };
        //this.onRegionChange = this.onRegionChange.bind(this);
    }
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
            /* (error) => alert(error.message),
             {enableHighAccuracy: true,
             timeout: 20000000,
             maximumAge: 1000}*/
        );


        this.watchID = navigator.geolocation.watchPosition((position) => {
            // console.log(position);
            this.setState(
                {newRegion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }});
        })
    }

    render() {

        return (
            <View style ={styles.container}>
                <MapView
                    //styles.map is very important! it lets our map display!
                    style = {styles.map}
                    ref = "map"
                    mapType = {"standard"}
                    region={this.state.currentRegion}
                    onRegionChange={this.onRegionChange}
                    //displays a dot at user's location
                    showsUserLocation = {true}
                    showsCompass = {true}>


                    <MapView.Marker //draggable = {true}
                        coordinate = {this.state.marker}
                        title = {Marker.sampleName}
                        onDragEnd = {(e) => this.setState({ marker: e.nativeEvent.coordinate })}
                    />

                </MapView>
            </View>
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
};

export default MapPage