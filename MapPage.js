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
    Button,
    Alert,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import * as firebase from 'firebase';

'use strict';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Initialize Firebase

firebase.initializeApp(config);

class MapPage extends React.Component {
    state = {
        modalVisible: false,
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    constructor(props) {
        super(props);
        this.database = firebase.database();
        //move writeDB() later
        //this.writeDB();
        this.itemsRef = firebase.database().ref();
        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
        };


        //this.onRegionChange = this.onRegionChange.bind(this);
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

        });
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
                        }
                    },
                );
                this.setState(
                    {
                        myLat: position.coords.latitude,
                        myLon: position.coords.longitude,
                    },
                );

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

                    {this.state.markers.map((marker, i) => (
                        <MapView.Marker key={i} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} title={marker.title} description={marker.description}>
                            <View style={styles.pin}>
                            </View>
                        </MapView.Marker>
                    ))}

                </MapView>

                <TouchableOpacity style = {styles.button} onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Add Sample</Text>
                </TouchableOpacity>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={!!this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Sample Name</Text>
                            <TextInput placeholder="i.e. Muddy Creek Sample"
                                       onChangeText={(text) => this.setState({sampleName: text})}
                            />
                            <Text>Current Latitude</Text>
                            <Text>{this.state.myLat}</Text>
                            <Text>Current Longitude</Text>
                            <Text>{this.state.myLon}</Text>

                            <TouchableOpacity style = {styles.button} onPress={() => {
                                this.setModalVisible(false);
                                this.itemsRef.push({ sampleName: this.state.sampleName, latitude: this.state.myLat, longitude: this.state.myLon,  });
                            }}>
                                <Text>Submit Sample</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>


            </View>

        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
};

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
    button:{
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'yellow',
        borderColor: 'black',
        margin: 50,
    }
});

export default MapPage