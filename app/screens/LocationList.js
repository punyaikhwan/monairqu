import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

var {height,width} = Dimensions.get('window');

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

  closeActivityIndicator = () => setTimeout(() => this.setState({ loadPlace: false }), 1000)

  componentWillMount() {
    this.setState({listShowedLoc: this.props.listShowedLoc !== undefined ? this.props.listShowedLoc : []});
    this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, this.state.city)});
  }

  componentDidMount() {
    this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, this.state.city)});
    this.closeActivityIndicator();
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
                this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, this.state.city)});
                this.setState({loadPlace: true});
                this.closeActivityIndicator();
                console.log(this.state.listShowedLoc);
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
                this.setState({listShowedLoc: this.getAllAddress(this.state.statusList, city)});
                this.setState({loadPlace: true});
                this.closeActivityIndicator();
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
        console.error(error);
      })
      .done(() => {
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
