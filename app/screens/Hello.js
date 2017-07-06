'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert
} from 'react-native';

class Hello extends Component{

    _onPressButtonGET() {
      var sss = "haaiii"
      fetch('http://api.monairqu.labs.skyshi.com/airquality?sensor_id=abc123&')
      .then((response) => response.text())
      .then((responseJson) => {
        Alert.alert(
            "GET Response",
            "Result:"+responseJson
        );
        console.log('Result',responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _onPressButtonPOST() {
        fetch("http://localhost:3000/test", {method: "POST", body: JSON.stringify({username: "nraboy", firstname: "Nic", lastname: "Raboy"})})
        .then((response) => response.json())
        .then((responseData) => {
            Alert.alert(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData.body)
            )
        })
        .done();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._onPressButtonGET} style={styles.button}>
                    <Text>GET</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressButtonPOST} style={styles.button}>
                    <Text>POST</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    }
});

export default Hello;
