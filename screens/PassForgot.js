import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import { Forgot } from "../config/credential";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const PassForgot = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const pass = async () => {
    const res = await Forgot(email);
    setEmail("");
  };
  return (
    <View className="flex flex-col items-center justify-center h-full p-10 gap-8">
      <Text>Entrer votre email</Text>
      <TextInput
        className="border-b border-[#000] pl-5 w-full"
        placeholder="entrer votre email"
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Pressable
        onPress={async () => await pass()}
        style={[styles.button, styles.buttonSign]}
      >
        <Text>soumettre</Text>
      </Pressable>

      <Pressable onPress={() => navigation.goBack()} style={[styles.button]}>
        <Text>retour</Text>
      </Pressable>
    </View>
  );
};

export default PassForgot;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  buttonSign: {
    backgroundColor: "white",
  },
});
