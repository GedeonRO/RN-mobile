/* import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Out = async () => {
    await signOut(auth);
    navigation.navigate("SignIn");
  };

  return (
    <View className="flex items-center p-10">
     
      <Text className="text-red-600">Profile</Text>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Deconnexion</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
 */

import React, { useState, useEffect } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";



const Profile = () => {

  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        setLoading(false);
      } else {
        console.log("error");
        setUserInfo("");
      }
    });
    return () => unsub();
  }, []); 

  console.log( 'test1', userInfo);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View className="flex flex-col items-start gap-5 p-10">
          <Text> Nom complet : {userInfo.displayName} </Text>
          <Text> Email : {userInfo.email} </Text>
          <Text> numéro de téléphone : {userInfo.phoneNumber}</Text>
          <Text> uid : {userInfo.uid}</Text>
          <Image
            source={{ uri: userInfo.photoURL }}
            style={{ width: 40, height: 40 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});

export default Profile;