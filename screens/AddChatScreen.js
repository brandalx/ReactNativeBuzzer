import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const AddChatScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>AddChatScreen</Text>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {},
});
