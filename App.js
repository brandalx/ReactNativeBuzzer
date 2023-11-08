import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#407BFF" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <>
      {/* <StatusBar style="auto" hidden={true} /> */}
      <ToastProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator
              screenOptions={globalScreenOptions}
              initialRouteName="Home"
            >
              <Stack.Screen
                name="Home"
                // options={{ title: "Sign up" }}
                component={HomeScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="AddChat" component={AddChatScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
            {/* <View style={styles.container}>
        <Text>APP WORK TEST</Text>
        <StatusBar style="auto" />
      </View> */}
          </SafeAreaProvider>
        </NavigationContainer>
      </ToastProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
