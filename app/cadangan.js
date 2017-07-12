if (response.results[0].address_components[3].long_name.indexOf(this.state.city) !== -1) {
<View style={styles.placeItem}>
  <Text style={styles.textNamePlace}>
    {response.results[0].address_components[0].long_name+response.results[0].address_components[1].long_name}
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
}
