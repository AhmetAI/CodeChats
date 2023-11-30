import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./Input.style"

const Input = ({placeholder, onType, value, isSecureContext, keyboardType, isMultiline}) => {
    return (
        <View style={styles.input_container} >
            <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onType}
            value={value}
            secureTextEntry={isSecureContext}
            keyboardType={keyboardType}
            multiline={isMultiline}
            />
        </View>
    )
}

export default Input;