import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({

container: {
    flex:1,
},

header: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",

},

icon: {},

title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
},

content_container: {
    flex:1,
    justifyContent: "flex-end",
},


noMessage_container: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.blue,
    borderRadius: 5,
    margin: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
},

noMessage_text: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "bold",
},



})