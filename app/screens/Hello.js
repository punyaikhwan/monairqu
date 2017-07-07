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
    constructor(props) {
      super(props);
      this.state = {
        tempat: "hhaaaii"
      }
    }
    _onPressButtonGET() {
      fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=-7.7712973,110.3449107&sensor=true')
      .then((response) => response.json())
      .then((response) => {
        this.setState({tempat:response.results[0].formatted_address});
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
                <TouchableHighlight onPress={() =>this._onPressButtonGET()} style={styles.button}>
                    <Text>GET</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressButtonPOST} style={styles.button}>
                    <Text>POST</Text>
                </TouchableHighlight>
                <Text>
                  {this.state.tempat}
                </Text>
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
