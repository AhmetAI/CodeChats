import React from "react";
import { View, FlatList, Text, ActivityIndicator, Vibration } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar';
import styles from "./Rooms.style.js";
import { showMessage } from "react-native-flash-message";
import CreateRoomModal from "../../components/modals/CreateRoomModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  off,
} from "firebase/database";
import { getAuth } from "firebase/auth";

import Button from "../../components/Button";
import RoomCard from "../../components/RoomCard";
import {ParsedDataNewToOld} from "../../utils/parseContentData.js";

const Rooms = ({ navigation }) => {
  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [roomList, setRoomList] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  
  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }


  const auth = getAuth();
  const user = auth.currentUser.email.split("@")[0];


  React.useEffect(() => {
    setLoading(true)
    const db = getDatabase();
    const dbRef = ref(db, "/rooms");

    const fetchData = (snapshot) => {
      const contentData = snapshot.val();
      const parsedData = ParsedDataNewToOld(contentData || {});
      setRoomList(parsedData);
      setLoading(false)

    };

    onValue(dbRef, fetchData, {});

    return () => {
      off(dbRef, fetchData);
    };
  }, []);


  function handleSendContent(content, description) {
    handleInputToggle();
    createRoom(content, description);
  }

  function createRoom(content, description) {

    try {
      
      const auth = getAuth();
      const usermail = auth.currentUser.email;
  
      const roomInfo = {
        name: content,
        description: description,
        author: usermail.split("@")[0],
        date: new Date().toISOString(),
        messages: [],
        favorites: 0,
      };
  
      const db = getDatabase();
      const postListRef = ref(db, "rooms");
      const newPostRef = push(postListRef);
      set(newPostRef, roomInfo);

      showMessage({
        message: "Oda Başarıyla Oluşturuldu!", 
        type: "success"                        
      })

      Vibration.vibrate(50);

    } catch (err) {
      console.log(err); 
    }

  }


  function selectRoom(item) {

    try {
      navigation.navigate("Chat", {room: item})
    } catch (error) {
      console.log(error);
    }
  }



  const renderRooms = ({ item }) => (
    <RoomCard room={item} onPress={() => selectRoom(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title="Yeni Oda Oluştur"
        theme="secondary"
        onPress={handleInputToggle}
      />

      {loading ? (
          <ActivityIndicator size={100} color="black" />
      ):(
        roomList.length === 0 ? (
          <View style={styles.noRoom_container}>
            <Text style={styles.noRoom_text}>Hiç Oda Oluşturulmamış!</Text>
          </View>
        ) : (
          <FlatList data={roomList} renderItem={renderRooms} showsVerticalScrollIndicator={false} />
        )
      )}


      <CreateRoomModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
        placeholder="Oda İsmi Yazınız"
      />

    </SafeAreaView>
  );
};

export default Rooms;
