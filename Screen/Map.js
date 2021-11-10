import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {map} from 'traverse';
import mapMarker from '../style/mapMarker';
import GetLocation from 'react-native-get-location';
import LocationEnabler from 'react-native-location-enabler';

function Map({navigation, route}) {
  const {item} = route.params;
  const [state, setState] = useState({
    pickupCords: {
      latitude: 13.64788,
      longitude: 100.679709,
      latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
      longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
    },
    droplocationCords: {
      latitude: 13.285909416869071,
      longitude: 100.92419757312429,
      latitudeDelta: 0.03,
      longitudeDelta: 0.005,
    },
    isFocused: false,
    fixedOnUUID: '',
  });
  //13.285909416869071, 100.92419757312429

  const {
    PRIORITIES: {HIGH_ACCURACY},
    useLocationSettings,
  } = LocationEnabler;
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  );

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      get_location();
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function get_location() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then(location => {
        set_location(location);
      })
      .catch(error => {
        Alert.alert('เกิดข้อผิดผลาด', 'กดปุ่ม OK เพื่อเปิด GPS ใหม่อีกครั้ง', [
          {
            text: 'Cancel',
            onPress: () => console.log('Error'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => requestResolution()},
        ]);
      });
  }

  async function set_location(location) {
    await axios
      .get(
        'http://10.0.2.2:3001/customer/get_driver_location/' + item.ticket_id,
      )
      .then(res =>
        setState({
          pickupCords: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
            longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
          },
          droplocationCords: {
            latitude: res.location_detail.latitude,
            longitude: res.location_detail.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.005,
          },
        }),
      );
  }
  //13.286999423678475, 100.93491412305957

  const mapRef = useRef();
  const {pickupCords, droplocationCords} = state;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB1-M05tikKf77sE5ccykQCdto5cuSPP0I';

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}>
        <Marker coordinate={pickupCords} image={mapMarker.isCurLoc} />
        <Marker coordinate={droplocationCords} image={mapMarker.isDesLoc} />

        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.animateToRegion(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
    </View>
  );
}
//animateToRegion

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
