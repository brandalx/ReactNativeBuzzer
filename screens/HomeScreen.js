import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { Text } from "react-native-elements";
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
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
        {chats.length === 0 && loading === false ? (
          <>
            <View style={tw`w-100 mt-[50%] flex items-center justify-center`}>
              <Text h3 style={tw`pl-4 mb-[20px] text-[#407BFF] font-black `}>
                No chats yet.
              </Text>
              <View>
                <Image
                  source={require("../assets/images/new.png")}
                  style={tw`my-2 w-[200px] h-[200px]`}
                />
              </View>

              <Button
                buttonStyle={tw`bg-[#407BFF]`}
                onPress={() => navigation.navigate("AddChat")}
                style={tw` w-90 rounded-full overflow-hidden`}
                title="Create First"
              />
            </View>
          </>
        ) : loading === true && chats.length === 0 ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          chats.map(({ id, data: { chatName } }) => (
            <CustomListItem
              enterChat={onEnterChat}
              id={id}
              chatName={chatName}
              key={id}
            />
          ))
        )}
      </ScrollView>

      <View style={tw`w-100 items-center justify-center`}>
        {/* <Button
          buttonStyle={tw`bg-[#407BFF]`}
         
          style={tw` w-90 rounded-full overflow-hidden`}
          title="Sign Out"
        /> */}

        <Button
          titleStyle={{
            color: "#407BFF",
          }}
          buttonStyle={tw`bg-white border rounded-full`}
          style={tw`my-2 rounded-full overflow-hidden w-90 text-black `}
          title="Sign Out"
          onPress={handleSignIut}
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
