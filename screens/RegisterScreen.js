import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: " Login" });
  }, [navigation]);
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h3 style={{ marginBottom: 50 }}>
          Create Buzzer Account
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Profile picture URL (optional)"
            type="text"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>

        <Button
          style={styles.button}
          raised
          title="Register"
          onPress={register}
        />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: { width: 200 },
  button: { width: 200, marginTop: 10 },
});

//for future usage

// const register = () => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((authUser) => {
//       updateProfile(authUser.user, {
//         displayName: name,
//         photoURL:
//           imageUrl || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
//       });
//       return addDoc(collection(db, "users"), {
//         uid: authUser.user.uid,
//         name: name,
//         email: email,
//         imageUrl: imageUrl,
//       });
//     })
//     .then(() => {
//       console.log("User added to Firestore!");
//     })
//     .catch((error) => alert(error.message));
// };
