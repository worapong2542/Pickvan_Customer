import { View, Image, Platform, Text, TouchableOpacity, ScrollView, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../style/homeStyle';

function Home({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textdate, setdate] = useState('Empty');
  const [seat, setseat] = useState(0);

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
  }

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [way, setWay] = useState([]);
  const citiesDropdownRef = useRef();
  const wayDropdownRef = useRef();
  let routs = '';
  let license_plate = '';
  let point_way = '';

  useEffect(() => {
    if (seat < 0) {
      alert('กรุณาระบุจำนวนที่นั่ง');
      setseat(seat + 1);
    } else if (seat > 13) {
      alert('ที่นั่งถึงจำนวนสูงสุดแล้ว');
      setseat(seat - 1);
    }
  }, [seat]);

  const [point, setpoint] = useState([])
  let data2 = []
  useEffect(() => {
    getdata();
  }, []);
  async function getdata() {
    await axios
      .get('http://10.0.2.2:3001/destination2')
      .then(res => (setpoint(res.data)));
  }
  useEffect(() => {
    setTimeout(() => {
      setCountries([
        {
          title: 'กรุงเทพ-บางแสน',
          cities: point.pickup_bs,
          way: point.down_bs,
        },
        {
          title: 'กรุงเทพ-พัทยา',
          cities: point.pickup_pt,
          way: point.down_pt,
        },
      ]);
    }, 1000);
  }, [point]);
  function select() {
    routs = routs.replace(/"/g, '');
    license_plate = license_plate.replace(/"/g, '');
    point_way = point_way.replace(/"/g, '');
    alert('alert ' + routs + ' ' + license_plate + ' ' + point_way);
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.goWhere}>ไปไหนดี ?</Text>

      <View style={styles.dropdownsRow}>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            citiesDropdownRef.current.reset();
            wayDropdownRef.current.reset();
            setCities([]);
            setWay([]);
            setCities(selectedItem.cities);
            setWay(selectedItem.way);
          }}

          defaultButtonText={'เลือกสายรถ'}
          buttonTextAfterSelection={(selectedItem, index) => {
            //return data select
            routs = JSON.stringify(selectedItem.title);
            console.log('this is routs: ' + routs);
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            //show select data
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image style={{ width: 15, height: 15 }}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={"right"}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>


      <View style={styles.dropdownsRow}>
        <SelectDropdown
          ref={citiesDropdownRef}
          data={cities}
          onSelect={(selectedItem, index) => { }}
          defaultButtonText={'เลือกรถ'}
          buttonTextAfterSelection={(selectedItem, index) => {
            license_plate = JSON.stringify(selectedItem.title);
            console.log('this is license_plate: ' + license_plate);
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image style={{ width: 15, height: 15 }}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={"right"}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={styles.dropdownsRow}>
        <SelectDropdown
          ref={wayDropdownRef}
          data={way}
          onSelect={(selectedItem, index) => { }}
          defaultButtonText={'เลือกจุด'}
          buttonTextAfterSelection={(selectedItem, index) => {
            point_way = JSON.stringify(selectedItem.title);
            console.log('this is point_way: ' + point_way);
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image style={{ width: 15, height: 15 }}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={"right"}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={styles.baseText}>วันที่</Text>
        <Text style={styles.boxInput}>{textdate}</Text>
        <TouchableOpacity onPress={() => showMode('date')}>
          <View style={styles.touch_able}>
            <Text style={{ color: 'rgba(86, 96, 179, 1)', fontWeight: 'bold' }}>เลือกวันที่</Text>
          </View>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={{ flexDirection: 'row', marginTop: 40 }}>
        <Text style={styles.baseText}>จำนวนที่นั่ง</Text>
        <TouchableOpacity
          style={styles.blockAddSeatPlus}
          onPress={() => setseat(seat + 1)}>
          <Text style={styles.baseText}> + </Text>
        </TouchableOpacity>
        <Text style={styles.baseText}>{seat}</Text>
        <TouchableOpacity
          style={styles.blockAddSeatMinus}
          onPress={() => setseat(seat - 1)}>
          <Text style={styles.baseText}> - </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Viewroutebus')}>
        <View style={styles.btnConfirm}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>ค้นหา</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>


  );
}

export default Home;
