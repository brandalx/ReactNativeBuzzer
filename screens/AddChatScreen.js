import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input } from "react-native-elements";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Input
        value={input}
        onChange={(text) => setInput(text)}
        placeholder="Enter a chat name"
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {},
});
