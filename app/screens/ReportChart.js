//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Tab, TabLayout } from 'react-native-android-tablayout';
import Labels from './Labels';

var {height, width} = Dimensions.get('window');


class ReportChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
          style={styles.imageAnimationLegenda}/>
        <View style={styles.legenda}>
          <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
            style={styles.imageLoc}/>
          <Text style={styles.textLoc}>
            {"CANDI BOROBUDUR\nJl. Badrawati, Borobudur,\nMagelang, Jawa Tengah"}
          </Text>
          <View style={styles.date}>
            <Text style={styles.textDateMonth}>
            Juni
            </Text>
            <Text style={styles.textDateDay}>
            18
            </Text>
            <Text style={styles.textDateYear}>
            2017
            </Text>
          </View>
        </View>

        <View style={styles.statusArea}>
          <Image source={require('../images/group_4.png')}
            style={styles.imageStatus}/>
          <Image source={require('../images/group_12.png')}
            style={styles.imageRecommendSelected}/>
          <Image source={require('../images/group_11.png')}
            style={styles.imageRecommend}/>
          <Image source={require('../images/group_13.png')}
            style={styles.imageRecommend}/>
        </View>

        <View style={{width:width}}>
          <TabLayout style={styles.tabLayout}>
            <Tab
              accessibilityLabel={Labels.CustomView.tab1}
              onTabSelected={()=>{ this.setState({tabSelected: 1}) }}
              style={styles.tab1}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>Big size</Text>
            </Tab>
            <Tab
              accessibilityLabel={Labels.CustomView.tab2}
              onTabSelected={()=>{ this.setState({tabSelected: 2}) }}
              style={styles.tab2}>
              <Icon name="rocket" size={30} color="#6c1d5f" style={{marginRight: 10}}/>
              <Text>Fly!</Text>
            </Tab>
            <Tab
              accessibilityLabel={Labels.CustomView.tab3}
              onTabSelected={()=>{ this.setState({tabSelected: 3}) }}
              style={styles.tab3}>
              <Image
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                style={{width: 48, height: 48, marginRight: 10}}/>
              <Text style={{width: 40}}>React Native</Text>
            </Tab>
          </TabLayout>
          </View>
      </View>
    );
  }

  _onPressButton() {

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'flex-start',
    backgroundColor: '#172c41'
  },

  imageAnimationLegenda: {
    width:width,
    height: 220,
  },

  legenda: {
    width:width,
    height: 113,
    marginTop:72,
    backgroundColor: 'rgba(71, 186, 236, 0.8)',
    flexDirection: "row",
    position: 'absolute'
  },
  imageLoc: {
    width:51,
    height:51,
    marginLeft:14,
    marginTop:11,
    flex: 2
  },
  textLoc:{
    fontSize:12,
    color: 'white',
    marginLeft: 10,
    marginTop: 11,
    flex: 5
  },

  date: {
    flex: 3,
    flexDirection:'column',
    marginTop: 11,
  },

  textDateMonth: {
    fontSize:14,
    color: 'white',
    textAlign: 'center',
  },
  textDateDay: {
    fontSize:36,
    color: 'white',
    textAlign: 'center',
  },
  textDateYear: {
    fontSize:14,
    color: 'white',
    textAlign: 'center',
  },

  statusArea: {
    flexDirection: "row",
    marginTop: 200,
    height: 100,
    position: 'absolute'
  },

  imageStatus: {
    width:79,
    height:35,
    marginLeft:14,
  },

  imageRecommend: {
    width:34,
    height:34,
    marginLeft:16,
  },
  imageRecommendSelected: {
    width:34,
    height:34,
    marginLeft:16,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 34,
  },
  tabLayout: {
   backgroundColor: '#ddd'
   },
   tab1: {
     width: 110,
     height: 300,
     alignItems: 'center',
     justifyContent: 'center'
   },
   tab2: {
     width: 110,
     height: 300,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center'
   },
   tab3: {
     width: 110,
     height: 300,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center'
   },
});

export default ReportChart;
