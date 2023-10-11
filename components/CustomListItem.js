import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
      containerStyle={{ backgroundColor: "white", width: "100%" }}
    >
      <Avatar
        rounded
        source={{
          uri: "https://www.pngmart.com/files/23/Profile-PNG-HD.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is Test Subtitle Test SubtitleTest for length
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

// chatMessages?.[0].photoURL ||
