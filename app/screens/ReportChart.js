//Screen for report based on Map

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  processColor
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {LineChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';
var {height, width} = Dimensions.get('window');


class ReportChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0,
      data: {},
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

      }
    };
  }

  handleCustomIndexSelect = (index) => {
      this.setState({
          ...this.state,
          customStyleIndex: index,
      });
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [{y: 40}, {y: 50}, {y: 60}, {y: 50}, {y:70}, {y:65}, {y:85}],
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
        xAxis: {
          $set: {
            valueFormatter: ['18.00','19.00','20.00','21.00','22.00','23.00', '24.00'],
            position: 'BOTTOM',
            textColor: processColor('white')
          }
        },
        yAxis: {
            $set: {
              left: {
                textColor: processColor('white')
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
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
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
            selectedIndex={this.state.customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabTextStyle={styles.activeTabTextStyle} />
            {this.state.customStyleIndex === 0 &&
              <View style={{width:width-20, height:250, flexDirection:'row'}}>
                <Icon name="chevron-thin-left" color="#848484" size={40} style={{textAlignVertical:'center', flex:1}}/>
                <LineChart
                  style={styles.chart}
                  data={this.state.data}
                  description={{text: ''}}
                  legend={this.state.legend}
                  marker={this.state.marker}
                  xAxis={this.state.xAxis}
                  yAxis={this.state.yAxis}
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
            }
            {this.state.customStyleIndex === 1 &&
            <Text style={styles.tabContent} > Weekly Chart</Text>}
            {this.state.customStyleIndex === 2 &&
            <Text style={styles.tabContent} > Monthly Chart</Text>}
        </View>

        <Text style={styles.addDay} onPress={this._showDateTimePicker}>
        {"+ Add day "}
        </Text>

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
    fontSize: 12,
    marginLeft: 32,
  }
});

export default ReportChart;
