import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

function Map({ navigation, route }) {
  const [state, setState] = useState({
    pickupCords:{
      latitude: 13.64788,
      longitude: 100.679709,
      latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
      longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
    },
    droplocationCords:{
      latitude: 13.274305,
      longitude: 100.928648,
      latitudeDelta: 0.03,
      longitudeDelta: 0.005,
    }
  })

  const {pickupCords,droplocationCords} = state
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB1-M05tikKf77sE5ccykQCdto5cuSPP0I';

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
        > 
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
        />
      </MapView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
