import { StyleSheet, PixelRatio } from 'react-native';
const deviceScreen = require('Dimensions').get('window')

module.exports = StyleSheet.create({
  controlPanel: {
    flex: 1,
    backgroundColor:'#0c1823',
  },

  controlPanelText: {
    color:'white',
  },
  controlPanelWelcome: {
    fontSize: 24,
    textAlign: 'center',
    color:'white',
    fontWeight:'bold',
  },
  navbarStyle: {
    height: 72,
    backgroundColor: '#172c41',
    borderBottomColor: '#172c41'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10
  },

  titleControlPanel: {
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
    height: 100,
    borderColor: 'white'
  },

  imageLogo: {
    width: deviceScreen.width-100,
    height: 100
  },
  controlPanelMenuContainer: {
    height: 50,
    justifyContent: 'center',
    marginLeft:40,
  },

  controlPanelMenu: {
    color: 'white',
    margin:4,
    fontSize: 14,
  }
});
