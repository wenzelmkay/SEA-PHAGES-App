//importing different pages
import React, {Component} from 'react';
import {
    TouchableHighlight,
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Navigator,
    Text,
    Button,
    Alert,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';

//use class to define a component
class DetailScreen extends Component {
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Name</Text>
                                <TextInput/>
                            <Text>Date</Text>
                                <TextInput/>
                            <Text>Time</Text>
                                <TextInput/>
                            <TouchableOpacity style = {styles.button} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style = {styles.button} onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableOpacity>

            </View>
        );
    }

    /*    render(){
        return (
            <TouchableOpacity style={styles.button} onPress={()=>
                Alert.alert('Button has been pressed!')}>
                <Text>BUTTOn</Text>
            </TouchableOpacity>
        );
    }*/
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button:{
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        margin: 100
    },
});

export default DetailScreen