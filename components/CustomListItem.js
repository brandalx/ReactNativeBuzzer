import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = () => {
  return (
    <ListItem containerStyle={{ backgroundColor: "white", width: 1000 }}>
      <Avatar
        rounded
        source={{
          uri: "https://www.pngmart.com/files/23/Profile-PNG-HD.png",
        }}
      />
      <Text>User name</Text>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

// chatMessages?.[0].photoURL ||
