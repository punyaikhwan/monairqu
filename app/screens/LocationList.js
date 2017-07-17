import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  NetInfo
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

var {height,width} = Dimensions.get('window');

//get URL
var statusListURL = "https://monairqu.firebaseio.com/markers.json";
var locationListURL = "https://monairqu.firebaseio.com/locationlist/-KpDK6iurgbQx2o4LfkZ.json";
class LocationList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     loadPlace: true,
     province: "Yogyakarta",
     city: "Sleman",
     locIndex: 0,
     renderContent: null,
     listShowedLoc: [],
     element: null,
     locationList: [],
     statusList: []
    }
  }

  closeActivityIndicator(){
    setTimeout(() => {
      if (this.state.listShowedLoc.length === 0) {
        Actions.refresh(this.state.listShowedLoc);
      }}, 500);
  }

  componentWillMount() {
    this.getAllLocations();
    this.getAllStatusList();
    this.setState({listShowedLoc: this.props.listShowedLoc !== undefined ? this.props.listShowedLoc : []});
  }

  getAllLocations() {
    var locations = [];
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("ONLINE");
        fetch(locationListURL)
        .then((response) => response.json())
        .then((response) => {
          locations = response
        })
        .catch((error) => {

        })
        .done(() => {
          this.setState({locationList: locations});
          this.setState({isLoadingLoc: false});
        })
      } else {
        console.log("OFFLINE");
        setTimeout(() => {this.getAllLocations()}, 1000);
      }
    });
  }

  getAllStatusList() {
    var getMarkers = [];
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("ONLINE");
        fetch(statusListURL)
        .then((response) => response.json())
        .then((response) => {
          getMarkers = response
        })
        .catch((error) => {

        })
        .done(() => {
          this.setState({statusList: getMarkers});
          this.setState({isLoadingStatusList: false});
          this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, this.state.city)});
        })
      } else {
        console.log("OFFLINE");
        setTimeout(() => {this.getAllStatusList()}, 1000);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoadingLoc === true && this.state.isLoadingStatusList === true &&
          <ActivityIndicator
             animating = {this.state.isLoading}
             color = '#bc2b78'
             size = "large"
             style = {styles.activityIndicator}
          />
        }
        {this.state.isLoadingLoc === false && this.state.isLoadingStatusList === false &&
        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.province}
            onValueChange={
              (province, i) => {
                this.setState({province: province});
                this.setState({locIndex: i});
                this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, this.state.city)});
                this.setState({loadPlace: true});
              }
            }
            mode="dropdown"
            style={styles.placePicker}
          >
          {this.state.locationList.map((loc, i) => (
            <Picker.Item key={i} style={{fontSize:14}} label={loc.province} value={loc.province, i} />
          ))}
          </Picker>
          <Icon style={styles.dropdownIcon} name="chevron-small-down" size={30} color='white'/>
        </View>
      }
      {this.state.isLoadingLoc === false && this.state.isLoadingStatusList === false &&
        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.city}
            onValueChange={
              (city) => {
                this.setState({city});
                this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, city)});
                this.setState({loadPlace: true});
              }
            }
            mode="dropdown"
            style={styles.placePicker}
          >
          {this.state.locationList[this.state.locIndex].kabupaten.map((kab, i) => (
            <Picker.Item key={i} style={{fontSize:14}} label={kab} value={kab} />
          ))}
          </Picker>
          <Icon style={styles.dropdownIcon} name="chevron-small-down" size={30} color='white'/>
        </View>
        }
        {this.state.loadPlace === true &&
          <ActivityIndicator
             animating = {this.state.loadPlace}
             color = '#bc2b78'
             size = "large"
             style = {styles.activityIndicator}
          />
        }

        {this.state.listShowedLoc.map((items, i) => (
          <TouchableHighlight key={i} style={{width: width, height: 50}} onPress={() =>
            Actions.chart({sensorId: items.sensorId, textLocation: items.placeNameLong, quality: items.quality})}>
          <View style={styles.placeItem}>
            <Text style={styles.textNamePlace}>
              {items.placeNameShort}
            </Text>
            <Text style={styles.textCOPlace}>
              {items.co}
            </Text>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={styles.textTempPlace}>
                {items.temperature}
              </Text>
              <Text style={{flex:1,fontSize:11, lineHeight:7, color: 'white'}}>
                o
              </Text>
            </View>
            <Text style={styles.textAirPlace}>
              {items.quality+"%"}
            </Text>
          </View>
          </TouchableHighlight>
        ))}
      </View>
    )
  }


  getAllAddress(statusList, city) {
    var placeName = "";
    var sensorId;
    var latlng;
    var description;
    var quality;
    var co;
    var temperature;
    var j = 0;
    var responseContainer = [];
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("ONLINE");
        console.log(statusList.length);
        statusList.map((status, i) => {
          fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+status.latlng.latitude+","+status.latlng.longitude+"&sensor=true")
          .then((response) => response.json())
          .then((response) => {
            if (response.results[0].formatted_address.indexOf(city) !== -1) {
              placeName = response.results[0].address_components[0].long_name+" "+response.results[0].address_components[1].long_name;
              var tempArr = {
                sensorId : status.sensorId,
                latlng : status.latlng,
                description : status.description,
                placeNameShort : placeName,
                placeNameLong : response.results[0].formatted_address,
                quality : status.quality,
                co : status.co,
                temperature : status.temperature,
              }
              responseContainer[j] = tempArr;
              j = j+1;
            }
          })
          .catch((error) => {

          })
          .done(() => {
            setTimeout(() => this.setState({loadPlace: false}), 1000);
            console.log(responseContainer);
          })
        })
      } else {
        console.log("OFFLINE");
        setTimeout(() => {responseContainer = this.getAllAddress(statusList, city)}, 1000);
        setTimeout(() => {this.setState({listShowedLoc: responseContainer})}, 1500);
      }
    });
    return responseContainer;
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#172c41',
    alignItems: 'center',
    marginTop: 70
  },
  selectPlace: {
    marginTop: 20,
    marginLeft: 31,
    width: width-62,
    height: 40,
    borderColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  placePicker: {
    flex: 10,
    height: 35,
    color: 'white',
    backgroundColor: '#172c41',
  },
  dropdownIcon:{
    flex:1,
    margin: 5
  },

  placeItem: {
    flexDirection: 'row',
    borderBottomColor: '#c0969696',
    borderBottomWidth: 1,
    marginTop: 20,
    marginRight: 32,
    marginLeft: 32,
    padding: 5,
    flex: 1
  },
  textNamePlace: {
    flex: 5,
    fontSize: 14,
    color: 'white'
  },
  textCOPlace: {
    flex: 1,
    fontSize: 14,
    color: 'white'
  },
  textTempPlace: {
    flex: 1,
    fontSize: 14,
    color: 'white'
  },
  textAirPlace: {
    flex: 1,
    fontSize: 14,
    color: 'white'
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});

export default LocationList;
