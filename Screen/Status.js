import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

function Status({navigation, route}) {
  const {item} = route.params;
  const data = item.item[0];
  const [seconds, setSeconds] = useState(0);
  const [review, setreview] = useState(
    <TouchableOpacity onPress={() => console.log('')}>
      <Text style={styles.textStatus}>กรุณารอสักครู่</Text>
    </TouchableOpacity>,
  );
  const [permisstion_value, setpermisstion_value] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus();
      setSeconds(seconds => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getStatus();
  }, []);

  async function getStatus() {
    //console.log(item.item[1].ticketid);
    await axios
      .get('http://10.0.2.2:3001/customer/get_Status/' + item.item[1].ticketid)
      .then(res => checkStatus(res.data));
  }

  function checkStatus(value) {
    setpermisstion_value(value.status_id)
    if (value.status_id == 0) {
      setreview(
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {item: item})}>
          <Text style={styles.textStatus}>ยังไม่ชำระเงิน กดเพื่อชำระเงิน</Text>
        </TouchableOpacity>,
      );
    } else if (value.status_id == 1) {
      setreview(<Text style={styles.textStatus}>รอตรวจสอบ</Text>);
    } else if (value.status_id == 2) {
      setreview(<Text style={styles.textStatus}>ชำระเงินเรียบร้อยแล้ว</Text>);
    } else {
      setreview(<Text style={styles.textStatus}>ตั๋วของคุณถูกยกเลิก</Text>);
    }
  }

  function check_permission() {
    if (permisstion_value == 0) {
      alert('กรุณาชำระเงิน');
    } else if (permisstion_value == 1) {
      alert('กำลังตรวจสอบการชำระเงิน');
    } else if (permisstion_value == 3) {
      alert('ตั๋วของคุณถูกยกเลิก');
    } else {
      navigation.navigate('Map', {ticket_id: item.item[1].ticketid});
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text style={styles.textTime}>{data.vandata.time.substring(0, 5)}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>{data.vandata.name}</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{data.vandata.license}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>หมายเลขตั๋ว</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{item.item[1].ticketid}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>จำนวน {data.seat_select} ที่</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>
              {data.vandata.price * data.seat_select} บาท
            </Text>
          </View>
        </View>

        <View>{review}</View>
      </Card>

      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>จุดขึ้น : </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{data.point_up_select}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>จุดลง : </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{data.point_down_select}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => check_permission()}>
          <View>
            <Text style={styles.textMap}>กดเพื่อดูตำแหน่งรถตู้</Text>
          </View>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  textBold: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  textDefault: {
    color: '#5660B3',
    fontSize: 17,
    marginBottom: 10,
  },
  btnConfirm: {
    marginTop: 150,
    margin: 20,
    backgroundColor: 'rgba(254, 181, 166, 1)',
    borderRadius: 40,
    height: 45,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  textStatus: {
    marginTop: 15,
    color: '#5660B3',
    fontSize: 20,
    textAlign: 'center',
  },
  textMap: {
    marginTop: 15,
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
