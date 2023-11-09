import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import tw from "twrnc";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Button } from "react-native-elements";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CustomListItem from "../components/CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const handleSignIut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        navigation;
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

  useEffect(() => {
    const chatCollection = collection(db, "chats");
    const unsubscribe = onSnapshot(query(chatCollection), (snapshot) => {
      const newChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChats(newChats);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Buzzer Chats",
      headerStyle: { backgroundColor: "#407BFF" },
      headerTitleStyle: { color: "white" },
      headerTintColor: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar
              // style={tw`h-[100px] w-[100px]`}
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          {/* <TouchableOpacity activeOpacity={0.5}>
            <AntDesign
              style={{ marginRight: 10 }}
              name="camerao"
              size={24}
              color="black"
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="note" size={18} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const onEnterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            enterChat={onEnterChat}
            id={id}
            chatName={chatName}
            key={id}
          />
        ))}
      </ScrollView>
      <View style={tw`w-100 items-center justify-center`}>
        <Button
          buttonStyle={tw`bg-[#407BFF]`}
          onPress={handleSignIut}
          style={tw` w-90 rounded-full overflow-hidden`}
          title="Sign Out"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
