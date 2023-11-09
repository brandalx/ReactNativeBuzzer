import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import tw from "twrnc";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input, Text } from "react-native-elements";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "react-native-toast-notifications";
// import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const toast = useToast();

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
            "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg",
        });
      })
      .then(() => {
        toast.show("Welcome to Buzzer" + " " + name + "!", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      })
      .catch((error) => {
        let errorMessage = "Please try again";
        let word = "password";

        if (error.code === "auth/invalid-data") {
          errorMessage =
            "The data provided is incorrect. Please check and try again.";
        } else if (error.code === "auth/email-already-in-use") {
          errorMessage = "An account with this email already exists.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Sorry, the email is invalid.";
        } else if (error.code.toLowerCase().includes(word.toLowerCase())) {
          errorMessage = "Sorry, the password is invalid.";
        }

        toast.show(errorMessage, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      });
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
        <View style={tw`flex  justify-center items-center`}>
          <Image
            source={require("../assets/images/signup.png")}
            style={tw`my-2 w-[200px] h-[200px]`}
          />
        </View>

        <View style={tw`w-90`}>
          <Text h2 style={tw`pl-4 mb-[20px] text-[#407BFF] font-black `}>
            Create Buzzer Account
          </Text>
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
