import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 6,
        backgroundColor:'rgba(172, 211, 211, 0.28)',
        marginHorizontal:4,
        marginVertical:6
    },
    cardContent:{
        marginHorizontal:18,
        marginVertical:10,
    }
})
