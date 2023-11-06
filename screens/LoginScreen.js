import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
const LoginScreen = ({ navigation }) => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        navigation.replace("Home");
        console.log(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };

  const isWeb = Platform.OS === "web";

  return isWeb ? (
    <KeyboardAvoidingView
      style={styles.container}
      enabled
      // behavior={Platform Platform?.OS === "ios" ? "padding" : "height" :""}
      // keyboardVerticalOffset={Platform?.OS === "ios" ? -100 : 0}
    >
      <View>
        <StatusBar style="light" />
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
          }}
          style={{ width: 200, height: 200 }}
        />
        <View style={tw`w-100`}>
          <Input
            value={email}
            onChangeText={(text) => setEmial(text)}
            placeholder="Email"
            autoFocus
            type="Email"
          />
          <Input
            onChangeText={(text) => setPassword(text.toString())}
            value={password}
            placeholder="Password"
            secureTextEntry={isPasswordVisible}
            type="Password"
            onSubmitEditing={signIn}
            rightIcon={{
              type: "feather",
              name: isPasswordVisible ? "eye" : "eye-off", // Using feather

              color: "gray",
              size: 24,
              style: { marginRight: 10 },
              onPress: () => setIsPasswordVisible((prev) => !prev),
            }}
          />
        </View>
        <View>
          <Button onPress={signIn} style={tw`my-2`} title="Login" />
          <Button
            style={tw`my-2`}
            title="Register"
            type="outline"
            onPress={() => navigation.navigate("Register")}
          />
          <View style={{ height: 200 }} />
        </View>
      </View>
    </KeyboardAvoidingView>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        // behavior={Platform Platform?.OS === "ios" ? "padding" : "height" :""}
        // keyboardVerticalOffset={Platform?.OS === "ios" ? -100 : 0}
      >
        <View>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
            }}
            style={{ width: 200, height: 200 }}
          />
          <View style={tw`w-100`}>
            <Input
              style={tw`rounded-3`}
              value={email}
              onChangeText={(text) => setEmial(text)}
              placeholder="Email"
              autoFocus
              type="Email"
            />
            <Input
              onChangeText={(text) => setPassword(text.toString())}
              value={password}
              placeholder="Password"
              secureTextEntry={isPasswordVisible}
              type="Password"
              onSubmitEditing={signIn}
              rightIcon={{
                type: "feather",
                name: isPasswordVisible ? "eye" : "eye-off", // Using feather

                color: "gray",
                size: 24,
                style: { marginRight: 10 },
                onPress: () => setIsPasswordVisible((prev) => !prev),
              }}
            />
          </View>
          <View>
            <Button onPress={signIn} style={tw`my-2`} title="Login" />
            <Button
              style={tw`my-2`}
              title="Register"
              type="outline"
              onPress={() => navigation.navigate("Register")}
            />
            <View style={{ height: 200 }} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {},
  button: {
    width: 200,
    marginTop: 10,
  },
});

//        onTextInput={(text) => setPassword(text.toString())}
