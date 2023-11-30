import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import styles from "./Login.style"
import { Formik } from "formik";
import {showMessage} from "react-native-flash-message"

import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import authErrorMessageParser from "../../../utils/authErrorMessageParser.js";

const Login = ({navigation}) => {

    const [loading, setLoading] = React.useState(false)

    const initalFormValues = {
        usermail: "", 
        password: "",
      };

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true);
            const auth = getAuth()
            await signInWithEmailAndPassword(auth, formValues.usermail, formValues.password)
            showMessage({ 
                message: "Giriş Başarılı", 
                type: "success", 
            })
            navigation.navigate("Rooms")
            setLoading(false); 
        } catch (err) { 
            setLoading(true); 
            showMessage({ 
                message: authErrorMessageParser(err.code), 
                type: "danger",
            })
            setLoading(false);
            
        }        

      }


    function userCheck() {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
            console.log("Current User is " + user.email)
            navigation.navigate("Rooms")
        }
        else {
            console.log("Oturum açık değil")
        }
    }


    return (
        <View style={styles.app_container}>
            <View style={{flex:0.3}}/>
            <Text style={styles.header}>Code Chats</Text>
            <View style={{flex:0.2}}/>
            <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit} style={styles.formArea}>
                {({ values, handleChange, handleSubmit }) => (
                    <>
                    <Input
                    placeholder="Kullanıcı Mail"
                    onType={handleChange("usermail")}
                    value={values.usermail} 
                    keyboardType="email-address"
                    />

                    <Input
                    placeholder="Kullanıcı Şifre"
                    onType={handleChange("password")}
                    value={values.password} 
                    isSecureContext={true}
                    />
                    
                    <Button 
                    title="Giriş"
                    onPress={handleSubmit} 
                    loading={loading}
                    />

                    </>
                )}
            </Formik>
            <Button 
            title="Kayıt Ol"
            onPress={() => { navigation.navigate("Sign") }}
            theme="secondary"

            />

            <Button 
            title="User Check"
            onPress={userCheck}
            theme="secondary"
            />

        </View>
    )
}

export default Login;