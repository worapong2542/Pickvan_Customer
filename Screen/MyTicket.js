import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyTicket({route, navigation}) {
  const [dataTicket, setdataTicket] = useState([]);
  const [userId, setuserId] = useState('')

  useEffect(() => {
    getuserId();
  }, []); 

  async function getuserId() { 
    const id = await AsyncStorage.getItem('@dataloginId');
    setuserId(id)
  }
  console.log(userId);

  useEffect(() => {
    getTicket();
  }, []);

  async function getTicket() {
    await axios
      .get('http://10.0.2.2:3001/customer/get_myticket'+ '/' +userId)
      .then(res => setdataTicket(res.data));
  }

  console.log(dataTicket);

  //push data to ViewMyticket
  function navto_ViewMyticket(item_select) {
    let data = [];
    data.push({
      ticket_id: item.ticket_id,
      time: item.time.substring(0, 5),
      date: item.date.substring(0, 10),
      name: item.name,
      seat_amount: item.seat_amount,
    });
    navigation.navigate('ViewMyticket', {item: data});
  }


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={dataTicket}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navto_ViewMyticket(item)}>
              <Card>
                  <Text>เลขตั๋ว : {item.ticket_id}</Text>
                  <Text>เวลา : {item.time.substring(0, 5)}</Text>
                  <Text>วันที่ : {item.date.substring(0, 10)}</Text>
                  <Text>สายรถ : {item.name}</Text>
                  <Text>จำนวน : {item.seat_amount}</Text>
              </Card>
            </TouchableOpacity>
          )}
        /> 
      </View>
    </View>
  );
}

export default MyTicket;

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
