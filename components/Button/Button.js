import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./Button.style"

const Button = ({title, onPress, loading ,theme="primary"}) => {
    return (
        <TouchableOpacity
        style={styles[theme].button}
        onPress={onPress}
        >
            { loading ? (
                <ActivityIndicator color={"white"}/>
            ) : (
                
                <Text style={styles[theme].title}>{title}</Text>
            )
            
        }
        </TouchableOpacity>
    )
}

export default Button;