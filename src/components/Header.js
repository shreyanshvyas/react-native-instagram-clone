import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { headerLogo, plusIcon, messageIcon } from "../assets/assets";
import { firebase } from "../config/firebase";

const Header = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out Successfully!");
    } catch (error) {
      Alert.alert("Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.img} source={headerLogo} />
      </TouchableOpacity>
      <View style={styles.iconCont}>
        <TouchableOpacity onPress={() => navigation.navigate("NewPostScreen")}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>

        <View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgContainerText}>11</Text>
          </View>
          <Image source={messageIcon} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 28,
  },
  iconCont: {
    flexDirection: "row",
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: 18,
    resizeMode: "contain",
  },
  img: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  msgContainer: {
    position: "absolute",
    backgroundColor: "#FF3250",
    left: 25,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  msgContainerText: {
    color: "white",
    fontWeight: "600",
  },
});
export default Header;
