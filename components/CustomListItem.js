import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = () => {
  return (
    <ListItem containerStyle={{ backgroundColor: "white", width: "100%" }}>
      <Avatar
        rounded
        source={{
          uri: "https://www.pngmart.com/files/23/Profile-PNG-HD.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>User name</ListItem.Title>
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
