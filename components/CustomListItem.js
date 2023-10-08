import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
        }}
      />
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

// chatMessages?.[0].photoURL ||
