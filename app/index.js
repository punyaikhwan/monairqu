import React, { Component } from 'react';
import {Actions, Router, Scene } from 'react-native-router-flux';
import {StyleSheet, TouchableOpacity, Image, StatusBar, Share, AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import Reports from './screens/Reports';
import styles from './styles';
import ReportChart from './screens/ReportChart';
import LocationList from './screens/LocationList';
import Icon from 'react-native-vector-icons/Entypo';
import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';
import tweens from './tweens';

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}


let counter = 0;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left",
      open: false
    };
  }

  componentDidMount () {
   //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
   SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 2000,
      delay: 1000,
   })
 }
  render() {
    var controlPanel = <MyControlPanel closeDrawer={() => {
      this.closeDrawer;
    }} />

    return (

      <Drawer
        ref={c => this._drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.side}
        open={this.state.open}
        >
        <Router>
          <Scene key="root" navigationBarStyle={styles.navbarStyle} titleStyle={styles.title} >
            <Scene key="reportsMap" component={Reports} title="Reports" initial={true} renderBackButton={()=>this.menuButton()} renderLeftButton={()=>this.menuButton()} renderRightButton={()=>this.shareButton()}/>
            <Scene key="chart" component={ReportChart} title="Reports" initial={false} renderBackButton={()=>this.backButton()} renderRightButton={()=>this.shareButton()}/>
            <Scene key="locationList" component={LocationList} title="Daftar Lokasi" initial={false} renderBackButton={()=>this.menuButton()} renderLeftButton={()=>this.menuButton()}/>
          </Scene>
        </Router>
        <StatusBar
         backgroundColor="#172c41"
         barStyle="default"
        />
      </Drawer>
    );
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer() {
    this.setState({
      open: true
    });
  }

  closeDrawer(){
    this.setState({
      open: false
    });
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  menuButton(){
    return(
      <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image
          source={require('./images/group_2.png')}
          style={{width:22, height:22, marginLeft: 13.5, marginTop: 10}}/>
      </TouchableOpacity>
    )
  }

  groupButton(){
    return(
      <TouchableOpacity onPress={() => Actions.refresh({key:'drawer', open:true})}>
        <Image
          source={require('./images/groups.png')}
          style={{width:22, height:22, marginRight: 13.5, marginTop: 10}}/>
      </TouchableOpacity>
    )
  }

  numberToDayString(value) {
    switch(value) {
      case '0': return "Sunday"; break;
      case '1': return "Monday"; break;
      case '2': return "Tuesday"; break;
      case '3': return "Wednesday"; break;
      case '4': return "Thursday"; break;
      case '5': return "Friday"; break;
      case '6': return "Saturday"; break;
      default: return "Undefined day"; break;
    }
  }
  _shareMessage() {
    var message = "AIR QUALITY INFORMATION\n";
    AsyncStorage.getItem('location').then((value) => {
      message = message+"Location: "+value+"\n";
      AsyncStorage.getItem('date').then((value) => {
        message = message+"Date: "+value+"\n";
        AsyncStorage.getItem('flag').then((flag) => {
          if (flag === '0') {
            AsyncStorage.getItem('hour').then((value) => {
              message = message+"Hour: "+value+":00\n";
              AsyncStorage.getItem('quality').then((value) => {
                message = message+"Quality: "+value+"%\n";
                Share.share({
                  message: message
                });
              }).done();
            }).done();
          } else
          if (flag === '1') {
            AsyncStorage.getItem('daySelected').then((value) => {
              message = message+"day: "+this.numberToDayString(value)+"\n";
              AsyncStorage.getItem('quality').then((value) => {
                message = message+"Quality: "+value+"%\n";
                Share.share({
                  message: message
                });
              }).done();
            }).done();
          } else {
            AsyncStorage.getItem('daySelected').then((value) => {
              message = message+"week: "+value+"\n";
              AsyncStorage.getItem('quality').then((value) => {
                message = message+"Quality: "+value+"%\n";
                Share.share({
                  message: message
                });
              }).done();
            }).done();
          }
        }).done();
      }).done();
    }).done();
  }

  shareButton(){
    return(
      <TouchableOpacity onPress={() => this._shareMessage()}>
        <Image
          source={require('./images/groups_copy_3.png')}
          style={{width:22, height:22, marginRight: 13.5, marginTop: 10}}/>
      </TouchableOpacity>
    )
  }

  backButton(){
    return(
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="chevron-thin-left" color="#848484" size={30} style={{marginTop:10}}/>
      </TouchableOpacity>
    )
  }
}

export default App;
