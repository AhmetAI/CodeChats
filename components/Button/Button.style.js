import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const baseStyle = StyleSheet.create({

    title: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },
    
    button: {
        backgroundColor: colors.blue,
        margin: 5,
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    }

})

export default ({
    primary: StyleSheet.create({
        ...baseStyle,

        title: {
            ...baseStyle.title,
            color: "white",
        },
        
        button: {
            ...baseStyle.button,
            backgroundColor: colors.blue,
        }
    }),

    secondary: StyleSheet.create({
        ...baseStyle,

        title: {
            ...baseStyle.title,
            color: colors.blue,

        },
        
        button: {
            ...baseStyle.button,
            backgroundColor: "white",
            borderColor: colors.blue,
            borderWidth: 2,
            padding: 6,


        }
    }),

})