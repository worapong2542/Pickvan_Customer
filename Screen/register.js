import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import {useHeaderHeight} from '@react-navigation/stack';

function Register({navigation}) {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [phoneNum, setphoneNum] = useState('');
  let result;

  function checkRegister() {
    if (
      userName == '' ||
      email == '' ||
      password == '' ||
      confirm_password == '' ||
      phoneNum == ''
    ) {
      alert('กรุณากรอกข้อมูลให้ครบ');
    } else {
      if (password == confirm_password) {
        register_sentApi();
      } else {
        alert('รหัสไม่ตรงกัน');
      }
    }
  }

  async function register_sentApi() {
    let hash_pass;
    await sha256(password).then(hash => {
      hash_pass = hash;
    });
    await axios
      .post('http://10.0.2.2:3001/user/regist_customer', {
        userName: userName, //key : value
        email: email,
        password: hash_pass,
        phoneNum: phoneNum,
      })
      .then(res => setitem(res));
  }

  async function setitem(res) {
    result = res.data;
    if (result.status == 0) {
      alert('อีเมล์นี้ถูกใช้งานแล้ว');
    } else {
      await AsyncStorage.setItem('@datalogin', email); //เก็บเช้า local storage
      await AsyncStorage.setItem('@dataloginId', result.id.toString());
      navigation.navigate('Home');
    }
  }

  return (
    <ImageBackground
      source={require('../images/registBg.png')}
      style={{width: '100%', height: '100%'}}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container2}>

        <Text style={styles.Textlabel}>ชื่อผู้ใช้ </Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={userName_input => setuserName(userName_input)}
            />
          </View>
        </View>

        <Text style={styles.Textlabel}>อีเมลล์</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput onChangeText={email_input => setEmail(email_input)} />
          </View>
        </View>

        <Text style={styles.Textlabel}>รหัสผ่าน</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              onChangeText={password_input => setPassword(password_input)}
            />
          </View>
        </View>

        <Text style={styles.Textlabel}>ยืนยันรหัสผ่าน</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              onChangeText={confirm_password_input =>
                setconfirm_password(confirm_password_input)
              }
            />
          </View>
        </View>

        <Text style={styles.Textlabel}>เบอร์โทรศัพท์</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={phoneNum_input => setphoneNum(phoneNum_input)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => checkRegister()}
              style={styles.button}>
              <Text style={styles.buttonText}> ลงทะเบียน </Text>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
},
  container: {
    alignItems: 'center',
  },
  Textlabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '85%',
    height: 55,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 2,
    marginBottom: 10,
    borderRadius: 25,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FEB5A6',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
  },
});

export default Register;

