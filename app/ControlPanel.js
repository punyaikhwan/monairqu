import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';
import Button from './Button';

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
          Control Panel
        </Text>
        <Button
          onPress={() => {
            this.props.closeDrawer();
          }}
          text="Close Drawer"
        />
        <Text
          onPress={() => {
            Actions.hello()
          }}>
          Hello
        </Text>
        <Text
          onPress={() => {
            Actions.reportsMap()
          }}>
          Map
        </Text>
        <Text
          onPress={() => {
            Actions.chart()
          }}>
          ReportChart
        </Text>
      </View>
    )
  }
}
