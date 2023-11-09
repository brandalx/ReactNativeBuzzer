import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Text } from "react-native-elements";
import { Button, Icon, Input } from "react-native-elements";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import tw from "twrnc";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Buzzer",
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
    <View style={tw`w-100 flex-1 bg-white flex items-center justify-center`}>
      <Text h3 style={tw`pl-4 mb-[20px] text-[#407BFF] font-black `}>
        Enter a chat name
      </Text>
      <View style={tw`px-2 w-full rounded-full`}>
        <Input
          style={tw`rounded-full bg-[#FAFAFA] px-2 text-[16px]`}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onSubmitEditing={createChat}
          value={input}
          onChangeText={(text) => setInput(text)}
          leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="#407BFF" />
          }
          placeholder="Provide chat name here"
        />
      </View>

      <View>
        <Image
          source={require("../assets/images/send.png")}
          style={tw`my-2 w-[200px] h-[200px]`}
        />
      </View>

      <Button
        buttonStyle={tw`bg-[#407BFF]`}
        disabled={!input}
        onPress={createChat}
        style={tw` w-90 rounded-full overflow-hidden`}
        title="Create new chat"
      />
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
