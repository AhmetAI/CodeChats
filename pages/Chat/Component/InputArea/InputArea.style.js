import { StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
    
    container: {
        flexDirection: "row",
        margin: 5,
        justifyContent: "flex-end",

    },

    input: {
        flex:1,
        padding: 5,
        borderWidth: 0.5,
        borderRadius: 5,

    },
    
    button: {
        backgroundColor: colors.blue,
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    }


});