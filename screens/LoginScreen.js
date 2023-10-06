import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
const LoginScreen = () => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={StyleSheet.inputContainer}>
        <Input
          value={email}
          onChangeText={(text) => setEmial(text)}
          placeholder="Email"
          autoFocus
          type="Email"
        />
        <Input
          onTextInput={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoFocus
          type="Password"
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {},
});
