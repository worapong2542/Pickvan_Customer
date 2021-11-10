import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView,} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

function ConfirmTicket({navigation, route}) {
  const {item} = route.params;
  // console.log(item);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{ flex: 2}}>
        <Card>
          <Text style={styles.textTime}>{item.item[0].vandata.time.substring(0, 5)}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>{item.item[0].vandata.name}</Text>
            </View>
            <View style={{ flex: 1}}>
              <Text style={styles.textDefault}>{item.item[0].vandata.license}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>จุดขึ้น : </Text>
            </View>
            <View style={{ flex: 1}}>
              <Text style={styles.textDefault}>{item.item[0].point_up_select}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>จุดลง : </Text>
            </View>
            <View style={{ flex: 1}}>
              <Text style={styles.textDefault}>{item.item[0].point_down_select}</Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{flexDirection: 'row'}}>
              <View style={{ flex: 2}}>
                <Text style={styles.textDefault}>จำนวน : </Text>
              </View>

              <View style={{ flex: 1}}>
                <Text style={styles.textDefault}>{item.item[0].seat_select}       ที่</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{ flex: 2}}>
                <Text style={styles.textDefault}>รวม : </Text>
              </View>
              <View style={{ flex: 1}}>
                <Text style={styles.textDefault}>{item.item[0].vandata.price * item.item[0].seat_select}  บาท</Text>
              </View>
            </View>
          </Card>


        <View style={styles.payment}>
          <Text style={styles.textPayment}>ช่องทางการโอนเงิน</Text>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              style={styles.bankImg}
              source={require('../images/bank1.png')}
            />
            <View>
              <Text style={styles.textDefault}>ธนาคารไทยพาณิชย์</Text>
              <Text style={styles.textBold}>123-459-789</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              style={styles.bankImg}
              source={require('../images/bank2.png')}
            />
            <View>
              <Text style={styles.textDefault}>ธนาคารกรุงไทย</Text>
              <Text style={styles.textBold}>123-459-789</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              style={styles.bankImg}
              source={require('../images/bank3.png')}
            />
            
            <View>
              <Text style={styles.textDefault}>ธนาคารกรุงศรี</Text>
              <Text style={styles.textBold}>123-459-789</Text>
            </View>

          </View>
        </View>
      </View>

      <View style={{ flex: 1}}>
        <TouchableOpacity
          // ส่ง item ไปเพื่อใช้ id ว่าใครจอง
          onPress={() => navigation.navigate('uploadSlip', {item: item})}>
          <View style={styles.btnConfirm}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              ถัดไป
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ConfirmTicket;

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
  textPayment: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  btnConfirm: {
    // marginTop: 50,
    margin: 20,
    backgroundColor: 'rgba(254, 181, 166, 1)',
    borderRadius: 40,
    height: 45,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  payment: {
    marginLeft: 30,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  bankImg: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});
