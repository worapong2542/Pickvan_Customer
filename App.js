//import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Home from './Screen/Home'
import Viewroutebus from './Screen/Viewroutebus'
import Routedetail from './Screen/Routedetail'
import ConfirmTicket from './Screen/ConfirmTicket';
import Status from './Screen/Status';

function SettingsScreen({ route, navigation }) {
  const { user } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Text>userParam: {JSON.stringify(user)}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Pickvan({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        title: 'PickVan',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25
        },
        headerStyle: {
          backgroundColor: 'rgba(176, 216, 216, 1)',
        },

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <Image style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require('./images/menu.png')}
            />
          </TouchableOpacity>

        )
      }} />
      <Stack.Screen name="Viewroutebus" component={Viewroutebus} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Routedetail" component={Routedetail} />
      <Stack.Screen name="ConfirmTicket" component={ConfirmTicket} />
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Pickvan" component={Pickvan} />
        <Drawer.Screen name="Profile" component={ProfileScreen} screenOptions={{ headerShown: true, }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
