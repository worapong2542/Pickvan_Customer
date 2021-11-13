import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

function ViewMyTicket({navigation, route}) {
  const {item} = route.params;
  const [seconds, setSeconds] = useState(0);
  const [review, setreview] = useState(
    <TouchableOpacity onPress={() => console.log('')}>
      <Text style={styles.textStatus}>กรุณารอสักครู่</Text>
    </TouchableOpacity>,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus();
      setSeconds(seconds => seconds + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getStatus();
  }, []);

  async function getStatus() {
    await axios
      .get('http://10.0.2.2:3001/customer/get_Status/' + item.ticket_id)
      .then(res => checkStatus(res.data));
  }

  function checkStatus(value) {
    if (value.status_id == 0) {
      setreview(
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {item: item})}>
          <Text style={styles.textStatus}>ยังไม่ชำระเงิน กดเพื่อชำระเงิน</Text>
        </TouchableOpacity>
      );
    } else if (value.status_id == 1) {
      setreview(
          <Text style={styles.textStatus}>รอตรวจสอบ</Text>
      );
    } else if (value.status_id == 2) {
      setreview(
          <Text style={styles.textStatus}>ชำระเงินเรียบร้อยแล้ว</Text>
      );
    } else {
      setreview(
          <Text style={styles.textStatus}>ตั๋วของคุณถูกยกเลิก</Text>
      );
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text style={styles.textTime}>{item.time.substring(0, 5)}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>{item.name}</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{item.license_plate}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>หมายเลขตั๋ว</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{item.ticket_id}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>จำนวน {item.seat_amount} ที่</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>
              {item.price * item.seat_amount} บาท
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
            <Text style={styles.textDefault}>{item.pickup_point}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.textDefault}>จุดลง : </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textDefault}>{item.getdown_point}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Map', {ticket_id: item.ticket_id})
          }>
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

export default ViewMyTicket;

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
