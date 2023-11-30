import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal"
import styles from "./RoomInfoModal.style"
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const RoomInfoModal = ({visible, onClose, room, deleteRoom}) => {
    const [isAuthor, setIsAuthor] = React.useState()

    const auth = getAuth()
    const user = auth.currentUser.email.split("@")[0];

    React.useEffect(() => {
        setIsAuthor(room.author === user);
        console.log("AUTHOR!");
      }, []);
    
    console.log( room.name + isAuthor);

    const date = room.date
    const splitDate = date ? date.split("T")[0] : "00-00-00";

    return (
        <Modal
        style={styles.modal}
        isVisible={visible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        swipeDirection="down"
        >
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Text style={styles.title}>Oda Bilgisi</Text>
            </View>

            <View style={styles.inline_container}>
                <Text style={styles.roomName}>Oda İsmi: <Text style={{fontWeight: "normal"}}>{room.name}</Text> </Text>
                <Text style={styles.roomAuthor}>Odayı Oluşturan: <Text style={{fontWeight: "normal"}}>{room.author}</Text> </Text>
                <Text style={styles.roomDate}>Oluşturulma Tarihi: <Text style={{fontWeight: "normal"}}>{splitDate}</Text> </Text>
                <View style={styles.description_container}>
                    <Text style={styles.roomDescription}>Oda Açıklaması</Text>
                    <Text style={styles.description}>{room.description}</Text>
                </View>
                {isAuthor && 
                <TouchableOpacity style={styles.delete_container} onPress={deleteRoom}>
                     <Text style={styles.delete_text}>Odayı Sil</Text>
                     <Icon name="trash-can-outline" size={25} color="white" style={{marginLeft: 5}} />
                </TouchableOpacity>
                }
            </View>

        </View>
        </Modal>
    )
}

export default RoomInfoModal;