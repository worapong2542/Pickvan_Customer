import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

function Routedetail({ navigation, route }) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Card>
        <Text style={styles.textBold}>{item[0].vandata.time.substring(0, 5)}</Text>
        <Text style={styles.textBold}>{item[0].vandata.name}</Text> 
        <Text style={styles.textDefault}>{item[0].vandata.license}</Text> 
      </Card>

      <Card>
        <Text style={styles.textDefault}>จุดขึ้นรถ  :  {item[0].point_down_select}</Text>
        <Text style={styles.textDefault}>จุดลงรถ  :  {item[0].point_up_select}</Text>
      </Card>

      <Card>
        <Text style={styles.textDefault}>จำนวน : <Text style={styles.textBold}>{item[0].seat_select} </Text> ที่นั่ง</Text>
        <Text style={styles.textDefault}>รวม :  {item[0].vandata.price * item[0].seat_select}  บาท</Text>
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

const styles = StyleSheet.create({
   textBold: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textDefault: {
    color: '#5660B3',
    fontSize: 16,
    marginBottom: 10,
  },
  btnConfirm: {
    marginTop:200,
    margin: 20,
    backgroundColor: 'rgba(254, 181, 166, 1)',
    borderRadius: 40,
    height: 45,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
})
