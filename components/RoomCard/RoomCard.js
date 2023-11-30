import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./RoomCard.style"

const RoomCard = ({room, onPress, onLongPress}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress} delayLongPress={200} >
            <View style={styles.inner_container}>
                <Text style={styles.title} >{room.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RoomCard;