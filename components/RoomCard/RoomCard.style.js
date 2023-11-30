import { StyleSheet, Dimensions } from "react-native";
import colors from "../../styles/colors";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({

    container: {
        height: deviceSize.height / 7,
        backgroundColor: colors.blue,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

        borderWidth: 1.5,
        borderColor: "black"
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
    }

})