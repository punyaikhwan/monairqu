//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  NetInfo,
  AsyncStorage
} from 'react-native';
import dateFormat from 'dateformat';
import MapView from 'react-native-maps';
import DateTimePicker from 'react-native-modal-datetime-picker';
import update from 'immutability-helper';

var {height, width} = Dimensions.get('window');

//get URL
var markersURL = "https://monairqu.firebaseio.com/markers.json";
//Status Text
var statusRedText= "Bahaya";
var statusOrangeText= "Buruk";
var statusYellowText= "Sedang";
var statusBlueText= "Baik";

//Warna
var red = "rgb(208,2,27)";
var yellow = "rgb(246,215,35)";
var orange = "rgb(246, 166, 35)";
var blue ="rgb(137,191,255)";
var reddark = "rgb(169, 4, 24)";
var yellowdark = "rgb(255, 186, 63)";
var orangedark = "rgb(230, 152, 22)";
var bluedark = "rgb(73, 144, 226)";
var redtrans = "rgba(208,2,27,0.6)";
var yellowtrans = "rgba(246,215,35,0.6)";
var orangetrans = "rgba(246, 166, 35,0.6)";
var bluetrans ="rgba(137,191,255,0.6)";

var date = new Date();
var formatted_date = dateFormat(date, "yyyy-mm-dd");
var hour = dateFormat(date, "H");

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStatusPressed: false,
      selectedPlace: 0,
      sensorId: null,
      selectedImageRecommend: null,
      textLocation: "",
      run: 0,
      bycicle: 0,
      baby: 0,
      status: 0,
      date : formatted_date,
      hour: hour,
      isLoading: true,
      region: {
        latitude: -7.7712196,
        longitude: 110.3473598,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      },
      markers: []
    };
  }

  async componentWillMount() {
    this.getAllAddress();
    try {
      await AsyncStorage.setItem('date', this.state.date);
    } catch (error) {
      console.log("Error saving date.");
    }

    try {
      await AsyncStorage.setItem('flag','0');
    } catch (error) {
      console.log("Error saving flag.");
    }

    try {
      await AsyncStorage.setItem('hour', String(this.state.hour));
    } catch (error) {
      console.log("Error saving hour")
    }
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

  getAllAddress() {
    var getMarkers = [];
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("ONLINE");
        fetch(markersURL)
        .then((response) => response.json())
        .then((response) => {
          getMarkers = response
        })
        .catch((error) => {

        })
        .done(() => {
          this.setState({markers: getMarkers});
          this.setState({isLoading: false});
          this._onSelectPlace(0, this.state.markers[0].latlng.latitude, this.state.markers[0].latlng.longitude, this.state.markers[0].quality);
        })
      } else {
        console.log("OFFLINE");
        setTimeout(() => {this.getAllAddress()}, 1000);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.isLoading === true &&
        <ActivityIndicator
           animating = {this.state.isLoading}
           color = '#bc2b78'
           size = "large"
           style = {styles.activityIndicator}
        />
      }

        <MapView
          style={styles.map}
          mapType="standard"
          showUserLocation={true}
          showCompass={true}
          showsMyLocationButton={true}
          region={this.state.region}
        >


        {this.state.markers.map((marker,i) => (
          <MapView.Marker
            key = {i}
            coordinate={marker.latlng}
            title={marker.sensorId}
            description={marker.description}
            onPress={ () => this._onSelectPlace(i, marker.latlng.latitude, marker.latlng.longitude, marker.quality)}
          >
          {this.state.selectedPlace == i && marker.quality <= 35 &&
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress={ () => console.log(i)}>
              <View style={styles.selectedPercentageRedContainer}>
                <Text style={styles.percentageText}>
                  {marker.quality+"%"}
                </Text>
              </View>
            </TouchableHighlight>
          }
          {this.state.selectedPlace == i && marker.quality > 35 && marker.quality <=60 &&
            <View style={styles.selectedPercentageOrangeContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace == i && marker.quality > 60 && marker.quality <=80 &&
            <View style={styles.selectedPercentageYellowContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace == i && marker.quality > 80 && marker.quality <=100 &&
            <View style={styles.selectedPercentageBlueContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace != i && marker.quality <= 35 &&
            <View style={styles.percentageRedContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace != i && marker.quality > 35 && marker.quality <= 60 &&
            <View style={styles.percentageOrangeontainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace != i && marker.quality > 60 && marker.quality <=80 &&
            <View style={styles.percentageYellowContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          {this.state.selectedPlace != i && marker.quality > 80 && marker.quality <=100 &&
            <View style={styles.percentageBlueContainer}>
              <Text style={styles.percentageText}>
                {marker.quality+"%"}
              </Text>
            </View>
          }
          </MapView.Marker>
        ))}
        </MapView>

        <View style={styles.legenda}>
          <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
            style={styles.imageLoc}/>
          <View style={styles.legendakanan}>
            <View style={styles.legendaatas}>
            <View style={styles.textLocContainer}>
              <ScrollView style={{flex:1}}>
                <Text style={styles.textLoc}>
                  {this.state.textLocation}
                </Text>
              </ScrollView>
            </View>
              <TouchableHighlight style={styles.detailBtn} underlayColor={"rgba(0,0,0,0)"} onPress={() =>
                Actions.chart({sensorId: this.state.sensorId, textLocation: this.state.textLocation, quality: this.state.quality})}>
                <View style={styles.detailBtnContainer}>
                <Text style={styles.detailBtnText}>
                  Details
                </Text>
                </View>
              </TouchableHighlight>

            </View>
            <View style={styles.legendabawah}>
              {this.state.status === 3 &&
                <View style={styles.statusRedContainer}>
                  <Text style={styles.statusText}>
                    {statusRedText}
                  </Text>
                </View>
              }
              {this.state.status === 2 &&
                <View style={styles.statusOrangeContainer}>
                  <Text style={styles.statusText}>
                    {statusOrangeText}
                  </Text>
                </View>
              }
              {this.state.status === 1 &&
                <View style={styles.statusYellowContainer}>
                  <Text style={styles.statusText}>
                    {statusYellowText}
                  </Text>
                </View>
              }
              {this.state.status === 0 &&
                <View style={styles.statusBlueContainer}>
                  <Text style={styles.statusText}>
                    {statusBlueText}
                  </Text>
                </View>
              }

              <TouchableHighlight onPress={()=>this.toggleStatus(0)} underlayColor={"rgba(0,0,0,0)"}>
              <Image source={this.state.run === 0 ? require('../images/run_blue.png') :
                (this.state.run === 1 ? require('../images/run_yellow.png'):
                (this.state.run === 2 ? require('../images/run_orange.png') :
                require('../images/run_red.png')))}
                style={this.state.selectedImageRecommend === 0 ? styles.imageRecommendSelected : styles.imageRecommend}/>
              </TouchableHighlight>

              <TouchableHighlight onPress={()=>this.toggleStatus(1)} underlayColor={"rgba(0,0,0,0)"}>
              <Image source={this.state.bycicle === 0 ? require('../images/bycicle_blue.png') :
                (this.state.bycicle === 1 ? require('../images/bycicle_yellow.png'):
                (this.state.bycicle === 2 ? require('../images/bycicle_orange.png'):
                require('../images/bycicle_red.png')))}
                style={this.state.selectedImageRecommend === 1 ? styles.imageRecommendSelected : styles.imageRecommend}/>
              </TouchableHighlight>

              <TouchableHighlight onPress={()=>this.toggleStatus(2)} underlayColor={"rgba(0,0,0,0)"}>
              <Image source={this.state.baby === 0 ? require('../images/baby_blue.png') :
                (this.state.baby === 1 ? require('../images/baby_yellow.png'):
                (this.state.baby === 2 ? require('../images/baby_orange.png'):
                require('../images/baby_red.png')))}
                style={this.state.selectedImageRecommend === 2 ? styles.imageRecommendSelected : styles.imageRecommend}/>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <TouchableHighlight style={styles.mylocBtn} underlayColor={"rgba(0,0,0,0)"} onPress={this._onPressButton}>
          <View style={styles.myLocBtnContainer}>
          <Image source={require('../images/myloc.png')}
            style={styles.imageMyLoc}/>
          </View>
        </TouchableHighlight>

        {this.state.selectedImageRecommend === 0 && this.state.isStatusPressed &&
        <View style={this.state.run === 0 ? styles.recommendBlueDesc : (
          this.state.run === 1 ? styles.recommendYellowDesc : (
          this.state.run === 2 ? styles.recommendOrangeDesc :
          styles.recommendRedDesc))}>
          <Image source={this.state.run === 0 ? require('../images/run_blue.png'): (
            this.state.run === 1 ? require('../images/run_yellow.png'): (
            this.state.run === 2 ? require('../images/run_orange.png'):
            require('../images/run_red.png')))}
            style={styles.imageRecommendDesc}/>
          <Text style={styles.textRecommendDesc}>
            {(this.state.run === 0 ? "baik" : (
            this.state.run === 1 ? "aman" : (
            this.state.run === 2 ? "tidak disarankan" :
            "berbahaya")))+" untuk olahraga"}
          </Text>
        </View>
        }

        {this.state.selectedImageRecommend === 1 && this.state.isStatusPressed &&
        <View style={this.state.bycicle === 0 ? styles.recommendBlueDesc : (
          this.state.bycicle === 1 ? styles.recommendYellowDesc : (
          this.state.bycicle === 2 ? styles.recommendOrangeDesc :
          styles.recommendRedDesc))}>
          <Image source={this.state.bycicle === 0 ? require('../images/bycicle_blue.png'): (
            this.state.bycicle === 1 ? require('../images/bycicle_yellow.png'): (
            this.state.bycicle === 2 ? require('../images/bycicle_orange.png'):
            require('../images/bycicle_red.png')))}
            style={styles.imageRecommendDesc}/>
          <Text style={styles.textRecommendDesc}>
            {(this.state.bycicle === 0 ? "baik" : (
            this.state.bycicle === 1 ? "aman" : (
            this.state.bycicle === 2 ? "tidak disarankan" :
            "berbahaya")))+" untuk bersepeda"}
          </Text>
        </View>
        }

        {this.state.selectedImageRecommend === 2 && this.state.isStatusPressed &&
        <View style={this.state.baby === 0 ? styles.recommendBlueDesc : (
          this.state.baby === 1 ? styles.recommendYellowDesc : (
          this.state.baby === 2 ? styles.recommendOrangeDesc :
          styles.recommendRedDesc))}>
          <Image source={this.state.baby === 0 ? require('../images/baby_blue.png'): (
            this.state.baby === 1 ? require('../images/baby_yellow.png'): (
            this.state.baby === 2 ? require('../images/baby_orange.png'):
            require('../images/baby_red.png')))}
            style={styles.imageRecommendDesc}/>
          <Text style={styles.textRecommendDesc}>
            {(this.state.baby === 0 ? "baik" : (
            this.state.baby === 1 ? "aman" : (
            this.state.baby === 2 ? "tidak disarankan" :
            "berbahaya")))+" untuk membawa anak"}
          </Text>
        </View>
        }
      </View>
    );
  }

  async setLocTextForShare() {
    try {
      await AsyncStorage.setItem('location', this.state.textLocation);
    } catch (error) {
      console.log("Error saving location.");
    }
  }

 async _onSelectPlace(i, lat, lng, quality) {
    this.setState({selectedPlace: i});
    this.setState({sensorId: this.state.markers[i].sensorId});
    try {
      await AsyncStorage.setItem('quality', String(quality));
    } catch (error) {
      console.log("Error saving quality.");
    }

    this.setState({
      region: {
        latitude: lat,
        longitude: lng,
        longitudeDelta: this.state.region.longitudeDelta,
        latitudeDelta: this.state.region.latitudeDelta
      }
    });
    console.log(this.state.region.latitude, this.state.region.longitude);

    //getAddress
    fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true")
    .then((response) => response.json())
    .then((response) => {
      this.setState({textLocation:response.results[0].formatted_address});
     })
    .catch((error) => {

    })
    .done(() => {
      this.setLocTextForShare();
    });
    //Untuk baby
    if (quality <= 40) {
      this.setState({baby: 3}); //bahaya
    } else
    if (quality > 40 && quality <= 60) {
      this.setState({baby: 2});
    } else
    if (quality > 60 && quality <= 90) {
      this.setState({baby: 1});
    } else {
      this.setState({baby:0});
    }

    //untuk run
    if (quality <= 30) {
      this.setState({run: 3}); //bahaya
    } else
    if (quality > 30 && quality <= 50) {
      this.setState({run: 2});
    } else
    if (quality > 50 && quality <= 80) {
      this.setState({run: 1});
    } else {
      this.setState({run:0});
    }

    //untuk bycicle
    if (quality <= 30) {
      this.setState({bycicle: 3}); //bahaya
    } else
    if (quality > 30 && quality <= 50) {
      this.setState({bycicle: 2});
    } else
    if (quality > 50 && quality <= 65) {
      this.setState({bycicle: 1});
    } else {
      this.setState({bycicle:0});
    }

    //untuk status umum
    if (quality <= 35) {
      this.setState({status: 3}); //bahaya
    } else
    if (quality > 35 && quality <= 60) {
      this.setState({status: 2});
    } else
    if (quality > 60 && quality <= 80) {
      this.setState({status: 1});
    } else {
      this.setState({status:0});
    }
  }

  toggleStatus(i) {
    if (this.state.selectedImageRecommend === i ) {
      this.setState({isStatusPressed: !this.state.isStatusPressed});
      this.setState({selectedImageRecommend: null});
    } else {
      this.setState({isStatusPressed: true});
      this.setState({ selectedImageRecommend: i});
    }
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
    flex:1,
    zIndex:-1
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
    marginTop:11,
    flex: 1
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
  },
  imageRecommendSelected: {
    width:34,
    height:34,
    marginLeft:16,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 34
  },
  legendakanan:{
    flexDirection:"column",
    flex: 3
  },
  legendaatas:{
    flexDirection:"row",
    flex: 5
  },
  legendabawah:{
    flexDirection:"row",
    flex: 3
  },

  textLocContainer: {
    flex: 3
  },

  textLoc:{
    fontSize:12,
    color: 'white',
    marginLeft: 10,
    marginTop: 11,
    flex: 1
  },
  detailBtn: {
    flex: 2
  },

  detailBtnText: {
    fontSize: 14,
    color: "#319bf5",
  },

  detailBtnContainer: {
    borderRadius: 100,
    borderColor: "#319bf5",
    borderWidth:2,
    backgroundColor:"transparent",
    marginTop: 11,
    width: 78.8,
    height: 33.8,
    alignItems: 'center',
    justifyContent: 'center',
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

  percentageRedContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor:redtrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedPercentageRedContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth:6,
    borderColor: 'rgba(0,0,0,0.6)',
    backgroundColor:redtrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  percentageYellowContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor:yellowtrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedPercentageYellowContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth:6,
    borderColor: 'rgba(0,0,0,0.6)',
    backgroundColor:yellowtrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  percentageOrangeContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor:orangetrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedPercentageOrangeContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth:6,
    borderColor: 'rgba(0,0,0,0.6)',
    backgroundColor:orangetrans,
    alignItems: 'center',
    justifyContent: 'center'
  },
  percentageBlueContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor:bluetrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedPercentageBlueContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth:6,
    borderColor: 'rgba(0,0,0,0.6)',
    backgroundColor:bluetrans,
    alignItems: 'center',
    justifyContent: 'center'
  },

  percentageText: {
    fontSize:20,
    color: 'white',
  },

  statusRedContainer: {
    width: 78.8,
    height: 33.8,
    backgroundColor: red,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:16,
  },
  statusOrangeContainer: {
    width: 78.8,
    height: 33.8,
    backgroundColor: orange,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:16,
  },
  statusYellowContainer: {
    width: 78.8,
    height: 33.8,
    backgroundColor: yellow,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:16,
  },
  statusBlueContainer: {
    width: 78.8,
    height: 33.8,
    backgroundColor: blue,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:16,
  },

  statusText: {
    color: 'white',
    fontSize: 16,
  },

  recommendRedDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 191.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: reddark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendOrangeDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 191.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: orangedark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendYellowDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 191.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: yellowdark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendBlueDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 191.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: bluedark,
    borderRadius: 34,
    position: 'absolute',
  },

  imageRecommendDesc: {
    width: 34,
    height: 34
  },

  textRecommendDesc: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: width-72-34,
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: width,
      position: 'absolute',
   }
});

export default Reports;
