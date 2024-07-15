import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./Auth";
import UserStack from "./user";
import SignIn from "../screens/SignIn";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import SignUp from "../screens/SignUp";
import PassForgot from "../screens/PassForgot";

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1008351359062-5dhg78110f4s9cnj0vfci28mbqlguhh8.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("error");
        setUserInfo("");
      }
    });

    return () => unsub();
  }, [onAuthStateChanged]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }


  return userInfo ? (
    <AuthStack />
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn">
        {(props) => <SignIn {...props} promptAsync={promptAsync} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="PassForgot" component={PassForgot} />
    </Stack.Navigator>
  );
}
