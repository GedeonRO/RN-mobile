import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Linking,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LogOutUser } from "../config/credential";

const CustomHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");

  const openLink = () => {
    if (githubLink) {
      setGithubLink("");
      Linking.openURL(githubLink);
    }
  };

  const navigationView = () => (
    <View>
      <Text>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={async () => await LogOutUser()}
      >
        <Text style={styles.submitButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.headerContainer}>
      <View className="flex w-full flex-row justify-between">
        <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <SimpleLineIcons name="menu" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-[#ffffff] text-[18px] font-bold">Accueil</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="github" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Array")}>
          <Text style={styles.menuItem}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <Text style={styles.menuItem}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => await LogOutUser()}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Bienvenue</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre lien GitHub"
              value={githubLink}
              onChangeText={setGithubLink}
            />
            <TouchableOpacity style={styles.submitButton} onPress={openLink}>
              <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <Text>coucou</Text>
      </DrawerLayoutAndroid>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    padding: 15,
    alignItems: "center",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 120,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  menuItem: {
    color: "#fff",
    marginHorizontal: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    marginHorizontal: 8,
    paddingBottom: 30,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CustomHeader;
