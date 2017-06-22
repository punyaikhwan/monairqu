/*eslint-disable */
import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Drawer = require('react-native-drawer');

class SideDrawerContent extends Component{
    render() {
        return (
            <View
                style={{flex:1, flexDirection: 'column', justifyContent: 'center',alignItems: 'center', backgroundColor: '#EEE'}}>
                <Text>OrderList</Text>
                <Text>Notify</Text>
            </View>
        );
    }
}

class tes extends Component{
    render () {
        return (
            <Drawer
                type="overlay"
                content={<werContent />}
                captureGestures={true}
                openDrawerOffset={0.2}
                panOpenMask={20}
                negotiatePan={false}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
                >
                <View style={{flex:1, flexDirection: 'column'}}>
                    <View style={{position: 'absolute', left: 0, top:0, bottom: 0, width: 20}} />
                    <TouchableOpacity onPress={()=>console.log("button touched")} style={{height:30, backgroundColor:'#08c'}}>
                        <Text>Button</Text>
                    </TouchableOpacity>
                </View>
            </Drawer>
        )
    }
}

export default tes;
