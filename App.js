import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <>
      {/* <StatusBar style="auto" hidden={true} /> */}
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen
              name="Login"
              // options={{ title: "Sign up" }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Register"
              // options={{ title: "Sign up" }}
              component={RegisterScreen}
            />
            <Stack.Screen
              name="Home"
              // options={{ title: "Sign up" }}
              component={HomeScreen}
            />
          </Stack.Navigator>
          {/* <View style={styles.container}>
        <Text>APP WORK TEST</Text>
        <StatusBar style="auto" />
      </View> */}
        </SafeAreaProvider>
      </NavigationContainer>
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
