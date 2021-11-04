import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import CardDate from './cardDate';

function Viewroutebus({route, navigation}) {
  const [dataschedule, setdataschedule] = useState([]);
  const [select_date, set_select_date] = useState(0);
  const date_format = [];

  //set data from api in reviews
  const [reviews, setReviews] = useState([]);
  //get data from home
  const {item} = route.params;
  //auto start set date
  date();

  //call api (send parameter(date_format[index])) and use this away select_date on change
  useEffect(() => {
    getschedule(select_date);
  }, [select_date]);

  //map data on dataschedule change
  useEffect(() => {
    setReviews(dataschedule);
  }, [dataschedule]);

  //set date now in array(3day)
  function date() {
    for (let i = 0; i <= 3; i++) {
      let targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + i);
      let day = targetDate.getDate();
      let month = targetDate.getMonth() + 1;
      let year = targetDate.getFullYear();
      date_format.push(year + '-' + month + '-' + day);
    }
  }

  //push data to routedetail
  function navto_uploadpage(item_select) {
    let data = [];
    data.push({
      vandata: item_select,
      point_down_select: item[0].point_down_select,
      point_up_select: item[0].point_up_select,
      seat_select: item[0].seat,
    });
    navigation.navigate('Routedetail', {item: data});
  }

  //api
  async function getschedule(x) {
    await axios
      .get(
        'http://10.0.2.2:3001/customer/getschedule/' +
          date_format[x] +
          '/' +
          item[0].routs,
      )
      .then(res => setdataschedule(res.data));
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          {/* show 3 days */}
          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(0)}>
              <Text style={styles.textDate}>{date_format[0]}</Text>
            </TouchableOpacity>
          </CardDate>

          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(1)}>
              <Text style={styles.textDate}>{date_format[1]}</Text>
            </TouchableOpacity>
          </CardDate>

          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(2)}>
              <Text style={styles.textDate}>{date_format[2]}</Text>
            </TouchableOpacity>
          </CardDate>
        </View>

        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navto_uploadpage(item)}>
              <Card>
                <Text style={styles.textBold}>{item.time.substring(0, 5)}</Text>

                <Text style={styles.textDefault}>{item.name}</Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textDefault}>
                    ที่นั่งเหลือ :{' '}
                    <Text style={styles.textBold}>
                      {item.seat_all - item.seat_onbuy}{' '}
                    </Text>{' '}
                    ที่
                  </Text>

                  <TouchableOpacity onPress={() => navto_uploadpage(item)}>
                    <View style={styles.btnCheck}>
                      <Text style={styles.textCheck}>จอง</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Viewroutebus;

const styles = StyleSheet.create({
  textDate: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  boxDate: {
    width: 91,
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
  btnCheck: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150,
  },
  textCheck: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
