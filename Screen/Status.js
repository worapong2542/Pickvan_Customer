import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import styles from '../style/homeStyle';


function Status({ navigation, route }) {
    const { item } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Card>
                <Text>เวลา : {item.item.item.item.time}</Text>
                <Text>{item.item.item.item.destination}</Text>
                <Text>ทะเบียนรถ:{item.item.item.item.license}</Text>
                <Text>ราคา:{item.item.item.item.price}</Text>
            </Card>

            <Card>
                <Text>จำนวนที่นั่ง : </Text>
                <Text>หมายเลขตั๋ว : : </Text>
                <Text>status: </Text>
            </Card>

            <Card>
                <Text>จุดขึ้นรถ: </Text>
                <Text>จุดลงรถ : </Text>       
            </Card>

         
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={styles.btnConfirm}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>กลับหน้าหลัก</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Status;

