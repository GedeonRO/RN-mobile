import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Post = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const getPost = async () => {
    try {
      const apiUrl = "http://192.168.1.66:4000/api/blogs";
      const response = await fetch(apiUrl);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getPostLoadQuery = useQuery({
    queryKey: ["PostLoad"],
    queryFn: getPost,
  });

  const invalidation = async () => {
    await delay(1100);
    queryClient.invalidateQueries({
      queryKey: ["PostLoad"],
      exact: true,
    });
  };

  console.log(getPostLoadQuery.data);

  const handlePress = async () => {
    try {
      const apiUrl = "http://192.168.1.66:4000/api/blogs";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          status: status,
        }),
      });
      const result = await response.json();
      console.log(result);
      setModalVisible(!modalVisible);
      setTitle("");
      setDescription("");
      setStatus(false);

      await invalidation();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePress = async (key) => {
    try {
      const apiUrl = "http://192.168.1.66:4000/api/blogs";
      const response = await fetch(`${apiUrl}/${key}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(result);
      await invalidation();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.scroll}>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          {getPostLoadQuery.isLoading && <Text> Movie is loading</Text>}
          {getPostLoadQuery.isSuccess && (
            <View>
              <Text>Movie</Text>
              {getPostLoadQuery.data.map((item) => (
                <View style={styles.movie} key={item._id}>
                  <View>
                    <Text>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <View style={styles.action}>
                    <Pressable
                      style={[styles.button, styles.buttonEdit]}
                      onPress={() =>
                        navigation.navigate("Edit", {
                          id: item._id,
                          invalidate: invalidation,
                        })
                      }
                    >
                      <Text>edit</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonDelete]}
                      onPress={() => deletePress(item._id)}
                    >
                      <Text>delete</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.ligne}>
              <Text> Title </Text>
              <TextInput
                placeholder="le livre"
                onChangeText={setTitle}
                style={styles.input}
                value={title}
              />
            </View>

            <View style={styles.ligne}>
              <Text> Descption </Text>
              <TextInput
                multiline
                numberOfLines={2}
                placeholder="une bonne regulation ... "
                onChangeText={setDescription}
                style={styles.input}
                value={description}
              />
            </View>

            <View style={styles.ligne}>
              <Text> status </Text>
              <Checkbox value={status} onValueChange={setStatus} />
            </View>
            <View style={styles.movie}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handlePress}
              >
                <Text style={styles.textStyle}>Ajouter</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.Add}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },

  Add: {
    position: "absolute",
    bottom: 50,
    right: 15,
  },

  ligne: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-start",
    marginBottom: 10,
  },

  movie: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 5,
    alignContent: "center",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignContent: "center",
    marginTop: 25,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  description: {
    width: 200,
    flexWrap: "wrap",
  },
  input: {
    borderColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 230,
    borderWidth: 1,
    borderRadius: 4,
  },
  scroll: {
    height: "100%",
    position: "relative",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: "red",
  },

  buttonEdit: {
    backgroundColor: "aqua",
  },

  buttonOpen: {
    backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonAdd: {
    backgroundColor: "#F194FF",
  },
});
