import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const RegisterScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Buzzer Account
      </Text>
      <View style={styles.inputContainer}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
});
