import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    processColor,
    Dimensions,
    Image
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import update from 'immutability-helper';
import {LineChart} from 'react-native-charts-wrapper';
var {height, width} = Dimensions.get('window');

class SimpleTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 0,
            data: {},
            legend: {
              enabled: true,
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
                colors: [processColor('red'), processColor('blue'), processColor('green')],
                labels: ['Company X', 'Company Y', 'Company Dashed']
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

    handleSingleIndexSelect = (index) => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    }

    handleMultipleIndexSelect = (index) => {
        if (this.state.selectedIndices.includes(index)) {
            this.setState({
                ...this.state,
                selectedIndices: this.state.selectedIndices.filter((i) => i !== index),
            });
        }
        else {
            this.setState({
                ...this.state,
                selectedIndices: [
                    ...this.state.selectedIndices,
                    index,
                ],
            });
        }
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
                values: [{y: 100}, {y: 110}, {y: 105}, {y: 115}],
                label: 'Company X',
                config: {
                  lineWidth: 2,
                  drawCircles: false,
                  highlightColor: processColor('red'),
                  color: processColor('red'),
                  drawFilled: true,
                  fillColor: processColor('red'),
                  fillAlpha: 60,
  		            valueTextSize: 15,
                  valueFormatter: "##.000",
                  dashedLine: {
                    lineLength: 20,
                    spaceLength: 20
                  }
                }
              }, {
                values: [{y: 90}, {y: 130}, {y: 100}, {y: 105}],
                label: 'Company Y',
                config: {
                  lineWidth: 1,
                  drawCubicIntensity: 0.4,
                  circleRadius: 10,
                  drawHighlightIndicators: false,
                  color: processColor('blue'),
                  drawFilled: true,
                  fillColor: processColor('blue'),
                  fillAlpha: 45,
                  circleColor: processColor('blue')
                }
              }, {
                values: [{y: 110}, {y: 105}, {y: 115}, {y: 110}],
                label: 'Company Dashed',
                config: {
                  color: processColor('green'),
                  drawFilled: true,
                  fillColor: processColor('green'),
                  fillAlpha: 50
                }
              }],
            }
          },
          xAxis: {
            $set: {
              valueFormatter: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
              position: 'BOTTOM'
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
                <Text style={styles.headerText} >Default segmented control with single selection</Text>
                <SegmentedControlTab
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleSingleIndexSelect} />
            <View style={styles.Seperator} />
                <Text style={styles.headerText} >Default segmented control with multiple selection</Text>
                <SegmentedControlTab
                    multiple={true}
                    selectedIndices={this.state.selectedIndices}
                    onTabPress={this.handleMultipleIndexSelect} />
            <View style={styles.Seperator} />
                <Text style={styles.headerText} >Custom segmented control with custom styles</Text>
                <SegmentedControlTab
                    values={['one', 'two']}
                    selectedIndex={this.state.customStyleIndex}
                    onTabPress={this.handleCustomIndexSelect}
                    borderRadius={0}
                    tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0 }}
                    activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
                    tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
                    activeTabTextStyle={{ color: '#888888' }} />
                    {this.state.customStyleIndex === 0 &&
                      <View style={{width:width, height:height-300}}>
                      <LineChart
                        style={styles.chart}
                        data={this.state.data}
                        description={{text: ''}}
                        legend={this.state.legend}
                        marker={this.state.marker}
                        xAxis={this.state.xAxis}
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
                      </View>
                    }
                    {this.state.customStyleIndex === 1 &&
                    <Text style={styles.tabContent} > Tab two</Text>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  tabViewText: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 50,
    fontSize: 18
  },
  titleText: {
    color: '#444444',
    padding: 20,
    fontSize: 14,
    fontWeight: '500'
  },
  headerText: {
      padding: 8,
      fontSize: 14,
      color: '#444444'
  },
  tabContent: {
      color: '#444444',
      fontSize: 18,
      margin: 24
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    marginTop: 24
  },
  chart: {
    flex: 1
  }
})



export default SimpleTab;
