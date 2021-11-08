import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';

import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import axios from 'axios';

function Payment({navigation, route}) {
  const {item} = route.params;
  const [photo, setphoto] = useState();

  handlerChoosePhoto = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, response => {
      // console.log(response.assets[0].uri);
      if (response.didCancel == true) {
      } else {
        if (response.assets[0].uri) {
          setphoto(response);
        }
      }
    });
  };

  function convertImage() {
    if (photo == null) {
      alert('กรุณาอัพโหลดสลิป');
    } else {
      ImgToBase64.getBase64String(photo.assets[0].uri)
        .then(base64String => uploadImage(base64String))
        .catch(err => alert(err));
    }
  }

  async function uploadImage(data) {
    await axios
      .post('http://10.0.2.2:3001/customer/upload_img', {
        photo: data,
        ticket_id: item.ticket_id,
      })
      .then(res => check_res(res.data));
  }

  function check_res(res) {
    if (res == '0') {
      navigation.navigate('Status', {item: item});
    } else if (res == '1') {
      alert('เกิดข้อผิดผลาดบางอย่าง');
    } else {
      alert('ตั๋วของคุณหมดอายุกรุณาซื้อตั๋วใหม่อีกครั้ง');
      navigation.push('Home');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View style={styles.payment}>
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

        <View style={styles.con1}>
          {photo && (
            <Image
              source={{uri: photo.assets[0].uri}}
              style={{marginTop:140, width: 220, height: 440, resizeMode: 'contain'}}
            />
          )}
          <TouchableOpacity onPress={handlerChoosePhoto}>
            <View style={styles.btnupload}>
              <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 18}}>
                อัพโหลดสลิป
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.con2}>
          <TouchableOpacity onPress={() => convertImage()}>
            <View style={styles.btncontinue}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                ถัดไป
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default Payment;

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
    textAlign: 'center',
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
  con1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  con2: {
    flex: 1,
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
  btnupload: {
    marginTop: 10,
    margin: 20,
    borderRadius: 40,
    height: 45,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btncontinue: {
    marginTop: 100,
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
