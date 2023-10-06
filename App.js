import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}
          >
            <Stack.Navigator screenOptions={globalScreenOptions}>
              <Stack.Screen
                name="Login"
                // options={{ title: "Sign up" }}
                component={LoginScreen}
              />
            </Stack.Navigator>
            {/* <View style={styles.container}>
        <Text>APP WORK TEST</Text>
        <StatusBar style="auto" />
      </View> */}
          </KeyboardAvoidingView>
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
