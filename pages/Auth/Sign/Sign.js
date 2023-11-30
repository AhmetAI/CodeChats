import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./Sign.style"
import { Formik } from "formik";
import {showMessage} from "react-native-flash-message"

import {auth, app} from "../../../../firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth"

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import authErrorMessageParser from "../../../utils/authErrorMessageParser.js";

const Sign = ({navigation}) => {

    const [loading, setLoading] = React.useState(false)

    const initalFormValues = {
        usermail: "",
        password: "",
        repassword: "",
      };

    async function handleFormSubmit(formValues) {

        setLoading(true);
        if (formValues.password != formValues.repassword) {
            showMessage({
                message: "Şifreler Uyuşmuyor!",
                type: "danger" })
            setLoading(false);
            return;
        }

        else {
            try {
                await createUserWithEmailAndPassword(auth, formValues.usermail, formValues.password)
                setLoading(false);
                showMessage({
                    message: "Kayıt İşlemi Tamamlandı!",
                    type: "success"
                })
                navigation.navigate("Login")

            } catch (err) {
                showMessage({
                    message: authErrorMessageParser(err.code),
                    type: "danger"
                })
                setLoading(false);
            }

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

                    <Input
                    placeholder="Tekrar Kullanıcı Şifre"
                    onType={handleChange("repassword")}
                    value={values.repassword} 
                    isSecureContext={true}
                    />
                    
                    <Button 
                    title="Kayıt Ol"
                    onPress={handleSubmit} 
                    loading={loading}
                    />

                    </>
                )}
            </Formik>
            <Button 
                    title="Giriş Yap"
                    onPress={() => { navigation.navigate("Login") }}
                    theme="secondary"
                    />
        </View>
    )
}

export default Sign;