import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { Alert } from "react-native";

export const SignUpUser = async (email, password) => {
  try {
    console.log(email, password);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential.user;
  } catch (err) {
    console.log("ette", err);
  }
};

export const SignInUser = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (err) {
    console.log(err);
  }
};

export const Forgot = async (email) => {
  try {
    console.log(email)
    const credential = await sendPasswordResetEmail(auth, email, null);
     Alert.alert("lien envoyé sur ton mail", "", [
       { text: "Fermer", onPress: () => console.log("alert closed") },
     ]);
    console.log('pass', credential);
  } catch (err) {
    console.log('errbf', err);
  }
};

export const LogOutUser = async () => {
  await auth.signOut().then(() => console.log("User signed out!"));
};
