import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import {getDrawerStatusFromState} from '@react-navigation/drawer';
import {json} from 'express';

function Viewroutebus({navigation,route}) {
  const [dataschedule, setdataschedule] = useState([]);
  const [select_date, set_select_date] = useState(0);
  const date_format = [];
  //set data from api in reviews
  const [reviews, setReviews] = useState([]);
  const {item} = route.params;
  console.log(item);

  //auto start set date
  date();

  //call api (send parameter(date_format[index])) and use this away select_date on change
  useEffect(() => {
    getschedule(select_date);
  }, [select_date]);

  //map data on dataschedule change
  useEffect(() => {
    setReviews(dataschedule);
  }, [dataschedule]);

  //set date now in array(3day)
  function date() {
    for (let i = 0; i <= 3; i++) {
      let targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + i);
      let day = targetDate.getDate();
      let month = targetDate.getMonth() + 1;
      let year = targetDate.getFullYear();
      date_format.push(year + '-' + month + '-' + day);
    }
  }
  console.log(date_format[1])
  //api
  async function getschedule(x) {
    await axios
      .get('http://10.0.2.2:3001/customer/getschedule/' + date_format[x])
      .then(res => setdataschedule(res.data));

  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(0)}>
            <Text>{date_format[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(1)}>
            <Text>{date_format[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(2)}>
            <Text>{date_format[2]}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Routedetail', {item: {item}})}>
              <Card>
                <Text>เวลา : {item.time.substring(0, 5)}</Text>
                <Text>{item.destination}</Text>
                <Text>{item.license}</Text>
                <Text>ที่นั่งเหลือ :{item.license} ที่</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Viewroutebus;
