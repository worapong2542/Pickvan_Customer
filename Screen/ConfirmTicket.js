import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import styles from '../style/homeStyle';


function ConfirmTicket({ navigation, route }) {
    const { item } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Card>
                <Text>เวลา : {item.item.item.time}</Text>
                <Text>{item.item.item.destination}</Text>
                <Text>ทะเบียนรถ:{item.item.item.license}</Text>
                <Text>ราคา:{item.item.item.price}</Text>
            </Card>

            <Text>ช่องทางการโอนเงิน</Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                <Image style={styles.bankImg} source={require('../images/bank1.png')} />
                <Text>ธนาคารไทยพาณิชย์</Text>
            </View>
            <Text style={styles.bankNum}>123-459-789</Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                <Image style={styles.bankImg} source={require('../images/bank2.png')} />
                <Text>ธนาคารกรุงไทย</Text>
            </View>
            <Text style={styles.bankNum}>123-459-789</Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                <Image style={styles.bankImg} source={require('../images/bank3.png')} />
                <Text>ธนาคารกรุงศรี</Text>
            </View>
            <Text style={styles.bankNum}>123-459-789</Text>




            <TouchableOpacity onPress={() => navigation.navigate('Status', { item: { item } })}>
                <View style={styles.btnConfirm}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>ยืนยันการจอง</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ConfirmTicket;

