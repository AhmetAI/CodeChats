import { StyleSheet, Dimensions } from "react-native";
import colors from "../../styles/colors";

const DeviceSize = Dimensions.get("window")

export default StyleSheet.create({

container: {
    backgroundColor: colors.blue,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    width: DeviceSize.width / 1.4
},

author: {
    color: "#e0e0e0",
    fontSize: 14,
    marginBottom: 3,
},

message: {
    color: "white",
    fontSize: 16
},

date: {
    color: "white",
    fontSize: 10,
    alignSelf: "flex-end"
},

})