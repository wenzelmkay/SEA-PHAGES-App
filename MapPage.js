
//import different pages
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

//const is like a variable but it can not be reassigned
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Initialize Firebase. "Firebase is a mobile and web application development platform." We are using the database capabilities here.
const config = {
    //api keys go here
};

firebase.initializeApp(config);

class MapPage extends React.Component {
    //lines 41-46 establish whether or not the modal window is visible, and write a function to make the modal visible (this is called later on lines 172 & 205
    state = {
        modalVisible: false,
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    //set initial properties & states for the whole app
    constructor(props) {
        super(props);
        //set the database
        this.database = firebase.database();
        //set a path to establish the location we will be writing & reading samples from
        this.itemsRef = firebase.database().ref('samples');
        //tests the function "writedb()" (line 72) to verify that the database connection works
        this.writeDB();
        //set the initial region data for the map
        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            //make an empty array called markers; to later be populated with data from the database
            markers: [],

        };
        //this.onRegionChange = this.onRegionChange.bind(this);
    }
    //function to test database connection & writing to database
    writeDB(){
        firebase.database().ref('test').set(
            {
                text: 'test!'
            }
        );
    }

    //To fetch sample data from the database, and store it in the empty markers array (line 69)
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            // get children from database and push as into items array
            const items = [];
            snap.forEach((child) => {
                items.push({
                    sampleName: child.val().sampleName,
                    latitude: child.val().latitude,
                    longitude: child.val().longitude,
                    details: child.val().details,
                    _key: child.key
                });
            });
            //confirms that items has been populated with data
            console.log(items);
            //push items data into markers array
            this.setState({
                markers: items,
            });
            //confirms markers has been populated with data
            console.log(this.state.markers);

        });
    };

    //callback whenever the location changes so that it automatically refreshes.
    watchID: ?number = null;

    //stage in the React Component Lifecycle; called after render() method has been executed; allows for manipulation of the dom
    // lines 104-137: this is where we are extracting geolocation data from the phone
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
                //
                this.setState(
                    {
                        myLat: position.coords.latitude,
                        myLon: position.coords.longitude,
                    },
                );

            },

        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState(
                {newRegion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }});
        });

        //this calls the previously defined 'listenforitems()' function and executed the data retrieval from the database
        this.listenForItems(this.itemsRef);


    }
// Render tells the app that something is about to be displayed; return says what that is.
    render() {
        return (

            <View style ={styles.container}>
                <MapView
                    //styles.map is very important! it lets the map display!
                    style = {styles.map}
                    ref = "map"
                    mapType = {"standard"}
                    region={this.state.currentRegion}
                    onRegionChange={this.onRegionChange}
                    //displays a dot at user's location
                    showsUserLocation = {true}
                    showsCompass = {true}>


                    {this.state.markers.map((marker, i) => (
                        <MapView.Marker key={i}
                                        pinColor={"orange"}
                                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                                        title={marker.sampleName}
                                        description={marker.details}>
                            <View style={styles.pin}>
                            </View>
                        </MapView.Marker>
                    ))}

                </MapView>

                <TouchableOpacity style = {styles.button} onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text style = {styles.buttonText}>Add Sample</Text>
                </TouchableOpacity>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={!!this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{margin: 22}}>
                        <View>
                            <TouchableHighlight underlayColor="#64abc1" onPress={()=>this.setModalVisible(false)}>
                                <Text style={{fontSize: 30, textAlign: 'right'}}>X</Text>
                            </TouchableHighlight>
                            <Text style={styles.headerText}>Add a New Sample</Text>
                            <Text style={styles.fieldNameText}>Sample Name</Text>
                            <TextInput style={styles.inputText}
                                        placeholder="i.e. Muddy Creek Sample"
                                       placeholderTextColor={"#a7abb2"}
                                        onChangeText={(text) => this.setState({sampleName: text})}
                            />
                            <Text style={styles.fieldNameText}>Current Latitude</Text>
                            <Text style={styles.inputText}>{this.state.myLat}</Text>
                            <Text style={styles.fieldNameText}>Current Longitude</Text>
                            <Text style={styles.inputText}>{this.state.myLon}</Text>
                            <Text style={styles.fieldNameText}>Details</Text>
                            <TextInput style={styles.inputText}
                                       placeholder="i.e. obtained from edge of muddy creek"
                                       placeholderTextColor={"#a7abb2"}
                                       onChangeText={(text) => this.setState({details: text})}
                            />
                            <TouchableOpacity style = {styles.button} onPress={() => {
                                this.setModalVisible(false);
                                this.itemsRef.push({
                                    sampleName: this.state.sampleName,
                                    latitude: this.state.myLat,
                                    longitude: this.state.myLon,
                                    details: this.state.details,
                                });

                            }}>
                                <Text style = {styles.buttonText}>Submit Sample</Text>
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

//const is like a variable but it can not be reassigned; Routes assigns a title and index number to each scene in app.
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
        backgroundColor: '#f7c05b',
        borderColor: '#515356',
        borderWidth: 2,
        margin: 50,
    },
    buttonText: {
        color: '#515356',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerText : {
        fontSize: 30,
        color: '#515356',
        fontWeight: 'bold',
    },
    fieldNameText: {
        fontSize: 20,
        color: '#515356',
        paddingTop: 20,
    },
    inputText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: '#a7abb2',

    },
});

export default MapPage