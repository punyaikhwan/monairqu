//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  processColor,
  Alert,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'dateformat';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {LineChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';
var {height, width} = Dimensions.get('window');

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

class ReportChart extends Component {
  constructor(props) {
    super(props);

    //get Data
    var date = new Date();
    var dateDown = dateFormat(date, "yyyy-mm-dd");
    console.log(dateDown),
    date.setDate(date.getDate()+1);
    var dateUp = dateFormat(date, "yyyy-mm-dd");
    console.log(dateUp),
    console.log(this.props.sensorId),
    //mount hari, load dari internet
    // http://api.monairqu.labs.skyshi.com/airquality?sensor_id=abc123&createdAt[$lte]=2017-07-10&createdAt[$gte]=2017-07-08
    fetch("http://api.monairqu.labs.skyshi.com/airquality?sensor_id="+this.props.sensorId+"&createdAt[$lte]="+dateUp+"&createdAt[$gte]="+dateDown)
    .then((response) => response.text())
    .then((response) => {
      console.log(response);
     })
    .catch((error) => {
      console.error(error);
    });
    this.state = {
      isDateTimePickerVisible: false,
      day: dateFormat(date, "dd"),
      month: dateFormat(date, "mmm"),
      year: dateFormat(date, "yyyy"),
      dateUp: dateUp,
      dateDown: dateDown,
      selectedIndex: 0,
      selectedIndices: [0],
      indexTab: 0,
      data: {},
      selectedImageRecommend: null,
      quality: this.props.quality,
      run: 0,
      bycicle: 0,
      baby: 0,
      status: 0,
      legend: {
        enabled: false,
        textColor: processColor('blue'),
        textSize: 12,
        position: 'BELOW_CHART_RIGHT',
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('#6caefb')],
          labels: ['CO']
        }
      },
      marker: {
        enabled: true,
        backgroundTint: processColor('teal'),
	      markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),

      },
      statusquality: {
          sensorId: "abc123",
          day: [
            {y:90}, {y:87}, {y:80}, {y:78}, {y:80}, {y:75}, {y:68}, {y:65}, {y:60}, {y:65}, {y:70}, {y:65},
            {y:50}, {y:60}, {y:55}, {y:65}, {y:70}, {y:78}, {y:85}, {y:85}, {y:86}, {y:80}, {y:85}, {y:90}
          ],
          week: [
            {y:80}, {y:70}, {y:70}, {y:80}, {y:60}, {y:55}, {y:82}
          ],
          month: [
            {y:80}, {y:80}, {y:75}, {y:70}
          ]
        },
        statusCompare: {

        }
    };
  }

  handleCustomIndexSelect = (index) => {
      this.setState({
          ...this.state,
          indexTab: index,
      });
  }

  componentWillMount() {

  }
  componentDidMount() {
    this.setState(
      update(this.state, {
        dataDay: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.day,
              label: 'CO',
              config: {
                lineWidth: 2,
                drawCircles: true,
                highlightColor: processColor('#6caefb'),
                color: processColor('#6caefb'),
                drawFilled: true,
                fillColor: processColor('#6caefb'),
                fillAlpha: 60,
                drawValues: false,
                valueTextColor: processColor('white'),
              }
            }],
          }
        },
        xAxisDay: {
          $set: {
            valueFormatter: ['00','01','02','03','04','05', '06', '07', '08', '09', '10', '11', '12',
                              '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            position: 'BOTTOM',
            textColor: processColor('white'),
            label: "Hari"
          }
        },
        yAxisDay: {
            $set: {
              left: {
                textColor: processColor('white'),
                axisMinimum: 0,
                axisMaximum: 100
              },
              right: {
                enabled: false
              }
            }
          }
      })
    );

    this.setState(
      update(this.state, {
        dataWeek: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.week,
              label: 'CO',
              config: {
                lineWidth: 2,
                drawCircles: true,
                highlightColor: processColor('#6caefb'),
                color: processColor('#6caefb'),
                drawFilled: true,
                fillColor: processColor('#6caefb'),
                fillAlpha: 60,
                drawValues: false,
                valueTextColor: processColor('white'),
              }
            }],
          }
        },
        xAxisWeek: {
          $set: {
            valueFormatter: ['Sun','Mon','Tue','Wed','Thu','Fri', 'Sat'],
            position: 'BOTTOM',
            textColor: processColor('white'),
            label: "Hari"
          }
        },
        yAxisWeek: {
            $set: {
              left: {
                textColor: processColor('white'),
                axisMinimum: 0,
                axisMaximum: 100
              },
              right: {
                enabled: false
              }
            }
          }
      })
    );

    this.setState(
      update(this.state, {
        dataMonth: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.month,
              label: 'CO',
              config: {
                lineWidth: 2,
                drawCircles: true,
                highlightColor: processColor('#6caefb'),
                color: processColor('#6caefb'),
                drawFilled: true,
                fillColor: processColor('#6caefb'),
                fillAlpha: 60,
                drawValues: false,
                valueTextColor: processColor('white'),
              }
            }],
          }
        },
        xAxisMonth: {
          $set: {
            valueFormatter: ['Week1','Week2','Week3','Week4'],
            position: 'BOTTOM',
            textColor: processColor('white'),
            label: "Hari"
          }
        },
        yAxisMonth: {
            $set: {
              left: {
                textColor: processColor('white'),
                axisMinimum: 0,
                axisMaximum: 100
              },
              right: {
                enabled: false
              }
            }
          }
      })
    );
  }

  handleSelect(event) {
    var entry = event.nativeEvent;
    var quality = entry.y;
    // console.log(entry.y)
    this.setState({quality: quality});
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

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
          style={styles.imageAnimationLegenda}/>
        <View style={styles.legenda}>
          <Image source={require('../images/borobudur_sunrise_tour_16_copy.jpg')}
            style={styles.imageLoc}/>
          <Text style={styles.textLoc}>
            {this.props.textLocation}
          </Text>
          <View style={styles.date}>
            <Text style={styles.textDateMonth}>
            {this.state.month}
            </Text>
            <Text style={styles.textDateDay}>
            {this.state.day}
            </Text>
            <Text style={styles.textDateYear}>
            {this.state.year}
            </Text>
          </View>
        </View>

        <View style={styles.statusArea}>
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

        <View style={styles.detailStatus}>
          <View style={styles.detailPerItem}>
            <View style={styles.topSegmentDetail}>
              <Icon style={styles.iconUpDown} name="triangle-up" size={30} color="#50e3c2"/>
              <Text style={styles.textNumber}>
                46
              </Text>
            </View>
            <Text style={styles.labelDetail}>
              {"Kadar CO (PPM)"}
            </Text>
          </View>
          <View style={styles.detailPerItem}>
            <View style={styles.topSegmentDetail}>
              <Icon style={styles.iconUpDown} name="triangle-up" size={30} color="#50e3c2"/>
              <Text style={styles.textNumber}>
                35
              </Text>
            </View>
            <Text style={styles.labelDetail}>
              {"Suhu (Celcius)"}
            </Text>
          </View>
          <View style={styles.detailPerItem}>
            <View style={styles.topSegmentDetail}>
              <Icon style={styles.iconUpDown} name="triangle-up" size={30} color="#50e3c2"/>
              <Text style={styles.textNumber}>
                {"60%"}
              </Text>
            </View>
            <Text style={styles.labelDetail}>
              {"Kualitas Udara"}
            </Text>
          </View>
        </View>

        <View style={styles.tabChart}>
        <SegmentedControlTab
            values={['Daily', 'Weekly', 'Monthly']}
            selectedIndex={this.state.indexTab}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabTextStyle={styles.activeTabTextStyle} />
            {this.state.indexTab === 0 &&
              <View>
                <View style={{width:width-20, height:200, flexDirection:'row'}}>
                  <Icon name="chevron-thin-left" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                  <LineChart
                    style={styles.chart}
                    data={this.state.dataDay}
                    description={{text: ''}}
                    legend={this.state.legend}
                    marker={this.state.marker}
                    xAxis={this.state.xAxisDay}
                    yAxis={this.state.yAxisDay}
                    animation={{durationX: 2000}}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={true}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}

                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}

                    keepPositionOnRotation={false}
                    onSelect={this.handleSelect.bind(this)}
                  />
                  <Icon name="chevron-thin-right" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                </View>
                <Text style={styles.addDay} onPress={this._showDateTimePicker}>
                {"+ Add day "}
                </Text>
              </View>
            }
            {this.state.indexTab === 1 &&
              <View>
                <View style={{width:width-20, height:200, flexDirection:'row'}}>
                  <Icon name="chevron-thin-left" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                  <LineChart
                    style={styles.chart}
                    data={this.state.dataWeek}
                    description={{text: ''}}
                    legend={this.state.legend}
                    marker={this.state.marker}
                    xAxis={this.state.xAxisWeek}
                    yAxis={this.state.yAxisWeek}
                    animation={{durationX: 2000}}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={true}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}

                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}

                    keepPositionOnRotation={false}
                    onSelect={this.handleSelect.bind(this)}
                  />
                  <Icon name="chevron-thin-right" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                </View>
                <Text style={styles.addDay} onPress={this._showDateTimePicker}>
                {"+ Add day "}
                </Text>
              </View>
            }
            {this.state.indexTab === 2 &&
              <View>
                <View style={{width:width-20, height:200, flexDirection:'row'}}>
                  <Icon name="chevron-thin-left" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                  <LineChart
                    style={styles.chart}
                    data={this.state.dataMonth}
                    description={{text: ''}}
                    legend={this.state.legend}
                    marker={this.state.marker}
                    xAxis={this.state.xAxisMonth}
                    yAxis={this.state.yAxisMonth}
                    animation={{durationX: 2000}}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={true}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}

                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}

                    keepPositionOnRotation={false}
                    onSelect={this.handleSelect.bind(this)}
                  />
                  <Icon name="chevron-thin-right" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                </View>
                <Text style={styles.addDay} onPress={this._showDateTimePicker}>
                {"+ Add day "}
                </Text>
              </View>
            }

        </View>
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
    backgroundColor: '#172c41'
  },

  imageAnimationLegenda: {
    width:width,
    height: 200,
  },

  legenda: {
    width:width,
    height: 100,
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
    marginTop: 180,
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
    marginTop: 250.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: reddark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendOrangeDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 250.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: orangedark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendYellowDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 250.8,
    width: width-72,
    flexDirection: "row",
    backgroundColor: yellowdark,
    borderRadius: 34,
    position: 'absolute',
  },

  recommendBlueDesc: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 250.8,
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

  tabChart:{
    width:width-20,
    marginLeft:10,
    marginTop: 20,
  },
  chart: {
    flex: 8
  },

  tabsContainerStyle: {
    height: 30,
    backgroundColor: '#172c41'
  },

  tabStyle: {
    backgroundColor: '#172c41',
    borderWidth:0,
    borderBottomWidth: 2,
    borderBottomColor: '#4a5969'
  },

  activeTabStyle: {
    backgroundColor: '#172c41',
    borderWidth:0,
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },

  activeTabTextStyle: {
    color: 'white'
  },

  tabTextStyle: {
    color: '#4a5969',
  },

  detailStatus: {
    width:width-62,
    height: 50,
    marginTop: 30,
    marginLeft: 31,
    flexDirection: 'row'
  },

  detailPerItem: {
    flex: 1,
    width: (width-62)/3,
    flexDirection: 'column',
    alignItems: 'center'
  },

  topSegmentDetail: {
    flex:2,
    flexDirection: 'row'
  },

  iconUpDown: {
    flex: 1
  },

  textNumber: {
    flex: 2,
    fontSize: 20,
    color: 'white'
  },
  labelDetail: {
    flex: 1,
    color: 'white',
    fontSize: 12
  },

  addDay: {
    color: '#e9a83c',
    fontSize: 15,
    marginLeft: 32,
    marginTop: 10,
  }
});

export default ReportChart;
