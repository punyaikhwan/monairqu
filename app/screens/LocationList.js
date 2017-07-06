import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

var {height,width} = Dimensions.get('window');

class LocationList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     province: "Yogyakarta"  }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.province}
            onValueChange={(province) => this.setState({province})}
            mode="dropdown"
            style={styles.placePicker}
          >
            <Picker.Item style={{fontSize:14}} label="Yogyakarta" value="yogyakarta" />
            <Picker.Item style={{fontSize:14}}  label="Bandung" value="bandung" />
            <Picker.Item style={{fontSize:14}}  label="Surabaya" value="surabaya" />
            <Picker.Item style={{fontSize:14}}  label="Jakarta" value="jakarta" />
          </Picker>
          <Icon style={styles.dropdownIcon} name="chevron-small-down" size={30} color='white'/>
        </View>

        <View style={styles.selectPlace}>
          <Picker
            selectedValue={this.state.city}
            onValueChange={(city) => this.setState({city})}
            mode="dropdown"
            style={styles.placePicker}
          >
            <Picker.Item style={{fontSize:14}} label="Godean" value="godean" />
            <Picker.Item style={{fontSize:14}}  label="Mlati" value="bandung" />
            <Picker.Item style={{fontSize:14}}  label="Bantul" value="surabaya" />
            <Picker.Item style={{fontSize:14}}  label="Sleman" value="jakarta" />
          </Picker>
          <Icon style={styles.dropdownIcon} name="chevron-small-down" size={30} color='white'/>
        </View>

        <View style={styles.placeItem}>
          <Text style={styles.textNamePlace}>
            Gang Adisucipto
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
        <View style={styles.placeItem}>
          <Text style={styles.textNamePlace}>
            Gang Adisucipto
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
        <View style={styles.placeItem}>
          <Text style={styles.textNamePlace}>
            Gang Adisucipto
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
        <View style={styles.placeItem}>
          <Text style={styles.textNamePlace}>
            Gang Adisucipto
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
      </View>
    )
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
