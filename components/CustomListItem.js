import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";

import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore"; // New imports from Firestore
import { db } from "../firebase";
import tw from "twrnc";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const messagesCollection = collection(db, "chats", id, "messages");
    const orderedQuery = query(
      messagesCollection,
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
      const newChatMessages = snapshot.docs.map((doc) => doc.data());
      setChatMessages(newChatMessages);
    });

    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      bottomDivider
      containerStyle={{ backgroundColor: "white", width: "100%" }}
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://www.pngmart.com/files/23/Profile-PNG-HD.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages && chatMessages.length > 0 ? (
            <>
              {chatMessages[0].displayName + ": "}
              <Text style={tw`text-neutral-500`}>
                {chatMessages[0].message}
              </Text>
            </>
          ) : (
            <Text style={tw`text-neutral-500`}>Start of the conversation</Text>
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

// chatMessages?.[0].photoURL ||
