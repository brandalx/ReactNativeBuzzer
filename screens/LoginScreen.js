import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
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
            uri: "/images/login.png",
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
        <View style={tw`w-100 flex items-center`}>
          <StatusBar style="light" />
          <View style={tw`flex  justify-center items-center`}>
            <Image
              source={require("../assets/images/login.png")}
              style={tw`my-2 w-[200px] h-[200px]`}
            />
          </View>
          <View style={tw`flex  w-90`}>
            <Input
              style={tw`rounded-full bg-[#FAFAFA] px-2 `}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={email}
              onChangeText={(text) => setEmial(text)}
              placeholder="Email"
              autoFocus
              type="Email"
            />
            <Input
              style={tw`rounded-l-full bg-[#FAFAFA] px-2`}
              onChangeText={(text) => setPassword(text.toString())}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={password}
              placeholder="Password"
              secureTextEntry={isPasswordVisible}
              type="Password"
              onSubmitEditing={signIn}
              rightIcon={{
                type: "feather",
                name: isPasswordVisible ? "eye" : "eye-off",
                color: "#407BFF",
                size: 20,
                containerStyle: tw`rounded-r-full bg-[#FAFAFA] h-full w-full flex items-center justify-center pr-2 border-0 `,
                onPress: () => setIsPasswordVisible((prev) => !prev),
              }}
            />
          </View>
          <View style={tw`w-90 `}>
            <Button
              buttonStyle={tw`bg-[#407BFF]`}
              onPress={signIn}
              style={tw`my-2 rounded-full overflow-hidden`}
              title="Login"
            />

            <Button
              titleStyle={{
                color: "#407BFF",
                // fontSize: 30,
                // fontStyle: "italic",
              }}
              buttonStyle={tw`bg-white border rounded-full`}
              style={tw`my-2 rounded-full overflow-hidden bg-rose-500 text-black `}
              title="Sign Up"
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
    borderRadius: 100,
  },
});

//        onTextInput={(text) => setPassword(text.toString())}
