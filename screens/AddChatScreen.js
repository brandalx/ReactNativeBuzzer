import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        onSubmitEditing={createChat}
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        placeholder="Enter a chat name"
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
