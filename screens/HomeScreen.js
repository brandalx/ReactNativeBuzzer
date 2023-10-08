import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const handleSignIut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Register");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace("Login");
        console.log(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View>
      <Text>
        <Button title="Logout" onPress={handleSignIut} />
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
