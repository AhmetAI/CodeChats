import { StyleSheet, Systrace } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    noRoom_container: {
        backgroundColor: "red",
        margin: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },

    noRoom_text: {
        fontSize: 18,
        fontWeight: "bold",
    }
})