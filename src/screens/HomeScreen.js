import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BottomTabs, { bottomTabIcons } from "../components/BottomTabs";
import { USER_POST } from "../config/UserPost";
import Header from "../components/Header";
import Post from "../components/Post";
import Stories from "../components/Stories";
import { db } from "../config/firebase";

const HomeScreen = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    db.collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "18%" }}>
          <Stories />
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </View>
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default HomeScreen;
