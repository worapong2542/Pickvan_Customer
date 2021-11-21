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

function contact() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.contactBox}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Image
            style={styles.bankImg}
            source={require('../images/phone.png')}
          />
          <View>
            <Text style={styles.textBold}>เบอร์โทรศัพท์</Text>
            <Text style={styles.textDefault}>081-234-5678</Text>
          </View>
        </View>
      </View>

      <View style={styles.contactBox}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Image
            style={styles.bankImg}
            source={require('../images/email.png')}
          />
          <View>
            <Text style={styles.textBold}>อีเมล์</Text>
            <Text style={styles.textDefault}>van_bangna@gmail.com</Text>
          </View>
        </View>
      </View>
    </View>

    
  );
}

export default contact;

const styles = StyleSheet.create({
  textBold: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  textDefault: {
    color: '#5660B3',
    fontSize: 18,
    marginBottom: 10,
  },
  contactBox: {
    marginLeft: 30,
  },
  bankImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});
