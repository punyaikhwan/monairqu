/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Navbar } from 'navbar-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');

import MapView from 'react-native-maps';

class Reports extends Component {
  render() {
    return (
      <Container>
        <Navbar
            bgColor = {"#172c41"}
            title={"Navbar Native"}
            left={{
                icon: "ios-menu",
                onPress: () => {alert('Toggle menu!')}
            }}
            right={{
                icon: "ios-search",
                onPress: () => {alert('Search!')}
            }}
        />
      <View style={styles.container}>
      <MapView
      style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
 map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height
  },
});

export default Reports;
