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

class LocationList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     province: "Yogyakarta",
     city: "Sleman",
     locIndex: 0,
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
     latlngList: [
       {latitude: -7.770167, longitude: 110.346807},
       {latitude: -7.772000, longitude: 110.347630},
       {latitude: -7.773316, longitude: 110.344091},
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
        {this.state.latlngList.map((latlng, i) => (
          this.getViewAddress(latlng, i)
        ))}
        {this.tesText()}
      </View>
    )
  }

  tesText() {
    return(
      <Text> Haaiii</Text>
    )
  }
  getViewAddress(latlng, i) {
      var renderContent
      fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng.latitude+","+latlng.longitude+"&sensor=true")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.results[0].address_components[3].long_name.indexOf(this.state.city))
        // if (response.results[0].address_components[3].long_name.indexOf(this.state.city) !== -1) {
          return (
            <View key={i} style={styles.placeItem}>
              <Text style={styles.textNamePlace}>
                {response.results[0].address_components[0].long_name+", "+response.results[0].address_components[1].long_name}
              </Text>
              <Text style={styles.textCOPlace}>
                46
              </Text>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text style={styles.textTempPlace}>
                  35
                </Text>
                <Text style={{flex:1,fontSize:11, lineHeight:7, color: 'white'}}>
                  o
                </Text>
              </View>
              <Text style={styles.textAirPlace}>
                60%
              </Text>
            </View>
          )
        // }
      })
      .catch((error) => {
        console.error(error);
      })
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
