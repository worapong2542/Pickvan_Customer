import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {map} from 'traverse';
import mapMarker from '../style/mapMarker';
import GetLocation from 'react-native-get-location';
import LocationEnabler from 'react-native-location-enabler';
import axios from 'axios';

function Map({navigation, route}) {
  const {ticket_id} = route.params;
  const [state, setState] = useState({
    pickupCords: {
      latitude: 13.77839841319077,
      longitude: 100.55987628382091,
      latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
      longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
    },
    droplocationCords: {
      latitude: 13.645132912893455,
      longitude: 100.68987324050981,
      latitudeDelta: 0.03,
      longitudeDelta: 0.005,
    },
    isFocused: false,
    fixedOnUUID: '',
  });
  let i = 0;

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function get_location() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then(location => {
        set_location(location);
      })
      .catch(error => {
        console.log(error);
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
      .get('http://10.0.2.2:3001/customer/demo_gps/' + i)
      .then(res => check_location_status(location, res));
    //.get('http://10.0.2.2:3001/customer/get_driver_location/' + ticket_id)
  }

  function check_location_status(location, res) {
    i++
    if(i>6){
      i=0
    }
    if (res.data.location_status == 0) {
      alert('ไม่สามารถเข้าถึงGPSของคนขับได้');
      navigation.push('Home');
    } else {
      setState({
        pickupCords: {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.03, //รัศมีจากตำแหน่ง lattitude
          longitudeDelta: 0.005, //รัศมีจากตำแหน่ง lontitude
        },
        droplocationCords: {
          latitude: parseFloat(res.data.location_detail.latitude),
          longitude: parseFloat(res.data.location_detail.longitude),
          latitudeDelta: 0.03,
          longitudeDelta: 0.005,
        },
      });
    }
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
        <Marker coordinate={pickupCords} image={mapMarker.isDesLoc} />
        <Marker coordinate={droplocationCords} image={mapMarker.isCurLoc} />

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
