import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView ,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { map } from 'traverse';
import mapMarker from '../style/mapMarker';

function Map({ navigation, route }) {
  const [state, setState] = useState({
    pickupCords:{
      latitude: 13.64788,
      longitude: 100.679709,
      latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
      longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
    },
    droplocationCords:{
      latitude: 13.59984,
      longitude: 100.721244,
      latitudeDelta: 0.03,
      longitudeDelta: 0.005,
    }
  })

  const mapRef = useRef()
  const {pickupCords,droplocationCords} = state
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB1-M05tikKf77sE5ccykQCdto5cuSPP0I';

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
        > 
        <Marker
          coordinate = {pickupCords}
          image={mapMarker.isCurLoc}
        />
         <Marker
          coordinate = {droplocationCords}
          image={mapMarker.isDesLoc}
        />

        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding:{
                right:30,
                bottom:300,
                left:30,
                top:100
              }
            })
          }}
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
