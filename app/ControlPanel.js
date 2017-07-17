import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';
import Button from './Button';

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={styles.controlPanel}>
        <TouchableHighlight onPress={() => {Actions.reportsMap()}}>
        <View style={styles.titleControlPanel}>
          <Text style={styles.controlPanelWelcome}>
            AIR SKY
          </Text>
        </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.reportsMap()}}>
          <View style={styles.controlPanelMenuContainer}>
            <Text style={styles.controlPanelMenu}>
              Map
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.chart()}}>
          <View style={styles.controlPanelMenuContainer}>
            <Text style={styles.controlPanelMenu}>
              Report Chart
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.locationList()}}>
          <View style={styles.controlPanelMenuContainer}>
            <Text style={styles.controlPanelMenu}>
              Location List
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
