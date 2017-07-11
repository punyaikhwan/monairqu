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
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
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

//get Data
var date = new Date();
var tomorrow = new Date();
class ReportChart extends Component {
  constructor(props) {
    super(props);

    tomorrow.setDate(tomorrow.getDate()+1);
    var dateDown = dateFormat(date, "yyyy-mm-dd");
    console.log(dateDown);
    var dateUp = dateFormat(tomorrow, "yyyy-mm-dd");
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
      comparedDate: null,
      day: dateFormat(date, "dd"),
      month: dateFormat(date, "mmm"),
      year: dateFormat(date, "yyyy"),
      hour: dateFormat(date, "HH"),
      daySelected: null,
      weekSelected: null,
      dateUp: dateUp,
      dateDown: dateDown,
      selectedIndex: 0,
      selectedIndices: [0],
      indexTab: 0,
      data: {},
      selectedImageRecommend: null,
      quality: null,
      co: null,
      temperature: null,
      run: 0,
      bycicle: 0,
      baby: 0,
      status: 0,
      isComparing: false,
      isShowToday: true,
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
        airquality: {
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
        co: {
          day: [
            290, 287, 280, 278, 280, 275, 268, 265, 260, 265, 270, 265,
            250, 260, 255, 265, 270, 278, 285, 285, 286, 280, 285, 290
          ],
          week: [
            280, 270, 270, 280, 260, 255, 282
          ],
          month: [
            280, 280, 275, 270
          ]
        },
        temperature: {
          day: [
            20, 22, 23, 23, 22, 24, 27, 28, 29, 29, 30, 30,
            31, 32, 29, 28, 26, 25, 25, 24, 23, 22, 22, 22
          ],
          week: [
            30, 31, 28, 30, 32, 29, 28
          ],
          month: [
            29, 30, 33, 30
          ]
        }
      },
      statusCompare: {
        sensorId: "abc123",
        airquality: {
          day: [
            {y:60}, {y:77}, {y:90}, {y:78}, {y:80}, {y:55}, {y:50}, {y:35}, {y:70}, {y:45}, {y:50}, {y:55},
            {y:50}, {y:62}, {y:57}, {y:69}, {y:76}, {y:85}, {y:85}, {y:80}, {y:88}, {y:85}, {y:80}, {y:90}
          ],
          week: [
            {y:78}, {y:68}, {y:75}, {y:60}, {y:70}, {y:60}, {y:72}
          ],
          month: [
            {y:86}, {y:85}, {y:76}, {y:79}
          ]
        },
        co: {
          day: [
            290, 287, 280, 278, 280, 275, 268, 265, 260, 265, 270, 265,
            250, 260, 255, 265, 270, 278, 285, 285, 286, 280, 285, 290
          ],
          week: [
            280, 270, 270, 280, 260, 255, 282
          ],
          month: [
            280, 280, 275, 270
          ]
        },
        temperature: {
          day: [
            20, 22, 23, 23, 22, 24, 27, 28, 29, 29, 30, 30,
            31, 32, 29, 28, 26, 25, 25, 24, 23, 22, 22, 22
          ],
          week: [
            30, 31, 28, 30, 32, 29, 28
          ],
          month: [
            29, 30, 33, 30
          ]
        }
      }
    };
  }

  handleCustomIndexSelect = (index) => {
      this.setState({
          ...this.state,
          indexTab: index,
      });
  }

  async componentWillMount() {
    var entry = this.state.statusquality;
    this.setState({quality: entry.airquality.day[this.state.hour].y});
    this.setState({co: entry.co.day[this.state.hour]});
    this.setState({temperature: entry.temperature.day[this.state.hour]});
    try {
      await AsyncStorage.setItem('location', this.props.textLocation);
    } catch (error) {
      console.log("Error saving location.");
    }

    try {
      await AsyncStorage.setItem('date', this.state.dateDown);
    } catch (error) {
      console.log("Error saving date.");
    }

    console.log("DATE:",date);
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        dataDay: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.airquality.day,
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
            }
          ],
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
              values: this.state.statusquality.airquality.week,
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
              values: this.state.statusquality.airquality.month,
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

  addToCompareData() {
    this.setState(
      update(this.state, {
        dataDay: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.airquality.day,
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
            }, {
              values: this.state.statusCompare.airquality.day,
              label: 'CO',
              config: {
                lineWidth: 2,
                drawCircles: true,
                highlightColor: processColor('#ffff00'),
                color: processColor('#ffff00'),
                drawFilled: false,
                fillColor: processColor('#6caefb'),
                fillAlpha: 60,
                drawValues: false,
                valueTextColor: processColor('white'),
              }
            }
          ],
          }
        }
      })
    );
    this.setState({isComparing: true});
  }

  closeCompare() {
    this.setState(
      update(this.state, {
        dataDay: {
          $set: {
            dataSets: [{
              values: this.state.statusquality.airquality.day,
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
            }
          ],
          }
        }
      })
    );
    this.setState({isComparing: false});
    this.setState({isShowToday: true});
  }

  toggleShowToday() {
    if (this.state.isShowToday) {
      this.setState(
        update(this.state, {
          dataDay: {
            $set: {
              dataSets: [{
                values: this.state.statusCompare.airquality.day,
                label: 'CO',
                config: {
                  lineWidth: 2,
                  drawCircles: true,
                  highlightColor: processColor('#ffff00'),
                  color: processColor('#ffff00'),
                  drawFilled: true,
                  fillColor: processColor('#6caefb'),
                  fillAlpha: 60,
                  drawValues: false,
                  valueTextColor: processColor('white'),
                }
              }
            ],
            }
          }
        })
      );
    } else {
      this.addToCompareData();
    }

    console.log("Before:", this.state.isShowToday)
    this.setState({isShowToday: !this.state.isShowToday})
    console.log("After:", this.state.isShowToday)
  }

  async handleSelectDay(event) {
    //flag: 0, 1, 2 untuk day, week, month
    var entry = event.nativeEvent;
    console.log(entry.x);
    this.setState({hour: (entry.x !== undefined ? entry.x: this.state.hour)});
    this.setState({quality: (entry.x !== undefined ? this.state.statusquality.airquality.day[entry.x].y: this.state.quality)});
    this.setState({co: this.state.statusquality.co.day[this.state.hour-1]});
    this.setState({temperature: this.state.statusquality.temperature.day[this.state.hour]});
    try {
      await AsyncStorage.setItem('quality', String(this.state.quality));
    } catch (error) {
      console.log("Error saving quality.");
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
    this.changeStatus(this.state.quality);
  }

  async handleSelectWeek(event) {
    //flag: 0, 1, 2 untuk day, week, month
    var entry = event.nativeEvent;
    this.setState({daySelected: (entry.x !== undefined ? entry.x: this.state.daySelected)});
    this.setState({quality: (entry.x !== undefined ? this.state.statusquality.airquality.week[entry.x].y: this.state.quality)});
    console.log(entry.x);
    this.setState({co: this.state.statusquality.co.week[this.state.daySelected]});
    this.setState({temperature: this.state.statusquality.temperature.week[this.state.daySelected]});
    try {
      await AsyncStorage.setItem('quality', String(this.state.quality));
    } catch (error) {
      console.log("Error saving quality.");
    }

    try {
      await AsyncStorage.setItem('flag','1');
    } catch (error) {
      console.log("Error saving flag.");
    }

    try {
      await AsyncStorage.setItem('daySelected', String(this.state.daySelected));
    } catch (error) {
      console.log("Error saving day")
    }
    this.changeStatus(this.state.quality);
  }

  async handleSelectMonth(event) {
    //flag: 0, 1, 2 untuk day, week, month
    var entry = event.nativeEvent;
    this.setState({weekSelected: (entry.x !== undefined ? entry.x: this.state.weekSelected)});
    this.setState({quality: (entry.x !== undefined ? this.state.statusquality.airquality.month[entry.x].y: this.state.quality)});
    this.setState({co: this.state.statusquality.co.month[this.state.weekSelected]});
    this.setState({temperature: this.state.statusquality.temperature.month[this.state.weekSelected]});
    try {
      await AsyncStorage.setItem('quality', String(this.state.quality));
    } catch (error) {
      console.log("Error saving quality.");
    }

    try {
      await AsyncStorage.setItem('flag','2');
    } catch (error) {
      console.log("Error saving flag.");
    }

    try {
      await AsyncStorage.setItem('weekSelected', String(this.state.weekSelected));
    } catch (error) {
      console.log("Error saving week")
    }
    this.changeStatus(this.state.quality);
  }

  changeStatus(quality) {
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
              <Icon style={styles.iconUpDown} name="triangle-up" size={20} color="#50e3c2"/>
              <Text style={styles.textNumber}>
                {this.state.co}
              </Text>
            </View>
            <Text style={styles.labelDetail}>
              {"Kadar CO (PPM)"}
            </Text>
          </View>
          <View style={styles.detailPerItem}>
            <View style={styles.topSegmentDetail}>
              <Icon style={styles.iconUpDown} name="triangle-up" size={20} color="#50e3c2"/>
              <View style={{flex:2, flexDirection:'row'}}>
                <Text style={styles.textNumberTemp}>
                  {this.state.statusquality.temperature.day[this.state.hour]}
                </Text>
                <Text style={{flex:2,fontSize:11, lineHeight:7, color: 'white'}}>
                  o
                </Text>
              </View>
            </View>
            <Text style={styles.labelDetail}>
              {"Suhu (Celcius)"}
            </Text>
          </View>
          <View style={styles.detailPerItem}>
            <View style={styles.topSegmentDetail}>
              <Icon style={styles.iconUpDown} name="triangle-up" size={20} color="#50e3c2"/>
              <Text style={styles.textNumber}>
                {this.state.quality+"%"}
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
                    onSelect={this.handleSelectDay.bind(this)}
                  />
                </View>
                {this.state.isComparing === false &&
                  <Text style={styles.addDay} onPress={this._showDateTimePicker}>
                  {"+ Add day "}
                  </Text>
                }
                {this.state.isComparing === true &&
                  <View style={styles.compareContainer}>
                    <View style={styles.comparingSection}>
                      <Icon name = "controller-stop" size= {20} color = {blue} style={styles.iconComparing}/>
                      <Text style={styles.textDateCompare}>
                        Today
                      </Text>
                      <Text style={styles.textCOPlace}>
                        {this.state.statusquality.co.day[this.state.hour]}
                      </Text>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.textTempPlace}>
                          {this.state.statusquality.temperature.day[this.state.hour]}
                        </Text>
                        <Text style={{flex:1,fontSize:11, lineHeight:7, color: 'white'}}>
                          o
                        </Text>
                      </View>
                      <Text style={styles.textAirPlace}>
                        {this.state.statusquality.airquality.day[this.state.hour].y+"%"}
                      </Text>
                      {this.state.isShowToday === true &&
                        <TouchableOpacity style={styles.iconComparing} onPress={this.toggleShowToday.bind(this)}>
                        <Icon name= "eye" size= {20} color = "#cfff00"/>
                        </TouchableOpacity>
                      }
                      {this.state.isShowToday === false &&
                        <TouchableOpacity style={styles.iconComparing} onPress={this.toggleShowToday.bind(this)}>
                        <Icon name= "eye-with-line" size= {20} color = "#8A8383"/>
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={styles.comparingSection}>
                      <Icon name = "controller-stop" size= {20} color = {yellow} style={styles.iconComparing}/>
                      <Text style={styles.textDateCompare}>
                        {this.state.comparedDate}
                      </Text>
                      <Text style={styles.textCOPlace}>
                          {this.state.statusCompare.co.day[this.state.hour]}
                      </Text>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.textTempPlace}>
                          {this.state.statusCompare.temperature.day[this.state.hour]}
                        </Text>
                        <Text style={{flex:1,fontSize:11, lineHeight:7, color: 'white'}}>
                          o
                        </Text>
                      </View>
                      <Text style={styles.textAirPlace}>
                        {this.state.statusCompare.airquality.day[this.state.hour].y+"%"}
                      </Text>
                      <TouchableOpacity style={styles.iconComparing} onPress={this.closeCompare.bind(this)}>
                      <Icon name= "cross" size= {20} color = "#cfff00"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>
            }

            {this.state.indexTab === 1 &&
              <View>
                <View style={{width:width-20, height:200, flexDirection:'row'}}>
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
                    onSelect={this.handleSelectWeek.bind(this)}
                  />
                </View>
                <Text style={styles.addDay} onPress={this._showDateTimePicker}>
                {"+ Add day "}
                </Text>
              </View>
            }
            {this.state.indexTab === 2 &&
              <View>
                <View style={{width:width-20, height:200, flexDirection:'row'}}>
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
                    onSelect={this.handleSelectMonth.bind(this)}
                  />
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
          maximumDate={date}
        />
      </View>
    );
  }

  _onPressButton() {

  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({comparedDate: dateFormat(date, "ddd, dd mmm yyyy")});
    console.log(this.state.comparedDate);
    this.addToCompareData();
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
    flex: 1
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

  textNumberTemp: {
    flex: 1,
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
  },

  compareContainer: {
    flexDirection: "column",
    marginRight: 32,
    marginLeft: 32,
    marginTop: 10,
  },

  comparingSection: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    flex: 1
  },

  iconComparing: {
    flex: 1
  },
  textDateCompare: {
    flex: 3,
    fontSize: 14,
    color: '#e9a83c'
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

export default ReportChart;
