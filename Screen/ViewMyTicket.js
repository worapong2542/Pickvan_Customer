import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewMyTicket({route, navigation}) {
    const { item } = route.params;
    // console.log({item});

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Text> View Ticket</Text>
      </View>
    </View>
  );
}

export default ViewMyTicket;

const styles = StyleSheet.create({
  textDate: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  boxDate: {
    width: 91,
  },
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
  }
});
