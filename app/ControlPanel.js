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
        <View style={styles.titleControlPanel}>
          <Text style={styles.controlPanelWelcome}>
            AIR SKY
          </Text>
        </View>
        <TouchableHighlight onPress={() => {Actions.hello()}}>
          <Text style={styles.controlPanelMenu}>
            Hello
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {Actions.reportsMap()}}>
          <Text style={styles.controlPanelMenu}>
            Map
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.chart()}}>
        <Text style={styles.controlPanelMenu}>
          ReportChart
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.locationList()}}>
        <Text style={styles.controlPanelMenu}>
          Location List
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {Actions.tab()}}>
        <Text style={styles.controlPanelMenu}>
          Tab
        </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
