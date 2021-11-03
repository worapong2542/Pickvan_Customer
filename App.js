import {Image,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Home from './Screen/Home';
import Viewroutebus from './Screen/Viewroutebus';
import Routedetail from './Screen/Routedetail';
import ConfirmTicket from './Screen/ConfirmTicket';
import Status from './Screen/Status';
import uploadSlip from './Screen/uploadSlip';
import Login from './Screen/login';
import Register from './Screen/register';
import Map from './Screen/Map';
import {DrawerContent} from './Screen/DrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Pickvan({navigation}) {
  //เข้ามาแล้ว check ว่า login ยัง ถ้ายังให้ login ก่อน
  useEffect(() => {
    checkAsyncStorage();
  }, []);

  async function checkAsyncStorage() {
    // console.log('AsyncFunc');
    try {
      const email = await AsyncStorage.getItem('@datalogin');
      if (email === undefined || email === '' || email === null) {
        navigation.navigate('Login');
      }
    } catch (err) {}
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'PickVan',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: 'rgba(176, 216, 216, 1)',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 25, height: 25, marginLeft: 15}}
                source={require('./images/menu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}></Stack.Screen>

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'ลงทะเบียน',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#B0D8D8',
            height: 80,
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="Viewroutebus"
        component={Viewroutebus}
        options={{
          title: 'รอบรถโดยสาร',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Routedetail"
        component={Routedetail}
        options={{
          title: 'รายละเอียด',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen name="ConfirmTicket" component={ConfirmTicket}
       options={{
        title: 'ยืนยันการจอง',
        headerTitleAlign: 'center',
        headerTintColor: '#5660B3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }} />
      <Stack.Screen name="uploadSlip" component={uploadSlip} options={{
        title: 'อัพโหลดสลิป',
        headerTitleAlign: 'center',
        headerTintColor: '#5660B3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }} />
      <Stack.Screen name="Status" component={Status} 
      options={{
        title: 'สถานะการจอง',
        headerTitleAlign: 'center',
        headerTintColor: '#5660B3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }} />

      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Pickvan" component={Pickvan} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
