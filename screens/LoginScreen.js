import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = ({ navigation }) => {
  const toast = useToast();
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
      2;
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch(
      (error) => (
        console.log(error),
        toast.show("Something went wrong, please try again", {
          type: "warning",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        })
      )
    );
  };

  const isWeb = Platform.OS === "web";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome to Buzzer",
    });
  }, [navigation]);

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
        <View style={tw`w-100 mt-[30%] flex items-center justify-center`}>
          <StatusBar style="light" />
          <Text h2 style={tw`pl-4  text-[#407BFF] font-black `}>
            Login to Buzzer
          </Text>
          <View>
            <Image
              source={require("../assets/images/login.png")}
              style={tw`my-2 w-[300px] h-[300px]`}
            />
          </View>
          <View style={tw`flex  w-90`}>
            <Input
              style={tw`rounded-full bg-[#FAFAFA] px-2 text-[16px]`}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={email}
              onChangeText={(text) => setEmial(text)}
              placeholder="Email"
              autoFocus
              type="Email"
            />
            <Input
              style={tw`rounded-l-full bg-[#FAFAFA] px-2 text-[16px]`}
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
