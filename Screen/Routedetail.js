import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';

function Routedetail({navigation, route}) {
  const {item} = route.params;
  console.log()
  const [userId, setuserId] = useState('');

  useEffect(() => {
    getUserId();
  }, []);

  async function getUserId() {
    const tempId = await AsyncStorage.getItem('@dataloginId');
    setuserId(tempId);
  }

  async function sentbuyticket() {
    Alert.alert('ยืนยันรายการ', 'ท่านต้องการซื้อ ' + item[0].vandata.name +' วันที่ '+item[0].vandata.date.substring(0, 8)+''+(parseInt(item[0].vandata.date.substring(8, 10))+1)+ ' เวลา '+ item[0].vandata.time.substring(0, 5) + ' จำนวน ' + item[0].seat_select + ' ที่นั่ง เป็นเงิน '+item[0].vandata.price * item[0].seat_select + ' บาท', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => buyticket()},
    ]);
  }

  async function buyticket() {
    await axios
      .post('http://10.0.2.2:3001/buy/buyticket', {
        user_id: userId,
        point_up: item[0].point_up_select,
        point_down: item[0].point_down_select,
        seat_amount: item[0].seat_select,
        schedule_id: item[0].vandata.id,
        seat_all: item[0].vandata.seat_all,
      })
      .then(res => call_back(res));
  }

  function call_back(res) {
    if (res.data == '1') {
      alert('Some thing Wrong');
    } else {
      alert('จองเรียบร้อย');
      item.push({ticketid: res.data}); //push ticketid เข้าใน item เพื่อเอาเลขตั๋วไปใช้หน้าต่อไป
      navigation.navigate('ConfirmTicket', {item: {item}}); //ส่ง item รายละเอียดหน้ารี้ไป
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 2}}>
        <Card>
          <Text style={styles.textTime}>
            {item[0].vandata.time.substring(0, 5)}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text style={styles.textDefault}>{item[0].vandata.name}</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDefault}>{item[0].vandata.license}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text style={styles.textDefault}>จุดขึ้น : </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDefault}>{item[0].point_up_select}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text style={styles.textDefault}>จุดลง : </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDefault}>
                {item[0].point_down_select}
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text style={styles.textDefault}>จำนวน : </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDefault}>{item[0].seat_select} ที่</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text style={styles.textDefault}>รวม : </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDefault}>
                {item[0].vandata.price * item[0].seat_select} บาท
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => sentbuyticket()}>
          <View style={styles.btnConfirm}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              จอง
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    fontSize: 17,
    marginBottom: 10,
  },
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  btnConfirm: {
    marginTop: 120,
    margin: 20,
    backgroundColor: 'rgba(254, 181, 166, 1)',
    borderRadius: 40,
    height: 45,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
