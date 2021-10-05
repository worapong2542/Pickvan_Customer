import {View,Text,TouchableOpacity,FlatList,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';


import {getDrawerStatusFromState} from '@react-navigation/drawer';
import {json} from 'express';

function Viewroutebus({navigation}) {
  const [text, settext] = useState([]);
  const [reviews, setReviews] = useState([
    {time: '09.00', destination: 'bkk-pattaya'},
    {time: '10.00', destination: 'bkk-pattaya'},
    {time: '11.00', destination: 'bkk-pattaya'},
  ]);
  useEffect(() => {
    getdata();
  }, []);
  async function getdata() {
    await axios
      .get('http://10.0.2.2:3001/destination')
      .then(res => settext(res.data));
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={reviews}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Routedetail', { item: { item } })} >
            <Card>
              <Text>{item.time}</Text>
              <Text>{item.destination}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Viewroutebus;
