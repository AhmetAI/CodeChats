import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";

const deviceSize = Dimensions.get("window")

const titleBase = StyleSheet.create({
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",   
})

export default StyleSheet.create({

    container: {
        backgroundColor: "white",
        marginHorizontal: 10,
        borderRadius: 10,
    },

    title_container : {
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blue,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },

    inline_container : {
        ...titleBase,        
    },
    
    roomName : {
        ...titleBase,
    },

    roomAuthor : {
        ...titleBase,
    },

    roomDate : {
        ...titleBase,
    },

    description_container:{
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    roomDescription : {
        ...titleBase,
        justifyContent: "center",
        alignItems: "center",
        textDecorationLine: "underline",

    },

    description: {
        fontSize: 14,
    },

    delete_container: {
        backgroundColor: "red",
        borderRadius: 5,
        padding: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    delete_text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    
})