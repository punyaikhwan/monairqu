import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Reports from '../screens/Reports';
import Nav from '../screens/Nav';

export const Root = StackNavigator({
  // Nav: {
  //   screen: Nav,
  //   title: 'Nav',
  // },
  Reports: {
    screen: Reports,
    title: 'Reports',
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
