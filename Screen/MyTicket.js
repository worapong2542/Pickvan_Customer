import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

function MyTicket({route, navigation}) {

  const [dataTicket, setdataTicket] = useState([]);

  // useEffect(() => {
  //   getTicket();
  // }, []);

  // async function getTicket() {
  //   await axios
  //     .get('http://10.0.2.2:3001/customer/getTicket')
  //     .then(res => setdataTicket(res.data));
  // }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>

        <Text>ticket</Text>

        {/* <FlatList
          data={dataTicket}
          renderItem={({item}) => (
            <TouchableOpacity >
              <Card>
                  <Text>เลขตั๋ว : {item.ticketId}</Text>
                  <Text>สายรถ : {item.destination}</Text>
                  <Text>จำนวน : {item.amount}</Text>
              </Card>
            </TouchableOpacity>
          )}
        /> */}
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
