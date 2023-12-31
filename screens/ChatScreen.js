import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Avatar, Icon, Image } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import formatFirebaseTimestamp from "../helpers/dateformat";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}{" "}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
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
          {/* <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity> */}
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    // Keyboard.dismiss();

    const messagesCollection = collection(
      db,
      "chats",
      route.params.id,
      "messages"
    );

    addDoc(messagesCollection, {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const messagesCollection = collection(
      db,
      "chats",
      route.params.id,
      "messages"
    );
    const orderedQuery = query(messagesCollection, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [route]);

  const scrollViewRef = useRef();
  const autoScrollToBottom = () => {
    if (isAutoScrollActive) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleUserScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (currentY < lastScrollPosition) {
      Keyboard.dismiss();
    }
    setLastScrollPosition(currentY);

    if (currentY < contentHeight - height - 100) {
      setIsAutoScrollActive(false);
    } else {
      setIsAutoScrollActive(true);
    }
  };

  // Example usage
  const firebaseTimestamp = { nanoseconds: 410000000, seconds: 1699630227 };
  console.log(formatFirebaseTimestamp(firebaseTimestamp));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingTop: 15 }}
            onContentSizeChange={() => autoScrollToBottom()}
            onScroll={handleUserScroll}
            scrollEventThrottle={16}
          >
            {messages.length === 0 ? (
              <View
                style={tw`w-100 flex-1 bg-white flex items-center  justify-center`}
              >
                <View style={tw`flex flex-1 items-center pt-[30%]`}>
                  <Image
                    source={require("../assets/images/nomessage.png")}
                    style={tw`my-2 w-[300px] h-[300px] rounded-full `}
                  />
                  <Text h3 style={tw`  text-[#407BFF] font-black `}>
                    No messages yet
                  </Text>
                  <Text style={tw`text-center text-neutral-500`}>
                    Be the first to start the conversation
                  </Text>
                </View>
              </View>
            ) : (
              messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View style={styles.reciver} key={id}>
                    <Avatar
                      size={30}
                      containerStyle={{
                        bottom: -15,
                        right: -5,
                        position: "absolute",
                      }}
                      rounded
                      source={{
                        uri:
                          data.photoURL ||
                          "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg",
                      }}
                    />

                    <Text style={styles.reciverText}>{data.message}</Text>
                    <Text style={tw` text-neutral-300`}>
                      {formatFirebaseTimestamp(data.timestamp)}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sender} key={id}>
                    <Avatar
                      size={30}
                      containerStyle={{
                        bottom: -15,
                        right: -5,
                        position: "absolute",
                      }}
                      rounded
                      source={{
                        uri:
                          data.photoURL ||
                          "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg",
                      }}
                    />

                    <Text style={tw`font-bold`}>{data.displayName}</Text>
                    <Text>{data.message}</Text>
                    <Text style={tw` text-neutral-500`}>
                      {data?.timestamp
                        ? formatFirebaseTimestamp(data?.timestamp)
                        : "Now"}
                    </Text>
                  </View>
                )
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              onSubmitEditing={sendMessage}
              value={input}
              onChangeText={(text) => setInput(text)}
              style={styles.textInput}
              placeholder="Buzzer Message"
            />

            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
      {/* <Text>{route.params.chatName}</Text> */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",

    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciverText: {
    color: "white",
    fontWeight: "500",
  },
  senderText: {
    color: "black",
    fontWeight: "900",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  reciver: {
    padding: 15,
    backgroundColor: "#407BFF",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin: 20,
    marginBottom: 15,
    marginTop: 15,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 20,
    marginBottom: 15,
    marginTop: 15,
    maxWidth: "80%",
    position: "relative",
  },
});
