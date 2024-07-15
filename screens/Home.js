import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";

import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";

const Home = () => {
  const [text, setText] = useState("banana");
  const [number, setNumber] = useState(7);

  const [fruits, setFruits] = useState([
    { name: "banana", number: 5, key: "1" },
    { name: "apple", number: 7, key: "2" },
    { name: "mango", number: 3, key: "3" },
  ]);

  const navigation = useNavigation();

  const handlePress = () => {
    const fruitExists = fruits.some((fruit) => fruit.name === text);
    if (fruitExists) {
      Alert.alert("Oups ! ce fruit existe dejà, incrémente le seulement", "", [
        { text: "Fermer", onPress: () => console.log("alert closed") },
      ]);
    } else {
      setFruits([
        ...fruits,
        {
          name: text,
          number: parseInt(number),
          key: Math.random().toString(),
        },
      ]);
      setText("");
      setNumber("");
    }
  };

  const updatePress = (key) => {
    setFruits((prevFruits) =>
      prevFruits.map((fruit) =>
        fruit.key === key ? { ...fruit, number: fruit.number + 1 } : fruit
      )
    );
  };

  const deletePress = (key) => {
    setFruits((prevFruits) => {
      return prevFruits.filter((item) => item.key != key);
    });
  };
  return (
    <ScrollView className="m-10">
      {fruits.map((item) => (
        <View style={styles.divList} key={item.key}>
          <TouchableOpacity onPress={() => updatePress(item.key)}>
            <Text style={styles.list}>
              {item.name} {item.number}
            </Text>
          </TouchableOpacity>
          <Text style={styles.button} onPress={() => deletePress(item.key)}>
            X
          </Text>
          <Text
            onPress={() => navigation.navigate("About", { name: item.name })}
          >
            Show
          </Text>
        </View>
      ))}

      <View style={styles.formContainer}>
        <Text>Your Fruit </Text>
        <TextInput
          placeholder="Agb"
          onChangeText={(val) => setText(val)}
          style={styles.input}
        />
        <Text>Number eat</Text>
        <TextInput
          placeholder="25 "
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(val) => setNumber(val)}
          style={styles.input}
        />

        <Button title="SAVE" onPress={handlePress} />
        <Text>
          your last fruit eat is : {text} of number : {number}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Home;

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
