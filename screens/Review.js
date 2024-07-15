import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";

const Review = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [bien, setBien] = useState("");

  const handlePress = () => {
    navigation.popTo("About", {
      name: nom,
      description: description,
      bien: bien,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text>Nom </Text>
      <TextInput
        placeholder="framboise"
        onChangeText={(val) => setNom(val)}
        style={styles.input}
      />
      <Text>Description</Text>
      <TextInput
        multiline
        numberOfLines={2}
        placeholder="fruit rouge ..."
        onChangeText={(val) => setDescription(val)}
        style={styles.input}
      />
      <Text>Bienfaits</Text>
      <TextInput
        multiline
        numberOfLines={2}
        placeholder="une bonne regulation ... "
        onChangeText={(val) => setBien(val)}
        style={styles.input}
      />

      <Button title="SAVE" onPress={handlePress} />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  input: {
    borderColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
  },
  divList: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    backgroundColor: "blue",
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
    color: "#fff",
  },
  button: {
    width: 20,
  },
});
