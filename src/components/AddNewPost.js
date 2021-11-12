import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { backIcon } from "../assets/assets";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FormikPostUploader />
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack("HomeScreen")}>
        <Image source={backIcon} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 33,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 125,
  },
});

export default AddNewPost;
