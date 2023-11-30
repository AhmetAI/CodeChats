import React from "react";
import { Text, View, TextInput } from "react-native";
import Button from "../../Button";
import Modal from "react-native-modal"
import styles from "./CreateRoomModal.style"

const CreateRoomModal = ({visible, onClose, onSend, placeholder}) => {
    const [text, setText] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    function handleSend() {
      if(!text) { 
          return; 
      } 

      const descriptionText = description || "Açıklama Girilmedi";
     
      onSend(text, descriptionText);
      setText(null)
      setDescription(null)
    }

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
            <View style={styles.input_container}>
                <View style={styles.roomName_container}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Oda İsmi:</Text>
                    <TextInput placeholder="Oda İsmi Yazınız..." onChangeText={setText} />
                </View>

                <View style={styles.roomDescription_container}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Oda Açıklaması:</Text>
                    <TextInput placeholder="Oda Açıklaması Yazınız...(Opsiyonel)" onChangeText={setDescription} multiline />
                </View>

            </View>

            <Button title="Oluştur" onPress={handleSend} theme="secondary" />
        </View>
        </Modal>
    )
}

export default CreateRoomModal;