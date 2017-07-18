//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';

var {height, width} = Dimensions.get('window');

class Reports extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/SPLASH SCREEN.jpg')}
          style={styles.imageSplash}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Reports;
