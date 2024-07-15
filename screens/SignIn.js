import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { SignInUser } from "../config/credential";

const SignIn = ({ promptAsync }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#000");

  const Login = async () => {
    const res = await SignInUser(email, password);
    console.log("test2", res);
    if (res === undefined) {
      setPassword("");

      Alert.alert("Oups ! Indetifiant incorrect", "", [
        { text: "Fermer", onPress: () => console.log("alert closed") },
      ]);
      setColor("red");
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("./favicon.png")}
        style={{ width: 40, height: 40, alignSelf: "center" }}
      />
      <Text style={styles.title}>Connexion</Text>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={[{ borderColor: color }, styles.input]}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View>
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          style={[{ borderColor: color }, styles.input]}
          secureTextEntry
        />
      </View>
      <Pressable
        onPress={() => Login()}
        style={[styles.button, styles.buttonSign]}
      >
        <Text> connecter </Text>
      </Pressable>
      <Pressable onPress={() => promptAsync()}>
        <View style={styles.google}>
          <Text>se connecter avec Google </Text>
          <Image
            source={require("./google.png")}
            style={{ width: 30, height: 30, alignSelf: "center" }}
          />
        </View>
      </Pressable>

      <View style={styles.inscription}>
        <Text>Vous n'avez pas encore de compte ? </Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "blue" }}>s'incrire</Text>
        </Pressable>
      </View>
      <View style={styles.inscription}>
        <Pressable onPress={() => navigation.navigate("PassForgot")}>
          <Text style={{ color: "red" }}>Mot de passe oublié ?</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "aqua",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  buttonSign: {
    backgroundColor: "white",
  },
  google: {
    padding: 5,
    borderColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: "dashed",
    alignItems: "center",
  },

  inscription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
  },
});
