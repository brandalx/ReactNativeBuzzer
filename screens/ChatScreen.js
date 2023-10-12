import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}>
            {route.params.chatName}{" "}
          </Text>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
