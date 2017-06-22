import React, { Component } from 'react';
import {Actions, Router, Scene } from 'react-native-router-flux';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import Reports from './screens/Reports';
import styles from './styles';
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';

import tweens from './tweens';

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
      tapToClose: false,
      negotiatePan: false,
      side: "left",
    };
  }

  render() {
    var controlPanel = <MyControlPanel closeDrawer={() => {
      this._drawer.close();
    }} />

    return (
      <Drawer
        ref={c => this.drawer = c}
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
        >
        <Router>
          <Scene key="root" navigationBarStyle={styles.navbarStyle} titleStyle={styles.title} >
            <Scene key="reportsMap" component={Reports} title="Reports" initial={true} renderLeftButton={this.menuButton} renderRightButton={this.groupButton}/>
          </Scene>
        </Router>
      </Drawer>
    )
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

  openDrawer(){
    this._drawer.open()
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  menuButton(){
    return(
      <TouchableOpacity onPress={() =>
      {this.context.drawer.open();}}>
        <Image
          source={require('./images/menu.png')}
          style={{width:22, height:22, marginLeft: 13.5, marginTop: 20}}/>
      </TouchableOpacity>
    )
  }

  groupButton(){
    return(
      <TouchableOpacity onPress={() => Actions.refresh({key:'drawer', open:true})}>
        <Image
          source={require('./images/groups.png')}
          style={{width:22, height:22, marginRight: 13.5, marginTop: 20}}/>
      </TouchableOpacity>
    )
  }
}

export default App;
