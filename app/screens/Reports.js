//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';

var {height, width} = Dimensions.get('window');
class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      region: {
        latitude: -7.7712196,
        longitude: 110.3473598,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      },
      markers: [
        {latlng: {latitude: -7.770167, longitude: 110.346807},
          title: "WEMOS 1", description: "Di sini sensor 1"},
        {latlng: {latitude: -7.772000, longitude: 110.347630},
          title: "WEMOS 2", description: "Di sini sensor 2"},
        {latlng: {latitude: -7.773316, longitude: 110.344091},
          title: "WEMOS 3", description: "Di sini sensor 3"},
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onRegionChange(region) {
    this.setState({region});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="standard"
          showUserLocation={true}
          showCompass={true}
          showsMyLocationButton={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((marker,i) => (
          <MapView.Marker
            key = {i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress={this._onPressButton}>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>
                  {"15%"}
                </Text>
              </View>
            </TouchableHighlight>
          </MapView.Marker>
        ))}
        </MapView>

        <View style={styles.legenda}>
          <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
            style={styles.imageLoc}/>
          <View style={styles.legendakanan}>
            <View style={styles.legendaatas}>

              <Text style={styles.textLoc}>
                {"CANDI BOROBUDUR\nJl. Badrawati, Borobudur,\nMagelang, Jawa Tengah"}
              </Text>

              <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress={this._showDateTimePicker}>
                <View style={styles.detailBtnContainer}>
                <Text style={styles.detailBtnText}>
                  Details
                </Text>
                </View>
              </TouchableHighlight>

            </View>
            <View style={styles.legendabawah}>
              <Image source={require('../images/group_4.png')}
                style={styles.imageStatus}/>
              <Image source={require('../images/group_12.png')}
                style={styles.imageRecommendSelected}/>
              <Image source={require('../images/group_11.png')}
                style={styles.imageRecommend}/>
              <Image source={require('../images/group_13.png')}
                style={styles.imageRecommend}/>
            </View>
          </View>
        </View>

        <TouchableHighlight style={styles.mylocBtn} underlayColor={"rgba(0,0,0,0)"} onPress={this._onPressButton}>
          <View style={styles.myLocBtnContainer}>
          <Image source={require('../images/myloc.png')}
            style={styles.imageMyLoc}/>
          </View>
        </TouchableHighlight>

        <View style={styles.statusDesc}>
          <Image source={require('../images/group_12.png')}
            style={styles.imageStatusDesc}/>
          <Text style={styles.textStatusDesc}>
            Aman untuk olahraga outdoor
          </Text>
        </View>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
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
    backgroundColor: '#F5FCFF'
  },
 map: {
    top: 0,
    left: 0,
    width:width,
    flex:1
  },
  legenda: {
    width:width,
    height: 113,
    marginTop:72,
    backgroundColor: '#172c41',
    flexDirection: "row",
    position: 'absolute'
  },
  imageLoc: {
    width:88,
    height:88,
    marginLeft:14,
    marginTop:11
  },
  imageStatus: {
    width:79,
    height:35,
    marginLeft:14,
    marginTop:11
  },

  imageRecommend: {
    width:34,
    height:34,
    marginLeft:16,
    marginTop:11
  },
  imageRecommendSelected: {
    width:34,
    height:34,
    marginLeft:16,
    marginTop:11,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 34
  },
  legendakanan:{
    flexDirection:"column"
  },
  legendaatas:{
    flexDirection:"row"
  },
  legendabawah:{
    flexDirection:"row"
  },
  textLoc:{
    fontSize:12,
    color: 'white',
    marginLeft: 10,
    marginTop: 11
  },

  detailBtnText: {
    fontSize: 14,
    color: "#319bf5",
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 20,
    paddingRight: 20
  },
  detailBtnContainer: {
    borderRadius: 100,
    borderColor: "#319bf5",
    borderWidth:2,
    backgroundColor:"transparent",
    marginLeft: 18,
    marginTop: 11
  },
  mylocBtn: {
    marginLeft:width-90,
    marginTop:height-110,
    position: 'absolute'
  },
  myLocBtnContainer: {
    borderRadius: 100,
    borderColor: 'white',
    borderWidth:2,
    backgroundColor:'white'
  },
  imageMyLoc: {
    width:20,
    height:20,
    margin: 20
  },
  percentageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth:2,
    backgroundColor:'#f6a623'
  },

  percentageText: {
    fontSize:16,
    color: 'white',
    marginTop: 15,
    marginLeft: 15
  },

  percentageContainerSelected: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth:6,
    backgroundColor:'#f6a623'
  },
  statusDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 191.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: "#4990e2",
    borderRadius: 34,
    position: 'absolute'
  },

  imageStatusDesc: {
    width: 34,
    height: 34
  },

  textStatusDesc: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: width-72-34,
  },
});

export default Reports;
