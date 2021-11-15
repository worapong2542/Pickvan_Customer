import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import axios from 'axios';

function uploadSlip({navigation, route}) {
  const {item} = route.params; 
  const [photo, setphoto] = useState();
  
  function handlerChoosePhoto () {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel == true) {  //ถ้า cancle ไม่มีไรเกิดขึ้น
      } else {
        if (response.assets[0].uri) {  //ถ้ามี uri = เลือกรูปแล้ว (res.asset[0] = path รูปที่เลือก)
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
        .then(base64String => uploadImage(base64String))  //uploadImage(data)
        .catch(err => alert(err));
    }
  }

  async function uploadImage(data) {
    await axios
      .post('http://10.0.2.2:3001/customer/upload_img', {
        photo: data,
        ticket_id:item.item[1].ticketid,
      })
      .then(res => check_res(res.data)); 
     
  }

  function check_res(res){
    if(res == "0"){
      //console.log(item)
      navigation.navigate('Status', {item: item});
    }else if(res == "1"){
      alert("เกิดข้อผิดผลาดบางอย่าง")
    }else{
      alert("ตั๋วของคุณหมดอายุกรุณาซื้อตั๋วใหม่อีกครั้ง")
      navigation.push("Home")
    }
  }

  return (
    <View style={{ flex: 1,backgroundColor: '#fff'}}>
      <View style={styles.con1}>
      {photo && (
        <Image
          source={{uri: photo.assets[0].uri}}
          style={{width: 300, height: 800, resizeMode: 'contain'}}
        />
      )}
      <TouchableOpacity onPress={()=>handlerChoosePhoto()} >
        <View style={styles.btnupload}>
          <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 17}}>
            กดเพื่ออัพโหลดสลิป
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

export default uploadSlip;

const styles = StyleSheet.create({
  con1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop:80
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
    width:150,
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
})