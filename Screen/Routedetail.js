import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import styles from '../style/homeStyle';


function Routedetail({ navigation, route }) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Card>
        <Text>เวลา : {item.item.time}</Text>
        <Text>{item.item.destination}</Text>
        <Text>ทะเบียนรถ:{item.item.license}</Text>
        <Text>ราคา:{item.item.price}</Text>
      </Card>

      <Card>
        <View>
          <Text>ทะเบียนรถ: </Text>
          <Text>จุดขึ้นรถ:</Text>
          <Text>จุดลงรถ:</Text>
        </View>
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('ConfirmTicket', { item: { item } })}>
        <View style={styles.btnConfirm}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>จอง</Text>
        </View>
      </TouchableOpacity>


    </View>


  );
}

export default Routedetail;

