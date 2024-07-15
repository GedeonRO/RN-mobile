import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";

const fruitsDB = [
  {
    nom: "Pomme",
    description: "Fruit rond, sucré ou acidulé, souvent rouge, vert ou jaune.",
    bienfaits:
      "Riches en fibres, elles aident à la digestion et réduisent le risque de maladies cardiaques.",
  },
  {
    nom: "Banana",
    description: "Fruit long et courbé, à peau jaune.",
    bienfaits:
      "Source de potassium, elles aident à réguler la pression artérielle et améliorent la santé cardiovasculaire.",
  },
  {
    nom: "Orange",
    description: "Agrume rond à peau orange et pulpe juteuse.",
    bienfaits:
      "Riche en vitamine C, elles renforcent le système immunitaire et aident à l'absorption du fer.",
  },
  {
    nom: "Fraise",
    description: "Petit fruit rouge et juteux avec des graines à l'extérieur.",
    bienfaits:
      "Riches en antioxydants et vitamine C, elles contribuent à la santé cardiaque et à la réduction des inflammations.",
  },
  {
    nom: "Raisin",
    description:
      "Petit fruit rond, généralement violet, vert ou rouge, poussé en grappes.",
    bienfaits:
      "Source de vitamines C et K, ils améliorent la santé cardiaque et ont des propriétés anti-inflammatoires.",
  },
  {
    nom: "Kiwi",
    description: "Petit fruit ovale à peau brune et pulpe verte.",
    bienfaits:
      "Riche en vitamine C et en fibres, il aide à la digestion et renforce le système immunitaire.",
  },
  {
    nom: "Ananas",
    description: "Grand fruit tropical à peau épineuse et chair jaune.",
    bienfaits:
      "Contient de la broméline, qui aide à la digestion, et est riche en vitamine C.",
  },
  {
    nom: "Mangue",
    description: "Fruit tropical à chair orange douce et juteuse.",
    bienfaits:
      "Riche en vitamines A et C, elle aide à la santé des yeux et renforce le système immunitaire.",
  },
  {
    nom: "Cerise",
    description: "Petit fruit rouge ou noir à noyau.",
    bienfaits:
      "Riche en antioxydants, elles réduisent les inflammations et peuvent améliorer la qualité du sommeil.",
  },
  {
    nom: "Pêche",
    description: "Fruit rond à peau veloutée et chair juteuse.",
    bienfaits:
      "Riche en vitamines A et C, elles favorisent la santé de la peau et la vision.",
  },
];

const About = ({ route }) => {
    const navigation = useNavigation();
    
    const [fruits, setFruits] = useState(fruitsDB)

    React.useEffect(() => {
      const nom = route.params?.name;
      const description = route.params?.description;
      const bien = route.params?.bien;
    if (nom) {
      const fruitExists = fruits.some((fruit) => fruit.name === nom);
      if (fruitExists) {
        Alert.alert(
          "Oups ! ce fruit existe dejà",
          "",
          [{ text: "Fermer", onPress: () => console.log("alert closed") }]
        );
      } else {
        setFruits([
          ...fruits,
          {
            nom: nom,
            description: description,
            bienfaits: bien,
          },
        ]);
      }
    }
  }, [route.params?.name]);

  const { name } = route.params;

  console.log(name);

  const fruit = fruits.find(
    (fruit) => fruit.nom.toLowerCase() === name.toLowerCase()
  );

  if (fruit) {
    return (
      <View style={styles.about}>
        <Text>Nom: {fruit.nom}</Text>
        <Text>Description: {fruit.description}</Text>
        <Text>Bienfaits: {fruit.bienfaits}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  } else {
    return (
      <View style={styles.about}>
        <Text>Le fruit {name} n'existe pas dans le tableau.</Text>
        <Button title="Ajouter" onPress={() => navigation.navigate("Array")} />
      </View>
    );
  }
};

export default About;

const styles = StyleSheet.create({
  about: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 50,
  },
});
