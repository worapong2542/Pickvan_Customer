import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView,} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

function ConfirmTicket({navigation, route}) {
  const {item} = route.params;
  // console.log(item);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text style={styles.textBold}>{item.item[0].vandata.time.substring(0, 5)}</Text>

        <Text style={styles.textBold}>{item.item[0].vandata.name}</Text>

        <Text style={styles.textDefault}>จุดขึ้นรถ : {item.item[0].point_down_select} </Text>

        <Text style={styles.textDefault}> จุดลงรถ : {item.item[0].point_up_select}</Text>
        
        <Text style={styles.textDefault}>จำนวน :{' '}<Text style={styles.textBold}>{item.item[0].seat_select} </Text>{' '}ที่นั่ง</Text>
        
        <Text style={styles.textDefault}>รวม : {item.item[0].vandata.price * item.item[0].seat_select} บาท</Text>
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

      <TouchableOpacity
        onPress={() => navigation.navigate('uploadSlip', {item: {item}})}>
        <View style={styles.btnConfirm}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            ถัดไป
          </Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 10,
  },
  textPayment: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  btnConfirm: {
    marginTop: 50,
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
