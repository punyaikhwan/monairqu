import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Dimensions,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

var {height,width} = Dimensions.get('window');
var listShowedLoc = [];

class LocationList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     province: "Yogyakarta",
     city: "Sleman",
     locIndex: 0,
     renderContent: null,
     element: null,
     responses:[],
     locationList: [
       {
         province: "Yogyakarta",
         kabupaten: ["Sleman", "Bantul", "Gunung Kidul", "Kulon Progo"]
       },
       {
         province: "Jakarta",
         kabupaten: ["Jakarta Pusat", "Jakarta Utara", "Jakarta Selatan", "Jakarta Timur", "Jakarta Barat"]
       },
       {
         province: "Jawa Barat",
         kabupaten: ["Kota Bandung", "Tasikmalaya", "Indramayu", "Sumedang", "Cimahi"]
       },
     ],
     statusList: [
       {sensorId: "abc123", latlng: {latitude: -7.770167, longitude: 110.346807},
         description: "Di sini sensor 1", quality: 15, co: 280, temperature: 27},
       {sensorId: "abc124", latlng: {latitude: -7.772000, longitude: 110.347630},
         description: "Di sini sensor 2", quality: 75, co: 290, temperature: 29},
       {sensorId: "abc125", latlng: {latitude: -7.773316, longitude: 110.344091},
         description: "Di sini sensor 3", quality: 100, co: 300, temperature: 28},
     ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.province}
            onValueChange={
              (province, i) => {
                this.setState({province: province});
                this.setState({locIndex: i});
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

        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.city}
            onValueChange={
              (city) => {
                this.setState({city});
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
        <Text onPress={() => this.setState({responses:this.getAllAddress(this.state.statusList)})}> GET ADDRESS</Text>
        <Text onPress={() => this.showLog(this.state.responses)}>LOG ADDRESS</Text>
      </View>
    )
  }

  tesText() {
    return(
      <Text onPress={() => console.log(this.getAllAddress(this.state.statusList))}> Haaiii</Text>
    )
  }

  showLog(str) {
    console.log(str)
  }



  getAllAddress(statusList) {
    var telement = "";
    var responseContainer = [];
    statusList.map((status, i) => {
      fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+status.latlng.latitude+","+status.latlng.longitude+"&sensor=true")
      .then((response) => response.json())
      .then((response) => {
        if (response.results[0].address_components[3].long_name.indexOf(this.state.city) !== -1) {
          telement = response.results[0].address_components[0].long_name+" "+response.results[0].address_components[1].long_name;
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .done(() => {
        responseContainer[i] = telement;
      })
    })
    return responseContainer;
  }
  getViewAddress(latlng, i) {
      fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng.latitude+","+latlng.longitude+"&sensor=true")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.results[0].address_components[3].long_name.indexOf(this.state.city))
        // if (response.results[0].address_components[3].long_name.indexOf(this.state.city) !== -1) {
        this.setState({renderContent: response.results[0].formatted_address});
        // }
      })
      .catch((error) => {
        console.error(error);
      })
      console.log("Content: ", this.state.renderContent);
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
    padding: 5
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
  }
});

export default LocationList;
