import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";

const deviceSize = Dimensions.get("window")

export default StyleSheet.create({

    container: {
        backgroundColor: "white",
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    

    modal :{
        margin: 0,
    },

    roomName_container: {
        padding: 10
    },

    roomDescription_container: {
        padding: 10,
        marginBottom: 20

    },
    
    
})