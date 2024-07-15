import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditPost = () => {
  const route = useRoute();
  const { id, invalidate } = route.params;
  const navigation = useNavigation();

  const [post, setPost] = useState({
    title: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = "http://192.168.1.66:4000/api/blogs";
        const response = await fetch(`${apiUrl}/${id}`);
        const result = await response.json();
        setPost({
          title: result.title,
          description: result.description,
          status: result.status,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      const apiUrl = "http://192.168.1.66:4000/api/blogs";
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const result = await response.json();
      console.log(result);

      await invalidate();
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ligne}>
        <Text>Title</Text>
        <TextInput
          placeholder="le livre"
          value={post.title}
          onChangeText={(text) => setPost({ ...post, title: text })}
          style={styles.input}
        />
      </View>

      <View style={styles.ligne}>
        <Text>Description</Text>
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="une bonne regulation ..."
          value={post.description}
          onChangeText={(text) => setPost({ ...post, description: text })}
          style={styles.input}
        />
      </View>

      <View style={styles.ligne}>
        <Text>Status</Text>
        <Checkbox
          value={post.status}
          onValueChange={(value) => setPost({ ...post, status: value })}
        />
      </View>

      <Button title="Modifier" onPress={handleEdit} />
    </View>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  ligne: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    borderColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 230,
    borderWidth: 1,
    borderRadius: 4,
  },
});
