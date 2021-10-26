import {View,Image,Platform,Text,TouchableOpacity,ScrollView,} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import styles from '../style/homeStyle';

function Home({navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [textdate, setdate] = useState('');
  const [seat, setseat] = useState(1);
  const [data_route, setdata_route] = useState([]);
  const [point_up, setpoint_up] = useState([]);
  const [point_down, setpoint_down] = useState([]);
  const [point, setpoint] = useState('');
  const point_up_Ref = useRef();
  const point_down_Ref = useRef();
  let routs = '';
  let point_up_select = '';
  let point_down_select = '';

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setdate(fDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    Alert.alert(date + '-' + month + '-' + year);
  };

  useEffect(() => {
    getdata();
  }, []);

  // getdata สายรถ
  async function getdata() {
    await axios
      .get('http://10.0.2.2:3001/customer/destination')
      .then(res => setpoint(res.data));
  }

  useEffect(() => {
    if (point == '') {
    } else {
      setdata_route(point);
    }
  }, [point]);

  useEffect(() => {
    if (seat <= 0) {
      alert('กรุณาระบุจำนวนที่นั่ง');
      setseat(seat + 1);
    } else if (seat > 13) {
      alert('ที่นั่งถึงจำนวนสูงสุดแล้ว');
      setseat(seat - 1);
    }
  }, [seat]);

  let data_onselect;

  function select() {
    const data = [];
    data.push({  //ส่งข้อมูลที่เลือกไปหน้า Viewroutebus
      routs: routs,
      point_up_select: point_up_select,
      point_down_select: point_down_select,
      seat: seat,
    });
    if (routs == '' || point_up_select == '' || point_down_select == '') {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
    }
    navigation.navigate('Viewroutebus', {item: data});
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.goWhere}>ไปไหนดี ?</Text>
     
      <View style={styles.dropdownsRow}>
        <SelectDropdown
          data={data_route}
          onSelect={(selectedItem, index) => {
            point_up_Ref.current.reset();
            point_down_Ref.current.reset();
            setpoint_up([]);
            setpoint_down([]);
            setpoint_up(selectedItem.point_up);
            setpoint_down(selectedItem.point_down);
          }}
          defaultButtonText={'เลือกสายรถ'}
          buttonTextAfterSelection={(selectedItem, index) => {
            //return selected data 
            routs = selectedItem.title;
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            //show selected data 
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image
                style={{width: 15, height: 15}}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={styles.dropdownsRow}>
        <SelectDropdown
          ref={point_up_Ref}
          data={point_up}
          onSelect={(selectedItem, index) => {}}
          defaultButtonText={'เลือกจุดขึ้น'}
          buttonTextAfterSelection={(selectedItem, index) => {
            point_up_select = selectedItem.title;
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image
                style={{width: 15, height: 15}}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={styles.dropdownsRow}>
        <SelectDropdown
          ref={point_down_Ref}
          data={point_down}
          onSelect={(selectedItem, index) => {}}
          defaultButtonText={'เลือกจุดลง'}
          buttonTextAfterSelection={(selectedItem, index) => {
            point_down_select = selectedItem.title;
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image
                style={{width: 15, height: 15}}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 40}}>
        <Text style={styles.baseText}>จำนวนที่นั่ง</Text>
        <TouchableOpacity
          style={styles.blockAddSeatPlus}
          onPress={() => setseat(seat + 1)}>
          <Text style={styles.addSeatText}> + </Text>
        </TouchableOpacity>
        <Text style={styles.baseText}>{seat}</Text>
        <TouchableOpacity
          style={styles.blockAddSeatMinus}
          onPress={() => setseat(seat - 1)}>
          <Text style={styles.addSeatText}> - </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => select()}>
        <View style={styles.btnConfirm}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            ค้นหา
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Home;
