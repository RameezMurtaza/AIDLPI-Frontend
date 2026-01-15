import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const HelpSupportScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: "support", text: "Hi! How can I help you today?" },
    { id: 2, type: "user", text: "I have a problem with my account." },
  ]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, type: "user", text: input }]);
    setInput("");
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Chat area */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
      >
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.type === "user" ? styles.userBubble : styles.supportBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.type === "user" ? styles.userText : styles.supportText,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  chatContainer: {
    padding: 16,
  },

  messageBubble: {
    maxWidth: "75%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  supportBubble: {
    backgroundColor: "#0A2A5E",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },

  userBubble: {
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  supportText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },

  userText: {
    color: "#111827",
    fontFamily: "Poppins-Regular",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#111827",
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#0A2A5E",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});