import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styles from "./InputArea.style";

const InputArea = ({ onChangeText, placeholder, value, onPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        multiline
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name="send" size={25} color="white" />
        </TouchableOpacity>
    </View>
  );
};

export default InputArea;
