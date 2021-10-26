import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import {getDrawerStatusFromState} from '@react-navigation/drawer';
import styles from '../style/homeStyle';

function Status({navigation, route}) {
  const {item} = route.params;
  const data = item.item.item.item[0];
  console.log(item);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text>เวลา : {data.vandata.time.substring(0, 5)}</Text>
        <Text>{data.vandata.name}</Text>
        <Text>ทะเบียนรถ:{data.vandata.license}</Text>
        <Text>จำนวนที่นั่ง: {data.seat_select} </Text>
        <Text>รวมราคา:{data.vandata.price * data.seat_select}</Text>
        
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.btnConfirm}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            กลับหน้าหลัก
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Status;
