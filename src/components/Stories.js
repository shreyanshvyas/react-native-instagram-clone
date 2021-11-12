import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { USERS } from "../config/Users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13, marginTop: 11 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index}>
            <Image source={{ uri: story.image }} style={styles.data} />
            <Text style={styles.dataText}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + "..."
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 15,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  dataText: {
    color: "#ffffff",
    fontSize: 12,
    marginLeft: 12,
    textAlign: "center",
    marginTop: 2,
  },
});

export default Stories;
