import React, { useState } from "react";
import { SignUpUser } from "../config/credential";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Image,
} from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";

function SignUp () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    console.log(email, password)
    const res = await SignUpUser(email, password);
    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./favicon.png")}
        style={{ width: 40, height: 40, alignSelf: "center" }}
      />
      <Text style={styles.title}>Inscription</Text>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
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
          style={styles.input}
        />
      </View>
      <Pressable
        onPress={() => handleSignUp()}
        style={[styles.button, styles.buttonSign]}
      >
        <Text> S'incrire </Text>
      </Pressable>

      <View style={styles.google}>
        <Text> s'inscrire avec Google </Text>
        <Image
          source={require("./google.png")}
          style={{ width: 30, height: 30, alignSelf: "center" }}
        />
      </View>
      <View style={styles.inscription}>
        <Text>Vous avez deja un compte ? </Text>
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={{ color: "blue" }}>se connecter</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

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
    borderColor: "#000",
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
