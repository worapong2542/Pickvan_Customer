import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyTicket({route, navigation}) {
  const [dataTicket, setdataTicket] = useState([]);

  const [seconds, setSeconds] = useState(0);

  const [text, setText] = useState();

  //ดึง ticket ทุก  30 วิ
  useEffect(() => {
    const interval = setInterval(() => {
      getTicket();
      //ฟังก์ชั่นที่จะให้ทำงานทุก 30 วิ
      setSeconds(seconds => seconds + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getTicket();
  }, []);

  async function getTicket() {
    const id = await AsyncStorage.getItem('@dataloginId');
    await axios
      .get('http://10.0.2.2:3001/customer/get_myticket' + '/' + id)
      .then(res => setdataTicket(res.data));
  }

  //push data to ViewMyticket
  function navto_ViewMyticket(item) {
    navigation.navigate('ViewMyTicket', {item: item});
  }

  function checkStatus(status) {
    if(status == 0){
      return <Text style={styles.textCheck}> ยังไม่ชำระเงิน </Text>
    }else if(status == 1){
      return <Text style={styles.textCheck}> รอตรวจสอบ</Text>
    }else if(status == 2){
      return <Text style={styles.textCheck}> ชำระเงินแล้ว</Text>
    }else{
      return <Text style={styles.textCheck}>ตั๋วของคุณถูกยกเลิก</Text>
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={dataTicket}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navto_ViewMyticket(item)}>
              <Card>
                <Text style={styles.textTime}>
                  {item.date.substring(0, 10)}
                </Text>
                <Text style={styles.textDefault}>{item.name}</Text>
                <Text style={styles.textDefault}>
                  เวลา : {item.time.substring(0, 5)}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textDefault}>
                    จำนวน : {item.seat_amount}
                  </Text>

                  <TouchableOpacity>
                    <View style={styles.btnCheck}>
                    {checkStatus(item.status_id)}
                    </View>
                  </TouchableOpacity>
                </View>
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
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
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
  },
  btnCheck: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150,
  },
  textCheck: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
