import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";
import Rooms from "./pages/Rooms/Rooms";
import Chat from "./pages/Chat/Chat";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import colors from "./styles/colors";

const Stack = createNativeStackNavigator();

export default function App() {

  const [userSession, setUsserSession] = React.useState();
  
  React.useEffect(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUsserSession(!!user);
    });
  }, []);
  
  const SignOut = () => {
    const auth = getAuth();
    auth.signOut();
  }

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        {!userSession ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ):(
        <Stack.Screen name="Rooms" component={Rooms} 
        options={{
          headerShown: true,
          title: "Odalar",
          headerTintColor: colors.blue,
          headerTitleAlign: "center",
          headerRight: () => <Icon name="logout" size={30} onPress={SignOut}/>,
        }}
        />
        )}

        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
