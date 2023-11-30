import React from "react";
import { View, Text, FlatList, ActivityIndicator, Vibration } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar';
import styles from "./Chat.style";
import Button from "../../components/Button";
import { ParsedDataOldToNew } from "../../utils/parseContentData";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MessageCard from "../../components/MessageCard";
import RoomInfoModal from "../../components/modals/RoomInfoModal";

import {
  getDatabase,
  ref,
  push,
  onValue,
  off,
  remove
} from "firebase/database";
import { getAuth } from "firebase/auth";
import InputArea from "./Component/InputArea/InputArea";

const Chat = ({ navigation, route }) => {
  const { room } = route.params;
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [roomInfoModalVisible, setRoomInfoModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false)

  
  function handleRoomInfoToggle() {
    setRoomInfoModalVisible(!roomInfoModalVisible)
  }
  
  const auth = getAuth();
  const user = auth.currentUser.email.split("@")[0];
  
  {/* --- Fetch Message Data --- */}
  
  React.useEffect(() => {
    setLoading(true)

    const db = getDatabase();
    const dbRef = ref(db, `rooms/${room.id}/messages`);
    
    const fetchData = (snapshot) => {
      const messagesData = snapshot.val();
      const parsedData = ParsedDataOldToNew(messagesData || {});
      setMessages(parsedData);
    };
    
    onValue(dbRef, fetchData, {});
  setLoading(false)
    
    return () => {
      off(dbRef, fetchData);
    };
  }, []);


  
  {/* --- Send Message --- */}
  
  function handleSendMessage() { 
    const db = getDatabase();
    const messagesRef = ref(db, `rooms/${room.id}/messages`); 
    
    if (!newMessage) {
      return;
    } else {
      const auth = getAuth();
      const usermail = auth.currentUser.email;

      push(messagesRef, {
        text: newMessage,
        author: usermail.split("@")[0],
        date: new Date().toISOString(),
      });
      setNewMessage("");

    }
  }

  console.log(loading);


  {/* --- Room Info --- */}
  
  function handleRoomInfo(item) {
    handleRoomInfoToggle();
  }

  {/* --- Room Delete --- */}

  const handleRoomDelete = () => {
    const db = getDatabase();
    const roomRef = ref(db, `rooms/${room.id}`);

    try {
      remove(roomRef)
      navigation.navigate("Rooms")
      Vibration.vibrate(50)
      
    } catch (error) {
      console.log(error);
    }

  };
  

  const renderMessages = ({ item }) =>  <MessageCard message={item} user={user} /> 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="white" />
      <View style={styles.header}>
        <Icon name="arrow-left" size={35} style={styles.icon} onPress={() => navigation.goBack()}/>
        
        <Text style={styles.title}>{room.name}</Text>

        <Icon name="information-outline" size={35} style={styles.icon} onPress={handleRoomInfo} />

      </View>

      {loading ? (
        <ActivityIndicator size={200} />
        ) : (
        <View style={styles.content_container}>
          {messages.length === 0 ? (
            <View style={styles.noMessage_container}>
              <Text style={styles.noMessage_text}>{room.name} Odası Oluşturuldu!</Text>
            </View>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={messages}
              renderItem={renderMessages}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              inverted
              contentContainerStyle={{ flexDirection: "column-reverse" }}
            />
          )}
          <InputArea
            placeholder="Mesaj Yazın..."
            onChangeText={setNewMessage}
            value={newMessage}
            onPress={handleSendMessage}
          />
        </View>
      )}

      <RoomInfoModal
        visible={roomInfoModalVisible}
        onClose={handleRoomInfoToggle}
        room={room}
        deleteRoom={handleRoomDelete}
        
      />
    </SafeAreaView>
  );
};

export default Chat;
