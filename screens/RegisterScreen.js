import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import tw from "twrnc";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
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

  const isWeb = Platform.OS === "web";

  return isWeb ? (
    <View style={styles.container}>
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
          secureTextEntry={isPasswordVisible}
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text.toString())}
          rightIcon={{
            type: "feather",
            name: isPasswordVisible ? "eye" : "eye-off", // Using feather

            color: "gray",
            size: 24,
            style: { marginRight: 10 },
            onPress: () => setIsPasswordVisible((prev) => !prev),
          }}
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
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h4 style={tw`mb-[50px] font-bold `}>
          Create Buzzer Account
        </Text>
        <View style={tw`w-90`}>
          <Input
            style={tw`rounded-full bg-[#FAFAFA] px-2 text-[16px]  `}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            style={tw`rounded-full bg-[#FAFAFA] px-2 text-[16px] `}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            secureTextEntry={isPasswordVisible}
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text.toString())}
            style={tw`rounded-l-full bg-[#FAFAFA] px-2 text-[16px]`}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{
              type: "feather",
              name: isPasswordVisible ? "eye" : "eye-off",
              color: "#407BFF",
              size: 20,
              containerStyle: tw`rounded-r-full bg-[#FAFAFA] h-full w-full flex items-center justify-center pr-2 border-0 `,
              onPress: () => setIsPasswordVisible((prev) => !prev),
            }}
          />
          <Input
            style={tw`rounded-full bg-[#FAFAFA] px-2 text-[16px] `}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Profile picture URL (optional)"
            type="text"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>

        <View style={tw`w-90`}>
          <Button
            buttonStyle={tw`bg-[#407BFF]`}
            onPress={register}
            style={tw`my-2 rounded-full overflow-hidden`}
            title="Sign Up"
          />
        </View>

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
    backgroundColor: "white",
  },
  inputContainer: { width: 300 },
  button: { width: 200 },
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
